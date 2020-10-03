import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { IconButton, Avatar } from 'react-native-paper'
import { Text } from '../components/Themed'

const WIDTH = Dimensions.get('screen').width
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
export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {socialLinks.map(link => {
          const { icon, url } = link
          return (
            <TouchableOpacity key={url} style={styles.card}>
              <Avatar.Icon style={{ backgroundColor: 'transparent' }} icon={icon} />
            </TouchableOpacity>
          )
        })}


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  scrollView: {
    flexDirection: 'row',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 15,
    width: WIDTH / 2 - 15,
    height: WIDTH / 2 - 15,
    margin: 5,
    backgroundColor: '#2A2F33',
  }
})

