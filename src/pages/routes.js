import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./home"
import { PageDetails } from "./pageDetails"
import { ThemeProvider } from "../contexts/theme-context"

export const AppRoutes = () => {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/pokemon/:id" element={<PageDetails />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}