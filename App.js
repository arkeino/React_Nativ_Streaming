import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, FlatList, Dimensions, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import React, { useState, useRef } from 'react';
import { render } from 'react-dom';

const Item = ({ title, image, date, resume, episode, setShowModal, setCurrentEpisode }) => {
  const openVideo = (episode) => {
    setShowModal(true)
    setCurrentEpisode(episode)
  }
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.subcontainer}>

        <TouchableOpacity onPress={() => openVideo(episode)}>
          <Image style={styles.image} source={image} />
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.resume}>{resume}</Text>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const video = React.useRef(null);
  const [showModal, setShowModal] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState('')
  const DATA = [
    {
      id: '1',
      title: 'First Episode',
      image: require('./jj1.jpg'),
      date: '13-10-2021',
      resume: 'Itadori Yuuji wakes up locked in a room, in the company of Gojo Satoru, professor at the Fushiguro exorcism school. Hundreds of talismans cover the walls and he is supposed to be sentenced to death.',
      episode: require('./Episodejjseng1.mp4')
    },
    {
      id: '2',
      title: 'Second Episode',
      image: require('./jj2.jpg'),
      date: '15-10-2021',
      resume: 'Gojo Satoru, a teacher at the exorcism school in Megumi, came as a backup. Intrigued that Yuuji had swallowed the relic, he asked her to swap ten seconds with Sukuna to see. Yuuji executed himself and the plague took his place, immediately attacking Satoru.',
      episode: require('./sololeveling.mp4')
    },
    {
      id: '3',
      title: 'Third Episode',
      image: require('./jj3.jpg'),
      date: '17-10-2021',
      resume: 'Satoru, Yuuji and Megumi meet in Harajuku to pick up the third student of the exorcism school. They find her pressuring a model recruiter to get hired. Named Kugisaki Nobara, she despises them at the first ragard.',
      episode: require('./sololeveling.mp4')
    },

    {
      id: '4',
      title: 'Fourth Episode',
      image: require('./jj4.jpg'),
      date: '17-10-2021',
      resume: 'A potential class S plague has been spotted in a juvenile prison. Yuji, Megumi and Nobara are sent there to try to find survivors, if there are any, and they are ordered not to approach the plague itself.',
      episode: require('./sololeveling.mp4')
    },

    {
      id: '5',
      title: 'Fifth Episode',
      image: require('./jj5.jpg'),
      date: '17-10-2021',
      resume: 'Sukuna, in a teasing mood, goes to Megumi to taunt him. He tears out the heart of his host, allowing him to survive without, unlike Sukuna. So, if Yuuji takes control, he will die.',
      episode: require('./sololeveling.mp4')
    },

    {
      id: '6',
      title: 'Sixth Episode',
      image: require('./jj6.jpg'),
      date: '17-10-2021',
      resume: 'Yuji tries to negotiate with Sukuna so that he resurrects him, but the demon wants to impose certain conditions on him. Megumi and Nobara are training with the premieres, while a restaurant waiter has a damn good intuition…',
      episode: require('./sololeveling.mp4')
    },

  ];

  const renderItem = ({ item, setShowModal, setCurrentEpisode }) => {
    return (
      <Item title={item.item.title} image={item.item.image} date={item.item.date} resume={item.item.resume} episode={item.item.episode} setShowModal={setShowModal}
        setCurrentEpisode={setCurrentEpisode} />
    );
  }

  const renderModal = (showModal, currentEpisode) => {
    if (showModal) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false)
            setCurrentEpisode('')
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Video
                ref={video}
                style={styles.video}
                source={
                  currentEpisode
                }
                resizeMode="contain"
                useNativeControls
              />
              <TouchableOpacity
                onPress={() => { setShowModal(false)
                }}>
                  <Text> x </Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )
    }
    return null
  }

  return (

    <View style={styles.container}>
      <View>
        <Text style={styles.manganame}> Jujutsu Kaisen</Text>
      </View>
      <StatusBar style="auto" />
      <FlatList
        data={DATA}
        renderItem={(item) => renderItem({ item, setShowModal, setCurrentEpisode })}
        keyExtractor={item => item.id}
      />
      {
        renderModal(showModal, currentEpisode)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },

  subcontainer: {
    flex: 1, flexDirection: 'row',
  },
  item: {
    backgroundColor: '#151E3D',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 0,
    width: Dimensions.get('window').width,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },

  image: {
    width: 200,
    height: 120,
    backgroundColor: 'black'
  },

  info: {
    paddingLeft: 20,
    width: 190,

  },

  date: {
    color: 'green',
    fontSize: 20,
  },

  resume: {
    color: 'white',
    fontSize: 15,

  },

  manganame: {
    color: '#800000',
    fontSize: 40,
    marginLeft: 30,
  },

  episode: {
    alignSelf: 'center',
    width: 500,
    height: 400,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    alignSelf: 'center',
    margin: 10,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    borderRadius: 300,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
      marginBottom: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1
  },

  video: {
    alignSelf: 'center',
    width: 350,
    height: 250,
  },
});