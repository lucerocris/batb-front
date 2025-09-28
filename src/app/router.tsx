import { Route, Routes } from 'react-router';
import Dashboard from "@/app/pages/admin/Dashboard.tsx";
import AdminLayout from "@/app/layout/AdminLayout.tsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route
                path="/admin/dashboard"
                element={
                    <AdminLayout>
                        <Dashboard />
                    </AdminLayout>
                }
            />
        </Routes>
    );
}
