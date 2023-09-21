import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const TouchBox = ({ position, onPress, num }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.box, position]}>
      <Text style={{color:"red"}}>{num}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    backgroundColor: 'blue',
  },
});

export default TouchBox;