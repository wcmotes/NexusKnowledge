import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Mock data for the knowledge graph
const mockGraphData = {
  nodes: [
    { id: '1', label: 'Personal Knowledge Management', type: 'concept', group: 1 },
    { id: '2', label: 'Zettelkasten Method', type: 'concept', group: 1 },
    { id: '3', label: 'Note-taking Systems', type: 'concept', group: 1 },
    { id: '4', label: 'Digital Gardens', type: 'concept', group: 1 },
    { id: '5', label: 'Project Planning', type: 'note', group: 2 },
    { id: '6', label: 'Meeting Notes: Team Sync', type: 'note', group: 3 },
    { id: '7', label: 'Book: How to Take Smart Notes', type: 'reference', group: 4 },
    { id: '8', label: 'Book: Building a Second Brain', type: 'reference', group: 4 },
    { id: '9', label: 'Research on Graph Databases', type: 'note', group: 5 },
    { id: '10', label: 'Task Management Systems', type: 'concept', group: 1 },
    { id: '11', label: 'Web Development Resources', type: 'collection', group: 5 },
    { id: '12', label: 'Daily Note: 2025-03-15', type: 'daily_note', group: 6 },
  ],
  links: [
    { source: '1', target: '2', value: 1 },
    { source: '1', target: '3', value: 1 },
    { source: '1', target: '4', value: 1 },
    { source: '1', target: '10', value: 1 },
    { source: '2', target: '7', value: 1 },
    { source: '2', target: '8', value: 1 },
    { source: '3', target: '2', value: 1 },
    { source: '5', target: '6', value: 1 },
    { source: '5', target: '12', value: 1 },
    { source: '6', target: '12', value: 1 },
    { source: '7', target: '8', value: 1 },
    { source: '9', target: '11', value: 1 },
    { source: '9', target: '5', value: 1 },
    { source: '10', target: '5', value: 1 },
    { source: '12', target: '9', value: 1 },
  ]
};

// Node type to color mapping
const typeColorMap = {
  concept: '#3b82f6', // blue
  note: '#10b981',    // green
  reference: '#8b5cf6', // purple
  daily_note: '#f59e0b', // amber
  collection: '#ef4444', // red
  default: '#6b7280'  // gray
};

const Graph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [graphData, setGraphData] = useState(mockGraphData);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Create and update the force-directed graph
  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Apply filters
    let filteredNodes = graphData.nodes;
    let nodeIds: string[] = [];
    
    if (filterType) {
      filteredNodes = graphData.nodes.filter(node => node.type === filterType);
      nodeIds = filteredNodes.map(node => node.id);
    }
    
    if (searchTerm) {
      filteredNodes = filteredNodes.filter(node => 
        node.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      nodeIds = filteredNodes.map(node => node.id);
    }

    // Filter links based on filtered nodes
    const filteredLinks = filterType || searchTerm 
      ? graphData.links.filter(link => 
          nodeIds.includes(link.source.toString()) && 
          nodeIds.includes(link.target.toString())
        )
      : graphData.links;

    // Set up the SVG dimensions
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight || 600;
    
    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);
    
    // Create the simulation
    const simulation = d3.forceSimulation(filteredNodes)
      .force('link', d3.forceLink(filteredLinks).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));
    
    // Create the links
    const link = svg.append('g')
      .selectAll('line')
      .data(filteredLinks)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5);
    
    // Create the nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(filteredNodes)
      .enter()
      .append('g')
      .call(d3.drag<SVGGElement, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));
    
    // Add circles to nodes
    node.append('circle')
      .attr('r', 20)
      .attr('fill', (d: any) => typeColorMap[d.type as keyof typeof typeColorMap] || typeColorMap.default)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);
    
    // Add text labels to nodes
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 30)
      .text((d: any) => d.label)
      .attr('font-size', '10px')
      .attr('fill', '#333')
      .style('pointer-events', 'none')
      .each(function(this: SVGTextElement, d: any) {
        const text = d3.select(this);
        const words = d.label.split(/\s+/);
        
        if (words.length > 2) {
          text.text(words.slice(0, 2).join(' ') + '...');
        }
      });
    
    // Add type icons to nodes
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 3)
      .attr('font-family', 'FontAwesome')
      .attr('font-size', '10px')
      .attr('fill', '#fff')
      .text((d: any) => {
        switch (d.type) {
          case 'concept': return '☂';
          case 'note': return '📝';
          case 'reference': return '📚';
          case 'daily_note': return '📅';
          case 'collection': return '📁';
          default: return '●';
        }
      });
    
    // Add node click handler
    node.on('click', (event: MouseEvent, d: any) => {
      event.stopPropagation();
      setSelectedNode(d);
    });
    
    // Add background click handler to deselect
    svg.on('click', () => {
      setSelectedNode(null);
    });
    
    // Update positions on each 'tick' of the simulation
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });
    
    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, any, any>, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: d3.D3DragEvent<SVGGElement, any, any>, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: d3.D3DragEvent<SVGGElement, any, any>, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    // Clean up on unmount
    return () => {
      simulation.stop();
    };
  }, [graphData, filterType, searchTerm]);

  const handleClearFilters = () => {
    setFilterType(null);
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Knowledge Graph</h1>
        
        <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search nodes..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          {/* Filter Dropdown */}
          <select
            value={filterType || ''}
            onChange={(e) => setFilterType(e.target.value || null)}
            className="w-full sm:w-auto pl-3 pr-10 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Types</option>
            <option value="concept">Concepts</option>
            <option value="note">Notes</option>
            <option value="reference">References</option>
            <option value="daily_note">Daily Notes</option>
            <option value="collection">Collections</option>
          </select>
          
          {/* Clear Filters Button */}
          {(filterType || searchTerm) && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Graph Legend */}
        <div className="node-card lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legend</h2>
          <div className="space-y-3">
            {Object.entries(typeColorMap).filter(([key]) => key !== 'default').map(([type, color]) => (
              <div key={type} className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                <span className="capitalize text-gray-700 dark:text-gray-300">{type.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Graph Controls</h3>
            <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <li>• Click and drag nodes to reposition</li>
              <li>• Click a node to view details</li>
              <li>• Use filters to focus on specific types</li>
              <li>• Search to find specific nodes</li>
            </ul>
          </div>
        </div>
        
        {/* Graph Visualization */}
        <div className="node-card lg:col-span-3 flex flex-col">
          <div className="relative flex-grow" style={{ minHeight: '500px' }}>
            <svg 
              ref={svgRef} 
              className="w-full h-full bg-gray-50 dark:bg-gray-800 rounded-md"
            ></svg>
            
            {selectedNode && (
              <div className="absolute bottom-4 right-4 w-64 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{selectedNode.label}</h3>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <div className="mt-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="capitalize">{selectedNode.type.replace('_', ' ')}</span>
                    <span className="mx-2">•</span>
                    <span>ID: {selectedNode.id}</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700">
                      View Node
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-500">
                      Add Connection
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Node Statistics */}
      <div className="node-card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Node Statistics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-blue-600 dark:text-blue-400 text-2xl font-bold">{graphData.nodes.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Nodes</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-green-600 dark:text-green-400 text-2xl font-bold">{graphData.links.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Connections</div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-purple-600 dark:text-purple-400 text-2xl font-bold">
              {graphData.nodes.reduce((count, node) => node.type === 'concept' ? count + 1 : count, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Concepts</div>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <div className="text-amber-600 dark:text-amber-400 text-2xl font-bold">
              {graphData.nodes.reduce((count, node) => node.type === 'note' ? count + 1 : count, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Notes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
