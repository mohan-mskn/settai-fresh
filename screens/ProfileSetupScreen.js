// screens/ProfileSetupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { firestore, auth } from '../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function ProfileSetupScreen({ navigation }) {
  const [name, setName] = useState('');
  const user = auth.currentUser;

  const save = async () => {
    try {
      if (user) {
        await setDoc(doc(firestore, 'users', user.uid), { name, phone: user.phoneNumber });
      }
      navigation.replace('Main'); // go to tabs
    } catch (e) {
      alert('Error saving profile');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.png')} style={{width:120,height:120,borderRadius:60,marginBottom:16}} />
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" />
      <Button title="Continue" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  input:{width:'100%',borderWidth:1,padding:12,borderRadius:8,marginVertical:12}
});
