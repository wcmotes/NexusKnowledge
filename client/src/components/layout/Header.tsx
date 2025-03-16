import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleDarkMode } from '@/store/slices/uiSlice';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  return (
    <header className="z-10 py-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center">
          <button
            className="p-1 mr-4 -ml-1 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onMenuClick}
          >
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="text-xl font-bold text-gray-800 dark:text-white">
            NexusKnowledge
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="p-1 text-gray-500 dark:text-gray-300 rounded-full hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => dispatch(toggleDarkMode())}
          >
            {darkMode ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                />
              </svg>
            )}
          </button>

          <button className="p-1 text-gray-500 dark:text-gray-300 rounded-full hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
              />
            </svg>
          </button>

          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            U
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
