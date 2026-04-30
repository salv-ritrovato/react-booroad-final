import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import DefaultLayout from "./layout/DefaultLayout";
import LoginLayout from "./layout/LoginLayout"
import SingleTravel from "./pages/SingleTravel";
import TravelList from "./pages/TravelList";
import NewTravelForm from "./pages/NewTravelForm";
import NewAttendeesForm from "./pages/NewAttendeesForm";
import Login from "./pages/Login"
import { GlobalContextProvider } from "./context/GlobalContext";


function App() {

  return (
    <>
      <GlobalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<LoginLayout />}>
              <Route element={<Login />} path="/" />
            </Route>
            <Route element={<DefaultLayout />}>
              <Route element={<TravelList />} path="/travel" />
              <Route element={<SingleTravel />} path="/travel/:id" />
              <Route element={<NewTravelForm />} path="/travel_form" />
              <Route element={<NewAttendeesForm />} path="/travel/:id/attendees_form" />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
    </>
  )
}

export default App