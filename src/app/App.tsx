import AppProvider from "./provider.tsx";
import AppRouter from './router.tsx';
import "@fontsource/raleway/600.css"

export default function App() {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
}
