import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';

export interface DateTimePickerProps {
  mode?: "date" | "time" | "datetime" | "countdown" | undefined;
}
export const GenderList =[
  {label:"M",value:"m"},
  {label:"F",value:"f"}
]
export const PriorityList = [
  { label: "Bajo", value: "bajo" },
  { label: "Medio", value: "medio" },
  { label: "Alto", value: "alto" },
];

export const categorias = [
  {
    label: 'Trabajo',
    value: 'trabajo'
  },
  {
    label: 'Estudio', 
    value: 'estudio'
  },
  {
    label: 'Ejercicio',
    value: 'ejercicio'
  },
  {
    label: 'Cita',
    value: 'cita' 
  },
  {
    label: 'Entretenimiento',
    value: 'entretenimiento'
  }
]


interface SelectPickerProps {
  items: Array<{ label: string, value: string }>;
  value: string;
  onValueChange: (value: string) => void; 
}

const SelectPicker: React.FC<SelectPickerProps> = ({ items, value, onValueChange }) => {
  return (
    <View style={styles.pickerContainer} >
      <RNPickerSelect
        onValueChange={(value)=>onValueChange(value)}
        items={items}
        value={value || ''}
        placeholder={{}}
        />
    </View>
  )
}

export default SelectPicker

const styles = StyleSheet.create({
  pickerContainer:{ fontSize:15,width:'auto',marginVertical:10}
})
