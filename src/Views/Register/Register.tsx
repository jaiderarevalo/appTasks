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
//import { Button } from "@rneui/themed";

const initial = {
  name: "maria",
  email: "maria@gmail.com",
  gender:'M',
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

  const onSubmit = async(data: RegisterType) => {
    try {
    const res =  await dispatch(registerUser(data))
    if(res && isRegister){
      navigate("Login");
      resetForm()
    }
      }
      
     catch (error) {
      Alert.alert("Error", `${error}`);
    }
  };
  const { values, handleChange, handleBlur, handleSubmit, resetForm, errors,setFieldValue } =
    useFormik({
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
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containercenter}>
        <Text style={styles.containerTitle}>Register</Text>
        <View style={styles.form}>
          <View>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              autoFocus
              onChangeText={handleChange("name")}
              value={values.name}
              onBlur={handleBlur("name")}
            />
            <Text>{errors.name && <Text>{errors.name}</Text>}</Text>
          </View>
          <View>
            <Text>E-mail</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("email")}
              value={values.email}
              onBlur={handleBlur("email")}
            />
            <Text>
              {alreadyEmail && (
                <Text style={styles.emailexist}>el correo ya existe</Text>
              )}
            </Text>
            <Text>{errors.email && <Text>{errors.email}</Text>}</Text>
          </View>
          <View>
            <Text>Gender</Text>
            <SelectPicker
            key={'gender'}
            items={GenderList}
            onValueChange={(value) => setFieldValue("gender", value)}
            value={values.gender}
            />
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
          <View>
            <Text>Confirm password</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("confirmpassword")}
              value={values.confirmpassword}
              onBlur={handleBlur("confirmpassword")}
              secureTextEntry
            />
            <View>
              {errors.confirmpassword && <Text>{errors.confirmpassword}</Text>}
            </View>
          </View>
        </View>
        <View style={styles.containerboton}>
          <Button
            buttonStyle={styles.boton}
            onPress={() => handleSubmit()}
            title="Enviar"
            disabled={
              values.name.trim() === "" ||
              values.confirmpassword.trim() === "" ||
              values.email.trim() === "" ||
              values.password.trim() === ""
            }
            disabledStyle={styles.disableButton}
            disabledTitleStyle={styles.disabletitle}
          />
        </View>
        <View>
          <Text style={styles.cuenta}>
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
  emailexist: { color: "black" },
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
    backgroundColor: "#F4EDE9",
  },
});
