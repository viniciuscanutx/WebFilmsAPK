import React, { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicador, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const VideoPlayer = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;
    const [videoUrl, setVideoUrl] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const videoApiUrl = `https://web-films-api.vercel.app/${id}`;

        fetch(videoApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar o filme');
                }
                return response.json();
            })
            .then(data => {
                setVideoUrl(data.link);
                setTitle(data.titulo);
                setLoading(false);
            })
            .catch(error => {
                setError("Não foi possível carregar o filme.")
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <ActivityIndicador size="large" color="#0000ff" />
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {videoUrl ? (
                <WebView
                    source={{ uri: videoUrl }}
                    style={styles.webview}
                    allowsFullscreenVideo
                />
            ) : (
                <Text>O filme não está disponível.</Text>
            )}
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
    )}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 20,
            marginBottom: 16,
        },
        webview: {
            width: '100%',
            height: 400,
            marginBottom: 16,
        },
        errorText: {
            color: 'red',
        },
    })