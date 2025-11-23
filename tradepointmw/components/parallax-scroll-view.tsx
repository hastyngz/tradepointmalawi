import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Props = {
  children?: React.ReactNode;
  headerImage?: React.ReactNode;
  headerBackgroundColor: { dark: string; light: string };
};

export default function ParallaxScrollView({ children, headerImage, headerBackgroundColor, }: Props) {
  const cs = useColorScheme();
  const colorScheme = cs === 'dark' ? 'dark' : 'light';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={[styles.header, { backgroundColor: headerBackgroundColor[colorScheme] }]}>
        {headerImage}
      </View>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { flexGrow: 1 },
  header: { height: 250, overflow: 'hidden' },
  content: { flex: 1, padding: 24 },
});
