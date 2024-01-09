import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme-context"

export const Button = (props) => {

    const { theme } = useContext(ThemeContext)

    return (
        <button className="theme-btn" {...props}
            style={{ borderColor: theme.border2}} />
    )
}