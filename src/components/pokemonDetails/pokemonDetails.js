import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../../services/pokeapi";
import { ThemeContext } from "../../contexts/theme-context";

const PokemonDetails = ({ pokemon, typeNames }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <section className='details'>
            <div
                style={{ color: theme.color1, backgroundColor: theme.background2, borderColor: theme.border1 }} className="card-pokemon">
                {pokemon.sprites && (
                    <img className="pokemon-img" src={pokemon.sprites.front_default} alt={pokemon.species.name} />
                )}
                <h2 className="pokemon-title">{pokemon.species ? pokemon.species.name : 'Carregando...'}</h2>
                <p className="pokemon-type">Type: {typeNames.join(', ')}</p>
            </div>
            <div
                style={{ color: theme.color1, backgroundColor: theme.background2, borderColor: theme.border1 }} className="card-info">
                <h3>Ability</h3>
                <ul>
                    {pokemon.abilities && pokemon.abilities.map((ability, index) => (
                        <li className="abilitys" key={index}>
                            <p><strong>{ability.abilityName}</strong>: {ability.effect}</p>
                        </li>
                    ))}
                </ul>
                <h3>Moves</h3>
                <ul className="container-move">
                    {pokemon.moves && pokemon.moves.slice(0, 20).map((move, index) => (
                        <li className="moves" key={index}>
                            <p>{move.move.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export const SetPokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [typeNames, setTypeNames] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const pokemonData = await getPokemon(id);
                setPokemon(pokemonData);

                if (pokemonData.types) {
                    const typeNamesData = await Promise.all(
                        pokemonData.types.map(async (type) => {
                            const typeResponse = await fetch(type.type.url);
                            const typeData = await typeResponse.json();
                            return typeData.name;
                        })
                    );
                    setTypeNames(typeNamesData);
                }
            } catch (error) {
                console.error('Erro ao obter dados do Pokémon:', error);
            }
        }

        fetchData();
    }, [id]);

    return (
        <PokemonDetails pokemon={pokemon} typeNames={typeNames} />
    );
}