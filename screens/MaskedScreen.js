import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import MaskedView from '@react-native-community/masked-view';

function MaskedScreen({ children }) {
    const loadingProgress = useRef(new Animated.Value(0)).current
    const [animationDone, setanimationDone] = useState(false)

    const colorLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: '#E8C754' }]} />
    const whiteLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: '#fff' }]} />

    useEffect(() => {
        animation(100)
    }, [])

    const animation = (toValue) => {
        return Animated.timing(loadingProgress, {
            toValue,
            duration: 2000,
            useNativeDriver: true,

        }).start(() => {
            setanimationDone(true)
            // animation(toValue === 0 ? 100 : 0)
            // navigation.replace('PlayerScreen')
        })
    }

    const imageScale = {
        transform: [
            {
                scale: loadingProgress.interpolate({
                    inputRange: [0, 15, 100],
                    outputRange: [0.4, 0.08, 16]
                })
            }
        ]
    }

    return (
        <View style={[StyleSheet.absoluteFillObject, { flex: 1, width: "100%" }]}>
            {colorLayer}
            <MaskedView
                style={{ flex: 1 }}
                maskElement={
                    <View style={styles.centered}>

                        {<Animated.Image
                            source={require('../assets/logoWT.png')}
                            style={[{
                                width: 1000,
                            }, imageScale]}

                            resizeMode="cover"
                        />}

                    </View>
                }
            >
                <View style={styles.centered}>
                    <View style={StyleSheet.absoluteFillObject}>
                        {children}
                    </View>
                </View>

            </MaskedView>
        </View>
    )
}


export default React.memo(MaskedScreen)

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

