import { useState } from "react";
import { useContext } from 'react'
import { ThemeContext } from "../../contexts/theme-context";

export const SearchBar = ({ onSearch }) => {

    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        setSearch(e.target.value);
        onSearch(e.target.value);
    }

    const { theme } = useContext(ThemeContext)

    return (
        <input
            style={{ color: theme.color2, backgroundColor: theme.background3, borderColor: theme.border2 }} className="search" type="text" value={search} onChange={handleSearch} placeholder="Search Pokemon" />
    )
}