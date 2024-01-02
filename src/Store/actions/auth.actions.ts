import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  UserEmail,
  UserLogin,
  UserRegister,
} from "../Slice/reducer/auth.slice";
import { Api } from "../../Services/Api";
import { Alert } from "react-native";
import { createAlarm } from "../../utils/message.utils";



export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: UserRegister, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/register", {
        email: user.email,
        name: user.name,
        password: user.password,
        gender: user.gender,
        confirmpassword: user.confirmpassword,
      });

      return response.data;
    } catch (error: any) {
      Alert.alert("Error", error.response.data.message.email[0]);

      throw error; // relanzar error
    }
  }
);
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (token: string, { rejectWithValue }) => {
    try {
      // Realiza la solicitud al endpoint 'validate-token'
      const response = await Api.post("/auth/validate-token", { token });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Maneja errores de respuesta (por ejemplo, token inválido)
        const cancel = createAlarm({
          message:
            "Tu sesión ha caducado. Por favor, inicia sesión nuevamente.",
          type: "danger",
          duration: 4000,
          Icons: "checkmark-outline",
        });
        cancel();
        // Manejar el error según tus necesidades
      } else if (error.request) {
        // Maneja errores de red
        const cancel = createAlarm({
          message: "Error de red. Por favor, inténtalo de nuevo.",
          type: "danger",
          duration: 4000,
          Icons: "checkmark-outline",
        });
        cancel();
      } else {
        // Maneja otros errores

        const cancel = createAlarm({
          message: "Error desconocido. Por favor, inténtalo de nuevo.",
          type: "danger",
          duration: 4000,
          Icons: "checkmark-outline",
        });
        cancel();
      }

      // Relanza el error para que el estado del slice refleje el estado de la solicitud
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: UserLogin, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/login", {
        email: user.email,
        password: user.password,
      });

      console.log("soy el reponse de login", response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message.email[0]);
    }
  }
);

export const validateEmail = createAsyncThunk(
  "auth/validateEmail",
  async (email: UserEmail, { rejectWithValue }) => {
    try {
      const response = await Api.post(`/auth/validateEmail`, {
        email: email.email,
      });

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message?.email[0] ||
        "Error al validar el correo electrónico";
      return rejectWithValue(errorMessage);
    }
  }
);
