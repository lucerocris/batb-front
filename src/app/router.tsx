import {Route, Routes} from 'react-router';
import Dashboard from "@/app/pages/admin/Dashboard.tsx";
import AdminLayout from "@/app/layout/AdminLayout.tsx";
import Analytics from "@/app/pages/admin/Analytics.tsx";
import Tasks from "@/app/pages/admin/Tasks.tsx";
import Items from "@/app/pages/admin/Items.tsx";
import User from "@/app/pages/admin/Users.tsx";

export default function AppRouter() {
    return (
        <Routes>
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

        </Routes>
    );
}
