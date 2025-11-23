// screens/VideoCallScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VideoCallScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Call Feature Disabled</Text>
      <Text style={styles.subtitle}>
        WebRTC is removed to allow EAS build to complete.  
        You can add a different calling system later if needed.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
  }
});
