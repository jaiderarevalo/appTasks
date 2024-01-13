import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Slice";
import { useTheme } from "react-native-paper";

export interface DateTimePickerProps {
  mode?: "date" | "time" | "datetime" | "countdown" | undefined;
}
export const GenderList = [
  { label: "M", value: "m" },
  { label: "F", value: "f" },
];
export const PriorityList = [
  { label: "Bajo", value: "bajo" },
  { label: "Medio", value: "medio" },
  { label: "Alto", value: "alto" },
];

export const categorias = [
  {
    label: "Trabajo",
    value: "trabajo",
  },
  {
    label: "Estudio",
    value: "estudio",
  },
  {
    label: "Ejercicio",
    value: "ejercicio",
  },
  {
    label: "Cita",
    value: "cita",
  },
  {
    label: "Entretenimiento",
    value: "entretenimiento",
  },
];

interface SelectPickerProps {
  items: Array<{ label: string; value: string }>;
  value: string;
  onValueChange: (value: string) => void;
}

const SelectPicker: React.FC<SelectPickerProps> = ({
  items,
  value,
  onValueChange,
}) => {
  const { isDark } = useSelector((root: RootState) => root.tasks);
  const theme = useTheme();
  return (
    <View style={{ width: "auto", marginVertical: 10 }}>
      <RNPickerSelect
      textInputProps={{selectionColor:theme.colors.primary}}
        onValueChange={(value) => onValueChange(value)}
        items={items}
        value={value || ""}
      />
    </View>
  );
};

export default SelectPicker;

const styles = StyleSheet.create({
  pickerContainer: {},
});
