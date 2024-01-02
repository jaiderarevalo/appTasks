import { StyleSheet, View,Text } from "react-native";
import {Input } from "@rneui/themed";
import { Form as formTypes } from "../../Types/types";
 const Form = ({textnames,onChange,value,name,error,placeholder}:formTypes) => {

  const handleTextChange = (text:any) => {
    if (onChange) {
      onChange(name, text);  
    }
  };
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <Input 
          onChangeText={handleTextChange} 
          value={value}
          errorMessage={error}
          placeholder={placeholder}
        />
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.names} >{textnames}</Text>
        </View>
      </View>
    );
  };
  export default Form
  const styles = StyleSheet.create({
    names:{fontSize:18},
    container:{flexDirection:'row',alignItems:'center',marginBottom:10},
    inputContainer:{flex:2},
    legendContainer:{flex:1,alignItems:'center'}
  })