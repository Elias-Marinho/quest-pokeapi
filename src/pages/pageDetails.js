import { useContext, useEffect } from 'react'
import { SetPokemon } from '../components/pokemonDetails/pokemonDetails'
import { ThemeContext } from '../contexts/theme-context'
import './pageDetails.css'
import { Link } from 'react-router-dom'
import { ThemeTogglerButton } from '../components/theme-toggler-button/theme-toggler-button'
import iconPokedex from '../img/icon-pokedex.png'

export const PageDetails = () => {

    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        document.documentElement.style.backgroundColor = theme.background1;
    }, [theme]);

    return (
        <main
            style={{ color: theme.color1, backgroundColor: theme.background1 }}>

            <div className='header-details'>
                <Link to={'/'}>
                    <p style={{ color: theme.color1, backgroundColor: theme.background2, borderColor: theme.border1 }}
                        className='btn-back'><a>Back</a></p>
                </Link>

                <Link to={'/'}>
                <h1
                    style={{ color: theme.color1, backgroundColor: theme.background2, borderColor: theme.border1 }} className="title">
                    <img className='icon-pokedex' src={iconPokedex} alt='icon pokedex' />
                    POKEDEX
                </h1>
                </Link>
            <ThemeTogglerButton />
            </div>
            <section>
                <SetPokemon />
            </section>
        </main>
    )
}