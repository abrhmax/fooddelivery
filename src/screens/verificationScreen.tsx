import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Separator} from '../components';
import {Display} from '../utils';
import {colors, fonts} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
const verificationScreen = ({
  route: {
    params: {phoneNumber},
  },
  navigation,
}) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
  return (
    <View>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.Color_White}
          translucent
        />
      </View>
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>OTP Verificacion</Text>
      </View>
      <Text style={styles.title}>OTP Verificacion</Text>
      <Text style={styles.content}>
        Ingrese el número OTP que le acabamos de enviar a
        <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({...otp, 1: text});
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({...otp, 2: text});
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({...otp, 3: text});
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({...otp, 4: text});
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => console.log(otp)}>
        <Text style={styles.signInButtonText}>Verificar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    color: 'black',
  },
  content: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    color: 'black',
  },
  phoneNumberText: {
    fontSize: 18,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 18 * 1.4,
    color: colors.DEFAULT_YELLOW,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: colors.DEFAULT_GREEN,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  signInButton: {
    backgroundColor: colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: colors.Color_White,
    fontFamily: fonts.POPPINS_MEDIUM,
  },
});

export default verificationScreen;
