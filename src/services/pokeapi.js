import { limit, link } from "./variables";

export async function getPokemons(offset) {
    const response = await fetch(`${link}/pokemon/?limit=${limit}/&offset=${offset}`);
    const firstPokemonList = await response.json();

    const pokemonList = await Promise.all(
        firstPokemonList.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return await response.json();
        })
    );

    return pokemonList;
}

export async function getPokemon(id) {
    try {
        const response = await fetch(`${link}/pokemon/${id}`);
        const pokemonData = await response.json();
        const abilitiesData = await Promise.all(

            pokemonData.abilities.map(async (ability) => {
                const abilityResponse = await fetch(ability.ability.url);
                const abilityData = await abilityResponse.json();

                const effectEntry = abilityData.effect_entries.find(entry => entry.language.name === 'en');
                const effect = effectEntry ? effectEntry.effect : 'Efeito não disponível';

                return { abilityName: ability.ability.name, effect };
            })
        );

        return { ...pokemonData, abilities: abilitiesData };
    } catch (error) {
        throw new Error(`Erro ao obter dados do Pokémon: ${error.message}`);
    }
}