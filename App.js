import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, useWindowDimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

export default function App() {
  const { width, height } = useWindowDimensions();

  // Calculate grid lines based on screen size
  const horizontalLines = Math.ceil(height / 40);
  const verticalLines = Math.ceil(width / 40);

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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
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
                  />
                  <Feather name="lock" size={18} color="#999" style={styles.lockIcon} />
                </View>
              </View>

              <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Authenticate</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 Flash USDT Sender | <Text style={styles.link}>Home</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
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
  footer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 13,
  },
  link: {
    color: '#999',
    textDecorationLine: 'underline',
  }
});
