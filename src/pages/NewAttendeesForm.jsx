import { useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function NewAttendeesForm() {
    const { id } = useParams();
    const { travels, setTravels } = useGlobal();
    const [newAttendee, setNewAttendee] = useState({ id: "", nome: "", cognome: "", email: "", telefono: "", CF: "" });
    const [click, setClick] = useState(false);

    function handleSubmit(e) {
        e.preventDefault()
        const travelId = Number(id);
        const currentTravel = travels.find(travel => travel.id === travelId);
        const attendeesId = {
            ...newAttendee,
            id: currentTravel.partecipanti?.length + 1
        };
        const updatedTravels = travels.map(travel => {
            if (travel.id === travelId) {
                return {
                    ...travel, partecipanti: [...travel.partecipanti, attendeesId]
                };
            }
            return travel;
        });
        setTravels(updatedTravels)
        setClick(true);
        setNewAttendee({
            id: "",
            nome: "",
            cognome: "",
            email: "",
            telefono: "",
            CF: ""
        });
        console.log(travels)
    }

    function handleChange(e) {
        setClick(false);
        const { id, value } = e.target;
        setNewAttendee({
            ...newAttendee, [id]: value
        })
    }

    return (
        <div className="container-fluid container-md mt-3 mt-md-5 px-3 px-md-4">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-sm">
                        <div className="card-header title-background text-white">
                            <h5 className="mb-0">Nuovo Partecipante</h5>
                        </div>
                        <div className="card-body p-3 p-md-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-2 g-md-3">
                                    <div className="col-12 col-sm-6 mb-2 mb-md-3">
                                        <label htmlFor="nome" className="form-label fw-bold">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm form-control-md-lg"
                                            id="nome"
                                            placeholder="Es. Mario"
                                            value={newAttendee.nome}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-sm-6 mb-2 mb-md-3">
                                        <label htmlFor="cognome" className="form-label fw-bold">
                                            Cognome
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cognome"
                                            placeholder="Es. Rossi"
                                            value={newAttendee.cognome}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-2 mb-md-3">
                                    <label htmlFor="email" className="form-label fw-bold">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="nome@esempio.it"
                                        value={newAttendee.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-2 mb-md-3">
                                    <label htmlFor="telefono" className="form-label fw-bold">
                                        Telefono
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="telefono"
                                        placeholder="+39 333 0000000"
                                        value={newAttendee.telefono}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-2 mb-md-3">
                                    <label htmlFor="codiceFiscale" className="form-label fw-bold">
                                        Codice Fiscale
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="CF"
                                        placeholder="Inserisci il codice fiscale"
                                        value={newAttendee.CF}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-3">
                                    <Link to={`/travel/${id}`} className="d-grid d-sm-block text-decoration-none">
                                        <button type="button" className="btn btn-outline-secondary">
                                            Annulla
                                        </button>
                                    </Link>
                                    <button type="submit" className="btn btn-turchese text-white">
                                        Aggiungi Partecipante
                                    </button>
                                </div>
                            </form>
                            {click && <div className="alert alert-turquoise mt-3 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">Partecipante aggiunto con successo! <Link to={`/travel/${id}`}><button className="alertButton py-1 btn rounded-pill">Torna Indietro</button></Link></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}