import { useContext, useEffect, useState } from "react";
import { getPokemons } from "../../services/pokeapi"
import { Link } from "react-router-dom";
import { SearchBar } from "../search/search";
import { ThemeContext } from "../../contexts/theme-context";
import { hover } from "@testing-library/user-event/dist/hover";

const PokedexList = (props) => {

    const { theme } = useContext(ThemeContext)

    return (
        <ul style={{ color: theme.color1, backgroundColor: theme.background2, borderColor: theme.border1 }} className="pokemon-cards">
            {
                props.pokemons.map((pokemon, index) => {
                    return (
                        <li key={index} className="pokemon-card">
                            <Link to={`/pokemon/${pokemon.id}`}>
                                <img className="pokemon-img" src={pokemon.sprites.front_default} />
                                <p className="pokemon-name">{pokemon.name}</p>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export const SetPokemons = () => {
    const [info, setDetails] = useState([])
    const [search, setSearch] = useState('')
    const [offset, setOffset] = useState(0)

    const fetchData = async (offset) => {
        const data = await getPokemons(offset)
        setDetails(prevDetails => [...prevDetails, ...data])
    }

    const searchPokemon = async (name) => {
        if (name.length > 0) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            const allPokemon = await response.json();
            const filteredPokemon = allPokemon.results.filter(pokemon => pokemon.name.includes(name));
            const pokemonDetails = await Promise.all(filteredPokemon.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                return await response.json();
            }));
            setDetails(pokemonDetails);
        } else {
            setDetails([]);
            fetchData(0);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => searchPokemon(search), 500);
        return () => clearTimeout(timeoutId);
    }, [search])

    const LoadMoreButton = ({ onClick }) => {

        const { theme } = useContext(ThemeContext)

        return (
            <button
                style={{ color: theme.color2, backgroundColor: theme.background3, borderColor: theme.border2 }} className="load-more" onClick={onClick}>Load More</button>
        )
    }

    const loadMore = () => {
        setOffset(prevOffset => prevOffset + 10)
    }

    useEffect(() => {
        if (search === '') {
            fetchData(offset)
        }
    }, [offset])

    return (
        <>
            <SearchBar onSearch={setSearch} /> { }
            <PokedexList pokemons={info} />
            {info.length > 0 && search === '' && <LoadMoreButton onClick={loadMore} />}
        </>
    )
}