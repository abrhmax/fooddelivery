import React from 'react'
import { View,StatusBar, StyleSheet,Text,TextInput,TouchableOpacity} from 'react-native';
import { colors,fonts} from '../constants';
import { Separator } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Display } from '../utils';

 const ForgotPassword = ({navigation}) => {
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
        <Text style={styles.headerTitle}>Recuperar contraseña</Text>
      </View>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.content}>
      Ingrese su correo electrónico, para recuperar su contraseña
      </Text>
      <View style={styles.inputContainer}>
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
          />
        </View>
      </View>
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Recuperar contraseña</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
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

    })


export default ForgotPassword;