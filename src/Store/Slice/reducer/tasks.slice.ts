import { createSlice } from "@reduxjs/toolkit";
import { handlePending } from "../../actions/base.action";
import {
  createTasks,
  deleteTasks,
  getOneTask,
  getTasks,
  updateOneTask,
} from "../../actions/tasks.action";
import { taskUpdateModel, tasksModel } from "../../../Types/types";

export interface tasksdatas {
  name: string;
  description: string;
  dateTimeReminder: string;
  time: string;
  status?: boolean;
  priority: string;
  category: string;
  idNotification: string;
}
export interface updateTask {
  id?: string;
  name?: string;
  description?: string | null;
  dateTimeReminder?: string | null;
  time?: string;
  status?: boolean;
  priority?: string;
  category?: string;
}
export interface RegisterState {
  tasks: tasksModel[];
  task: tasksModel | null;
  updateTask: taskUpdateModel | null;
  loading: boolean;
  isVisible: boolean;
  isEdit: boolean;
  error: string | null;
  token: string | null;
}

const initialState: RegisterState = {
  tasks: [],
  task: null,
  updateTask: null,
  loading: false,
  isEdit: false,
  isVisible: false,
  error: null,
  token: null,
};
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    statusModal: (state, action) => {
      state.isVisible = action.payload;
    },
    // Agrega un creador de acción para ocultar el modal
    isEditing: (state, action) => {
      state.isEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTasks.pending, handlePending)
      .addCase(createTasks.fulfilled, (state, { payload }: any) => {
        state.tasks = payload.tasks;
        state.token = payload.accessToken;
        state.loading = false;
      })
      .addCase(createTasks.rejected, (state) => {
        state.loading = false;
        state.token = null;
      })
      .addCase(getTasks.pending, handlePending)
      .addCase(getTasks.fulfilled, (state, { payload }: any) => {
        state.tasks = payload;
        state.token = payload.accessToken;
        state.loading = false;
      })

      .addCase(getTasks.rejected, (state) => {
        state.loading = false;
        state.token = null;
      })
      .addCase(deleteTasks.pending, handlePending)
      .addCase(deleteTasks.fulfilled, (state, { payload }: any) => {
        state.tasks = payload;
        state.loading = false;
      })

      .addCase(deleteTasks.rejected, (state) => {
        state.loading = false;
        state.token = null;
      })
      .addCase(getOneTask.pending, handlePending)
      .addCase(getOneTask.fulfilled, (state, { payload }: any) => {
        state.task = payload;
        state.loading = false;
      })

      .addCase(getOneTask.rejected, (state) => {
        state.loading = false;
        state.token = null;
      })
      .addCase(updateOneTask.pending, handlePending)
      .addCase(updateOneTask.fulfilled, (state, { payload }: any) => {
        state.updateTask = payload;
      })

      .addCase(updateOneTask.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});

export const { statusModal, isEditing } = tasksSlice.actions;
export default tasksSlice.reducer;
