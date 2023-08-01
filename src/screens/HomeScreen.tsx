import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
