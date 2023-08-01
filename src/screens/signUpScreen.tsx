import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, fonts, Images} from '../constants';
import {Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Display} from '../utils';
import {AuthenticationService} from '../services';
import Loading from '../components/Loading';

const inputStyle = state => {
  switch (state) {
    case 'valid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: colors.DEFAULT_GREEN,
      };
    case 'invalid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: colors.DEFAULT_RED,
      };
    default:
      return styles.inputContainer;
  }
};

const showMarker = state => {
  switch (state) {
    case 'valid':
      return (
        <AntDesign
          name="checkcircleo"
          color={colors.DEFAULT_GREEN}
          size={18}
          style={{marginLeft: 5}}
        />
      );

    case 'invalid':
      return (
        <AntDesign
          name="closecircleo"
          color={colors.DEFAULT_RED}
          size={18}
          style={{marginLeft: 5}}
        />
      );
    default:
      return null;
  }
};

const signUpScreen = ({navigation}) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailState, setEmailState] = useState('default');
  const [usernameState, setUsernameState] = useState('default');
  const register = () => {
    let user = {
      username,
      email,
      password,
    };
    console.log(user);
    setIsLoading(true);
    AuthenticationService.register(user).then(response => {
      setIsLoading(false);
      console.log(response);
      if (!response?.status) {
        setErrorMessage(response?.message);
      }
    });

    //navigation.navigate('RegisterPhone');//
  };

  const checkUserExist = async (type, value) => {
    if (value?.length > 0) {
      AuthenticationService.checkUserExist(type, value).then(response => {
        if (response?.status) {
          type === 'email' && emailErrorMessage
            ? setEmailErrorMessage('')
            : null;

          type === 'username' && usernameErrorMessage
            ? setUsernameErrorMessage('')
            : null;
          type === 'email' ? setEmailState('valid') : null;
          type === 'username' ? setUsernameState('valid') : null;
        } else {
          type === 'email' ? setEmailErrorMessage(response?.message) : null;
          type === 'username'
            ? setUsernameErrorMessage(response?.message)
            : null;
          type === 'email' ? setEmailState('invalid') : null;
          type === 'username' ? setUsernameState('invalid') : null;
        }
      });
    }
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
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.content}>
        Ingrese su correo electrónico, elija un nombre de usuario y contraseña
      </Text>
      <View style={inputStyle(usernameState)}>
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
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('username', text)
            }
          />
          {showMarker(usernameState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{usernameErrorMessage}</Text>
      <View style={inputStyle(emailState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={colors.DEFAULT_GRAY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.DEFAULT_GRAY}
            selectionColor={colors.DEFAULT_GRAY}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('email', text)
            }
          />
          {showMarker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
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
      <TouchableOpacity style={styles.signInButton} onPress={() => register()}>
        {isLoading ? (
          <Loading loading={true} />
        ) : (
          <Text style={styles.signInButtonText}>Create Account</Text>
        )}
      </TouchableOpacity>
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
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: colors.DEFAULT_BLACK,
    fontFamily: fonts.POPPINS_MEDIUM,
    marginLeft: 5,
    alignSelf: 'center',
    marginTop: 20,
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
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: colors.DEFAULT_RED,
    fontFamily: fonts.POPPINS_MEDIUM,
    marginHorizontal: 20,
    marginTop: 5,
  },
});

export default signUpScreen;
