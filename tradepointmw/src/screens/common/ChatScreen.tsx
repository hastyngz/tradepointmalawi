import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { subscribeToChatMessages, sendMessage } from '@/src/services/firebase';
import { useAuth } from '@/src/context/AuthContext';

export default function ChatScreen({ route }: any) {
  const { chatId } = route.params || {};
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!chatId) return;
    const unsub = subscribeToChatMessages(chatId, (msgs) => setMessages(msgs));
    return () => unsub();
  }, [chatId]);

  async function onSend() {
    if (!user || !text) return;
    await sendMessage(chatId, user.uid, text);
    setText('');
  }

  return (
    <View style={styles.container}>
      <FlatList data={messages} keyExtractor={(m) => m.id} renderItem={({ item }) => (
        <View style={styles.msg}>
          <Text style={{ fontWeight: item.from === user?.uid ? '700' : '400' }}>{item.text}</Text>
        </View>
      )} />
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Write a message" />
        <Button title="Send" onPress={onSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 12 }, msg: { padding: 8, borderRadius: 6, backgroundColor: '#f1f1f1', marginBottom: 6 }, inputRow: { flexDirection: 'row', alignItems: 'center' }, input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginRight: 8 } });
