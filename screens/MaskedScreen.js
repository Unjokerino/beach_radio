import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import MaskedView from '@react-native-community/masked-view';

export default function MaskedScreen({ navigation }) {
    const loadingProgress = useRef(new Animated.Value(0)).current
    const [animationDone, setanimationDone] = useState(false)

    const colorLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: '#E8C754' }]} />
    const whiteLayer = animationDone ? null : <View style={[StyleSheet.absoluteFill, { backgroundColor: '#fff' }]} />

    useEffect(() => {
        Animated.timing(loadingProgress, {
            toValue: 100,
            duration: 500,
            useNativeDriver: true,

        }).start(() => {
            setanimationDone(true)
            // navigation.replace('PlayerScreen')
        })
    }, [])

    const imageScale = {
        transform: [
            {
                scale: loadingProgress.interpolate({
                    inputRange: [0, 15, 100],
                    outputRange: [0.4, 0.02, 16]
                })
            }
        ]
    }

    return (
        <View style={{ flex: 1, width: "100%" }}>
            {colorLayer}
            <MaskedView
                style={{ flex: 1 }}
                maskElement={
                    <View style={styles.centered}>
                        {whiteLayer}
                        {<Animated.Image
                            source={require('../assets/logoWT.png')}
                            style={[{
                                width: 1000,
                                height: '100%',
                            }]}
                            resizeMode="cover"
                        />}
                    </View>
                }
            >
                <View style={styles.centered}>
                    {whiteLayer}
                    <Text style={{ fontSize: 32 }}>123</Text>
                </View>

            </MaskedView>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

