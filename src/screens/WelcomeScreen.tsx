import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {colors, General, fonts} from '../constants';
import {WelcomeCard, Separator} from '../components';
import {Display} from '../utils';

const pageStyle = isActive =>
  isActive ? styles.page : {...styles.page, backgroundColor: colors.COLOR_GRAY};

const Pagination = ({index}) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        ),
      )}
    </View>
  );
};

const WelcomeScreen = ({navigation}) => {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();
  const onViewRef = useRef(({changed}) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
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
      <Separator height={Display.setHeight(8)} />
      <View style={styles.welcomeListContainer}>
        <FlatList
          ref={welcomeList}
          data={General.WELCOME_CONTENTS}
          keyExtractor={item => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          overScrollMode="never"
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({item}) => <WelcomeCard {...item} />}
        />
      </View>
      <Separator height={Display.setHeight(8)} />
      <Pagination index={welcomeListIndex} />
      <Separator height={Display.setHeight(8)} />

      {welcomeListIndex === 2 ? (
        <TouchableOpacity
          style={styles.gettingStartedButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.gettingStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginLeft: 10}}
            onPress={() => welcomeList.current.scrollToEnd()}>
            <Text style={styles.buttonText}>SKIP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => pageScroll()}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.Color_White,
  },
  pageContainer: {
    flexDirection: 'row',
  },
  page: {
    height: 8,
    width: 15,
    backgroundColor: colors.Color_Teal,
    borderRadius: 32,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Display.setWidth(90),
    alignItems: 'center',
  },
  welcomeListContainer: {
    height: Display.setHeight(60),
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.POPPINS_BOLD,
    color: 'black',
    lineHeight: 16 * 1.4,
  },
  button: {
    backgroundColor: colors.COLOR_BLUE_LGHT,
    paddingVertical: 20,
    paddingHorizontal: 11,
    borderRadius: 32,
  },
  gettingStartedButton: {
    backgroundColor: colors.Color_Teal,
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  gettingStartedButtonText: {
    fontSize: 20,
    color: colors.Color_White,
    lineHeight: 20 * 1.4,
    fontFamily: fonts.POPPINS_MEDIUM,
  },
});

export default WelcomeScreen;
