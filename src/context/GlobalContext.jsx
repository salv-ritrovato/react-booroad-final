import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext()

export function GlobalContextProvider({ children }) {
    const viaggi = [
        {
            id: 1,
            destinazione: "Atene, Grecia",
            inizio: "2026-06-10",
            fine: "2026-06-20",
            partecipanti: [
                { id: 1, nome: "Antonio", cognome: "Falletta", email: "antonio.falletta@email.it", telefono: "333-1234567", CF: "FLLNTN90A01H501U" },
                { id: 2, nome: "Christian", cognome: "Matarazzo", email: "christian.matarazzo@email.it", telefono: "347-2345678", CF: "MTRCRS85M10H501T" },
                { id: 3, nome: "Mariachiara", cognome: "Molinari", email: "mariachiara.molinari@email.it", telefono: "328-3456789", CF: "MLNMCH92E41H501Q" },
                { id: 4, nome: "Salvatore", cognome: "Ritrovato", email: "salvatore.ritrovato@email.it", telefono: "366-4567890", CF: "RTRSVT88P10H501R" },
            ]
        },
        
        {
            id: 2,
            destinazione: "Marrakech, Marocco",
            inizio: "2026-07-05",
            fine: "2026-07-13",
            partecipanti: [
                { id: 1, nome: "Luigi", cognome: "Micco", email: "luigi.micco@email.it", telefono: "380-7890123", CF: "MCCLGU91A01H501Z" },
                { id: 2, nome: "Fabio", cognome: "Pacifici", email: "fabio.pacifici@email.it", telefono: "331-8901234", CF: "PCFFBA87R10H501X" },
                { id: 3, nome: "Grazie", cognome: "Antonio", email: "grazie.antonio@email.it", telefono: "345-9012345", CF: "NTNGRZ93C41H501S" },
            ]
        },
        {
            id: 3,
            destinazione: "Copenaghen, Danimarca",
            inizio: "2026-08-10",
            fine: "2026-08-17",
            partecipanti: [
                { id: 1, nome: "Debora", cognome: "Urbani", email: "debora.urbani@email.it", telefono: "380-7890123", CF: "RBNDBR90A41H501U" },
                { id: 2, nome: "Camilla", cognome: "Tofani", email: "camilla.tofani@email.it", telefono: "331-8901234", CF: "TFNCML88R50H501Z" },
                { id: 3, nome: "Foto", cognome: "Habilaj", email: "foto.habilaj@email.it", telefono: "345-9012345", CF: "HBLFTO82M01Z100X" }
            ]
        },
        {
            id: 4,
            destinazione: "Vilnius, Lituania",
            inizio: "2026-09-05",
            fine: "2026-09-13",
            partecipanti: [
                { id: 1, nome: "Sarunas", cognome: "Prancuitis", email: "sarunas.prancuitis@email.it", telefono: "380-7890123", CF: "PRNSRN90A01Z122Q" },
                { id: 2, nome: "Gerry", cognome: "Scotti", email: "gerry.scotti@email.it", telefono: "331-8901234", CF: "SCTGRY56H07F205H" },
                { id: 3, nome: "Carlo", cognome: "Conti", email: "carlo.conti@email.it", telefono: "345-9012345", CF: "CNTCRL61T13D612U" }
            ]
        }
    ]

    const [travels, setTravels] = useState(() => {
        const saved = localStorage.getItem("travels_data");
        return saved ? JSON.parse(saved) : viaggi;
    });

    useEffect(() => {
        localStorage.setItem("travels_data", JSON.stringify(travels));
     /* localStorage.clear()  */
    }, [travels]);

    return (
        <GlobalContext.Provider value={{ travels, setTravels }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobal() {
    const context = useContext(GlobalContext)

    return context
}