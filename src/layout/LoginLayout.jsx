import { Outlet } from "react-router-dom"

export default function DefaultLayout() {
    return (
        <>
            <main className="container py-4">
                <Outlet />
            </main>
        </>
    )
}