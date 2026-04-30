import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLogin }) {
    const userAdmin = "admin";
    const pswAdmin = "admin";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (username === userAdmin && password === pswAdmin) {
            setLogin(true)
            navigate('/travel');
        } else {
            setError('Credenziali errate. Riprova.')
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo-row">
                    <div className="login-logo-icon">
                        <i className="bi bi-airplane-engines-fill"></i>
                    </div>
                    <span className="login-logo-text">
                        BOO<span>ROAD</span>
                    </span>
                </div>

                <div className="divisore"></div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputwrapper">
                        <label className="userinput">Username<i className="bi bi-person input-icon"></i></label>
                        <input
                            type="text"
                            placeholder="Inserisci username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="inputwrapper">
                        <label className="userinput">Password<i className="bi bi-lock"></i></label>
                        <input
                            type="password"
                            placeholder="Inserisci password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button>
                        Accedi
                        <i className="bi bi-box-arrow-in-right ms-2"></i>
                    </button>
                    {error && (
                        <p className="error">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}