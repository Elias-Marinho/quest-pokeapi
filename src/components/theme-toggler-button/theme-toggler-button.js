import { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/theme-context"
import { Button } from "../button/button";

export const ThemeTogglerButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    const handleClick = (event) => {
        event.preventDefault();
        setTheme(theme === themes.light ? themes.dark : themes.light);
    }

    return (
        <div>
            <Button onClick={handleClick}>
                <img className="img-btn" src={theme.buttonImg} alt="Tema" />
            </Button>
        </div>
    )
}   