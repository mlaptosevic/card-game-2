import React, {Component} from 'react';
import Card from './Card';
import {connect} from 'react-redux';
import {IncreasePoints, AddCardToTable, IncreaseCurrentPlayer, AddCards} from "../action";
import {Label} from 'react-bootstrap';
import "./Player.css";
import backCardImage from './karta.jpg';
import ErrorBoundary from "../errorBoundary";

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

        this.addCardFromHandToTable(this.props.index, cardCode);

        for (let botPlayerIndex = 1; botPlayerIndex < this.props.nump; botPlayerIndex++) {
            let randomCardCode = this.props.cards[botPlayerIndex].pop().code;
            setTimeout(() => {
                this.addCardFromHandToTable(botPlayerIndex, randomCardCode);
            }, botPlayerIndex * 700);
        }
    };

    addCardFromHandToTable = (index, cardCode) => {
        let card = this.props.cards[index].filter((card) => {
            return card.code === cardCode;
        })[0];

        let newPlayerCards = this.props.cards[index].filter((card) => {
            return card.code !== cardCode;
        });

        this.props.AddCardToTable(index, card);
        this.props.UpdateCardHand(index, newPlayerCards);
        this.props.increaseCurrentPlayer(this.props.nump);

    }


    render() {

        if (!(this.props.index !== undefined && this.props.cards && this.props.cards[this.props.index]))
            return null;

        let cardListComponents = this.props.cards[this.props.index].map((card) => {
            if ((this.props.index===0)||(this.props.index===2))
            return (
                <li className="horizontal" key={card.code}>
                  <ErrorBoundary key={card.code}>
                    <Card url={this.props.index === 0 ? card.image : backCardImage} code={card.code} key={card.code}
                    removeCard={e => this.removeFromState(card.code)} />
                  </ErrorBoundary>
                </li>
            );
            else {
              return (
                  <li className="vertical" key={card.code}>
                    <ErrorBoundary key={card.code}>
                      <Card url={this.props.index === 0 ? card.image : backCardImage} code={card.code} key={card.code}
                      removeCard={e => this.removeFromState(card.code)} />
                    </ErrorBoundary>
                  </li>
                );
            }
        });

        return (
            <div className="player-wrapper container-fluid">

                <div>
                  <ul className="no-bullet">
                  <li className="labelName">
                    <Label className="labelPlayerName">
                        {this.props.name}
                    </Label>
                    <Label className="labelPoints" >
                        {this.props.points[this.props.index]}
                    </Label>
                  </li>
                {cardListComponents}
                  </ul>
                </div>
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
        AddCardToTable: ((playerIndex, card) => dispatch(AddCardToTable(playerIndex, card))),
        UpdateCardHand: ((playerIndex, cards) => dispatch(AddCards(cards, playerIndex))),
        increasePoints: ((playerIndex, points) => dispatch(IncreasePoints(playerIndex, points))),
        increaseCurrentPlayer: ( (nump) => dispatch(IncreaseCurrentPlayer(nump)))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
