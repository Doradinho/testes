import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
let count = 0;

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const intervalId = setInterval(async () => {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          count++;
          console.log(`${count}: Lat: ${location.coords.latitude}; Log: ${location.coords.longitude}`);          
        }, 1000); // Atualiza a localização a cada 1 segundos

        return () => {
          clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
        };
      } catch (error) {
        console.error('Erro ao obter a localização:', error);
      }
    };

    getLocation();    
  }, [text]);

  let text = 'Aguardando...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {    
    text = `${count} ${JSON.stringify(location)}`;
  }

  return (
    <View style={styles.countainer}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  countainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});