import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { getOrCreateChat } from '@/src/services/firebase';
import { useAuth } from '@/src/context/AuthContext';

export default function ListingDetail({ route, navigation }: any) {
  const item = route?.params?.item ?? null;
  const { user } = useAuth();

  if (!item) return (
    <View style={styles.center}><Text>No listing provided</Text></View>
  );

  async function onStartChat() {
    if (!user) return navigation.navigate('Login');
    if (!item.ownerId) return Alert.alert('No owner', 'This listing has no owner information.');
    try {
      const chatId = await getOrCreateChat([user.uid, item.ownerId]);
      navigation.navigate('Chat', { chatId });
    } catch (e) {
      console.warn(e);
      Alert.alert('Error', 'Could not start chat.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price ? `MK ${item.price}` : ''}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.actions}>
        <Button title="Start Chat" onPress={onStartChat} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 240, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  price: { fontSize: 16, color: '#228B22', marginBottom: 12 },
  description: { fontSize: 14, lineHeight: 20 },
  actions: { marginTop: 16 },
});
