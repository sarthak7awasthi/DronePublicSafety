import { StatusBar, ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function SOSMessaging({ navigation }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'I am under threat. My name is Emily. I am on N 30th Street between Walnut and Chestnut Streets. I am a 5\'4" Female with light brown hair.',
      sender: 'user',
      time: '10:42 pm',
    },
    {
      id: 2,
      text: 'We have dispatched officers to your location. Please keep the phone close to you. Try to find help nearby, public safety outposts, or shelter. Stay calm and shout for help if needed.',
      sender: 'support',
      time: '10:43 pm',
    },
  ]);

  const renderMessage = (message, index) => {
    const isUser = message.sender === 'user';
    return (
      <View key={message.id} style={[styles.messageContainer, isUser ? styles.userMessage : styles.supportMessage]}>
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={styles.messageTime}>{message.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        {messages.map(renderMessage)}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => console.log("Calling 9-1-1")}>
        <Text style={styles.buttonText}>Call 9-1-1</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f7fa',
  },
  supportMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#b2ebf2',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  button: {
    padding: 20,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});