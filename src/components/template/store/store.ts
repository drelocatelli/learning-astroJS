import type { ActionStatus } from "../../../types/global";
import type { PokemonInitialState } from "./types";

interface PokemonAction {
    type: PokemonActionTypes;
    payload: {
        pokemons?: PokemonInitialState;
        status?: ActionStatus;
    };
}

interface PokemonState {
    status?: ActionStatus;
    pokemons?: PokemonInitialState;
}

export enum PokemonActionTypes {
    SET_POKEMON
}

const pokemonReducer =  (state: PokemonState, action : PokemonAction) : PokemonState => {
    switch(action.type) {
        case PokemonActionTypes.SET_POKEMON:
            return {
                ...state,
                status: action.payload.status,
                pokemons: action.payload.pokemons
            }
        default:
            return state;
    }
}

export {pokemonReducer};