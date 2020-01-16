import React, { useEffect, useState } from "react";

import "./global.css";
import "./App.css";
import "./Sidebar.css"
import "./Main.css"
import api from './services/api';

function App() {

    const [devs, setDevs] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [github_username, setGithub_username] = useState('');

    const [techs, setTechs] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        }, (err) => {
            console.error(err);
        }, {
            timeout: 30000
        });

        return () => {

        };
    }, []);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');
            setDevs(response.data);
        }
        loadDevs();
    }, [])

    async function handleAddDev(event) {
        event.preventDefault();
        const response = await api.post('/devs', {
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithub_username('');
        setTechs('');

    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <form onSubmit={handleAddDev}>

                    <div className="input-block">
                        <label htmlFor="github_username">Usuario do Github</label>
                        <input name="github_username" id="github_username" type="text" required
                            onChange={e => { setGithub_username(e.target.value) }}
                            value={github_username} />
                    </div>


                    <div className="input-block">
                        <label htmlFor="techs">Tecnologias</label>
                        <input name="techs" id="techs" type="text" required
                            onChange={e => { setTechs(e.target.value) }}
                            value={techs} />
                    </div>


                    <div className="input-group">
                        <div className="input-block">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="number"
                                name="latitude"
                                id="latitude"
                                required value={latitude}
                                onChange={e => { setLatitude(e.target.value) }} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="longitude">Longitude</label>
                            <input type="number"
                                name="longitude"
                                id="longitude"
                                required value={longitude}
                                onChange={e => { setLongitude(e.target.value) }} />
                        </div>

                    </div>
                    <button type="submit">
                        Salvar
                        </button>
                </form>
            </aside>
            <main>
                <ul>
                    {devs.map((dev, index) => (
                        <li className="dev-item" key={dev._id}>
                            <header>
                                <img src={dev.avatar_url} alt={dev.name} />
                                <div className="user-info">
                                    <strong>{dev.name}</strong>
                                    <span>{dev.techs.join(', ')}</span>
                                </div>
                            </header>
                            <p>{dev.bio}</p>
                            <a href={`https://github.com/${dev.github_username}`}> Acessar perfil no Github</a>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;
