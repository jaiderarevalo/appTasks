import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../Services/Api";
import { tasksdatas, updateTask } from "../Slice/reducer/tasks.slice";

export const createTasks = createAsyncThunk(
  "tasks/create",
  async (user: tasksdatas, { rejectWithValue }) => {
    try {
      const response = await Api.post("/tasks/create", {
        name: user.name,
        description: user.description,
        dateTimeReminder: user.dateTimeReminder,
        time: user.time,
        status: user.status,
        priority: user.priority,
        category: user.category,
        idNotification: user.idNotification,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message.email[0]);
    }
  }
);
export const updateOneTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: updateTask, { rejectWithValue }) => {
    try {
      const res = await Api.patch<updateTask>(`/tasks/update/${task.id}`, task);
      return res.data;
    } catch (error: any) {
      console.log("error del catch", error.response.data);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getTasks = createAsyncThunk(
  "tasks/get",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/tasks/${userId}`, {});

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message[0]);
    }
  }
);
export const getOneTask = createAsyncThunk(
  "tasks/getOneTask",
  async (Id: string, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/tasks/task/${Id}`, {});

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message[0]);
    }
  }
);
export const deleteTasks = createAsyncThunk(
  "tasks/deleteTask",
  async (userId: string | null, { rejectWithValue }) => {
    try {
      await Api.delete(`/tasks/${userId}`, {});
      return;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
