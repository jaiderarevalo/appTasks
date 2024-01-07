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
import { createAlarm } from "../../utils/CreateAlarm.utils";
import Form from "../../components/form/Form";
import ImageAvatar from "../../components/Image";
import ButtonR from "../../components/Button/Button";

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
          type: "success",
          duration: 4000,
        });
        cancel();
      }
      if (res.meta.requestStatus === "rejected") {
        const cancel = createAlarm({
          message: `Email o Contraseña invalida`,
          type: "danger",
          duration: 4000,
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
        <Text style={styles.containerTitle}>
          <ImageAvatar size={90} avatarUrl={require("../../Images/book.png")} />
        </Text>
        <View style={styles.form}>
          <View>
            <Form
              onChangeText={handleChange("email")}
              value={values.email}
              error={errors.email}
              placeholder="example@gmail.com"
              label="Correo"
            />
            <Text>{errors.email && <Text>{errors.email}</Text>}</Text>
          </View>
          <View>
            <Form
              label="Contraseña"
              onChangeText={handleChange("password")}
              value={values.password}
              error={errors.password}
              placeholder="**********"
              secureTextEntry={true}
            />
            <View>{errors.password && <Text>{errors.password}</Text>}</View>
          </View>
        </View>
        <View style={styles.containerboton}>
          <ButtonR 
            onPress={() => handleSubmit()}
            TextButton="Enviar"
            icon="send"
            mode="contained"
            disable={ values.email.trim() === "" || values.password.trim() === "" || values.password.length < 4}
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
  cuenta: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
  },
  form: { width: "100%" },
  subtitle: { fontSize: 15, marginHorizontal: 10 },
  containerTitle: {
    textAlign: "center",
    paddingVertical: 20
  },
  containercenter: {
    borderRadius: 20,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
  },
});
