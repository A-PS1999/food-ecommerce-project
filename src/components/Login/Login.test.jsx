import { render, screen } from '../../utils/testUtils';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
const BASE_URL = import.meta.env.VITE_BASE_URL;

beforeEach(() => {
    render(
        <>
            <Navbar BASE_URL={BASE_URL} />
                <Routes>
                    <Route path="/log-in" element={Login({ BASE_URL })} />
                </Routes>
            <Footer BASE_URL={BASE_URL} />
        </>
    )
})

describe("Login", () => {

    it("renders properly", () => {
        expect(screen.findByText("Don't have an account?"))
    })

})
