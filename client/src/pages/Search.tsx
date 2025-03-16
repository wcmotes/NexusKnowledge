import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock search results data
const mockSearchResults = [
  { id: '1', title: 'Project Planning', type: 'note', content: 'This is a note about project planning and organization...', lastUpdated: '2025-03-14T12:30:00Z' },
  { id: '2', title: 'Knowledge Graph Research', type: 'reference', content: 'Research on different knowledge graph implementations...', lastUpdated: '2025-03-12T09:15:00Z' },
  { id: '3', title: 'Meeting Notes: Team Sync', type: 'note', content: 'Weekly team meeting discussing progress and blockers...', lastUpdated: '2025-03-10T15:45:00Z' },
  { id: '4', title: 'Task: Implement Search Functionality', type: 'task', content: 'Create a robust search feature with filtering options...', lastUpdated: '2025-03-08T11:20:00Z', completed: false },
  { id: '5', title: 'Website Architecture', type: 'concept', content: 'Core concepts for building a modern web application...', lastUpdated: '2025-03-05T14:10:00Z' },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [results, setResults] = useState(mockSearchResults);
  const [sortOrder, setSortOrder] = useState<'relevance' | 'date'>('relevance');

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // In a real app, we would fetch search results based on the term
    if (e.target.value.trim() === '') {
      setResults(mockSearchResults);
    } else {
      const filteredResults = mockSearchResults.filter(
        item => item.title.toLowerCase().includes(e.target.value.toLowerCase()) || 
                item.content.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  // Apply type filter
  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      setResults(mockSearchResults);
    } else {
      setActiveFilter(filter);
      const filteredResults = mockSearchResults.filter(item => item.type === filter);
      setResults(filteredResults);
    }
  };

  // Sort results
  const handleSortChange = (sortType: 'relevance' | 'date') => {
    setSortOrder(sortType);
    if (sortType === 'date') {
      setResults([...results].sort((a, b) => 
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      ));
    } else {
      // For relevance sorting, we'd implement a more complex algorithm
      // This is just a placeholder
      setResults(mockSearchResults);
    }
  };

  // Highlight matching text in search results
  const highlightMatch = (text: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Search</h1>
      
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for notes, tasks, concepts, or anything in your knowledge base..."
        />
      </div>
      
      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterClick('note')}
            className={`px-3 py-1 text-sm rounded-full ${
              activeFilter === 'note' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => handleFilterClick('task')}
            className={`px-3 py-1 text-sm rounded-full ${
              activeFilter === 'task' 
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => handleFilterClick('reference')}
            className={`px-3 py-1 text-sm rounded-full ${
              activeFilter === 'reference' 
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            References
          </button>
          <button
            onClick={() => handleFilterClick('concept')}
            className={`px-3 py-1 text-sm rounded-full ${
              activeFilter === 'concept' 
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Concepts
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handleSortChange('relevance')}
            className={`px-3 py-1 text-sm rounded-md ${
              sortOrder === 'relevance' 
                ? 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Sort by Relevance
          </button>
          <button
            onClick={() => handleSortChange('date')}
            className={`px-3 py-1 text-sm rounded-md ${
              sortOrder === 'date' 
                ? 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Sort by Date
          </button>
        </div>
      </div>
      
      {/* Results count */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {results.length} results {activeFilter ? `for type: ${activeFilter}` : ''}
        {searchTerm ? ` matching "${searchTerm}"` : ''}
      </div>
      
      {/* Search results */}
      <div className="space-y-4">
        {results.length > 0 ? (
          results.map((result) => (
            <Link 
              key={result.id} 
              to={`/node/${result.id}`}
              className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    <span dangerouslySetInnerHTML={{ __html: highlightMatch(result.title) }} />
                  </h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      result.type === 'note' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                      result.type === 'task' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                      result.type === 'reference' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    }`}>
                      {result.type}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(result.lastUpdated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <span dangerouslySetInnerHTML={{ __html: highlightMatch(result.content.substring(0, 150) + '...') }} />
              </p>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <svg className="mx-auto w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
      
      {/* Advanced search options (collapsed by default) */}
      <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <button className="flex items-center justify-between w-full text-left">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Advanced Search Options</span>
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {/* Advanced options would be shown/hidden based on state */}
      </div>
    </div>
  );
};

export default Search;
