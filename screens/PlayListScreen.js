import React, { useState, useEffect } from 'react'
import { Text } from '../components/Themed'
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Image } from 'react-native';
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
            const playlist = (await response.json()).songs
            const tempPlayList = playlist.map(element => {
                const obj = {}
                obj.time = element[0]
                obj.title = element[1]
                obj.cover = `https://myradio24.com/${element[2]}`
                return obj
            });
            setplaylist(tempPlayList.reverse())
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }

    }

    const Item = ({ title, time, cover }) => (
        <View style={{ borderBottomColor: '#2A2F33', borderBottomWidth: 1 }}>
            <List.Item
                titleStyle={{ color: 'white' }}
                descriptionStyle={{ color: 'white' }}
                title={title}
                description={time}
                left={props => <Image style={styles.imageCover} source={{ uri: cover }} />}
            />
        </View>
    );
    const renderItem = ({ item }) => (
        <Item cover={item.cover} time={item.time} title={item.title} />
    );
    return (


        <View style={styles.container}>

            <Appbar style={styles.header}>
                <Appbar.BackAction color="white" onPress={navigation.goBack} />
                <Appbar.Content color="white" title="Плейлист" />
            </Appbar>
            <FlatList
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
