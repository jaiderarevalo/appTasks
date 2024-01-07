import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderButton from "../HeaderButton";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Store/Slice";
import { Button, Input } from "@rneui/themed";
import { useFormik } from "formik";
import Form from "../components/form/Form";
import SelectPicker, { GenderList } from "../components/select/Select";
import { RootStackParams, UpdateUser } from "../Types/types";
import { updateUser } from "../Store/actions/auth.actions";
import { createAlarm } from "../utils/CreateAlarm.utils";
import * as Yup from "yup";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import ImageAvatar from "../components/Image";

const UserAccount = () => {
  const { user } = useSelector((root: RootState) => root.auth);

  const initialValues = {
    name: user?.name || "",
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
        });
        cancel();
      }

      const res = await dispatch(updateUser(data));

      if (res.payload === "No has cambiado ningun campo") {
        const cancel = createAlarm({
          message: "No has cambiado ningun campo",
          type: "danger",
          duration: 8000,
        });
        cancel();
      }
      if (res.payload === "llenar nueva contraseña") {
        const cancel = createAlarm({
          message: "Requerida nueva contraseña",
          type: "danger",
          duration: 8000,
        });
        cancel();
      }
      if (res.payload === "Contraseña inválida") {
        const cancel = createAlarm({
          message: "Contraseña actual Incorrecta",
          type: "danger",
          duration: 4000,
        });
        cancel();
        resetForm();
      }
      if (res.meta.requestStatus === "fulfilled") {
        const cancel = createAlarm({
          message: "Usuario Actualizado",
          type: "success",
          duration: 4000,
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
    handleChange,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <View>
      <HeaderButton />
      <View style={styles.container}>
        <View style={styles.image}>
          <ImageAvatar avatarUrl={require("../Images/user.png")} size={80} />
        </View>

        <View style={styles.containerButton}>
          <Form
            label="Nombre"
            onChangeText={handleChange("name")}
            value={values.name}
            error={errors.name}
            placeholder="Nombre"
          />
        </View>
        <View style={styles.containerButton}>
          <Text style={styles.title}>E-mail</Text>
          <Text style={styles.datas}>{user?.email}</Text>
        </View>

        <View style={styles.containerButton}>
          <Text style={styles.title}>Sexo</Text>
          <Text style={styles.datas}>{user?.gender}</Text>
        </View>

        <View style={styles.containerButton}>
          <Form
            label="Contraseña actual"
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="************"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.containerButton}>
          <Form
            onChangeText={handleChange("newPassword")}
            value={values.newPassword}
            placeholder="Nueva Contraseña"
            label="Nueva contraseña"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.containerButton}>
          <Form
            onChangeText={handleChange("confirmPassword")}
            value={values.confirmPassword}
            placeholder="Confirmar Contraseña"
            label="Confirmación contraseña"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Button
          buttonStyle={styles.boton}
          onPress={() => handleSubmit()}
          title="Actualizar"
        />
      </View>
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  datas:{ padding: 10, fontSize: 18 },
  image: { alignItems: "center", paddingVertical: 15 },
  containerButton: { paddingHorizontal: 10, paddingBottom:5 },
  container: {},
  boton: { paddingHorizontal: 20 },
  disableButton: { backgroundColor: "grey" },
  title: { paddingHorizontal: 10 },
});
