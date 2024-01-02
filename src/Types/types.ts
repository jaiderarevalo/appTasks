import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface tasksModel {
  id?: string;
  name: string;
  description: string;
  dateTimeReminder: string;
  time: string;
  status: boolean;
  priority: string;
  category: string;
}
export interface taskUpdateModel {
  id?: string;
  name?: string;
  description?: string;
  dateTimeReminder?: string;
  time?: string;
  status?: boolean;
  priority?: string;
  category?: string;
}
export type Form = {
  textnames: string;
  onChange: (name: string, value: string) => void;
  name: string;
  value: string;
  error?: string;
  placeholder?: string;
};
export type AddTasksModalProps = {
  onClose: (shouldUpdate?: boolean) => void;
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  gender: string;
  confirmpassword: string;
};
export type LoginType = {
  email: string;
  password: string;
};

export type RootStackParams = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  Task: undefined;
  Account:undefined
};
export type PostNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  "Register"
>;
