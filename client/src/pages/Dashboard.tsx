import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockRecentNodes = [
  { id: '1', title: 'Project Ideas', type: 'note', updatedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
  { id: '2', title: 'Research on Knowledge Graphs', type: 'note', updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: '3', title: 'Meeting Notes - Team Sync', type: 'note', updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
  { id: '4', title: 'Book: Thinking Fast and Slow', type: 'reference', updatedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString() },
];

const mockTasks = [
  { id: '1', content: 'Finish NexusKnowledge v1 prototype', completed: false, dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString() },
  { id: '2', content: 'Research graph visualization libraries', completed: true, dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: '3', content: 'Write documentation for knowledge graph', completed: false, dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString() },
  { id: '4', content: 'Implement daily notes feature', completed: false, dueDate: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString() },
];

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  // Update the date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
          {formattedDate}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Daily Note */}
        <div className="node-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Daily Note</h2>
            <Link to="/daily" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              View all
            </Link>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[100px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Capture your thoughts, tasks, and ideas for today</p>
              <Link
                to="/daily"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Open Today's Note
              </Link>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="node-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Tasks</h2>
            <Link to="/search?type=task" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {mockTasks.map((task) => (
              <li key={task.id} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 mt-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    checked={task.completed}
                    readOnly
                  />
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                    {task.content}
                  </p>
                  {task.dueDate && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recently Updated */}
        <div className="node-card col-span-1 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recently Updated</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRecentNodes.map((node) => (
              <Link key={node.id} to={`/node/${node.id}`} className="block">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">{node.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Updated {formatTimeAgo(node.updatedAt)}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                      {node.type}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="node-card col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Note</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Task</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Template</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format time ago
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
};

export default Dashboard;
