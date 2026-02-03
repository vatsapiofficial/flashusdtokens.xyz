import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Grid Background */}
      <View style={styles.gridContainer}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={`v-${i}`} style={[styles.gridLineV, { left: (width / 15) * i }]} />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <View key={`h-${i}`} style={[styles.gridLineH, { top: (height / 25) * i }]} />
        ))}
      </View>

      <SafeAreaView style={styles.safeArea}>
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

          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Authenticate</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 Flash USDT Sender | <Text style={styles.link}>Home</Text>
            </Text>
          </View>
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
    opacity: 0.15,
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: height * 0.1,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(0, 163, 133, 0.1)', // Subtle glow behind logo
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 50,
  },
  inputSection: {
    width: '100%',
    marginBottom: 25,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 55,
    fontSize: 16,
  },
  lockIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#00D1A0', // Vibrant green from image
    width: '100%',
    height: 55,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
  },
  link: {
    textDecorationLine: 'underline',
  }
});
