import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (text.trim() === '') return;
    setMessages([...messages, { id: Date.now().toString(), text }]);
    setText('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
        keyExtractor={item => item.id}
      />
      <TextInput
        placeholder="Type message"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#000' },
  input: { backgroundColor: '#222', color: '#fff', padding: 10, borderRadius: 8, marginVertical: 10 },
  message: { color: '#fff', marginVertical: 5 },
});
