// screens/IncomingCallScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { firestore } from '../config/firebaseConfig'; // ✅ use Firebase JS SDK
import { doc, onSnapshot } from 'firebase/firestore';

export default function IncomingCallScreen({ navigation }) {
  const [call, setCall] = useState(null);

  useEffect(() => {
    // Example listener for an incoming call document
    const callDoc = doc(firestore, 'calls', 'incoming');
    const unsubscribe = onSnapshot(callDoc, (snapshot) => {
      if (snapshot.exists()) {
        setCall(snapshot.data());
      } else {
        setCall(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.png')} style={styles.image} />
      <Text style={styles.title}>Incoming Call</Text>
      {call ? (
        <>
          <Text style={styles.text}>Caller: {call.callerName}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Accept" onPress={() => navigation.navigate('CallScreen')} />
            <Button title="Reject" onPress={() => navigation.goBack()} color="red" />
          </View>
        </>
      ) : (
        <Text style={styles.text}>Waiting for call...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  image: { width: 100, height: 100, marginBottom: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { color: '#ccc', fontSize: 18, marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', gap: 20 },
});
