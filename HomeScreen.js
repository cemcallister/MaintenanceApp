import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/ChessingtonLogo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Technical Services</Text>
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.rideBox}
          onPress={() => navigation.navigate('Vampire')}>
          <Text style={styles.rideText}>Vampire</Text>
        </TouchableOpacity>
        {/* Placeholder for other rides */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
