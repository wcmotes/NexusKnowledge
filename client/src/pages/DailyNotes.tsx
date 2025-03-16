import { useState, useEffect } from 'react';
import { format, addDays, subDays, parseISO } from 'date-fns';

// Mock data for daily notes demonstration
const mockDailyNotes = {
  '2025-03-15': {
    id: 'today',
    date: '2025-03-15',
    content: '- Morning reflection\n- Project planning session\n- Research on knowledge graphs\n- Team standup meeting',
    tasks: [
      { id: '1', content: 'Review project requirements', completed: true },
      { id: '2', content: 'Create wireframes for new feature', completed: false },
      { id: '3', content: 'Meeting with design team at 2pm', completed: false },
    ]
  },
  '2025-03-14': {
    id: 'yesterday',
    date: '2025-03-14',
    content: '- Worked on UI components\n- Read article on PKM systems\n- Watched tutorial on React hooks',
    tasks: [
      { id: '4', content: 'Complete React component library', completed: true },
      { id: '5', content: 'Research competitors', completed: true },
    ]
  }
};

const DailyNotes = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [content, setContent] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState('');

  // Format date as YYYY-MM-DD for storage key
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  
  // Load content for selected date
  useEffect(() => {
    const dailyNote = mockDailyNotes[formattedDate];
    if (dailyNote) {
      setContent(dailyNote.content);
      setTasks(dailyNote.tasks || []);
    } else {
      setContent('');
      setTasks([]);
    }
  }, [formattedDate]);

  const handlePreviousDay = () => {
    setSelectedDate(prevDate => subDays(prevDate, 1));
  };

  const handleNextDay = () => {
    setSelectedDate(prevDate => addDays(prevDate, 1));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // In a real app, we would save this to the backend
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskObj = {
        id: `task-${Date.now()}`,
        content: newTask,
        completed: false
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-6">
      {/* Date navigation */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Notes</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handlePreviousDay}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <div className="text-gray-700 dark:text-gray-300 font-medium">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </div>
          
          <button 
            onClick={handleNextDay}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          <button 
            onClick={() => setSelectedDate(new Date())}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 rounded-md hover:bg-blue-200 dark:hover:bg-blue-700"
          >
            Today
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes section */}
        <div className="lg:col-span-2">
          <div className="node-card">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notes</h2>
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Write your thoughts, ideas, and activities for the day..."
              className="w-full h-64 p-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* SuperTags section */}
          <div className="node-card mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SuperTags</h2>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center">
                <span className="mr-1 text-blue-500">#</span>
                <span>meeting</span>
              </button>
              <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center">
                <span className="mr-1 text-green-500">#</span>
                <span>journal</span>
              </button>
              <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center">
                <span className="mr-1 text-purple-500">#</span>
                <span>idea</span>
              </button>
              <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center border border-dashed border-gray-300 dark:border-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Add Tag</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tasks section */}
        <div className="node-card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tasks</h2>
          
          {/* Add task form */}
          <form onSubmit={handleAddTask} className="mb-4 flex">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </form>
          
          {/* Task list */}
          <div className="space-y-2">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <div key={task.id} className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                    className="h-5 w-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div className="ml-3 flex-1">
                    <p className={`text-gray-700 dark:text-gray-300 ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                      {task.content}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No tasks for this day</p>
                <p className="text-sm mt-1">Add a task to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* References */}
      <div className="node-card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Referenced Nodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Product Design Document</span>
            </div>
          </div>
          <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Team Meeting</span>
            </div>
          </div>
        </div>
        <button className="mt-3 flex items-center text-blue-600 dark:text-blue-400 hover:underline">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Add Reference</span>
        </button>
      </div>
    </div>
  );
};

export default DailyNotes;
