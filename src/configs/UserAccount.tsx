import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderButton from "../HeaderButton";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Store/Slice";
import { Button, Input } from "@rneui/themed";
import { useFormik } from "formik";
import Form from "../components/form/Form";
import SelectPicker, { GenderList } from "../components/select/Select";
import { RootStackParams, UpdateUser } from "../Types/types";
import { updateUser } from "../Store/actions/auth.actions";
import { createAlarm } from "../utils/message.utils";
import * as Yup from "yup";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const UserAccount = () => {
  const { user } = useSelector((root: RootState) => root.auth);
  const initialValues = {
    name: user?.name,
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
  const dispatch = useAppDispatch();
  const { navigate } =
    useNavigation<StackNavigationProp<RootStackParams, "Home">>();

  const onSubmit = async (data: UpdateUser) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        const cancel = createAlarm({
          message: "Las contraseñas no coinciden",
          type: "danger",
          duration: 4000,
          Icons: "checkmark-outline",
        });
        cancel();
      }

      const res = await dispatch(updateUser(data));
    
      if (res.payload === "No has cambiado ningun campo") {
        const cancel = createAlarm({
          message: "No has cambiado ningun campo",
          type: "danger",
          duration: 8000,
          Icons: "checkmark-outline",
        });
        cancel();
      }
      if (res.payload === "llenar nueva contraseña") {
        const cancel = createAlarm({
          message: "Requerida nueva contraseña",
          type: "danger",
          duration: 8000,
          Icons: "checkmark-outline",
        });
        cancel();
      }
      if (res.payload === "Contraseña inválida") {
        const cancel = createAlarm({
          message: "Contraseña actual Incorrecta",
          type: "danger",
          duration: 4000,
          Icons: "checkmark-outline",
        });
        cancel();
        resetForm();
      }
      if (res.meta.requestStatus === "fulfilled") {
        const cancel = createAlarm({
          message: "Usuario Actualizado",
          type: "sucess",
          duration: 4000,
          Icons: "checkmark-outline",
        });
        navigate("Task");
        cancel();
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    values,
    setFieldValue,
    handleSubmit,
    resetForm,
    errors,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <View>
      <HeaderButton />
      <View style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20, alignSelf: "center" }}>
            Actualización de datos
          </Text>
        </View>

        <View style={styles.containerButton}>
          <Text style={styles.title}>Nombre</Text>
          <Form
            name="name"
            textnames=""
            onChange={(name, text) => setFieldValue(name, text)}
            value={values.name as any}
            placeholder="nombre"
            error={errors.name}
          />
        </View>

        <View style={styles.containerButton}>
          <Text style={styles.title}>E-mail</Text>
          <Text style={{ padding: 10, fontSize: 18 }}>{user?.email}</Text>
        </View>

        <View style={styles.containerButton}>
          <Text style={styles.title}>Sexo</Text>
          <Text style={{ padding: 10, fontSize: 18 }}>{user?.gender}</Text>
        </View>
        <View style={styles.containerButton}>
          <Text style={styles.title}>Contraseña Actual</Text>
          <Form
            name="password"
            textnames=""
            onChange={(name, text) => setFieldValue(name, text)}
            value={values.password}
            placeholder="Contraseña Actual"
          />
          {errors && <Text>{errors.password}</Text>}
        </View>
        <View style={styles.containerButton}>
          <Text style={styles.title}>Nueva Contraseña</Text>
          <Form
            name="newPassword"
            textnames=""
            onChange={(name, text) => setFieldValue(name, text)}
            value={values.newPassword}
            placeholder="Nueva contraseña"
          />
        </View>
        <View style={styles.containerButton}>
          <Text style={styles.title}>Confirmar Contraseña</Text>
          <Form
            name="confirmPassword"
            textnames=""
            onChange={(name, text) => setFieldValue(name, text)}
            value={values.confirmPassword}
            placeholder="confirmar contraseña"
          />
        </View>

        {/* name: string;
  email: string;
  password: string;
  gender: string; */}
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Button
          buttonStyle={styles.boton}
          onPress={() => handleSubmit()}
          title="Actualizar"
          disabledStyle={styles.disableButton}
          disabledTitleStyle={styles.disabletitle}
        />
      </View>
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  containerButton: { paddingHorizontal: 10, width: 580 },
  container: {},
  boton: { paddingHorizontal: 20 },
  disableButton: { backgroundColor: "grey" },
  disabletitle: {},
  title: { paddingHorizontal: 10 },
});
