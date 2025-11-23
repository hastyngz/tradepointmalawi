import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TraderHome({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trader Dashboard</Text>
      <Button title="Create Listing" onPress={() => navigation.navigate('CreateListing')} />
      <View style={{ height: 12 }} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 20, marginBottom: 12 } });
