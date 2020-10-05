import React, { useEffect, useState } from 'react';
import { Button, View, Animated, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import PlayerStack from './navigation/PlayerStack'
import ContactsScreen from './screens/ContactsScreen'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import MaskedScreen from './screens/MaskedScreen'
import useCachedResources from './hooks/useCachedResources';
import { Drawer as PaperDrawer, Avatar } from 'react-native-paper';
import { Text } from './components/Themed'
import * as Linking from 'expo-linking';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2A2F33',
    accent: '#2A2F33',
  },
};

const socialLinks = [
  {
    backgroundColor: '#7b9ab7',
    icon: 'vk',
    url: 'https://vk.com/public167327787'
  },
  {
    backgroundColor: '#7b9ab7',
    icon: 'instagram',
    url: 'https://www.instagram.com/beachradio/'
  },
  {
    backgroundColor: '#7b9ab7',
    icon: 'youtube',
    url: 'https://www.youtube.com/channel/UCk_7AiozK9oAsjgMAuqjBRw?view_as=subscriber'
  }
]

const Drawer = createDrawerNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const loadingProgress = new Animated.Value(0)

  const _handleLinkPress = url => {
    Linking.openURL(url);

  }
  function CustomDrawerContent({ navigation }) {
    return (
      <View style={{ marginTop: 30, flex: 1 }}>
        <PaperDrawer.Item
          style={{ backgroundColor: '#E8C754', }}
          theme
          icon="play"
          label="Плеер"
          onPress={() => {
            // Navigate using the `navigation` prop that you received
            navigation.navigate('Плеер');
          }}
        />
        <View style={styles.cardContainer}>
          {socialLinks.map(link => {
            const { icon, url } = link
            return (
              <TouchableOpacity onPress={() => _handleLinkPress(url)} key={url} style={styles.card}>
                <Avatar.Icon style={{ backgroundColor: 'transparent' }} icon={icon} />
              </TouchableOpacity>
            )
          })}
              
        </View>
        <View style={styles.spacer} />
        <TouchableOpacity onPress={() => _handleLinkPress('https://radio-beach.net/')} style={styles.textLink}>
                <Text style={{color:'#fff',fontSize:18}}>Наш официальный сайт</Text>
              </TouchableOpacity>
        <TouchableOpacity onPress={() => _handleLinkPress('https://radio-beach.net/')} style={styles.imageContainer}>
          <Image style={styles.image} source={require("./assets/logo.png")} />
        </TouchableOpacity>
      </View>
    );
  }

  if (!isLoadingComplete) {
    return (<View style={{ backgroundColor: '#2A2F33', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>)
  } else {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />

        <NavigationContainer>
          <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} color="white" drawerStyle={{ backgroundColor: theme.colors.primary, color: 'white' }} initialRouteName="Плеер">
            <Drawer.Screen name="Плеер" component={PlayerStack} />
            <Drawer.Screen name="Контакты" component={ContactsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 100
  },
  spacer: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 20,

    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  textLink:{
    width:'100%',
    justifyContent:'center',
    color:'white',
    flexDirection:'row',
    paddingHorizontal:18,
  },
  card: {
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 15,

    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: '#2A2F33',
  }
})
