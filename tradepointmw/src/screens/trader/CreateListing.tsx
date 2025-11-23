import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { createListing, uploadImage } from '@/src/services/firebase';
import * as ImagePicker from 'expo-image-picker';

export default function CreateListing({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  async function pickImage() {
    const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!r.cancelled) setImageUri(r.uri ?? null);
  }

  async function onCreate() {
    const data: any = { title, description, price: Number(price) };
    if (imageUri) {
      // upload image as blob
      const resp = await fetch(imageUri);
      const blob = await resp.blob();
      const path = `listings/${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const url = await uploadImage(blob as any, path);
      data.image = url;
    }
    await createListing(data);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Listing</Text>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <Button title="Pick Image" onPress={pickImage} />
      {imageUri ? <Image source={{ uri: imageUri }} style={{ width: 120, height: 120, marginTop: 8 }} /> : null}
      <View style={{ height: 12 }} />
      <Button title="Create" onPress={onCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 12 },
});
