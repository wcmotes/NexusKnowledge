# NexusKnowledge: Advanced PKM System

## Overview
NexusKnowledge is a high-end Personal Knowledge Management (PKM) application inspired by Tana and Capacities. It provides a powerful system for organizing information, creating connections between ideas, and building a personal knowledge graph.

## Key Features

- **Knowledge Graph System** - Node-based data structure with bidirectional links and visual graph navigation
- **Supertags & Templates** - User-defined templates for structured data with custom fields and properties
- **Rich Text Editor** - Hierarchical outlining with Markdown support and block-based editing
- **Daily Notes** - Automated daily note creation with task management integration
- **AI Assistant** - Content generation, summarization, and knowledge organization suggestions
- **Custom Object Types** - User-defined object types with specialized views and property-based filtering
- **Advanced Search** - Full-text search with relevance ranking and faceted filtering
- **Cross-Platform Sync** - Real-time synchronization across devices with offline support
- **Publishing & Sharing** - Web publishing of selected content with collaboration features

## Technology Stack

- **Frontend**: React.js, TypeScript, TailwindCSS, ProseMirror, D3.js
- **Backend**: Node.js, Express, TypeScript, MongoDB, Redis, GraphQL
- **AI Integration**: OpenAI GPT API, TensorFlow.js
- **Mobile**: React Native for cross-platform mobile support

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB
- Redis (optional, for performance)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/NexusKnowledge.git
   cd NexusKnowledge
   ```

2. Install dependencies
   ```
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. Configure environment variables
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration

4. Start development servers
   ```
   # In one terminal, start the backend
   npm run dev:server
   
   # In another terminal, start the frontend
   npm run dev:client
   ```

5. Open your browser and navigate to `http://localhost:3000`

## License
MIT
