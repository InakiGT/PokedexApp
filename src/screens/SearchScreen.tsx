import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { PokemonCard } from '../components/PokemonCard';
import { styles as globalStyles } from '../theme/appTheme';
import { Loading } from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();

    const [ pokemonFiltered, setPokemonFiltered ] = useState<SimplePokemon[]>([]);
    const [ term, setTerm ] = useState('');

    useEffect(() => {
        // Aplicar filtro
        if( term.length === 0 ) {
            return setPokemonFiltered([]);
        }

        if( isNaN( Number(term) ) ) {
            setPokemonFiltered(
                simplePokemonList.filter( poke => poke.name.toLowerCase()
                    .includes( term.toLocaleLowerCase() ))
            );
        } else {
            const pokemonById =  simplePokemonList.find( poke => poke.id === term.trim() );
            setPokemonFiltered(
                (pokemonById) ? [pokemonById] : []
            );
        }

    }, [ term ]);


    if( isFetching ) {
        return (
            <Loading />
        );
    }

    return (
        <View style={{
            flex: 1,
            ...globalStyles.globalMargin
        }}>
            
            <SearchInput
                onDebounce={ ( value ) => setTerm( value ) }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: ( Platform.OS === 'ios' ) ? top : top + 30
                }}
            />

            <FlatList
                data={ pokemonFiltered }
                keyExtractor={ ( pokemon ) => pokemon.id }
                showsVerticalScrollIndicator={ false }
                numColumns={ 2 }

                ListHeaderComponent={ () => (
                    <Text style={{
                        ...globalStyles.title,
                        ...globalStyles.globalMargin,
                        paddingBottom: 10,
                        marginTop: ( Platform.OS === 'ios' ) ? top + 60 : top + 80
                    }}>{ term }</Text>
                ) }

                renderItem={ ({ item, index }) => (
                    <PokemonCard pokemon={ item } />
                ) }

                // Infinite Scroll
                onEndReachedThreshold={ 0.4 }
            />

        </View>
    )
}