import AppHeader from "../components/AppHeader"
import { Outlet } from "react-router-dom"

export default function DefaultLayout() {
    return (
        <>
            <AppHeader />
            <main className="container py-4">
                <Outlet />
            </main>
        </>
    )
}