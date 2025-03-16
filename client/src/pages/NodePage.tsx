import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock data for node details
const mockNodes = {
  '1': {
    id: '1',
    title: 'Project Planning',
    content: '# Project Planning\n\nThis is a comprehensive guide for planning projects efficiently. Projects should include the following elements:\n\n- Clear objectives\n- Timeline and milestones\n- Resource allocation\n- Risk assessment\n\n## Key Components\n\n1. **Initiation Phase**\n   - Define project scope\n   - Identify stakeholders\n   - Create project charter\n\n2. **Planning Phase**\n   - Develop work breakdown structure\n   - Schedule resources\n   - Establish communication plan',
    type: 'note',
    tags: ['project', 'management', 'planning'],
    createdAt: '2025-03-10T14:30:00Z',
    updatedAt: '2025-03-14T16:45:00Z',
    references: [
      { id: '2', title: 'Task Management Systems', type: 'concept' },
      { id: '3', title: 'Meeting Notes: Team Sync', type: 'note' }
    ]
  },
  '2': {
    id: '2',
    title: 'Task Management Systems',
    content: '# Task Management Systems\n\nTask management systems are tools that help individuals and teams organize, track, and manage their work efficiently.\n\n## Popular Systems\n\n1. **Kanban Boards**\n   - Visual workflow management\n   - Cards represent tasks\n   - Columns represent stages\n\n2. **To-Do Lists**\n   - Simple task tracking\n   - Prioritization features\n   - Completion checkboxes\n\n3. **Gantt Charts**\n   - Timeline visualization\n   - Dependencies mapping\n   - Project scheduling',
    type: 'concept',
    tags: ['productivity', 'management', 'tools'],
    createdAt: '2025-03-08T10:15:00Z',
    updatedAt: '2025-03-12T11:30:00Z',
    references: [
      { id: '1', title: 'Project Planning', type: 'note' },
      { id: '4', title: 'Productivity Methods', type: 'reference' }
    ]
  }
};

interface NodeParams {
  id: string;
}

const NodePage = () => {
  const { id } = useParams<NodeParams>();
  const [node, setNode] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'references'>('content');

  useEffect(() => {
    if (id && mockNodes[id as keyof typeof mockNodes]) {
      const nodeData = mockNodes[id as keyof typeof mockNodes];
      setNode(nodeData);
      setEditContent(nodeData.content);
    }
  }, [id]);

  if (!node) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">Node not found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">The node you're looking for doesn't exist or has been deleted.</p>
          <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Handle content edit
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      // In a real app, we would save to backend here
      const updatedNode = { ...node, content: editContent, updatedAt: new Date().toISOString() };
      setNode(updatedNode);
    }
    setIsEditing(!isEditing);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Node Header */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{node.title}</h1>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
              node.type === 'note' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
              node.type === 'task' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
              node.type === 'reference' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100' :
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
            }`}>
              {node.type}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Created: {formatDate(node.createdAt)} • Last updated: {formatDate(node.updatedAt)}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleEditToggle}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              isEditing 
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button className="px-3 py-1 text-sm font-medium bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            More
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {node.tags.map((tag: string) => (
          <span 
            key={tag} 
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm"
          >
            #{tag}
          </span>
        ))}
        <button className="px-2 py-1 border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-md text-sm flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Tag
        </button>
      </div>

      {/* Content Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'content'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('references')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'references'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
          >
            References ({node.references.length})
          </button>
        </nav>
      </div>

      {/* Content Area */}
      {activeTab === 'content' && (
        <div className="node-card">
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-64 p-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              {/* In a real app, we would render Markdown content using a library like react-markdown */}
              <div className="whitespace-pre-wrap">{node.content}</div>
            </div>
          )}
        </div>
      )}

      {/* References Tab */}
      {activeTab === 'references' && (
        <div className="node-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Connected Nodes</h2>
            <button className="text-sm flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Connection
            </button>
          </div>
          
          {node.references.length > 0 ? (
            <div className="space-y-3">
              {node.references.map((ref: { id: string; title: string; type: string }) => (
                <Link 
                  key={ref.id} 
                  to={`/node/${ref.id}`}
                  className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    ref.type === 'note' ? 'bg-blue-500' :
                    ref.type === 'task' ? 'bg-green-500' :
                    ref.type === 'reference' ? 'bg-purple-500' :
                    'bg-yellow-500'
                  }`}></span>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{ref.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{ref.type}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No connections yet</p>
              <p className="text-sm mt-1">Add connections to link this node with other knowledge</p>
            </div>
          )}
        </div>
      )}

      {/* AI Assistant */}
      <div className="node-card">
        <div className="flex items-center space-x-2 mb-3">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h2>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
            Summarize
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
            Find Related
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
            Generate Ideas
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
            Ask Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodePage;
