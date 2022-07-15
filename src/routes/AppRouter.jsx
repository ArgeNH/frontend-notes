import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ArchivedNotes } from '../pages/ArchivedNotes'
import { Home } from '../pages/Home'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/archived" element={<ArchivedNotes />} />
            </Routes>
        </BrowserRouter>
    )
}
