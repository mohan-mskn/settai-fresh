// screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth, firestore } from '../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const load = async () => {
      const u = auth.currentUser;
      if (!u) return;
      const d = await getDoc(doc(firestore, 'users', u.uid));
      setProfile(d.exists() ? d.data() : { phone: u.phoneNumber });
    };
    load();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>{profile ? `Name: ${profile.name || '-'}` : 'Loading...'}</Text>
      <Text>{profile ? `Phone: ${profile.phone || auth.currentUser?.phoneNumber}` : ''}</Text>
      <Button title="Sign out" onPress={() => auth.signOut()} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  title:{fontSize:20,fontWeight:'bold',marginBottom:16}
});
