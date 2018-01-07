import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {AddCards, IncreasePoints} from './action';
import Player from './components/Player.js';
import {Button} from 'react-bootstrap';
import Table from './components/Table';
import Card from './components/Card';
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
            player1: null,
            player2: null,
            player3: null,
            tableCards: []
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

    createCardComponents = () => {
        return this.props.tableCards.map((card) => {
            return (
                <Card key={card.code} url={card.image} func={() => {
                }}/>
            );
        });
    }

    drawCards = (playerNumber) => {
        axios.get(API_PATH + this.state.deckId + DRAW_CARDS_PATH).then(res => {
            let playersCards = res.data.cards;
            this.props.addCards(playersCards, playerNumber);
            let tableCards = this.createCardComponents();

            this.setState({
                drawnHands: this.state.drawnHands + 1,
                tableCards: tableCards
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
        if(this.props.winners[0] === -1)
            return '';

        let winnersNames =  [];

        this.props.winners.forEach((winnerIndex) => {
            winnersNames.push(this.props.playersName[winnerIndex]);
        });

        return (
            <p>Winners are : {winnersNames}</p>
        );
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="table">
                        <div>
                            <Button bsSize="large" bsStyle="success" onClick={this.drawAllCards}>
                                Draw cards </Button>
                        </div>
                        <div>
                            <Table/>
                        </div>
                    </div>
                    <div>
                        {this.printWinners()}
                    </div>
                </header>
                <div>
                    <div>
                        {this.state.drawnHands === this.props.nump ? <Player name={this.props.playersName[1]} index={1}/> : ''}
                    </div>
                    <div>
                        {this.state.drawnHands === this.props.nump && this.props.nump >= 3 ?
                            <Player name={this.props.playersName[2]} index={2}/> : ''}
                    </div>
                    <div>
                        {this.state.drawnHands === this.props.nump && this.props.nump >= 4 ?
                            <Player name={this.props.playersName[3]} index={3}/> : ''}
                    </div>
                    <div>
                        <br/>{this.state.drawnHands === this.props.nump ?
                        <Player name={this.props.playersName[0]} index={0}/> : ''}
                    </div>
                </div>
            </div>
        )
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
