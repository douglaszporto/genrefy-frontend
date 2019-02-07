import './GenreItem.css';
import React, { Component } from 'react';

class GenreItem extends Component {

    constructor(props){
        super(props);

        if (typeof this.props.onSelectGenre != 'function') {
            this.props.onSelectGenre = () => {};
        }
    }

    render() {
        return (
            <li 
                className="genre-item" 
                key={this.props.genre.id}
                onClick={() => {this.props.onSelectGenre({
                    id: this.props.genre.id,
                    name: this.props.genre.name
                })}}
            >
                {this.props.genre.name}
            </li>
        )
    }

}

export default GenreItem;