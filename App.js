import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Animated,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import PlayerStack from "./navigation/PlayerStack";
import ContactsScreen from "./screens/ContactsScreen";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import MaskedScreen from "./screens/MaskedScreen";
import useCachedResources from "./hooks/useCachedResources";
import { Drawer as PaperDrawer, Avatar, List } from "react-native-paper";
import { Text } from "./components/Themed";
import * as Linking from "expo-linking";
import * as Updates from "expo-updates";
import AnimatedSplash from "react-native-animated-splash-screen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2A2F33",
    accent: "#2A2F33",
  },
};

const socialLinks = [
  {
    backgroundColor: "#7b9ab7",
    icon: "vk",
    title: "Мы в VK",
    url: "https://vk.com/public167327787",
  },
  {
    backgroundColor: "#7b9ab7",
    icon: "instagram",
    title: "Мы в Instagram",
    url: "https://www.instagram.com/beachradio/",
  },
  {
    backgroundColor: "#7b9ab7",
    icon: "youtube",
    title: "Наш Youtube канал",
    url:
      "https://www.youtube.com/channel/UCk_7AiozK9oAsjgMAuqjBRw?view_as=subscriber",
  },
];

const Drawer = createDrawerNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const loadingProgress = new Animated.Value(0);

  const _handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    checkForUpdate();
  }, []);

  const checkForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        alert(
          "Вышло новое обновление, приоржение перезапустится",
          [{ text: "OK", onPress: async () => await Updates.reloadAsync() }],
          { cancelabe: false }
        );
        // ... notify user of update ...
      }
    } catch (e) {
      // handle or log error
    }
  };

  function CustomDrawerContent({ navigation }) {
    return (
      <View style={{ marginTop: 30, flex: 1 }}>
        <PaperDrawer.Item
          style={{ backgroundColor: "#E8C754" }}
          theme
          icon="play"
          label="Плеер"
          onPress={() => {
            // Navigate using the `navigation` prop that you received
            navigation.navigate("Плеер");
          }}
        />
        <View style={styles.cardContainer}>
          {socialLinks.map((link) => {
            const { icon, url, title } = link;
            return (
              <TouchableOpacity
                onPress={() => _handleLinkPress(url)}
                key={url}
                style={styles.card}
              >
                <View style={styles.cardTextContainer}>
                  <Avatar.Icon
                    style={{ backgroundColor: "transparent" }}
                    icon={icon}
                  />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardText}>{title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={() => _handleLinkPress("https://radio-beach.net/")}
            style={styles.card}
          >
            <View style={styles.cardTextContainer}>
              <Image
                style={{ width: 40, height: 40, marginHorizontal: 12 }}
                resizeMode="contain"
                source={require("./assets/whiteIcon.png")}
              />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>Наш официальный сайт</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />

        <TouchableOpacity
          onPress={() => _handleLinkPress("https://radio-beach.net/")}
          style={styles.imageContainer}
        >
          <Image style={styles.image} source={require("./assets/logo.png")} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <AnimatedSplash
        translucent={true}
        isLoaded={isLoadingComplete}
        logoImage={require("./assets/logo.png")}
        backgroundColor={"#262626"}
        logoHeight={150}
        logoWidth={150}
      >
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            color="white"
            drawerStyle={{
              backgroundColor: theme.colors.primary,
              color: "white",
            }}
            initialRouteName="Плеер"
          >
            <Drawer.Screen name="Плеер" component={PlayerStack} />
            <Drawer.Screen name="Контакты" component={ContactsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AnimatedSplash>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 100,
  },
  spacer: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 20,

    justifyContent: "center",
    flexWrap: "wrap",
  },
  textLink: {
    width: "100%",
    justifyContent: "center",
    color: "white",
    flexDirection: "row",
    paddingHorizontal: 18,
  },
  card: {
    alignContent: "center",
    borderRadius: 15,
    flexDirection: "row",
    height: 50,
    margin: 5,
    backgroundColor: "#2A2F33",
  },
  cardTextContainer: {
    justifyContent: "center",
  },
  cardText: {
    color: "white",

    height: "auto",
  },
});
