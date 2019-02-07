import './Result.css';
import React, { Component } from 'react';
import GenreItem from './Components/GenreItem/GenreItem';
import ArtistItem from './Components/ArtistItem/ArtistItem';
import axios from 'axios';

class Result extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            spotifyToken: '',
            genres: [],
            artists: [],
            selectedGenre: null,
            selectedGenreDesc: '',
            error: false,
        };

        let regEx = /=(.*?)&/g;
        let token = regEx.exec(window.location.hash)[0];

        this.state.spotifyToken = token.substr(1, token.length-2);
    };

    getAllData() {
        this.setState({
            isLoading : true
        });
        axios.post('http://localhost:3000/artists/build', {token: this.state.spotifyToken}).then((data) => {
            let user = data.data.user;

            if (typeof user === 'undefined'){
                throw Object.assign({},{message: "Usuário não existente"});
            }

            return axios.get('http://localhost:3000/artists/data?user=' + user);
        }).then((data) => {
            this.setState({
                isLoading : false,
                genres: data.data.genres,
                artists: data.data.artists,
                selectedGenre: null,
            });
        }).catch((error) => {
            this.setState({
                isLoading : false,
                genres: [],
                artists: [],
                selectedGenre: null,
                error: "Ops, algo deu errado. Tente novamente!"
            });
            console.error(error);
        })
    };

    genreSelect = (genre) => {
        this.setState({
            selectedGenre: genre.id,
            selectedGenreDesc: genre.name
        });
    }

    createListOfGenres() {
        let defaultGenre = {
            id: 0,
            name: "Todos"
        }
        let genres = [<GenreItem genre={defaultGenre} onSelectGenre={this.genreSelect}/>];

        for(let i in this.state.genres){
            genres.push(<GenreItem genre={this.state.genres[i]} onSelectGenre={this.genreSelect}/>);
        }

        return genres;
    };

    createListOfArtists() {
        let artists = [];

        if(this.state.selectedGenre !== 0 && this.state.selectedGenre !== null) {
            artists = this.state.artists.filter((artist) => {
                return artist.genres.indexOf(this.state.selectedGenre) >= 0
            });
        } else {
            artists = this.state.artists;
        }

        let result = [];
        for(let i in artists) {
            result.push(<ArtistItem artist={artists[i]}/>);
        }

        return result;
    };

    componentDidMount() {
        this.getAllData();
    };

    render() {
        return (
            <div id="box">
                <h1><span className="green">Genre</span>fy</h1>
                { this.state.isLoading ? (
                    <div id="loading">&nbsp;</div>
                ) : (
                    this.state.error === false &&
                    <div>
                        {this.state.selectedGenre === null && 
                        [
                            <p className="message">Selecione o gênero</p>,
                            <div id="genres">
                                <ul className="genre-list">
                                    {this.createListOfGenres()}
                                </ul>
                            </div>
                        ]}

                        {this.state.selectedGenre !== null && 
                        [
                            <p className="message">Os artistas do gênero {this.state.selectedGenreDesc} que você segue são:</p>,
                            <div id="artists">
                                <ul className="artists-list">
                                    {this.createListOfArtists()}
                                </ul>
                            </div>
                        ]}
                    </div>
                )}
                {this.state.error !== false && 
                    [
                        <p id="error-message">{this.state.error}</p>,
                        <div id="btn-section">
                            { !this.state.isLoading && this.state.error !== false &&
                                <a href="/" id="btn-back">Voltar ao inicio</a>
                            }
                            <button id="retry" onClick={() => {this.getAllData()}}>Carregar novamente</button>
                        </div>
                    ]
                }
                {this.state.error === false && this.state.selectedGenre !== null &&
                    <div id="btn-section">
                        <button onClick={() => {this.setState({selectedGenre:null})}} id="btn-back">Voltar aos gêneros</button>
                    </div>
                }
            </div>
        );
    };
}

export default Result;
