import './home.css'
import { SetPokemons } from '../components/pokemonList/pokemonList'
import { ThemeTogglerButton } from '../components/theme-toggler-button/theme-toggler-button'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '../contexts/theme-context'
import iconPokedex from '../img/icon-pokedex.png'

export const Home = () => {

    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        document.documentElement.style.backgroundColor = theme.background1;
    }, [theme]);

    return (
        <main
            style={{ color: theme.color1, backgroundColor: theme.background1 }}>

            <div className='header'>

                <h1
                    style={{ color: theme.color1, backgroundColor: theme.background2, borderColor: theme.border1 }} className="title">
                    <img className='icon-pokedex' src={iconPokedex} alt='icon pokedex' />
                    POKEDEX
                </h1>
                <ThemeTogglerButton />
            </div>

            <div className="container">
                <SetPokemons />
            </div>
        </main>
    )
}
