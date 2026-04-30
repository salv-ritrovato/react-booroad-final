import { useState } from 'react'
import { useGlobal } from '../context/GlobalContext'
import { Link } from 'react-router-dom'


export default function TravelList() {
    const { travels, setTravels } = useGlobal()

    return (
        <div className="row g-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="maintitle m-0">
                    Viaggi attivi
                </h1>
                <Link to="/travel_form">
                    <button className='btn btn-turchese'>
                        <i className="bi bi-plus-lg me-1"></i>
                        Aggiungi viaggio
                    </button>
                </Link>
            </div>
            {
                travels.map((travel) => (
                    <div key={travel.id} className="col-12 col-sm-6 col-lg-4">
                        <div className="card h-100 mb-3 viaggio-active">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold viaggio-dest">
                                    {travel.destinazione}
                                </h5>
                                <p className="card-text text-muted small mb-0">
                                    <i className="bi bi-calendar3 me-1"></i>
                                    {travel.inizio} → {travel.fine}
                                </p>
                                <div className='d-flex justify-content-end'>
                                    <Link to={`/travel/${travel.id}`}>
                                        <button className='btn viaggio-btn'>
                                            Dettagli <i className="bi bi-arrow-right ms-1"></i>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}