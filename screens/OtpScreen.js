// screens/OtpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';

export default function OtpScreen({ route, navigation }) {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);

  // send OTP when screen mounts
  React.useEffect(() => {
    let active = true;
    const send = async () => {
      try {
        const res = await signInWithPhoneNumber(auth, phoneNumber);
        if (!active) return;
        setConfirmResult(res);
      } catch (e) {
        alert('Error sending OTP: ' + e.message);
      }
    };
    send();
    return () => { active = false; };
  }, [phoneNumber]);

  const verify = async () => {
    if (!confirmResult) {
      alert('No confirmation available.');
      return;
    }
    try {
      await confirmResult.confirm(otp);
      navigation.replace('ProfileSetup'); // first-time profile setup
    } catch (e) {
      alert('Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify {phoneNumber}</Text>
      <TextInput style={styles.input} keyboardType="number-pad" value={otp} onChangeText={setOtp} placeholder="Enter OTP" />
      <Button title="Verify" onPress={verify} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20,justifyContent:'center'},
  input:{borderWidth:1,padding:12,borderRadius:8,marginVertical:12},
  title:{fontSize:18, fontWeight:'bold', marginBottom:12}
});
