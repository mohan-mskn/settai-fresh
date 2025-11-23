import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { firestore, auth } from "../config/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

export default function ChatRoomScreen({ route }) {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(
      collection(firestore, "chats", user.id, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (text.trim() === "") return;
    await addDoc(collection(firestore, "chats", user.id, "messages"), {
      text,
      createdAt: new Date(),
      senderId: auth.currentUser.uid
    });
    setText("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={{ padding: 5 }}>{item.senderId}: {item.text}</Text>
        )}
      />
      <TextInput
        placeholder="Type a message"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <TouchableOpacity onPress={sendMessage} style={styles.button}>
        <Text style={{ color: "#fff" }}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 10 },
  button: { backgroundColor: "blue", padding: 10, alignItems: "center" }
});
