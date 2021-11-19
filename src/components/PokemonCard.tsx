import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState }  from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageColors from 'react-native-image-colors';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { RootStackParams } from '../navigator/Navigator';

const windowWidth =  Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ( { pokemon }: Props ) => {

    const navigator = useNavigation();

    const [ bgColor, setBgColor ] = useState('grey');
    const isMounted = useRef(true);

    useEffect ( () => {
        
        const uri = pokemon.picture;
        ImageColors.getColors( uri, { fallback: 'grey' })
            .then( colors => {
                if( !isMounted.current ) return;
                if( colors.platform === 'android' ) {
                    setBgColor( colors.dominant || 'grey' );
                } else if( colors.platform === 'ios' ) {
                    setBgColor( colors.background || 'grey' )
                }
            });
        
        // Cuando el componente de destruye
        return () => {
            isMounted.current = false;
        }

    }, []);

    return (
        <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ () => { navigator.navigate('PokemonScreen', { simplePokemon: pokemon, color: bgColor }) } }
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}>
                { /* Nombre del Pokemon y ID */ }
                <View>
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>

                <View style={ styles.pokebolaComtainer }>
                    <Image
                        source={ require('../assets/pokebola-blanca.png') }
                        style={ styles.pokebola }
                    />
                </View>

                <FadeInImage
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25,
        opacity: 0.5
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -7,
        bottom: -5
    },
    pokebolaComtainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden'
    }
});