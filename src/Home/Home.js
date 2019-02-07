import './Home.css';
import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div id="box">
                <h1><span className="green">Genre</span>fy</h1>
                <p className="home-text">
                    Hello Stranger!<br/><br/>
                    Que tal dar uma olhada nos gêneros musicais que você mais curte?<br/>
                    O GENREFY se conecta a sua conta do spotify, obtem a lista dos artistas que você segue e gera um resumo dos estilos musicas destes artistas. Você pode ver os artistas de acordo com o estilo de cada um, e ver qual seu estilo preferido.
                </p>
                <a className="btn-start" href="https://accounts.spotify.com/authorize?client_id=eb39f54405d047f6944e922a8adf6f61&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fresult&scope=user-follow-read" >Bora lá!</a><br />
            </div>
        );
    }
}

export default Home;
