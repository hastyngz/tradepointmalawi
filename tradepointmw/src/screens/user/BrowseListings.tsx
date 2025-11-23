import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { fetchListings } from '@/src/services/firebase';
import ListingCard from '@/src/components/ui/ListingCard';

export default function BrowseListings({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchListings({ search: query }).then((res) => {
      if (mounted) setListings(res);
    });
    return () => {
      mounted = false;
    };
  }, [query]);

  function onPressItem(item: any) {
    navigation.navigate('ListingDetail', { item });
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Search" value={query} onChangeText={setQuery} />
      <FlatList
        data={listings}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <ListingCard item={item} onPress={onPressItem} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  search: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 12 },
  card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8 },
  title: { fontWeight: '600' },
});
