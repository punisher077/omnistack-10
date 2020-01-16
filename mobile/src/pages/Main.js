import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from "@expo/vector-icons";


export default function Main({ navigation }) {

    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords: { latitude, longitude } } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                })

            }
        };
        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView style={styles.map} initialRegion={currentRegion}>
                <Marker coordinate={{ latitude: -6.9661426, longitude: -35.7948819 }}>
                    <Image style={styles.avatar} source={{ uri: "https://avatars0.githubusercontent.com/u/29128672?s=460&v=4" }} />
                    <Callout onPress={() => {
                        navigation.navigate('Profile', { github_username: 'punisher077' });
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>Arthur Mauricio</Text>
                            <Text style={styles.devBio}>Técnico em Informatica pelo IFPB. Cursando Engenharia da Computação pelo IFPB.</Text>
                            <Text style={styles.devTechs}>C, Python, ReactJS</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.searchForm}>
                <TextInput style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false} />


                <TouchableOpacity style={styles.loadBtn} onPress={() => { }}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: "#FFF"
    },
    callout: {
        width: 220,
    },
    devName: {
        fontWeight: "bold",
        fontSize: 16
    },
    devBio: {
        color: "#666",
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row"
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#fff",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 4
    },
    loadBtn: {
        width: 50,
        height: 50,
        backgroundColor: "#8E4DFF",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
        borderRadius: 25
    }
});