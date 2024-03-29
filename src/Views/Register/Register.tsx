import { StyleSheet, View, Alert, TextInput, Text } from "react-native";
import { Button } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import Header from "../../HeaderButton/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RegisterType, RootStackParams } from "../../Types/types";
import { RootState, useAppDispatch } from "../../Store/Slice";
import { registerUser, validateEmail } from "../../Store/actions/auth.actions";
import { useSelector } from "react-redux";
import { UserEmail } from "../../Store/Slice/reducer/auth.slice";
import { debounce } from "lodash";
import SelectPicker, { GenderList } from "../../components/select/Select";
import Form from "../../components/form/Form";
import ButtonR from "../../components/Button/Button";
import { useTheme } from "react-native-paper";
//import { Button } from "@rneui/themed";

const initial = {
  name: "maria",
  email: "maria@gmail.com",
  gender: "M",
  password: "1234",
  confirmpassword: "1234",
};
const schemaValidateRegister = Yup.object({
  name: Yup.string().required("Nombre requerido"),
  email: Yup.string().email("correo no valido").required("Email requerido"),
  password: Yup.string()
    .min(4, "minimo 4 caracteres")
    .required("Contraseña requerida"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "las contraseñas deben coincidir")
    .min(4, "minimo 4 caracteres")
    .required("Confirmación requerida"),
});

const Register = () => {
  const { isRegister, alreadyEmail } = useSelector(
    (root: RootState) => root.auth
  );

  const { navigate } =
    useNavigation<StackNavigationProp<RootStackParams, "Home">>();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: RegisterType) => {
    try {
      const res = await dispatch(registerUser(data));
      if (res && isRegister) {
        navigate("Login");
        resetForm();
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
    }
  };
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initial,
    enableReinitialize: true,
    validationSchema: schemaValidateRegister,
    onSubmit,
  });

  useEffect(() => {
    const validateEmailAsync = async (values: UserEmail) => {
      try {
        if (values && values.email) {
          const emailData: UserEmail = {
            email: values.email,
          };

          await dispatch(validateEmail(emailData));
        }
      } catch (error) {
        return error;
      }
    };

    validateEmailAsync(values);
  }, [dispatch, values]);
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Header />
      <View style={styles.containercenter}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
            fontStyle: "italic",
            paddingTop: 20,
            color:theme.colors.primary
          }}
        >
          Registro
        </Text>
        <View style={styles.form}>
          <View>
            <Form
              onChangeText={handleChange("name")}
              value={values.name}
              error={errors.name}
              placeholder="pepito perez"
              label="Nombre"
            />
            <Text>{errors.name && <Text>{errors.name}</Text>}</Text>
          </View>
          <View>
            <Form
              onChangeText={handleChange("email")}
              value={values.email}
              error={errors.email}
              placeholder="example@gmail.com"
              label="Correo"
            />
            {alreadyEmail ? (
              <Text>
                {alreadyEmail && (
                  <Text style={styles.emailexist}>El correo ya existe</Text>
                )}
              </Text>
            ) : (
              <Text>{errors.email && <Text>{errors.email}</Text>}</Text>
            )}
          </View>
          <View>
            <Text style={{color:theme.colors.primary}} >Gender</Text>
            <SelectPicker
              key={"gender"}
              items={GenderList}
              onValueChange={(value) => setFieldValue("gender", value)}
              value={values.gender}
            />
          </View>
          <View>
            <Form
              onChangeText={handleChange("password")}
              value={values.password}
              error={errors.password}
              placeholder="*******"
              label="Contraseña"
              secureTextEntry={true}
            />
            <View>{errors.password && <Text>{errors.password}</Text>}</View>
          </View>
          <View>
            <Form
              onChangeText={handleChange("confirmpassword")}
              value={values.confirmpassword}
              error={errors.confirmpassword}
              placeholder="***********"
              label="Confirmacion contraseña"
              secureTextEntry={true}
            />
            <View>
              {errors.confirmpassword && <Text>{errors.confirmpassword}</Text>}
            </View>
          </View>
        </View>
        <View style={styles.containerboton}>
          <ButtonR
            onPress={() => handleSubmit()}
            TextButton="Enviar"
            icon="send"
            mode="contained"
            disable={
              values.name.trim() === "" ||
              values.confirmpassword.trim() === "" ||
              values.email.trim() === "" ||
              values.password.trim() === "" ||
              values.password.length < 4 ||
              alreadyEmail === true
            }
          />
        </View>
        <View>
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginVertical: 20,
              fontSize: 18,
              color: theme.colors.primary,
            }}
          >
            ¿ Ya tienes cuenta ?{" "}
            <Link style={{ color: "purple" }} to={"/Login"}>
              Click Aqui
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  emailexist: { color: "red" },
  disableButton: { backgroundColor: "gray" },
  disabletitle: { color: "#000" },
  containerboton: {
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
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
  cuenta: {},
  form: { padding: 10 },
  subtitle: { fontSize: 15, marginHorizontal: 10 },
  containerTitle: {},
  containercenter: {
    borderRadius: 20,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#F4EDE9",
  },
});
