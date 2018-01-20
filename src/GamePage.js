import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {AddCards, IncreasePoints} from './action';
import Player from './components/Player.js';
import {Button, Panel} from 'react-bootstrap';
import Table from './components/Table';
import './App.css';
import ErrorBoundary from "./errorBoundary";
import './GamePage.css';

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
        };

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
    drawAllCards = (btn) => {
      btn.target.className += " hidden";

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
            <Panel className="panelWinner">
              Winner: <br/>
              {winnersNames}
            </Panel>
        );
    };

    render() {
        return (
            <div className="container-fluid backgroundTexture">
                <div className="row">
                    <div className="col-xs-4 vertical-row col-xl-4">
						              <ErrorBoundary>
                            {this.state.drawnHands === this.props.nump ?
                                <Player name={this.props.playersName[1]} index={1}/> : ''}
                          </ErrorBoundary>
                    </div>

                    <div className="col-xs-5 col-xl-5">
                      <div className="horizontal-row">
						               <ErrorBoundary>
                            {this.state.drawnHands === this.props.nump ?
                                <Player name={this.props.playersName[2]} index={2}/> : ''}
                           </ErrorBoundary>
                    </div>

                    <div>
                          <Table/>
                    </div>

                      <div className="horizontal-row">
                          <ErrorBoundary>
                            {this.state.drawnHands === this.props.nump ?
                              <Player name={this.props.playersName[0]} index={0}/> : ''}
                          </ErrorBoundary>
                    </div>
                </div>
                    <div className="col-xs-3 vertical-row col-xl-3 left ">
                          <ErrorBoundary>
                            {this.state.drawnHands === this.props.nump ?
                            <Player name={this.props.playersName[3]} index={3}/> : ''}
                          </ErrorBoundary>
                    </div>
                    <div className="col-xl-1"></div>

                    <div>
                        <Button bsSize="large" bsStyle="success" onClick={(btn) => this.drawAllCards(btn)} className="drawButton">
                            Draw </Button>
                    </div>
                </div>
                    {this.printWinners()}

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
