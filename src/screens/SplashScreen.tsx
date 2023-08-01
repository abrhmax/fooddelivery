import React, {useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import {colors, fonts, Images} from '../constants';
import {Display} from '../utils';

const SplashScreen = ({navigation}) => {
 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.Color_Teal} />

      <Image source={Images.ICONO} resizeMode="contain" style={styles.Image} />
      <Text style={styles.titleText}>DeliverApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Color_Teal,
  },
  Image: {
    width: Display.setWidth(60),
    height: Display.setHeight(30),
  },
  titleText: {
    color: colors.Color_White,
    fontSize: 32,
    fontFamily: fonts.Poppins_lght,
  },
});

export default SplashScreen;
