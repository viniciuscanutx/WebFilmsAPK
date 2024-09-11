import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        fetch('https://web-films-api.vercel.app/found')
        .then((response) => response.json())
        .then((data) => setMovies(data))
        .catch((error) => console.error(error))
    }, [])

    const handlePress = (movie) => {
        navigation.navigate('MovieDetails', {movie})
    }

    const filteredMovies = movies.filter((movie) => 
    movie.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return(
        <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.titulo}</Text>
            <View style={styles.rating}>
              <FontAwesome name="star" size={24} color="red" />
              <Text style={styles.ratingText}>{item.nota}</Text>
            </View>
            <Image
              source={{ uri: item.poster }}
              style={styles.poster}
              resizeMode="contain"
            />
            <Button
              color={"#BB342F"}
              title="Watch"
              onPress={() => handlePress(item)}
            />
          </View>
        )}
      />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#011627',
    },
    searchBar: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 10,
      marginBottom: 16,
      fontSize: 16,
      textAlign: 'center',
    },
    card: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#022a4a',
      marginBottom: 10,
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 15,
    },
    poster: {
      width: 200,
      height: 300,
      marginBottom: 20,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: -6,
      marginBottom: 15,
    },
    ratingText: {
      color: '#fff',
      fontSize: 15,
      marginLeft: 8,
    },
  });

export default HomeScreen;