import './ArtistItem.css';
import React, { Component } from 'react';

class ArtistItem extends Component {

    render() {
        return (
            <li 
                className="artist-item" 
                key={this.props.artist.id}
            >
                <img 
                    src={this.props.artist.images[0].url} 
                    alt={this.props.artist.name + " photo"} 
                    className="artist-photo" 
                />
                <span className="artist-name">{this.props.artist.name}</span>
            </li>
        )
    }

}

export default ArtistItem;