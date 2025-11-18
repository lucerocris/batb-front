import { Route, Routes, Navigate } from 'react-router';
import Dashboard from "@/app/pages/admin/Dashboard.tsx";
import AdminLayout from "@/app/layout/AdminLayout.tsx";
import User from "@/app/pages/admin/Users.tsx";
import Items from "@/app/pages/admin/Items.tsx";
import Analytics from "@/app/pages/admin/Analytics.tsx";
import Tasks from "@/app/pages/admin/Tasks.tsx";


import Landing from "@/app/pages/storefront/Landing.tsx";
import Browse from './pages/storefront/Browse';
import Cart from './pages/storefront/Cart';
import Test from './pages/storefront/test';

export default function AppRouter() {
    return (
        <Routes>
            {/* STOREFRONT */}
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
            {/* ADMIN */}
            <Route
                path="/admin/dashboard"
                element={
                    <AdminLayout>
                        <Dashboard/>
                    </AdminLayout>
                }
            />
            <Route path="/admin/analytics" element={
                <AdminLayout>
                    <Analytics/>
                </AdminLayout>
            }/>

            <Route path="/admin/users" element={
                <AdminLayout>
                    <User/>
                </AdminLayout>
            } />

            <Route path="/admin/tasks" element={
                <AdminLayout>
                    <Tasks/>
                </AdminLayout>
            } />

            <Route path="/admin/items" element={
                <AdminLayout>
                    <Items/>
                </AdminLayout>
            } />

            <Route
                path='/test'
                element={<Test />}
            />  
        </Routes>
    );
}
