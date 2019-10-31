import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Subtitle({title}) {
  return (
    <View >
      <Text style={styles.subtitletext}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    subtitletext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#b23faa',
    },
  });
  