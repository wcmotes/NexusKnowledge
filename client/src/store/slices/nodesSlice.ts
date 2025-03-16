import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, NodeType } from '@/types/node';

interface NodesState {
  nodes: Record<string, Node>;
  loading: boolean;
  error: string | null;
  selectedNodeId: string | null;
}

const initialState: NodesState = {
  nodes: {},
  loading: false,
  error: null,
  selectedNodeId: null,
};

export const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setNodes: (state, action: PayloadAction<Record<string, Node>>) => {
      state.nodes = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes[action.payload.id] = action.payload;
    },
    updateNode: (state, action: PayloadAction<{ id: string; data: Partial<Node> }>) => {
      const { id, data } = action.payload;
      state.nodes[id] = { ...state.nodes[id], ...data, updatedAt: new Date().toISOString() };
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      delete state.nodes[action.payload];
    },
    setSelectedNodeId: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setNodes,
  addNode,
  updateNode,
  deleteNode,
  setSelectedNodeId,
} = nodesSlice.actions;

export default nodesSlice.reducer;
