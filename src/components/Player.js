import React, {Component} from 'react';
import Card from './Card';
import {connect} from 'react-redux';
import {IncreasePoints, SendCardFromStoreToTable} from "../action";
import "./Player.css";
import backCardImage from './karta.jpg';

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfFinishedPlayers: 0
        };
    }

    removeFromState = (cardCode) => {
        if (this.props.index !== 0 || this.props.tableCards.length !== 0)
            return;

        this.props.sendCardFromStoreToTable(this.props.index, cardCode);

        for (let botPlayerIndex = 1; botPlayerIndex < this.props.nump; botPlayerIndex++) {
            let randomCardCode = this.props.cards[botPlayerIndex].pop().code;
            setTimeout(() => {
                this.props.sendCardFromStoreToTable(botPlayerIndex, randomCardCode);
            }, botPlayerIndex * 500);
        }
    };


    render() {
        if (!(this.props.index !== undefined && this.props.cards && this.props.cards[this.props.index]))
            return null;

        let cardListComponents = this.props.cards[this.props.index].map((card) => {
            return (
                <Card url={this.props.index === 0 ? card.image : backCardImage} code={card.code} key={card.code}
                      removeCard={e => this.removeFromState(card.code)}/>
            );
        });

        return (
            <div className="player-wrapper">
                <div>
                    {this.props.name} - [{this.props.points[this.props.index]}]
                </div>
                {cardListComponents}
                <br/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        currentPlayer: state.currentPlayer,
        nump: state.nump,
        tableCards: state.tableCards,
        points: state.points
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendCardFromStoreToTable: ((playerIndex, cardIndex) => dispatch(SendCardFromStoreToTable(playerIndex, cardIndex))),
        increasePoints: ((playerIndex, points) => dispatch(IncreasePoints(playerIndex, points)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
