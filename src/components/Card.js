import React, {Component} from 'react';
import {SendCardFromStoreToTable} from '../action';
import {connect} from 'react-redux';
import './Card.css';

class Card extends Component {

    render() {
        return (
            <div className="card">
                <img className="cardImage" alt={this.props.code} src={this.props.url} onClick={this.props.removeCard}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendCardFromStoreToTable: ((cardId, playerId) => dispatch(SendCardFromStoreToTable(cardId, playerId)))
    };
};

export default connect(()=>{return {}}, mapDispatchToProps)(Card);
