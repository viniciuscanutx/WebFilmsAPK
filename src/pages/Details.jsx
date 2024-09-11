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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011627',
        padding: 20,
        flexDirection: 'column',
    },
    mainContent: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 25,
    },
    poster: {
        width: 100,
        height: 150,
        marginRight: 20,
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        color: '#fff',
        fontSize: 12,
        marginTop: -8,
        marginBottom: 16,
    },
    webviewContainer: {
        width: '100%',
        height: '50%',
        marginBottom: 80,
    },
    webview: {
        width: '100%',
        height: '100%',
        marginBottom: 121,
        backgroundColor: "#000000"
    },
    errorText: {
        color: 'red',
    },
    noVideoText: {
        color: '#fff',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -11,
        marginBottom: 13,
    },
    ratingText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 8,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    contactText: {
        color: '#fff',
        fontSize: 10,
    },
    underline: {
        textDecorationLine: 'underline',
    },
});

export default MovieDetails;