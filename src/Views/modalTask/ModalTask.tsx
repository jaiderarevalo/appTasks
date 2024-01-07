import { StyleSheet, Text, View, Modal, Platform } from "react-native";
import React, { useState, FC, useEffect } from "react";
import { format } from "date-fns";
import * as Notifications from "expo-notifications";
import { AddTasksModalProps, tasksModel } from "../../Types/types";
import { Button, Input, Switch } from "@rneui/themed";
import Form from "../../components/form/Form";
import * as Yup from "yup";
import { useFormik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RootState, useAppDispatch } from "../../Store/Slice";
import {
  createTasks,
  getTasks,
  updateOneTask,
} from "../../Store/actions/tasks.action";
import SelectPicker, {
  DateTimePickerProps,
  PriorityList,
  categorias,
} from "../../components/select/Select";
import moment from "moment";
import { createAlarm } from "../../utils/CreateAlarm.utils";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { useSelector } from "react-redux";
import { statusModal, updateTask } from "../../Store/Slice/reducer/tasks.slice";
import { formatDate, formatHour } from "../../helper/helpers";

const initialValues = {
  name: "",
  description: "",
  status: true,
  priority: "medio",
  category: "entretenimiento",
  dateTimeReminder: formatDate,
  time: formatHour,
};

