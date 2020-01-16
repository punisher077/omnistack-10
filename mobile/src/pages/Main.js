import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';


export default function Main() {

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
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07,
                })

            }
        };
        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return (
        <MapView style={styles.map} initialRegion={currentRegion}>
            <Marker coordinate={{ latitude: -6.9661426, longitude: -35.7948819 }}>
                <Image style={styles.avatar} source={{ uri: "https://avatars0.githubusercontent.com/u/29128672?s=460&v=4" }} />
                <Callout onPress={() => {

                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Arthur Mauricio</Text>
                        <Text style={styles.devBio}>Técnico em Informatica pelo IFPB. Cursando Engenharia da Computação pelo IFPB.</Text>
                        <Text style={styles.devTechs}>C, Python, ReactJS</Text>
                    </View>
                </Callout>
            </Marker>

        </MapView>
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
    }
});