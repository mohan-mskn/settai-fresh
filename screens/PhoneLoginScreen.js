// screens/PhoneLoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

export default function PhoneLoginScreen({ navigation }) {
  const [callingCode, setCallingCode] = useState('91');
  const [phone, setPhone] = useState('');

  const goSend = () => {
    const full = `+${callingCode}${phone.replace(/\D/g,'')}`;
    navigation.navigate('Otp', { phoneNumber: full });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter phone number</Text>
      <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
        <CountryPicker
          withFilter
          withFlag
          withCallingCode
          countryCode="IN"
          onSelect={(c) => setCallingCode(c.callingCode[0])}
        />
        <Text style={{marginLeft:8}}>+{callingCode}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Phone number (without country code)"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Button title="Send OTP" onPress={goSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20, justifyContent:'center'},
  input:{borderWidth:1, padding:12, borderRadius:8, marginVertical:12},
  title:{fontSize:20, fontWeight:'bold', marginBottom:12}
});
