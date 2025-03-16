"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const User_1 = __importDefault(require("./models/User"));
const Node_1 = __importDefault(require("./models/Node"));
const DailyNote_1 = __importDefault(require("./models/DailyNote"));
const Task_1 = __importDefault(require("./models/Task"));
const auth_1 = require("./utils/auth");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
exports.resolvers = {
    Query: {
        getNode: async (_, { id }) => {
            return await Node_1.default.findById(id);
        },
        getNodes: async () => {
            return await Node_1.default.find({});
        },
        getNodesByType: async (_, { type }) => {
            return await Node_1.default.find({ type });
        },
        getDailyNote: async (_, { date }) => {
            return await DailyNote_1.default.findOne({ date }).populate('tasks');
        },
        getDailyNotes: async () => {
            return await DailyNote_1.default.find({}).populate('tasks').sort({ date: -1 });
        },
        searchNodes: async (_, { query }) => {
            return await Node_1.default.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { content: { $regex: query, $options: 'i' } },
                    { tags: { $in: [query] } }
                ]
            });
        },
        getCurrentUser: async (_, __, { user }) => {
            if (!user) {
                throw new apollo_server_express_1.UserInputError('Not authenticated');
            }
            return await User_1.default.findById(user.id);
        },
    },
    Mutation: {
        createNode: async (_, args) => {
            const newNode = new Node_1.default({
                ...args,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                children: [],
                references: [],
                referencedBy: []
            });
            await newNode.save();
            // Update parent's children array if parent exists
            if (args.parent) {
                await Node_1.default.findByIdAndUpdate(args.parent, { $push: { children: newNode.id } });
            }
            return newNode;
        },
        updateNode: async (_, { id, ...updates }) => {
            // First check if the node exists
            const node = await Node_1.default.findById(id);
            if (!node) {
                throw new apollo_server_express_1.UserInputError('Node not found');
            }
            // Apply updates
            Object.keys(updates).forEach(key => {
                if (updates[key] !== undefined) {
                    node[key] = updates[key];
                }
            });
            node.updatedAt = new Date().toISOString();
            await node.save();
            return node;
        },
        deleteNode: async (_, { id }) => {
            // First check if the node exists
            const node = await Node_1.default.findById(id);
            if (!node) {
                throw new apollo_server_express_1.UserInputError('Node not found');
            }
            // Remove this node from any references
            await Node_1.default.updateMany({ references: id }, { $pull: { references: id } });
            // Remove this node from any referencedBy
            await Node_1.default.updateMany({ referencedBy: id }, { $pull: { referencedBy: id } });
            await node.deleteOne();
            return { id, success: true };
        },
        addReference: async (_, { sourceId, targetId }) => {
            // Check if both nodes exist
            const sourceNode = await Node_1.default.findById(sourceId);
            const targetNode = await Node_1.default.findById(targetId);
            if (!sourceNode || !targetNode) {
                throw new apollo_server_express_1.UserInputError('One or both nodes not found');
            }
            // Add reference
            if (!sourceNode.references.includes(new mongoose_1.Types.ObjectId(targetId))) {
                sourceNode.references.push(new mongoose_1.Types.ObjectId(targetId));
                await sourceNode.save();
            }
            // Add referencedBy
            if (!targetNode.referencedBy.includes(new mongoose_1.Types.ObjectId(sourceId))) {
                targetNode.referencedBy.push(new mongoose_1.Types.ObjectId(sourceId));
                await targetNode.save();
            }
            return { success: true };
        },
        removeReference: async (_, { sourceId, targetId }) => {
            // Check if both nodes exist
            const sourceNode = await Node_1.default.findById(sourceId);
            const targetNode = await Node_1.default.findById(targetId);
            if (!sourceNode || !targetNode) {
                throw new apollo_server_express_1.UserInputError('One or both nodes not found');
            }
            // Remove reference
            sourceNode.references = sourceNode.references.filter((ref) => ref.toString() !== targetId);
            await sourceNode.save();
            // Remove referencedBy
            targetNode.referencedBy = targetNode.referencedBy.filter((ref) => ref.toString() !== sourceId);
            await targetNode.save();
            return { success: true };
        },
        createDailyNote: async (_, { date, content }) => {
            // Check if a note for this date already exists
            const existingNote = await DailyNote_1.default.findOne({ date });
            if (existingNote) {
                throw new apollo_server_express_1.UserInputError('A note for this date already exists');
            }
            const newDailyNote = new DailyNote_1.default({
                date,
                content,
                tasks: []
            });
            await newDailyNote.save();
            return newDailyNote;
        },
        updateDailyNote: async (_, { id, content }) => {
            const dailyNote = await DailyNote_1.default.findById(id);
            if (!dailyNote)
                throw new apollo_server_express_1.UserInputError('Daily note not found');
            dailyNote.content = content;
            await dailyNote.save();
            return dailyNote;
        },
        createTask: async (_, { content, dueDate, priority, dailyNoteId }) => {
            const newTask = new Task_1.default({
                content,
                completed: false,
                dueDate,
                priority: priority || 0,
                createdAt: new Date().toISOString()
            });
            await newTask.save();
            // If this task is associated with a daily note, add it
            if (dailyNoteId) {
                const dailyNote = await DailyNote_1.default.findById(dailyNoteId);
                if (dailyNote) {
                    dailyNote.tasks.push(newTask._id);
                    await dailyNote.save();
                }
            }
            return newTask;
        },
        updateTask: async (_, updates) => {
            const task = await Task_1.default.findById(updates.id);
            if (!task)
                throw new apollo_server_express_1.UserInputError('Task not found');
            Object.assign(task, updates);
            await task.save();
            return task;
        },
        deleteTask: async (_, { id }) => {
            // Remove this task from any daily notes
            await DailyNote_1.default.updateMany({ tasks: id }, { $pull: { tasks: id } });
            await Task_1.default.findByIdAndDelete(id);
            return { id, success: true };
        },
        login: async (_, { email, password }) => {
            const user = await User_1.default.findOne({ email });
            if (!user) {
                throw new apollo_server_express_1.UserInputError('Invalid email or password');
            }
            const validPassword = await bcryptjs_1.default.compare(password, user.password);
            if (!validPassword) {
                throw new apollo_server_express_1.UserInputError('Invalid email or password');
            }
            const token = (0, auth_1.generateToken)(user);
            return {
                id: user.id,
                token,
                email: user.email,
                name: user.name
            };
        },
        register: async (_, { email, password, name }) => {
            // Check if user already exists
            const existingUser = await User_1.default.findOne({ email });
            if (existingUser) {
                throw new apollo_server_express_1.UserInputError('User with this email already exists');
            }
            // Hash password
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(password, salt);
            // Create new user
            const newUser = new User_1.default({
                email,
                password: hashedPassword,
                name,
                createdAt: new Date().toISOString()
            });
            await newUser.save();
            const token = (0, auth_1.generateToken)(newUser);
            return {
                id: newUser.id,
                token,
                email: newUser.email,
                name: newUser.name
            };
        },
        updateUser: async (_, updates, { user }) => {
            if (!user) {
                throw new apollo_server_express_1.UserInputError('Not authenticated');
            }
            const userToUpdate = await User_1.default.findById(user.id);
            if (!userToUpdate)
                throw new apollo_server_express_1.UserInputError('User not found');
            // If updating password, hash it
            if (updates.password) {
                const salt = await bcryptjs_1.default.genSalt(10);
                updates.password = await bcryptjs_1.default.hash(updates.password, salt);
            }
            Object.assign(userToUpdate, updates);
            await userToUpdate.save();
            return userToUpdate;
        }
    }
};
//# sourceMappingURL=resolvers.js.map