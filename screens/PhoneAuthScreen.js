import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { auth } from '../config/firebaseConfig';
import {
  PhoneAuthProvider,
  signInWithPhoneNumber,
  signInWithCredential,
} from 'firebase/auth';

export default function PhoneAuthScreen() {
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');

  const sendOTP = async () => {
    try {
      const fullPhone = `+${callingCode}${phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(auth, fullPhone);
      setVerificationId(confirmation.verificationId);
      alert('OTP sent successfully!');
    } catch (err) {
      console.log(err);
      alert('Error sending OTP: ' + err.message);
    }
  };

  const verifyOTP = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      alert('Phone Verified Successfully!');
    } catch (err) {
      console.log(err);
      alert('Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Authentication</Text>

      <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCallingCode
        withEmoji
        onSelect={(country) => {
          setCountryCode(country.cca2);
          setCallingCode(country.callingCode[0]);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Button title="Send OTP" onPress={sendOTP} />

      {verificationId ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <Button title="Verify OTP" onPress={verifyOTP} />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
});
