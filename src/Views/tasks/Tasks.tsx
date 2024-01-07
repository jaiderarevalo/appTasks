import { Text, View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../Store/Slice";
import { setLogout } from "../../Store/Slice/reducer/auth.slice";
import { Button, Icon, Switch } from "@rneui/themed";
import ModalTask from "../modalTask";
import {
  deleteTasks,
  getOneTask,
  getTasks,
  updateOneTask,
} from "../../Store/actions/tasks.action";
import { useSelector } from "react-redux";
import { tasksModel } from "../../Types/types";
import moment from "moment";
import * as Notifications from "expo-notifications";
import { createAlarm } from "../../utils/CreateAlarm.utils";
import { isEditing, statusModal } from "../../Store/Slice/reducer/tasks.slice";
import { formatearFecha, formatearHora } from "../../helper/helpers";
import ButtonActions from "../../components/Button/ButtonActions";
import ButtonR from "../../components/Button/Button";
import IconButtonR from "../../components/Button/ButtonIcon";

const Tasks = () => {
  const { tasks } = useSelector((root: RootState) => root.tasks);
  const { user } = useSelector((root: RootState) => root.auth);

  const [cargando, setCargando] = useState(false);
  const [tasksDatas, setTasksDatas] = useState<tasksModel[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkAndSendNotifications = async () => {
      // Filtrar tareas con fecha cumplida
      const tasksToNotify = tasksDatas.filter((task) => {
        const taskDate = new Date(task.dateTimeReminder);
        return taskDate <= new Date();
      });
      // Enviar notificación por cada una
      tasksToNotify.forEach(async (task) => {
        const fecha = task.dateTimeReminder;
        const hora = task.time;
        const momentFecha = moment(fecha);
        const momentHora = moment(hora, "HH:mm:ss");

        const nuevaFechaHora = momentFecha.set({
          hour: momentHora.get("hour"),
          minute: momentHora.get("minute"),
          second: momentHora.get("second"),
        });
        // Schedule notification
        const notificationId: any =
          await Notifications.scheduleNotificationAsync({
            content: {
              title: task.name,
              body: `Tarea ${task.name} debe realizarse!`,
            },
            trigger: {
              seconds: nuevaFechaHora.diff(moment(), "seconds"),
              channelId: "make-task",
            },
          });
      });
    };
  }, [tasksDatas]);

  const handleLogout = () => {
    dispatch(setLogout());
  };
  const handleModalClose = async () => {
    dispatch(statusModal(false));
    await dispatch(getTasks(user?.id as any));
  };
  useEffect(() => {
    // Manejar la carga inicial y forzar la recarga manual si es necesario
    const DatasTask = async () => {
      if (!tasks) {
        await dispatch(getTasks(user?.id as any));
        return;
      } else {
        // Ordenar tareas por fecha y hora
        const sortedTasks = [...tasks].sort((a, b) => {
          const dateA = new Date(a.dateTimeReminder).getTime();
          const dateB = new Date(b.dateTimeReminder).getTime();
          return dateA - dateB;
        });

        const tasksWithSwitchState = sortedTasks.map((task) => ({
          ...task, // Inicializar el estado del interruptor en falso
        }));

        setTasksDatas(tasksWithSwitchState);
        const selectedTask = tasksDatas.find(
          (task) => task.id === selectedTaskId
        );
        if (selectedTask) {
          setStatus(selectedTask.status);
        }
      }
    };
    DatasTask();
  }, [dispatch, tasks]);

  // botones de ACTIONS remove etc////////////////
  // Manejar el evento de toque en una tarea
  const handleTaskPress = (taskId: string | null) => {
    if (taskId) {
      setSelectedTaskId(taskId);
      const timeoutId = setTimeout(() => {
        setSelectedTaskId(null);
      }, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  };

  const handleDelete = async (id: string) => {
    const remove = await dispatch(deleteTasks(id));
    if (remove.meta.requestStatus === "fulfilled") {
      const cancel = createAlarm({
        message: "Tarea eliminada Exitosamente",
        type: "info",
        duration: 4000,
      });
      cancel();
    }
    if (remove.meta.requestStatus === "rejected") {
      const cancel = createAlarm({
        message: "No se ha podido  eliminar la tarea ",
        type: "danger",
        duration: 4000,
      });
      cancel();
    }
  };

  const handleEdit = (id: string) => {
    dispatch(getOneTask(id));
    dispatch(statusModal(true));
    dispatch(isEditing(true));
  };

  const handleSubmit = async (id: any, status: boolean) => {
    try {
      const datas = { id, status: status };
      const res = await dispatch(updateOneTask(datas as any));
      if (res.meta.requestStatus === "fulfilled") {
        await dispatch(getTasks(user?.id as any));
      }
    } catch (error) {
      console.log("el error es", error);
    }
  };

  return (
    <View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>
          {user?.gender === "M" ? (
            <Text>Hola Bienvenido:</Text>
          ) : (
            <Text>Hola Bienvenida:</Text>
          )}
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
            marginLeft: 10,
            color: "#1E90FF",
          }}
        >
          {user?.name.toLocaleUpperCase()}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.crearContainer}>
          <ButtonR
            onPress={() => {
              dispatch(statusModal(true));
              dispatch(isEditing(false));
            }}
            icon="pencil-plus"
            TextButton="Crear Tarea"
            borderRadius={100}
            buttonColor="blue"
            mode="contained"
            textColor="#fff"
          />
        </View>
        <View style={styles.logoutContainer}>
          <ModalTask onClose={handleModalClose} />
        </View>
        <View></View>
      </View>
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tus Tareas</Text>
        </View>
        <View>
          {tasksDatas && tasksDatas.length === 0 && (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                No tienes tareas...
              </Text>
            </View>
          )}
        </View>

        <View>
          {tasksDatas ? (
            <View style={styles.containerTask}>
              {tasksDatas.map((task) => (
                <View
                  style={styles.oneTask}
                  onTouchStart={() => handleTaskPress(task.id as string)}
                  key={task.id}
                >
                  <View style={styles.nameStatus}>
                    <View>
                      <Text style={styles.title}>Nombre</Text>
                      <Text>{task.name}</Text>
                    </View>
                    <View></View>
                    <View style={styles.status}>
                      <Switch
                        trackColor={{ false: "#767577", true: "#3498db" }}
                        thumbColor={task?.status ? "#2980b9" : "#f4f3f4"}
                        value={task.status}
                        onValueChange={(value) => {
                          setTasksDatas((prevTasks) =>
                            prevTasks.map((prevTask) =>
                              prevTask.id === task?.id
                                ? { ...prevTask, status: value }
                                : prevTask
                            )
                          );
                          handleSubmit(task?.id as any, value);
                        }}
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.title}>Descripción</Text>
                    <Text>{task.description}</Text>
                  </View>
                  <View>
                    <Text style={styles.title}>Prioridad</Text>
                    <Text>{task.priority.toUpperCase()}</Text>
                  </View>
                  <View>
                    <Text style={styles.title}>Categoria</Text>
                    <Text>{task.category.toUpperCase()}</Text>
                  </View>
                  <View>
                    <Text style={styles.title}>Fecha</Text>
                    <Text>
                      {formatearFecha(task.dateTimeReminder.toUpperCase())}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <View>
                        <Text style={styles.title}>Hora</Text>
                        <Text>{formatearHora(task.time.toUpperCase())}</Text>
                      </View>
                    </View>
                    {selectedTaskId === task.id && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                          flex: 1,
                        }}
                      >
                        <ButtonActions
                          isEdit
                          onPress={() => {
                            dispatch(isEditing(true));
                            handleEdit(task.id as string);
                            dispatch(statusModal(true));
                          }}
                        />
                        <ButtonActions
                          onPress={() => {
                            handleDelete(task.id as string);
                            dispatch(isEditing(false));
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Cargando tareas...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 15, fontWeight: "bold" },
  status: { flex: 1, alignItems: "flex-end" },
  nameStatus: { flexDirection: "row" },
  oneTask: {
    marginBottom: 20,
    borderColor: "gray",
    padding: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 20,
    gap: 10,
  },
  containerTask: { marginHorizontal: 20, marginVertical: 10 },
  buttonContainer: {
    flexDirection: "row",
  },
  crearContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
  },
  buttonCrear: { backgroundColor: "#007BFF", borderRadius: 20 },
  icon: { paddingHorizontal: 5 },
});

export default Tasks;
