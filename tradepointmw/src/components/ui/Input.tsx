import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function Input(props: any) {
  return <TextInput {...props} style={[styles.input, props.style]} />;
}

const styles = StyleSheet.create({ input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6 } });
