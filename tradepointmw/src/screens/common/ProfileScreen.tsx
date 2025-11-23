import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { updateUserProfile } from '@/src/services/firebase';

export default function ProfileScreen() {
  const { profile, user, refreshProfile } = useAuth();
  const [name, setName] = useState(profile?.name || '');

  async function onSave() {
    if (!user) return;
    await updateUserProfile(user.uid, { name });
    await refreshProfile();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <Button title="Save" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 20, marginBottom: 12 }, input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 12 }, });
