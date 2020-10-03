import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PlayerScreen from '../screens/PlayerScreen'
import MaskedScreen from '../screens/MaskedScreen'
import PlayListScreen from '../screens/PlayListScreen'
const Stack = createStackNavigator();

export default function PlayerStack() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="MaskedScreen" options={{ headerShown: false }} component={MaskedScreen} /> */}
            <Stack.Screen name="PlayerScreen" options={{ headerShown: false }} component={PlayerScreen} />
            <Stack.Screen name="PlayListScreen" options={{ headerShown: false }} component={PlayListScreen} />
        </Stack.Navigator>
    );
}