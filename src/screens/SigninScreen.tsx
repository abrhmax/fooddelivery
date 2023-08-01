import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Separator, ToggleButton} from '../components';
import {Images, fonts} from '../constants';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants';
import {Display} from '../utils';
import {AuthenticationService} from '../services';
import Loading from '../components/Loading';
import {connect} from 'react-redux';
import {GeneralAction} from '../actions';

const SigninScreen = ({navigation, setToken}) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    setIsLoading(true);
    let user = {
      username,
      password,
    };
    AuthenticationService.login(user).then(response => {
      setIsLoading(false);
      setToken(response?.data);
      if (!response?.status) {
        setErrorMessage(response?.message);
      }
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.Color_White}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Sign In</Text>
      </View>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.content}>
        Enter your username and password, and enjoy ordering foood
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={colors.DEFAULT_GRAY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="username"
            placeholderTextColor={colors.DEFAULT_GRAY}
            selectionColor={colors.DEFAULT_GRAY}
            style={styles.inputText}
            onChangeText={text => setUsername(text)}
          />
        </View>
      </View>
      <Separator height={15} />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={colors.DEFAULT_GRAY}
            style={{marginRight: 10}}
          />
          <TextInput
            secureTextEntry={isPasswordShow ? false : true}
            placeholder="password"
            placeholderTextColor={colors.DEFAULT_GRAY}
            selectionColor={colors.DEFAULT_GRAY}
            style={styles.inputText}
            onChangeText={text => setPassword(text)}
          />
          <Feather
            name={isPasswordShow ? 'eye' : 'eye-off'}
            size={22}
            color={colors.DEFAULT_GRAY}
            style={{marginRight: 10}}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <View style={styles.forgotPasswordContainer}>
        <View style={styles.toggleContainer}>
          <ToggleButton size={0.5} />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <Text
          style={styles.forgotPasswordText}
          onPress={() => navigation.navigate('Forgot')}>
          Forgot Password?
        </Text>
      </View>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => signIn()}
        activeOpacity={0.8}>
        {isLoading ? (
          <Loading loading={true} />
        ) : (
          <Text style={styles.signInButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </View>
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.socialButtonsLogoContainer}>
          <View style={styles.sigInButtonLogoContainer}>
            <Image source={Images.FACEBOOK} style={styles.signInButtonLogo} />
          </View>
          <Text style={styles.socialSignInButtonText}>
            Connect with Facebook
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonsLogoContainer}>
          <View style={styles.sigInButtonLogoContainer}>
            <Image source={Images.GOOGLE} style={styles.signInButtonLogo} />
          </View>
          <Text style={styles.socialSignInButtonText}>Connect with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Color_White,
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
  inputContainer: {
    backgroundColor: colors.COLOR_GRAY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.COLOR_GRAY,
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: colors.DEFAULT_BLACK,
    flex: 1,
  },
  forgotPasswordContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: colors.DEFAULT_GRAY,
    fontFamily: fonts.POPPINS_MEDIUM,
  },
  forgotPasswordText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: colors.DEFAULT_GREEN,
    fontFamily: fonts.POPPINS_BOLD,
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
  signUpContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: colors.DEFAULT_BLACK,
    fontFamily: fonts.POPPINS_MEDIUM,
  },
  signUpText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: colors.DEFAULT_GREEN,
    fontFamily: fonts.POPPINS_MEDIUM,
    marginLeft: 5,
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: colors.DEFAULT_BLACK,
    fontFamily: fonts.POPPINS_MEDIUM,
    marginLeft: 5,
    alignSelf: 'center',
  },
  facebookButton: {
    backgroundColor: colors.FACEBOOK_COLOR,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: colors.GOOGLE_COLOR,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonLogo: {
    height: 18,
    width: 18,
  },
  sigInButtonLogoContainer: {
    backgroundColor: colors.Color_White,
    padding: 2,
    borderRadius: 3,
    position: 'absolute',
    left: 25,
  },
  socialButtonsLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  socialSignInButtonText: {
    color: colors.Color_White,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: fonts.POPPINS_MEDIUM,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: colors.DEFAULT_RED,
    fontFamily: fonts.POPPINS_MEDIUM,
    marginHorizontal: 20,
    marginTop: 3,
    marginBottom: 10,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch(GeneralAction.setToken(token)),
  };
};

export default connect(null, mapDispatchToProps)(SigninScreen);
