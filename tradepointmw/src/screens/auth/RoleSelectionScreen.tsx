import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RoleSelectionScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your role</Text>
      <Button title="User (browse listings)" onPress={() => navigation.replace('Signup', { role: 'user' })} />
      <View style={{ height: 12 }} />
      <Button title="Trader (create listings)" onPress={() => navigation.replace('Signup', { role: 'trader' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 16 },
});
