import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ListingCard({ item, onPress }: any) {
  return (
    <TouchableOpacity onPress={() => onPress?.(item)} style={styles.card}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({ card: { flexDirection: 'row', gap: 12, padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8, alignItems: 'center' }, image: { width: 80, height: 80, borderRadius: 8 }, title: { fontWeight: '700' } });
