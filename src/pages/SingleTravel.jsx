import { useGlobal } from "../context/GlobalContext"
import { useParams, Link } from "react-router-dom"
import { useState } from "react"

export default function SingleTravel() {
    const { travels, setTravels } = useGlobal()
    const [openCard, setOpenCard] = useState(null)
    const [travelerId, setTravelerId] = useState(null)
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null)
    const [editData, setEditData] = useState({ nome: "", cognome: "", email: "", telefono: "", CF: "" })
    const { id } = useParams()
    const travel = travels.find(travel => travel.id === Number(id))
    const filteredParticipants = travel.partecipanti.filter(p =>
        `${p.nome} ${p.cognome}`.toLowerCase().includes(search.toLowerCase())
    );

    if (!travel) return <h2>Viaggio non trovato</h2>

    function handleClick(id) {
        setTravelerId(id)
        if (openCard === id) {
            setOpenCard(null)
        } else {
            setOpenCard(id)
        }
    }

    const getInitials = (nome, cognome) => {
        return `${nome?.[0] || ""}${cognome?.[0] || ""}`.toUpperCase();
    };

    function updateParticipants(updater) {
        setTravels(travels.map(t =>
            t.id === Number(id)
                ? { ...t, partecipanti: updater(t.partecipanti) }
                : t
        ))
    }

    function handleDelete(e, partecipanteId) {
        e.stopPropagation()
        if (!window.confirm("Vuoi eliminare questo partecipante?")) return
        updateParticipants(list => list.filter(p => p.id !== partecipanteId))
        if (editingId === partecipanteId) setEditingId(null)
    }

    function handleEdit(e, partecipante) {
        e.stopPropagation()
        setEditingId(partecipante.id)
        setEditData({
            nome: partecipante.nome,
            cognome: partecipante.cognome,
            email: partecipante.email,
            telefono: partecipante.telefono,
            CF: partecipante.CF,
        })
    }

    function handleEditChange(e) {
        const { id: field, value } = e.target
        setEditData(prev => ({ ...prev, [field]: value }))
    }

    function handleEditSave(e) {
        e.preventDefault()
        updateParticipants(list =>
            list.map(p => p.id === editingId ? { ...p, ...editData } : p)
        )
        setEditingId(null)
    }

    function handleEditCancel(e) {
        e.stopPropagation()
        setEditingId(null)
    }

    return (
        <>
            {/* PAGE HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="maintitle m-0">
                    {travel.destinazione}
                </h2>
                <div className="d-flex gap-2">
                    <Link to="/travel">
                        <button className="btn btn-turchese rounded-pill px-4">
                            <i className="bi bi-arrow-left me-1"></i>
                            
                        </button>
                    </Link>
                    <Link to={`/travel/${id}/attendees_form`}>
                        <button className="btn btn-turchese rounded-pill px-4">
                            <i className="bi bi-person-plus me-1 "></i>
                            
                        </button>
                    </Link>
                </div>
            </div>

            {/* SEARCH BAR // FILTER */}
            <div className="position-relative mt-3 mb-4">
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                    type="text"
                    placeholder="Cerca partecipante..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control ps-5 py-2 search rounded-pill"
                />
            </div>

            {/* ATTENDEES CARDS */}
            <div key={travel.id}>
                <p className="h3 subtitle">Lista dei partecipanti:</p>
                {filteredParticipants.length === 0 ? (
                    <div className="alert alert-danger">Nessuna corrispondenza per "{search}"</div>
                ) : (
                    <div className="row g-4">
                        {filteredParticipants.map(partecipante => (
                            <div key={partecipante.id} className="col-12 col-sm-6 col-lg-4">
                                <div className="card shadow-sm border-0 viaggio-card" onClick={() => editingId !== partecipante.id && handleClick(partecipante.id)}>
                                    <div className="card-body">
                                        <div className="d-flex align-items-top justify-content-between gap-3">
                                            <div className="avatar-placeholder">
                                                {getInitials(partecipante.nome, partecipante.cognome)}
                                            </div>
                                            <div className="d-flex g-2">
                                                <button className="cancel_btn" onClick={(e) => handleEdit(e, partecipante)}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button className="cancel_btn" onClick={(e) => handleDelete(e, partecipante.id)}>
                                                    <i className="bi bi-trash3 x_icon"></i>
                                                </button>
                                            </div>
                                        </div>
                                        {editingId === partecipante.id ? (
                                            <form className="mt-3 small" onClick={(e) => e.stopPropagation()} onSubmit={handleEditSave}>
                                                <div className="mb-2">
                                                    <label htmlFor="nome" className="form-label fw-bold mb-1">Nome</label>
                                                    <input id="nome" className="form-control form-control-sm" value={editData.nome} onChange={handleEditChange} required />
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="cognome" className="form-label fw-bold mb-1">Cognome</label>
                                                    <input id="cognome" className="form-control form-control-sm" value={editData.cognome} onChange={handleEditChange} required />
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="email" className="form-label fw-bold mb-1">Email</label>
                                                    <input id="email" type="email" className="form-control form-control-sm" value={editData.email} onChange={handleEditChange} required />
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="telefono" className="form-label fw-bold mb-1">Telefono</label>
                                                    <input id="telefono" className="form-control form-control-sm" value={editData.telefono} onChange={handleEditChange} required />
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="CF" className="form-label fw-bold mb-1">Codice Fiscale</label>
                                                    <input id="CF" className="form-control form-control-sm" value={editData.CF} onChange={handleEditChange} required />
                                                </div>
                                                <div className="d-flex justify-content-end gap-2 mt-3">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleEditCancel}>Annulla</button>
                                                    <button type="submit" className="btn btn-sm btn-turchese text-white">Salva</button>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                <h5 className="card-title fw-semibold">
                                                    <i className="bi bi-person-fill"></i> {partecipante.nome} {partecipante.cognome}
                                                </h5>
                                                {openCard && partecipante.id === travelerId && (
                                                    <div className="mt-3 small text-muted">
                                                        <div><strong><i className="bi bi-envelope-fill"></i>:</strong> {partecipante.email}</div>
                                                        <div><strong><i className="bi bi-telephone-fill"></i>:</strong> <a className="telefono-link" href={`tel:${partecipante.telefono}`}>
                                                            {partecipante.telefono}
                                                        </a>
                                                        </div>
                                                        <div><strong><i className="bi bi-person-vcard-fill"></i>:</strong> {partecipante.CF}</div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}