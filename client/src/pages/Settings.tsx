import { useState } from 'react';

interface SettingsSection {
  id: string;
  title: string;
  icon: JSX.Element;
}

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');
  const [autoSave, setAutoSave] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(5);
  const [showWordCount, setShowWordCount] = useState(true);
  const [defaultView, setDefaultView] = useState('editor');
  const [apiKey, setApiKey] = useState('');
  const [syncFrequency, setSyncFrequency] = useState('realtime');
  const [openAiModel, setOpenAiModel] = useState('gpt-4');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [hotkeys, setHotkeys] = useState({
    newNote: 'Ctrl+N',
    search: 'Ctrl+F',
    save: 'Ctrl+S',
    toggleSidebar: 'Ctrl+B'
  });

  const sections: SettingsSection[] = [
    {
      id: 'general',
      title: 'General',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      )
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
      )
    },
    {
      id: 'editor',
      title: 'Editor',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
      )
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      )
    },
    {
      id: 'sync',
      title: 'Sync & Backup',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      )
    },
    {
      id: 'shortcuts',
      title: 'Keyboard Shortcuts',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="node-card">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeSection === section.id
                      ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{section.icon}</span>
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="node-card">
            {/* General Settings */}
            {activeSection === 'general' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Enable dark mode for a better night-time experience</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={darkMode} 
                        onChange={() => setDarkMode(!darkMode)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                    <select 
                      id="language" 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="es">Spanish</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="default-view" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default View</label>
                    <select 
                      id="default-view" 
                      value={defaultView} 
                      onChange={(e) => setDefaultView(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="editor">Editor</option>
                      <option value="dashboard">Dashboard</option>
                      <option value="graph">Knowledge Graph</option>
                      <option value="daily">Daily Notes</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Notifications</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get reminders for tasks and other important updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationEnabled} 
                        onChange={() => setNotificationEnabled(!notificationEnabled)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Editor Settings */}
            {activeSection === 'editor' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Editor Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-save Notes</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Automatically save your notes as you type</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={autoSave} 
                        onChange={() => setAutoSave(!autoSave)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {autoSave && (
                    <div>
                      <label htmlFor="auto-save-interval" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Auto-save Interval (seconds)</label>
                      <input 
                        type="number" 
                        id="auto-save-interval" 
                        value={autoSaveInterval} 
                        onChange={(e) => setAutoSaveInterval(Number(e.target.value))}
                        min="1"
                        max="60"
                        className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Word Count</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Display word and character count in the editor</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={showWordCount} 
                        onChange={() => setShowWordCount(!showWordCount)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* AI Assistant Settings */}
            {activeSection === 'ai' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">AI Assistant Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300">OpenAI API Key</label>
                    <input 
                      type="password" 
                      id="api-key" 
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Your API key is stored locally and never shared with our servers.</p>
                  </div>

                  <div>
                    <label htmlFor="openai-model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">OpenAI Model</label>
                    <select 
                      id="openai-model" 
                      value={openAiModel} 
                      onChange={(e) => setOpenAiModel(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="gpt-4">GPT-4 (Most Capable)</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Sync & Backup Settings */}
            {activeSection === 'sync' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sync & Backup Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="sync-frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sync Frequency</label>
                    <select 
                      id="sync-frequency" 
                      value={syncFrequency} 
                      onChange={(e) => setSyncFrequency(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="realtime">Real-time</option>
                      <option value="5min">Every 5 minutes</option>
                      <option value="15min">Every 15 minutes</option>
                      <option value="30min">Every 30 minutes</option>
                      <option value="1hour">Every hour</option>
                      <option value="manual">Manual only</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Backup Now
                    </button>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Last backup: Today at 14:32</p>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Import / Export</h3>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none">
                        Import Data
                      </button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none">
                        Export Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Keyboard Shortcuts Settings */}
            {activeSection === 'shortcuts' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Keyboard Shortcuts</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                      <span className="text-sm text-gray-700 dark:text-gray-300">New Note</span>
                      <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                        {hotkeys.newNote}
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Search</span>
                      <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                        {hotkeys.search}
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Save</span>
                      <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                        {hotkeys.save}
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Toggle Sidebar</span>
                      <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                        {hotkeys.toggleSidebar}
                      </kbd>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Appearance Settings</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color Theme</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <button className="h-8 w-full bg-blue-600 rounded-md border-2 border-blue-700"></button>
                      <button className="h-8 w-full bg-green-600 rounded-md"></button>
                      <button className="h-8 w-full bg-purple-600 rounded-md"></button>
                      <button className="h-8 w-full bg-red-600 rounded-md"></button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size</h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Small</span>
                      <input 
                        type="range" 
                        min="12" 
                        max="24" 
                        value="16"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Large</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Family</h3>
                    <select 
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="system">System Default</option>
                      <option value="inter">Inter</option>
                      <option value="roboto">Roboto</option>
                      <option value="mono">Monospace</option>
                      <option value="serif">Serif</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
