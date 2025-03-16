import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setCurrentView } from '@/store/slices/uiSlice';
import { addNode, setSelectedNodeId } from '@/store/slices/nodesSlice';
import { v4 as uuidv4 } from 'uuid';
import { NodeType } from '@/types/node';

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const { currentView } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      ),
      view: 'daily'
    },
    { 
      name: 'Daily Notes', 
      path: '/daily',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
      view: 'daily'
    },
    { 
      name: 'Knowledge Graph', 
      path: '/graph',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
        </svg>
      ),
      view: 'graph'
    },
    { 
      name: 'Search', 
      path: '/search',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      ),
      view: 'search'
    },
    { 
      name: 'Settings', 
      path: '/settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      view: 'settings'
    },
  ];

  return (
    <aside 
      className={`z-20 bg-white dark:bg-gray-800 transition-all duration-300 transform ${
        open ? 'translate-x-0 ease-out w-64' : '-translate-x-full ease-in md:translate-x-0 md:w-20'
      } fixed inset-y-0 left-0 md:relative shadow-md`}
    >
      <div className="py-4 flex flex-col h-full">
        {/* Logo */}
        <div className={`flex items-center justify-center h-16 ${!open && 'md:justify-center'}`}>
          <span className={`text-xl font-bold text-gray-800 dark:text-white ${!open && 'md:hidden'}`}>
            NexusKnowledge
          </span>
          <span className={`text-xl font-bold text-blue-500 ${open && 'md:hidden'} hidden md:block`}>
            NK
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-2 space-y-1 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} 
                group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
              `}
              onClick={() => dispatch(setCurrentView(item.view as any))}
            >
              <div className="mr-3 flex-shrink-0">{item.icon}</div>
              <span className={`${!open && 'md:hidden'}`}>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Quick add button */}
        <div className="px-3 mt-auto mb-4">
          <button
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              const newNode = {
                id: uuidv4(),
                type: NodeType.NOTE,
                title: 'New Note',
                content: '',
                tags: [],
                supertags: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                children: [],
                references: [],
                referencedBy: []
              };
              dispatch(addNode(newNode));
              dispatch(setSelectedNodeId(newNode.id));
              navigate(`/node/${newNode.id}`);
            }}
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <span className={`${!open && 'md:hidden'}`}>New Note</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
