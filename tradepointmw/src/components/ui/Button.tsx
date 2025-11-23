import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress, style }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({ btn: { backgroundColor: '#007aff', padding: 12, borderRadius: 8, alignItems: 'center' }, text: { color: '#fff', fontWeight: '600' } });
