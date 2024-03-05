// screens/VampireScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function VampireScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vampire</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>AM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Annual')}>
          <Text style={styles.buttonText}>Annual</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: '50%', // 50% of vertical space
    justifyContent: 'space-around', // Evenly space buttons vertically
    width: '100%', // Use full width for container to centralize children
    alignItems: 'center', // Center buttons horizontally
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: width * 0.75, // 75% of screen width
    paddingVertical: 30, // Adjust based on your preference
    paddingHorizontal: 20, // Adjust based on your preference
    backgroundColor: '#ddd',
    borderRadius: 5,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    fontSize: 30,
  },
});
