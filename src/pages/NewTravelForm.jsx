import { useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function NewTravelForm() {
    const { travels, setTravels } = useGlobal();
    const [click, setClick] = useState(false);

    function handleClick() {
        setClick(!click)
    }

    const [newTravel, setNewTravel] = useState({
        id: "",
        destinazione: "",
        inizio: "",
        fine: "",
        partecipanti: []
    });

    function handleChange(e) {
        setClick(false);
        const { id, value } = e.target;
        setNewTravel({
            ...newTravel, [id]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        const viaggioConId = {
            ...newTravel,
            id: travels.length + 1
        };
        setTravels([...travels, viaggioConId])
        setClick(true);
        setNewTravel({
            id: "",
            destinazione: "",
            inizio: "",
            fine: "",
            partecipanti: []
        });
    }

    return (
        <div className="container-fluid container-md mt-3 mt-md-5 px-3 px-md-4">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-sm">
                        <div className="card-header title-background text-white">
                            <h5 className="mb-0">Nuovo Viaggio</h5>
                        </div>
                        <div className="card-body p-3 p-md-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2 mb-md-3">
                                    <label htmlFor="destinazione" className="form-label fw-bold">
                                        Destinazione
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="destinazione"
                                        placeholder="Inserisci la meta del viaggio"
                                        value={newTravel.destinazione}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="row g-2 g-md-3">
                                    <div className="col-12 col-sm-6 mb-2 mb-md-3">
                                        <label htmlFor="dataInizio" className="form-label fw-bold">
                                            Data Inizio
                                        </label>
                                        <input type="date" className="form-control" id="inizio" value={newTravel.inizio} onChange={handleChange} required />
                                    </div>
                                    <div className="col-12 col-sm-6 mb-2 mb-md-3">
                                        <label htmlFor="dataFine" className="form-label fw-bold">
                                            Data Fine
                                        </label>
                                        <input type="date" className="form-control" id="fine" value={newTravel.fine} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-3">
                                    <Link to="/travel" className="d-grid d-sm-block text-decoration-none">
                                        <button type="button" className="btn btn-outline-secondary btn-annulla">
                                            Annulla
                                        </button>
                                    </Link>
                                    <button type="submit" className="btn btn-turchese">
                                        Crea Viaggio
                                    </button>
                                </div>
                            </form>
                            {click && <div className="alert alert-turquoise mt-3 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">Viaggio correttamente inserito <Link to="/travel"><button className="alertButton py-1 btn rounded-pill">Torna Indietro</button></Link></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}