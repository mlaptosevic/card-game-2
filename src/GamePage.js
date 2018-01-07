import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {AddCards, IncreasePoints} from './action';
import Player from './components/Player.js';
import {Button} from 'react-bootstrap';
import Table from './components/Table';
import './App.css';

const API_PATH = 'https://deckofcardsapi.com/api/deck/';
const SHUFFLE_DECK_PATH = 'new/shuffle/';
const NUMBER_OF_DRAWN_CARDS = 10;
const DRAW_CARDS_PATH = '/draw/?count=' + NUMBER_OF_DRAWN_CARDS;

class GamePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deckId: null,
            drawnHands: 0,
        }

        this.getDeckId();
    }

    getDeckId() {
        axios.get(API_PATH + SHUFFLE_DECK_PATH).then(res => {
            this.setState({
                deckId: res.data.deck_id
            });
        });
    }


    drawCards = (playerNumber) => {
        axios.get(API_PATH + this.state.deckId + DRAW_CARDS_PATH).then(res => {
            let playersCards = res.data.cards;
            this.props.addCards(playersCards, playerNumber);

            this.setState({
                drawnHands: this.state.drawnHands + 1,
            });
        });
    };

    drawAllCards = () => {
        for (let i = 0; i < this.props.nump; i++) {
            this.drawCards(i);
            this.initPlayersPoints(i);
        }

    };

    initPlayersPoints = (playerIndex) => {
        this.props.increasePoints(playerIndex, 0);
    };

    printWinners = () => {
        if (this.props.winners[0] === -1)
            return '';

        let winnersNames = [];

        this.props.winners.forEach((winnerIndex) => {
            winnersNames.push(this.props.playersName[winnerIndex]);
        });

        return (
            <p>Winners are : {winnersNames}</p>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                        {this.state.drawnHands === this.props.nump ?
                            <Player name={this.props.playersName[1]} index={1}/> : ''}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-5">
                        {this.state.drawnHands === this.props.nump ?
                            <Player name={this.props.playersName[2]} index={2}/> : ''}
                    </div>
                    <div className="col-xs-2">
                        {this.props.winners[0] === -1?<Table/>:
                        this.printWinners()}
                    </div>
                    <div className="col-xs-5">
                        {this.state.drawnHands === this.props.nump ?
                            <Player name={this.props.playersName[3]} index={3}/> : ''}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                        {this.state.drawnHands === this.props.nump ?
                            <Player name={this.props.playersName[0]} index={0}/> : ''}
                    </div>
                </div>
                <div className="row">
                    <div>
                        <Button bsSize="large" bsStyle="success" onClick={this.drawAllCards}>
                            Draw cards </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        points: state.points,
        nump: state.nump,
        tableCards: state.tableCards,
        playersName: state.playersName,
        winners: state.winners
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCards: ((cards, index) => dispatch(AddCards(cards, index))),
        increasePoints: ((playerIndex, points) => dispatch(IncreasePoints(playerIndex, points)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
