import { StatusBar, ScrollView, TouchableOpacity, StyleSheet, Text, View, Linking } from 'react-native';
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
        <View style={styles.messageTextContainer}>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
        <View style={styles.messageTimeContainer}>
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>
      </View>
    );
  };

  const call911 = () => {
    Linking.openURL('tel:911');
};

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.messageTimeContainer}>
        {messages.map(renderMessage)}
      </ScrollView>
      <View style={styles.button911Container}>  
        <TouchableOpacity style={styles.button911} onPress={call911}>
          <Text style={styles.button911Text}>Call 9-1-1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesMainContainer: {
  },
  messageContainer: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#3C8AC1',
  },
  supportMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4FC13C',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: '#fff',
  },
  button911Container:{
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  button911: {
    backgroundColor: "#36C73C",
    color: "#FFFFFF",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button911Text: {
    color: '#fff',
    fontSize: 20,
  },
});