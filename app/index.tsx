import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

interface HomeScreenProps {
    card: string;
}

function HomeScreen(props: HomeScreenProps){
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable 
      onPress={() => setPressed(!pressed)}
      style={[
        styles.card,
        pressed ? styles.cardPressed : styles.cardDefault,
    ]}
    >
      <Text style={[styles.text, pressed ? styles.textPressed : styles.textDefault]}>
        {props.card}
      </Text>
    </Pressable>
  );
}

export default function Cards() {
  return (
    <ScrollView
      style={[ styles.scroll ]}
      contentContainerStyle={[
        styles.scrollContent,
      ]}
    >
      <HomeScreen card="Card 1" />
      <HomeScreen card="Card 2" />
      <HomeScreen card="Card 3" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex:1,
    backgroundColor: '#ccc8be',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      height: 120,
      width: '80%',
      borderRadius:30,
      borderWidth: 3,
      borderColor: '#e3e0d8',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold' 
  },
  textPressed:{
    color: '#f7f5f0',
  },
  textDefault:{
    color: '#968f7b',
  },
  cardPressed:{
    backgroundColor: '#968f7b',
  },
  cardDefault:{
    backgroundColor: '#f7f5f0',
  }
})