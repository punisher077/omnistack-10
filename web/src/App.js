import React, { useEffect, useState } from "react";

import "./global.css";
import "./App.css";
import "./Sidebar.css"
import "./Main.css"


function App() {
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
            console.log(err);
        }, {
            timeout: 30000
        });

        return () => {

        };
    }, []);

    async function handleAddDev(event) {
        event.preventDefault();

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
                    <li className="dev-item">
                        <header>
                            <img src="https://avatars0.githubusercontent.com/u/29128672?s=460&v=4" alt="Arthur Mauricio" />
                            <div className="user-info">
                                <strong>Arthur Mauricio</strong>
                                <span>A,B,C</span>
                            </div>
                        </header>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et diam dignissim, dignissim diam molestie, porta orci. In hac habitasse platea dictumst. Phasellus egestas laoreet egestas. </p>
                        <a href="https:/github.com/punisher077"> Acessar perfil no Github</a>
                    </li>

                    <li className="dev-item">
                        <header>
                            <img src="https://avatars0.githubusercontent.com/u/29128672?s=460&v=4" alt="Arthur Mauricio" />
                            <div className="user-info">
                                <strong>Arthur Mauricio</strong>
                                <span>A,B,C</span>
                            </div>
                        </header>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et diam dignissim, dignissim diam molestie, porta orci. In hac habitasse platea dictumst. Phasellus egestas laoreet egestas. </p>
                        <a href="https:/github.com/punisher077"> Acessar perfil no Github</a>
                    </li>
                    <li className="dev-item">
                        <header>
                            <img src="https://avatars0.githubusercontent.com/u/29128672?s=460&v=4" alt="Arthur Mauricio" />
                            <div className="user-info">
                                <strong>Arthur Mauricio</strong>
                                <span>A,B,C</span>
                            </div>
                        </header>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et diam dignissim, dignissim diam molestie, porta orci. In hac habitasse platea dictumst. Phasellus egestas laoreet egestas. </p>
                        <a href="https:/github.com/punisher077"> Acessar perfil no Github</a>
                    </li>
                </ul>
            </main>
        </div>
    );
}

export default App;
