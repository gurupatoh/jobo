import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const CodeScoutIntro = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animatable.View animation="bounceInDown" duration={1500}>
          <Icon name="code" size={48} color="#888" />
        </Animatable.View>
        <Animatable.Text animation="fadeIn" duration={1000} style={styles.title}>
          Welcome to codeScout!
        </Animatable.Text>
        <Animatable.Text animation="fadeIn" duration={1000} style={styles.subtitle}>
          Discover and explore Remote Job Opportunities...
        </Animatable.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default CodeScoutIntro;
