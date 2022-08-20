import axios from "axios";
import type * as React from "react";
import { useEffect, useReducer } from "react";
import { ActionStatus } from "../../types/global";
import { PokemonActionTypes, pokemonReducer } from "./store/store";
import type { Pokemon } from "./store/types";

export default function Template(props: React.PropsWithChildren) {

    const [state, dispatch] = useReducer(pokemonReducer, {});
    
    useEffect(() => {
        fetchPokemons();
    }, []);
    
    async function fetchPokemons() {
        dispatch({type: PokemonActionTypes.SET_POKEMON, payload: {status: ActionStatus.FETCHING}})
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');

            setTimeout(() => {
                dispatch({type: PokemonActionTypes.SET_POKEMON, payload: {
                    pokemons: response.data,
                    status: ActionStatus.SUCCESS
                }});
            } , 1500)

        } catch(err) {
            console.log(err)
            dispatch({type: PokemonActionTypes.SET_POKEMON, payload: {status: ActionStatus.ERROR} });
        }
    }
    
    switch(state.status) {
        case ActionStatus.INITIAL:
        case ActionStatus.FETCHING:
            return <>Aguarde, carregando...</>;
        case ActionStatus.ERROR:
            return <>Ocorreu um erro tente novamente mais tarde</>;
        case ActionStatus.SUCCESS:
            return <Page data={state.pokemons?.results!} />;
    }
    
}

function Page({data} : {data: Pokemon[]}) {

    return(
        <>
            {data.map((pokemon) => (
                <><a href={pokemon.url} target="_blank">{pokemon.name}</a> <br /></>
            ) )}
        </>
    );

}