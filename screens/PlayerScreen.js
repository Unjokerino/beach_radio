import React, { useEffect, useState, useRef } from 'react'
import { Text } from '../components/Themed'
import { View, StyleSheet, Dimensions, Image, ImageBackground, Animated, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Svg, G, Circle } from 'react-native-svg';
import { Audio } from 'expo-av';
import { IconButton, Colors, Appbar } from 'react-native-paper';
import DonutChart from '../components/DonatChart'
import MaskedScreen from './MaskedScreen'

const width = Dimensions.get('window').width
const player_url = 'https://myradio24.org/1632'



export default function PlayerScreen({ navigation }) {

    const loadingProgress = useRef(new Animated.Value(0)).current
    const [animationDone, setanimationDone] = useState(false)
    const [soundObject, setSoundObject] = useState(new Audio.Sound())
    const [playing, setPlaying] = useState(false)
    const [currentListeners, setCurrentListeners] = useState(0)
    const [currentSong, setCurrentSong] = useState({})

    const circleRef = useRef()
    const radius = width / 6
    const strokeWidth = 10
    const duration = 400
    const delay = 0
    const max = 100
    const percentage = 75
    const halfCircle = radius + strokeWidth
    const circleCircumference = 2 * Math.PI * radius

    useEffect(() => {
        loadPlayer()
        getStatus()
        const interval = setInterval(() => {
            getStatus()
        }, 5000);
        return (() => {
            clearInterval(interval)
        })

    }, [])



    const getStatus = async () => {
        const result = await fetch('https://myradio24.com/users/1632/status.json')
        const status = await result.json()
        const title = status.song.split('-')[1]
        const author = status.song.split('-')[0]

        setCurrentSong({ title, author, cover: `https://myradio24.com/${status.img}` })
        setCurrentListeners(status.listeners || 0)

    }
    const togglePlayer = async () => {
        const { isPlaying } = await soundObject.getStatusAsync()

        isPlaying ? stopPlaying() : startPlaying()
        setPlaying(!isPlaying)
    }

    const startPlaying = async () => {
        const status = await soundObject.getStatusAsync()
        if (status.isLoaded) {
            await soundObject.playAsync()
        } else {
            await loadPlayer()
            await soundObject.playAsync()
        }

    }

    const stopPlaying = async () => {

        await soundObject.unloadAsync()
    }

    const loadPlayer = async () => {
        const mode = {
            staysActiveInBackground: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
        }
        Audio.setAudioModeAsync(mode)
        try {
            await soundObject.loadAsync({ uri: player_url });
            // Your sound is playing!

            // Don't forget to unload the sound from memory
            // when you are done using the Sound object
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, }}>
            <View style={[styles.centered]}>
                <ImageBackground blurRadius={20} resizeMode="stretch" source={playing ? { uri: currentSong.cover } : require('../assets/logo.png')} style={styles.container}>
                    <View style={[StyleSheet.absoluteFill, { backgroundColor: 'black', opacity: 0.4 }]} />
                    <Appbar style={{ backgroundColor: 'transparent', marginTop: Platform.OS === 'ios' ? 30 : 30, elevation: 0, minHeight: 50, justifyContent: 'space-between' }}>
                        <Appbar.Action color='white' onPress={() => navigation.openDrawer()} icon="menu"></Appbar.Action>
                        <Appbar.Action color='white' onPress={() => navigation.navigate('PlayListScreen')} icon="playlist-music" />
                    </Appbar>
                    <View style={styles.card}>
                        {playing ?
                            <Image style={styles.image} source={{ uri: currentSong.cover }} resizeMode="cover" />
                            :
                            <Image style={styles.image} source={require('../assets/logo.png')} resizeMode="contain" />
                        }
                        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'black', opacity: 0.3 }]} />
                    </View>
                    <View style={styles.songTitleContainer}>
                        {currentSong.title && <Text style={styles.title}>{currentSong.title}</Text>}
                        {currentSong.author && <Text style={styles.subtitle}>{currentSong.author}</Text>}

                    </View>
                    <View style={styles.divider} />
                    <View style={{ flex: 1, backgroundColor: '#22222254' }}>
                        <View style={styles.playerContainer}>
                            <DonutChart color="white" percentage={playing ? 100 : 0} >
                                <View style={styles.player}>
                                    <IconButton
                                        icon={playing ? "stop" : "play"}
                                        color="#E8C754"
                                        size={72}
                                        animated
                                        onPress={togglePlayer}
                                    />
                                </View>
                            </DonutChart>


                        </View>

                    </View>
                    <View style={styles.listenersContainer}>
                        <IconButton
                            icon="account-multiple"
                            color="#fff"
                        />
                        <Text style={styles.listeners}>{currentListeners}</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#111111e0'
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider: {
        height: 1,
        width: width,
        backgroundColor: '#2A2F33'
    },
    playerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
        marginVertical: 53
    },
    player: {
        width: width / 3,
        height: width / 3,
        borderRadius: width / 6,
        borderColor: '#2A2F33',

        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    songTitleContainer: {


        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24
    },
    card: {
        overflow: 'hidden',
        borderRadius: 22,
        backgroundColor: '#2A2F33',
        width: width - 32,
        marginHorizontal: 16,
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,

    },
    listenersContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "flex-start",
    },
    listeners: {
        color: 'white'
    },
    title: {

        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        color: '#E8C754',
        fontSize: 22,
        paddingHorizontal: 20,
        fontWeight: '600'
    },
    subtitle: {
        paddingHorizontal: 20,
        textAlign: 'center',
        color: '#81671A',
        fontSize: 18,
    }
})

