import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { useAuth } from '@/src/context/AuthContext';

export default function ChatList({ navigation }: any) {
  const { user } = useAuth();
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const q = query(collection(db, 'chats'), where('participants', 'array-contains', user.uid));
      const snap = await getDocs(q);
      const items: any[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      setChats(items);
    })();
  }, [user]);

  return (
    <View style={styles.container}>
      <FlatList data={chats} keyExtractor={(i) => i.id} renderItem={({ item }) => (
        <View style={styles.row}>
          <Text>{item.id}</Text>
          <Button title="Open" onPress={() => navigation.navigate('Chat', { chatId: item.id })} />
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, row: { padding: 12, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } });
