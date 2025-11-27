import { Route, Routes, Navigate } from 'react-router';
import Landing from "@/app/pages/storefront/Landing.tsx";
import Browse from './pages/storefront/Browse';
import Test from './pages/storefront/test';


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
                path="/home"
                element={
                    <Landing/>     
                }
            />    
            <Route
                path="/browse"
                element={
                    <Browse />
                }
            />
            <Route
                path='/test'
                element={<Test />}
            />  



        </Routes>
    );
}
