import { StyleSheet, View, Alert, TextInput, Text } from "react-native";
import { Button } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Link, useNavigation } from "@react-navigation/native";
import Header from "../../HeaderButton/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginType, RegisterType, RootStackParams } from "../../Types/types";
import { RootState, useAppDispatch } from "../../Store/Slice";
import { loginUser, registerUser } from "../../Store/actions/auth.actions";
import { useSelector } from "react-redux";
import { createAlarm } from "../../utils/message.utils";
//import { Button } from "@rneui/themed";

const initial = {
  email: "maria@gmail.com",
  password: "1234",
};
const schemaValidateRegister = Yup.object({
  email: Yup.string().email("correo no valido").required("Email requerido"),
  password: Yup.string()
    .min(4, "minimo 4 caracteres")
    .required("Contraseña requerida"),
});

const Login = () => {
  const { isLogin, user } = useSelector((root: RootState) => root.auth);
  const { navigate } =
    useNavigation<StackNavigationProp<RootStackParams, "Home">>();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginType) => {
    try {
      const res = await dispatch(loginUser(data));
      if (res) {
        if (isLogin) {
          navigate("Task");
        }
        resetForm();

        const cancel = createAlarm({
          message: `Hola ${user?.name} has ingresado Exitosamente`,
          type: "sucess",
          duration: 4000,
          Icons: "checkmark-outline",
        });
        cancel();
      }
      if (res.meta.requestStatus === 'rejected') {
        const cancel = createAlarm({
          message: `Email o Contraseña invalida`,
          type: "danger",
          duration: 4000,
          Icons: "checkmark-outline",
        });
        cancel();
        resetForm();
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
    }
  };
  const { values, handleChange, handleBlur, handleSubmit, resetForm, errors } =
    useFormik({
      initialValues: initial,
      enableReinitialize: true,
      validationSchema: schemaValidateRegister,
      onSubmit,
    });

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containercenter}>
        <Text style={styles.containerTitle}>Login</Text>
        <View style={styles.form}>
          <View>
            <Text>E-mail</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("email")}
              value={values.email}
              onBlur={handleBlur("email")}
            />
            <Text>{errors.email && <Text>{errors.email}</Text>}</Text>
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("password")}
              value={values.password}
              onBlur={handleBlur("password")}
              secureTextEntry
            />
            <View>{errors.password && <Text>{errors.password}</Text>}</View>
          </View>
        </View>
        <View style={styles.containerboton}>
          <Button
            buttonStyle={styles.boton}
            onPress={() => handleSubmit()}
            title="Enviar"
            disabled={
              values.email.trim() === "" || values.password.trim() === ""
            }
            disabledStyle={styles.disableButton}
            disabledTitleStyle={styles.disabletitle}
          />
        </View>
        <View>
          <Text style={styles.cuenta}>
            ¿ No tienes cuenta ?{" "}
            <Link style={{ color: "purple" }} to={"/Register"}>
              Click Aqui
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  disableButton: { backgroundColor: "gray" },
  disabletitle: { color: "#000" },
  containerboton: { alignContent: "center", justifyContent: "center" },
  boton: {
    marginHorizontal: 50,
    backgroundColor: "#4CAF50",
    marginTop: 15,
    borderRadius: 20,
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    borderRadius: 20,
    marginTop: 5,
  },
  cuenta: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
  },
  form: { padding: 10 },
  subtitle: { fontSize: 15, marginHorizontal: 10 },
  containerTitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    paddingTop: 20,
  },
  containercenter: {
    borderRadius: 20,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#C6E8F5",
  },
});
