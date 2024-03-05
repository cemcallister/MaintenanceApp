// App.js
import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VampireScreen from './screens/VampireScreen'; // Import VampireScreen
import AnnualScreen from './screens/AnnualScreen'; // Ensure this import is correct

// Define the HomeScreen component
function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./assets/ChessingtonLogo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Technical Services</Text>
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.rideBox}
          onPress={() => navigation.navigate('Vampire')}>
          <Text style={styles.rideText}>Vampire</Text>
        </TouchableOpacity>
        {/* Placeholder for other rides */}
        <View style={styles.rideBox}><Text style={styles.rideText}>Kobra</Text></View>
        <View style={styles.rideBox}><Text style={styles.rideText}>Croc Drop</Text></View>
        <View style={styles.rideBox}><Text style={styles.rideText}>Dragons Fury</Text></View>
        <View style={styles.rideBox}><Text style={styles.rideText}>Mandrill Mayhem</Text></View>
        <View style={styles.rideBox}><Text style={styles.rideText}>Ride 6</Text></View>
        <View style={styles.rideBox}><Text style={styles.rideText}>Ride 7</Text></View>
        <View style={styles.rideBox}><Text style={styles.rideText}>Ride 8</Text></View>
        <View style={styles.rideBox}><Text style={styles.rideText}>Ride N</Text></View>
        {/* Add more placeholders as needed */}
      </View>
    </ScrollView>
  );
}

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Main App component with navigation container
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Vampire" component={VampireScreen} options={{ title: 'Vampire Ride Details' }} />
        <Stack.Screen name="Annual" component={AnnualScreen} options={{ title: 'Annual Maintenance Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  rideBox: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  rideText: {
    fontSize: 24,
    textAlign: 'center',
  },
});
