import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '@/store/store';
import { toggleSidebar } from '@/store/slices/uiSlice';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Header onMenuClick={handleToggleSidebar} />
        
        <main className="relative flex-1 overflow-y-auto focus:outline-none p-4">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
