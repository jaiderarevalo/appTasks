import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Slice'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import { themeDarkDefault, themelight } from '../../App';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useSelector((state: RootState) => state.tasks); // Cambié 'root' por 'state' para reflejar el nombre correcto del estado
  let colorScheme = useColorScheme();

  if (isDark) {
    colorScheme = 'dark';
  } else {
    colorScheme = 'light';
  }

  return (
    <PaperProvider theme={isDark ? themeDarkDefault : themelight}>
    {children}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThemeProvider;
