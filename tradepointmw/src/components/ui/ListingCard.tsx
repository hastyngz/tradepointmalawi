import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ListingCard({ item, onPress }: any) {
  return (
    <TouchableOpacity onPress={() => onPress?.(item)} style={styles.card} activeOpacity={0.8}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : <View style={styles.placeholder} />}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
        {item.price ? <Text style={styles.price}>MK {item.price}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 12, alignItems: 'center', backgroundColor: '#fff' },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  placeholder: { width: 80, height: 80, borderRadius: 8, marginRight: 12, backgroundColor: '#f0f0f0' },
  content: { flex: 1 },
  title: { fontWeight: '700', marginBottom: 4 },
  description: { color: '#444' },
  price: { marginTop: 6, color: '#228B22', fontWeight: '600' },
});
