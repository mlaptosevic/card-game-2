import React, {Component} from 'react';
import './Card.css';

export default class Card extends Component {

    render() {
        return (
            <div className="card">
                <img className="cardImage" alt={this.props.code} src={this.props.url} onClick={this.props.removeCard}/>
            </div>
        );
    }
}
