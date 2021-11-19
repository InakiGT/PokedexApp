import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../navigator/Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

export const PokemonScreen = ( { navigation, route }: Props ) => {

    const { simplePokemon, color } = route.params;
    const { name, id, picture } = simplePokemon;
    const { isLoading, pokemon: pokemonInfo } = usePokemon( id );

    const { top } = useSafeAreaInsets();

    return (
        <View style={{ flex: 1 }}>
            <View style={[ styles.headerContainer, { backgroundColor: color } ]}>
                <TouchableOpacity
                    onPress={ () => { navigation.pop() } }
                    activeOpacity={ 0.6 }
                    style={{
                        ...styles.backButton,
                        top: top + 5
                    }}
                >
                    <Icon
                        name="arrow-back-outline"
                        color="white"
                        size={ 30 }
                    />
                </TouchableOpacity>

                { /* Pokemon Nombre */ }
                <Text style={{
                    ...styles.pokemonName,
                    top: top + 40
                }}>
                    { name + '\n' }#{ id }
                </Text>

                { /* Pokebola Blanca */ }
                <Image
                    source={ require('../assets/pokebola-blanca.png') }
                    style={ styles.pokeball }
                />

                { /* Pokemon Image */ }
                <FadeInImage
                    uri={ picture }
                    style={ styles.pokemonImage }
                />

            </View>

            { /* Detalles y Loading */ }
            {
                isLoading ? (

                <View style={ styles.activityIndicator }>
                    <ActivityIndicator
                        color={ color }
                        size={ 50 }
                    />
                </View>

                ) : (
                
                <PokemonDetails
                    pokemon={ pokemonInfo }
                />

                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20,
        textTransform: 'capitalize'
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.5
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});