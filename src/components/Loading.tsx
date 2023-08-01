import React from 'react';
import { ActivityIndicator,StyleSheet, View } from 'react-native';
import { colors } from '../constants';

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})

function Loading({loading,children}){
    if(loading){
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={colors.Color_White}/>
            </View>
    
        );
    }
    return children;
}

export default Loading;