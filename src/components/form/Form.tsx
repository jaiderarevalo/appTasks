import { StyleSheet, View, Text } from "react-native";
import { Input } from "@rneui/themed";
import { Form as formTypes } from "../../Types/types";
import { TextInput } from "react-native-paper";
import { useState } from "react";
type CustomInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: any;
  label?:string
};
const Form = ({
  onChangeText,
  value,
  secureTextEntry,
  placeholder,
  error,
  label
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label={label}
          onChangeText={onChangeText}
          value={value}
          error={error}
          placeholder={placeholder}
          secureTextEntry={!showPassword && secureTextEntry}
          right={
            secureTextEntry ? (
              <TextInput.Icon
                color={"rgba(0,0,255,1)"}
                icon={showPassword ? "eye" : "eye-off"}
                onPress={togglePasswordVisibility}
              />
            ) : null
          }
        />
      </View>
      <View style={styles.legendContainer}>
        {/* <Text style={styles.names}>{textnames}</Text> */}
      </View>
    </View>
  );
};
export default Form;
const styles = StyleSheet.create({
  names: { fontSize: 18 },
  container: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  inputContainer: { width:"100%" },
  legendContainer: { flex: 1, alignItems: "center" },
});
