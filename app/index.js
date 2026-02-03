import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, useWindowDimensions, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { generateAPIUrl } from '../utils';

export default function App() {
  const { width, height } = useWindowDimensions();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');

  // AI Chat Logic
  const { messages, input, setInput, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch,
      api: generateAPIUrl('/api/chat'),
    }),
    onError: error => console.error(error, 'CHAT_ERROR'),
  });

  // Calculate grid lines
  const horizontalLines = Math.ceil(height / 40);
  const verticalLines = Math.ceil(width / 40);

  const handleAuthenticate = () => {
    if (accessKey.length > 0) {
      setIsAuthenticated(true);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Grid Background */}
      <View style={styles.gridContainer} pointerEvents="none">
        {Array.from({ length: verticalLines }).map((_, i) => (
          <View key={`v-${i}`} style={[styles.gridLineV, { left: 40 * i }]} />
        ))}
        {Array.from({ length: horizontalLines }).map((_, i) => (
          <View key={`h-${i}`} style={[styles.gridLineH, { top: 40 * i }]} />
        ))}
      </View>

      <SafeAreaView style={styles.safeArea}>
        {!isAuthenticated ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                <View style={styles.logoContainer}>
                  <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/01/USDT_Logo.png' }}
                    style={styles.logo}
                  />
                </View>

                <Text style={styles.title}>Secure Access{"\n"}Required</Text>

                <View style={styles.inputSection}>
                  <Text style={styles.label}>Access Key</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your access key"
                      placeholderTextColor="#666"
                      secureTextEntry
                      value={accessKey}
                      onChangeText={setAccessKey}
                    />
                    <Feather name="lock" size={18} color="#999" style={styles.lockIcon} />
                  </View>
                </View>

                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleAuthenticate}>
                  <Text style={styles.buttonText}>Authenticate</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <View style={styles.chatContainer}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatHeaderTitle}>USDT ASSISTANT</Text>
              <TouchableOpacity onPress={() => setIsAuthenticated(false)}>
                <Feather name="log-out" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.messagesList}
              contentContainerStyle={styles.messagesContent}
              ref={(ref) => ref?.scrollToEnd({ animated: true })}
            >
              {messages.length === 0 && (
                <Text style={styles.emptyText}>How can I help you with your USDT transactions today?</Text>
              )}
              {messages.map((m) => (
                <View key={m.id} style={[
                  styles.messageWrapper,
                  m.role === 'user' ? styles.userMessage : styles.assistantMessage
                ]}>
                  <Text style={styles.messageRole}>{m.role.toUpperCase()}</Text>
                  {m.parts.map((part, i) => {
                    if (part.type === 'text') {
                      return <Text key={i} style={styles.messageText}>{part.text}</Text>;
                    }
                    return null;
                  })}
                </View>
              ))}
              {isLoading && <ActivityIndicator color="#00D1A0" style={{ marginVertical: 10 }} />}
            </ScrollView>

            <View style={styles.chatInputContainer}>
              <TextInput
                style={styles.chatInput}
                placeholder="Ask about USDT..."
                placeholderTextColor="#666"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Feather name="send" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Flash USDT Sender | <Text style={styles.link}>Home</Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  gridLineV: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: '#00FF00',
  },
  gridLineH: {
    position: 'absolute',
    height: 1,
    width: '100%',
    backgroundColor: '#00FF00',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'rgba(0, 209, 160, 0.05)',
    shadowColor: '#00D1A0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  inputSection: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 60,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  lockIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#00D1A0',
    width: '100%',
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#00D1A0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  chatHeaderTitle: {
    color: '#00D1A0',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageWrapper: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 209, 160, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 209, 160, 0.2)',
  },
  messageRole: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  messageText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
  },
  emptyText: {
    color: '#444',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    fontStyle: 'italic',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 20,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#222',
  },
  sendButton: {
    backgroundColor: '#00D1A0',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
  },
  link: {
    color: '#999',
    textDecorationLine: 'underline',
  }
});
