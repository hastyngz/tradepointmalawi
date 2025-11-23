import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function ListingDetail({ route }: any) {
  const item = route?.params?.item ?? null;

  if (!item) return (
    <View style={styles.center}><Text>No listing provided</Text></View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price ? `MK ${item.price}` : ''}</Text>
      <Text style={styles.description}>{item.description}</Text>
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
});
