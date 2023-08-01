import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {Separator, CountryCode, FlagItem} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fonts, colors} from '../constants';
import {Display} from '../utils';
import {StaticImageService} from '../services';

const getDropdownStyle = (y) => ({...styles.countryDropdown, top: y + 60})

const RegisterPhoneScreen = ({navigation}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find(country => country.name === 'Colombia'),
  );

  const [inputsContainerY,setInputsContainerY] = useState(0);
  const [isDropdownOpen,setIsDropdownOpen]= useState(false);
  const [dropdownLayout,setDropdownLayout]=useState({});
  const [phoneNumber,setPhoneNumber]= useState("");

  const closeDropdown =(pageX,pageY) => {
    if(isDropdownOpen){
      if(pageX < dropdownLayout?.x|| 
        pageX > dropdownLayout?.x + dropdownLayout?.width || 
        pageY < dropdownLayout?.y ||
      pageY > dropdownLayout?.y + dropdownLayout?.height)
      {
        setIsDropdownOpen(false);
      }
    }
  }
  return (
    <View style={styles.container} 
    onStartShouldSetResponder={({nativeEvent:{pageX,pageY}}) =>
    closeDropdown(pageX,pageY)
    }>
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
        <Text style={styles.headerTitle}>Registrar telefono</Text>
      </View>
      <Text style={styles.title}>Registrar telefono</Text>
      <Text style={styles.content}>
        Ingrese su numero de telefono registrado para acceder
      </Text>
      <View style={styles.inputsContainer}
      onLayout={({
        nativeEvent:{
          layout:{y},
        },

      })=>setInputsContainerY(y)}>
        <TouchableOpacity style={styles.countryListContainer}
         onPress={()=>setIsDropdownOpen(!isDropdownOpen)}>
          <Image
            source={{uri: StaticImageService.getFlagIcon(selectedCountry.code)}}
            style={styles.flaticon}
          />
          <Text style={styles.countryCodeText}>
            {selectedCountry.dial_code}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={18} />
        </TouchableOpacity>
        <View style={styles.phoneInputContainer}>
          <TextInput
            placeholder="Numero de telefono"
            placeholderTextColor={colors.DEFAULT_GRAY}
            selectionColor={colors.DEFAULT_GRAY}
            keyboardType='number pad'
            onFocus={()=>setIsDropdownOpen(false)}
            style={styles.Inputext}
            onChangeText={(text)=>setPhoneNumber(selectedCountry?.dial_code + text)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.signInButton} activeOpacity={0.8}
       onPress={()=>{
        navigation.navigate("Verification",{phoneNumber})
        console.log(phoneNumber)

       }}>
      
        <Text style={styles.signInButtonText}>Continue</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={getDropdownStyle(inputsContainerY)} 
        onLayout={({
          nativeEvent:{
            layout:{x,y,height,width},
            },
            })=>setDropdownLayout({x,y,height,width})}>
          <FlatList 
          data={CountryCode}
          keyExtractor={item => item.code}
          renderItem={({item})=> (
          <FlagItem 
          {...item} 
          onPress={(country)=>{
            setSelectedCountry(country);
            setIsDropdownOpen(false);
          }}
          />
      )}
          
          />
        </View>
      )}
      
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
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 50,
  },

  countryListContainer: {
    backgroundColor: colors.COLOR_GRAY,
    width: Display.setWidth(22),
    marginRight: 10,
    borderRadius: 8,
    height: Display.setHeight(5),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.COLOR_GRAY,
    flexDirection: 'row',
  },

  phoneInputContainer: {
    backgroundColor: colors.COLOR_GRAY,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.COLOR_GRAY,
    justifyContent: 'center',
    flex: 1,
  },
  flaticon: {
    height: 20,
    width: 20,
  },
  countryCodeText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: colors.DEFAULT_BLACK,
    fontFamily: fonts.POPPINS_MEDIUM,
  },
  Inputext:{
    fontSize:18,
    textAlignVertical:"center",
    padding:0,
    height:Display.setHeight(6),
    color:colors.DEFAULT_BLACK,
  },
  countryDropdown:{

    backgroundColor:colors.COLOR_GRAY,
    position:"absolute",
    width:Display.setWidth(80),
    height:Display.setHeight(50),
    marginLeft:20,
    borderRadius:10,
    borderWidth:0.5,
    borderColor:colors.COLOR_GRAY,
    zIndex:3,


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
export default RegisterPhoneScreen;
