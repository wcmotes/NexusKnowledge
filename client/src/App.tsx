import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DailyNotes from './pages/DailyNotes';
import Graph from './pages/Graph';
import Search from './pages/Search';
import Settings from './pages/Settings';
import NodePage from './pages/NodePage';
import NotFound from './pages/NotFound';

function App() {
  const { darkMode } = useSelector((state: RootState) => state.ui);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="daily" element={<DailyNotes />} />
          <Route path="graph" element={<Graph />} />
          <Route path="search" element={<Search />} />
          <Route path="settings" element={<Settings />} />
          <Route path="node/:nodeId" element={<NodePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
