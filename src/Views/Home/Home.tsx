import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../Types/types";
const Home = () => {
  const { navigate } =
    useNavigation<StackNavigationProp<RootStackParams, "Home">>();
  const handleRegister = () => {
    navigate('Register')
  };
  const handleLogin = () => {
    navigate('Login')
  };
  return (
    <View style={styles.containerHome}>
      <ImageBackground
        source={require("../../Images/reloj.jpg")}
        style={styles.backImage}
      >
        <ScrollView>
          <View style={styles.Container}>
            <Text style={styles.bienvenidaText}>
              "Bienvenid@ a TD - Tu Asistente de Tareas Diarias"
            </Text>

            <Text style={styles.Introduccion}>
              ¡Bienvenido a TD, tu compañero confiable para la gestión efectiva
              de tareas diarias! ¿Estás listo para tomar el control de tu rutina
              y realizar tus tareas a tiempo? TD está aquí para ayudarte a
              lograrlo.
            </Text>
            <Text style={styles.titleBeneficios}>Beneficios Destacados:</Text>
            <Text style={styles.beneficios}>
              <Text style={styles.subtitulos}>
                Organiza Tus Tareas Fácilmente:
              </Text>
              Con TD, puedes crear, organizar y priorizar tus tareas diarias de
              manera rápida y sencilla.
            </Text>
            <Text style={styles.beneficios}>
              <Text style={styles.subtitulos}>
                Nunca Más Olvides una Tarea:
              </Text>
              Establece recordatorios y fechas de vencimiento para tus tareas
              importantes y recibe notificaciones oportunas.
            </Text>
            <Text style={styles.beneficios}>
              <Text style={styles.subtitulos}>Seguimiento de Tu Progreso:</Text>
              Visualiza tu avance y logros a medida que completas tus tareas,
              manteniéndote motivado.
            </Text>
            <Text style={styles.beneficios}>
              <Text style={styles.subtitulos}>Interfaz Intuitiva:</Text>Nuestra
              interfaz de usuario fácil de usar garantiza que puedas empezar a
              utilizar TD sin complicaciones.
            </Text>
            <Text style={styles.beneficios}>
              <Text style={styles.subtitulos}>Acceso en Cualquier Lugar:</Text>
              TD está disponible en iOS, Android y la web, permitiéndote acceder
              a tus tareas en cualquier momento y lugar.
            </Text>
          </View>
          <View>
            <Text style={styles.footherTitle}>
              Comienza a Transformar Tu Productividad:
            </Text>
            <Text style={styles.footherText}>
              No esperes más. Descarga TD ahora y comienza a simplificar tu vida
              diaria. Con TD a tu lado, estarás mejor preparado para enfrentar
              tus tareas y metas de manera eficiente.
            </Text>
          </View>
          <View style={styles.containerButton}>
            <View style={styles.containerRegister}>
              <Button
                onPress={() => handleLogin()}
                size={'lg'}
                marginX={5}
                backgroundColor={"amber.400"}
              >Login</Button>
            </View>
            <View style={styles.containerLogin}>
              <Button
                onPress={() => handleRegister()}
                size={'lg'}
                marginY={5}
                backgroundColor={"blue.400"}
                marginX={5}
              >Register</Button>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  titleRegister: { color: "#000" },
  titleLogin: { color: "#000" },
  containerRegister: { flex: 1 },
  containerLogin: { flex: 1 },
  containerButton: { flexDirection: "row", alignItems: "center" },
  buttonLogin: { backgroundColor: "#1976D2", margin: 20, borderRadius: 50 },
  buttonRegister: { backgroundColor: "#4CAF50", margin: 20, borderRadius: 50 },
  footherText: { fontSize: 14, paddingHorizontal: 20 },
  footherTitle: { fontSize: 17, paddingHorizontal: 20, fontWeight: "500" },
  beneficios: { paddingVertical: 5 },
  subtitulos: { fontSize: 17, fontWeight: "500" },
  titleBeneficios: { fontSize: 20, fontWeight: "700", marginVertical: 10 },
  Container: { paddingHorizontal: 20 },
  Introduccion: { fontWeight: "400", fontSize: 18 },
  backImage: { flex: 1 },
  containerHome: { flex: 1 },
  bienvenidaText: {
    paddingBottom: 15,
    textAlign: "center",
    fontSize: 25,
    paddingTop: 20,
    fontWeight: "bold",
  },
});
