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

export default HomeScreen;