import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';

export default function SignupScreen({ navigation }: any) {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);

  async function onSignup() {
    try {
      setLoading(true);
      await signup(email, password, role);
    } catch (e) {
      console.warn(e);
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Button title={role === 'user' ? 'Role: User' : 'Switch to User'} onPress={() => setRole('user')} />
        <Button title={role === 'trader' ? 'Role: Trader' : 'Switch to Trader'} onPress={() => setRole('trader')} />
      </View>
      <Button title={loading ? 'Creating...' : 'Create Account'} onPress={onSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#fafafa' },
  title: { fontSize: 22, marginBottom: 16, textAlign: 'center' as const },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8, backgroundColor: '#fff' },
});
