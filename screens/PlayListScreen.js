import React, { useState, useEffect } from 'react'
import { Text } from '../components/Themed'
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { IconButton, Colors, Appbar, List } from 'react-native-paper';

export default function PlayListScreen({ navigation }) {
    const [playlist, setplaylist] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        getPlaylist()
    }, [])

    const getPlaylist = async () => {
        setloading(true)
        try {
            const response = await fetch('https://myradio24.com/users/1632/status.json')
            const json = await response.json()
            const playList = json.songs
            const currentSong = json.song
            const nexSongs = json.nextsongs
            const tempPlayList = playList.map(element => {
                const obj = {}
                obj.time = element[0]
                obj.current = currentSong === element[1]
                obj.title = element[1]
                obj.cover = `https://myradio24.com/${element[2]}`
                return obj
            });
            const tempNextSongs = nexSongs.map(element => {
                const obj = {}
                obj.time = 'следующая песня'
                obj.title = element

                obj.cover = `https://myradio24.com/img/nocover.jpg`
                return obj
            })
            setplaylist([...tempNextSongs, ...tempPlayList.reverse(),])
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }

    }

    const Item = ({ title, time, cover, current }) => (
        <View style={{ borderBottomColor: '#2A2F33', borderBottomWidth: 1, backgroundColor: current ? 'black' : 'transparent' }}>
            <List.Item
                titleStyle={{ color: 'white' }}
                descriptionStyle={{ color: 'white' }}
                title={title}
                description={time || ''}
                left={props => <Image style={styles.imageCover} source={{ uri: cover }} />}
            />
        </View>
    );
    const renderItem = ({ item }) => (
        <Item current={item.current} cover={item.cover} time={item.time} title={item.title} />
    );
    return (


        <View style={styles.container}>

            <Appbar style={styles.header}>
                <Appbar.BackAction color="white" onPress={navigation.goBack} />
                <Appbar.Content color="white" title="Плейлист" />
            </Appbar>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getPlaylist} />
                }
                data={playlist}
                renderItem={renderItem}
                keyExtractor={item => item.time}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#18191D'
    },
    item: {
        backgroundColor: '#2A2F33',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    imageCover: {
        width: 50
    },
    header: {
        minHeight: 50,
        backgroundColor: 'transparent',
        elevation: 0
    },
    title: {
        color: 'white',
        fontSize: 32,
    },
});
