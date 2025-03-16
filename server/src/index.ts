import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import path from 'path';
import { Express } from 'express-serve-static-core';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexus-knowledge';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up Apollo Server
async function startApolloServer(): Promise<void> {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: Request }) => {
      // Extract user from JWT token in authorization header
      const token = req.headers.authorization || '';
      // Simple context for now, expand with authentication later
      return { req };
    },
  });

  await server.start();
  
  // Apply middleware (explicitly cast to any to avoid type conflicts)
  server.applyMiddleware({ 
    app: app as any,
    path: '/graphql' 
  });

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    
    app.get('*', (req: Request, res: Response): void => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  // Start server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer().catch(err => console.error('Error starting server:', err));
