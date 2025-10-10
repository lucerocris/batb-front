import { Route, Routes, Navigate } from 'react-router';
import Dashboard from "@/app/pages/admin/Dashboard.tsx";
import Landing from "@/app/pages/storefront/Landing.tsx";
import AdminLayout from "@/app/layout/AdminLayout.tsx";
import Browse from './pages/storefront/Browse';
import Test from './pages/storefront/test';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
                path="/admin/dashboard"
                element={
                    <AdminLayout>
                        <Dashboard />
                    </AdminLayout>
                }
            />
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
