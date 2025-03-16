"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexus-knowledge';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
// Set up Apollo Server
async function startApolloServer() {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        context: ({ req }) => {
            // Extract user from JWT token in authorization header
            const token = req.headers.authorization || '';
            // Simple context for now, expand with authentication later
            return { req };
        },
    });
    await server.start();
    server.applyMiddleware({ app: app });
    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
        app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
        app.get('*', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
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
//# sourceMappingURL=index.js.map