const ModalTask: FC<AddTasksModalProps> = ({ onClose }) => {
  const [form, setForm] = useState(initialValues);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<DateTimePickerProps["mode"]>("time");
  const [oneTask, setOneTask] = useState<tasksModel>();
  const [show, setShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [fecha, setFecha] = useState(formatDate);
  const [hora, setHora] = useState(formatHour);

  const { isVisible, isEdit, task, tasks } = useSelector(
    (root: RootState) => root.tasks
  );
  const { user } = useSelector((root: RootState) => root.auth);
  const dispatch = useAppDispatch();
  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const fDate = format(tempDate, "yyyy-MM-dd");
    const fTime = format(tempDate, "HH:mm");

    setFecha(fDate);
    setHora(fTime);

    setFieldValue("dateTimeReminder", fDate);
    setFieldValue("time", fTime);
  };

  const showMode = (currentDate: DateTimePickerProps["mode"]) => {
    setShow(true);
    setMode(currentDate);
  };

  const toggleSwitch = () => {
    setIsEnabled((prevValue) => !prevValue);
    setFieldValue("status", !isEnabled);
  };

  const onSubmit = async (data: any) => {
    try {
      if (isEdit) {
        const id = task?.id?.toString();
        const datasUpdate: updateTask = {
          id,
          ...data,
        };
        try {
          const response = await dispatch(updateOneTask(datasUpdate));
          if (response.meta.requestStatus === "fulfilled") {
            const cancel = createAlarm({
              message: "Tarea Actualizada",
              type: "success",
              duration: 4000,
            });
            cancel();
            onClose();
          }
          if (response.payload === "No has actualizado ningun campo") {
            const cancel = createAlarm({
              message: "No se vieron cambios",
              type: "danger",
              duration: 4000,
            });
            cancel();
          }
        } catch (error) {
          if (error === 400) {
            const cancel = createAlarm({
              message: "No se ah podido actualizar",
              type: "danger",
              duration: 4000,
            });
            cancel();
          }
        }
      } else {
        const fecha = data.dateTimeReminder;
        const hora = data.time;
        const momentFecha = moment(fecha);
        const momentHora = moment(hora, "HH:mm:ss");

        const nuevaFechaHora = momentFecha.set({
          hour: momentHora.get("hour"),
          minute: momentHora.get("minute"),
          second: momentHora.get("second"),
        });

        const idNotification = await Notifications.scheduleNotificationAsync({
          content: {
            title: data.name,
            body: `Tarea ${data.name} debe realizarse!`,
          },
          trigger: {
            seconds: nuevaFechaHora.diff(moment(), "seconds"),
            channelId: "idNotification",
          },
        });
        const res = await dispatch(
          createTasks({
            ...data,
            idNotification,
          })
        );
        if (res.meta.requestStatus === "rejected") {
          const cancel = createAlarm({
            message: "Su sesión ha espirado ",
            type: "info",
            duration: 4000,
          });
          cancel();
          onClose();
        }
        if (res.meta.requestStatus === "fulfilled") {
          const cancel = createAlarm({
            message: "Alarma creada",
            type: "success",
            duration: 4000,
          });
          cancel();
          onClose();
          resetForm();
        }
      }
    } catch (error) {
      console.log("Error", `${error}`);
    }
  };
  const schemaValidate = Yup.object({
    name: Yup.string().required("es requerido el campo"),
    description: Yup.string().required("es requerido el campo"),
    dateTimeReminder: Yup.string().required("es requerido el campo"),
    priority: Yup.string().required("es requerido el campo"),
    category: Yup.string().required("es requerido el campo"),
  });

  useEffect(() => {
    if (isEdit && task) {
      const fieldsToUpdate = {
        name: task.name || "",
        description: task.description || "",
        dateTimeReminder: moment(task.dateTimeReminder).format("YYYY-MM-DD"),
        time: moment(
          moment().startOf("day").format("YYYY-MM-DD") + " " + task.time
        ).format("h:mm "),
        status: task.status,
        priority: task.priority,
        category: task.category,
      };

      Object.entries(fieldsToUpdate).forEach(([fieldName, fieldValue]) => {
        setFieldValue(fieldName, fieldValue);
      });
    }
  }, [isEdit, task]);
  const {
    resetForm,
    setFieldValue,
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: isEdit ? "" : schemaValidate,
    enableReinitialize: true,
  });

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => dispatch(statusModal(false))}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <Button
          icon={
            <Icon
              as={Ionicons}
              name="close-circle-outline"
              size="4xl"
              color={"#fff"}
            />
          }
          onPress={() => {
            dispatch(statusModal(false));
            resetForm();
          }}
          type="clear"
        />
        <View style={styles.containerForm}>
          <Text>Nombre</Text>
          <Form
            onChangeText={handleChange("name")}
            value={values.name}
            error={errors.name}
            placeholder="Nombre"
          />
          <Text>Descripción</Text>
          <Form
            onChangeText={handleChange("description")}
            value={values.description}
            error={errors.description}
            placeholder="descripción"
          />
          <Text>Prioridad</Text>
          <SelectPicker
            key={"priority"} // key fija única
            items={PriorityList}
            onValueChange={(value) => setFieldValue("priority", value)}
            value={values.priority} // valor por defecto
          />
          <Text>Categoria</Text>
          <SelectPicker
            key={"category"}
            items={categorias}
            onValueChange={(value) => setFieldValue("category", value)}
            value={values.category}
          />
          <View style={styles.calendarContainer}>
            <View style={styles.dateTimeStyle}>
              <Text>Fecha</Text>
              <Text style={styles.dateTime} onPress={() => showMode("date")}>
                {values.dateTimeReminder}
              </Text>
            </View>
            <Button onPress={() => showMode("date")} type="clear">
              <Icon
                as={Ionicons}
                name="calendar-outline"
                size="xl"
                color={"#000"}
              />
            </Button>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="inline"
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.calendarContainer}>
            <View style={styles.dateTimeStyle}>
              <Text>Hora</Text>
              <Text style={styles.dateTime} onPress={() => showMode("time")}>
                {moment(values.time, "HH:mm").format("h:mm A")}
              </Text>
            </View>
            <Button onPress={() => showMode("time")} type="clear">
              <Icon
                as={Ionicons}
                name="time-outline"
                size="xl"
                color={"#000"}
              />
            </Button>
          </View>

          <View style={styles.switch}>
            <Text>Estado de Alarma</Text>
            <Switch
              trackColor={{ false: "#767577", true: "green" }}
              thumbColor={isEnabled ? "#2980b9" : "#f4f3f4"}
              value={values.status}
              onValueChange={() => toggleSwitch()}
            />
            <Text>
              {isEnabled ? (
                <Text style={{ color: "green", fontSize: 16 }}>Habilitada</Text>
              ) : (
                <Text style={{ color: "red", fontSize: 16 }}>Inhabilitada</Text>
              )}
            </Text>
          </View>
          <Button
            title={isEdit ? "Actualizar" : "Guardar"}
            style={styles.buttonSave}
            disabled={
              values.name.trim() === "" ||
              values.description.trim() === "" ||
              values.dateTimeReminder.toString() === ""
            }
            disabledStyle={styles.disable}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalTask;

const styles = StyleSheet.create({
  switch: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginVertical: 10,
    fontSize: 10,
  },
  dateTime: {
    fontSize: 20,
    paddingLeft: 10,
    paddingVertical: 5,
    fontWeight: "600",
  },
  disable: { backgroundColor: "grey" },
  buttonSave: { backgroundColor: "blue", paddingTop: 20 },
  dateTimeStyle: { flex: 1 },
  calendarContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  containerForm: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    shadowColor: "#000",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
