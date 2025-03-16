# NexusKnowledge Server Setup

## Database Setup Options

### Option 1: Install MongoDB Locally

1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Follow the installation instructions for Windows
3. Make sure the MongoDB service is running
   - You can verify by opening Services in Windows (services.msc)
   - Look for "MongoDB Server" and ensure it's running

### Option 2: Use MongoDB Atlas (Cloud)

1. Create a free account at MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register
2. Create a new cluster (the free tier is sufficient for development)
3. Set up a database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string which will look like:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/nexus-knowledge?retryWrites=true&w=majority`
6. Update your `.env` file with this connection string

## Running the Server

After setting up MongoDB:

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. For production:
   ```
   npm run build
   npm start
   ```

## Environment Variables

Make sure your `.env` file contains:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/nexus-knowledge  # or your Atlas connection string
JWT_SECRET=your-secret-key
```

## API Endpoints

The GraphQL endpoint is available at: http://localhost:4000/graphql

You can use Apollo Studio Explorer or tools like Postman to test the API.
