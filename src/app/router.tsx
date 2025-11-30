import { Route, Routes } from 'react-router';

import Cart from './pages/Cart';
import Landing from "./pages/Landing";
import Browse from './pages/Browse';
import ContactUs from './pages/ContactUs';


export default function AppRouter() {
    return (
        <Routes>
            <Route 
                path="/" 
                element={<Landing />} 
            />
            <Route
                path="/browse"
                element={
                    <Browse />
                }
            />
            <Route
                path="/cart"
                element={
                    <Cart />
                }
            />
            <Route 
                path='/contact-us'
                element={
                    <ContactUs />
                }
            />
        </Routes>
    );
}
