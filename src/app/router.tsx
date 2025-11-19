import { Route, Routes, Navigate } from 'react-router';
import Dashboard from "@/app/pages/admin/Dashboard.tsx";
import Landing from "@/app/pages/storefront/Landing.tsx";
import AdminLayout from "@/app/layout/AdminLayout.tsx";
import Browse from './pages/storefront/Browse';
import Test from './pages/storefront/test';
import Analytics from "@/app/pages/admin/Analytics.tsx";
import Tasks from "@/app/pages/admin/Tasks.tsx";
import Items from "@/app/pages/admin/Items.tsx";
import User from "@/app/pages/admin/Users.tsx";
import Orders from "@/app/pages/admin/Orders.tsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
                path="/admin/dashboard"
                element={
                    <AdminLayout>
                        <Dashboard/>
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

            <Route path="/admin/orders" element={
                <AdminLayout>
                    <Orders/>
                </AdminLayout>
            } />

        </Routes>
    );
}
