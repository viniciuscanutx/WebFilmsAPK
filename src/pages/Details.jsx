import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, Dimensions, Linking } from "react-native";
import { WebView } from 'react-native-webview';
import { FontAwesome } from '@expo/vector-icons';

const MovieDetails = ({ route }) => {
    const { movie } = route.params;
    const [loading, setLoading] = useState(true);
    const [error] = useState(null);
  
    useEffect(() => {
      setLoading(false);
    }, [movie.link]);
  
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }
  
    const handleContactPress = () => {
      Linking.openURL('mailto:support@example.com'); 
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <Image
            source={{ uri: movie.poster }}
            style={styles.poster}
            resizeMode="contain"
          />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{movie.titulo}</Text>
            <View style={styles.rating}>
              <FontAwesome name="star" size={24} color="red" /> 
              <Text style={styles.ratingText}>{movie.nota}</Text>
            </View>
            <Text style={styles.description}>{movie.sinopse}</Text>
          </View>
        </View>
        <View style={styles.webviewContainer}>
          {movie.link ? (
            <WebView
              source={{ uri: movie.link }}
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={true}
            />
          ) : (
            <Text style={styles.noVideoText}>O filme não está disponível.</Text>
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.contactText} onPress={handleContactPress}>
            Relatou algum bug? <Text style={styles.underline}>Entre em contato</Text>
          </Text>
        </View>
      </View>
    );
  };



export default MovieDetails;