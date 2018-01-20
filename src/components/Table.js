import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from "./Card";
import CardStrength from "../CardStrength";
import {AddWinners, Clear, IncreasePoints, Reset} from "../action";
import './table.css';
import ErrorBoundary from '../errorBoundary';

class Table extends Component {
    render() {
        if (this.props.cards.length !== this.props.nump)
          return '';

        let reducedCardList = this.props.tableCards.filter((card) => {
            return card !== undefined;
        });
        let cardList = reducedCardList.map((card) => {
            return (<ErrorBoundary key={card.code}><Card url={card.image} code={card.code} key={card.code}
                          removeCard={(e) => {
                              return;
                          }}/></ErrorBoundary>);
        });

        let classList = "table ";
        classList+=this.props.nump===2?'top':'';
        return (
            <div className={classList}>
                <div >{cardList}</div>
            </div>
        );
    }


    componentWillReceiveProps = (newProps) => {
        if (newProps.tableCards.length === newProps.nump && newProps.tableCards.length !== this.props.tableCards.length) {
            setTimeout(() => {
                const cardValues = newProps.tableCards.map(card => card.value);
                this.props.clearTable();
                const winnerPlayerIndex = CardStrength.strongestCard(cardValues);
                const pointsIncrease = CardStrength.valueOfCards(cardValues);
                this.props.increasePoints(winnerPlayerIndex, pointsIncrease);
                this.props.resetCurrentPlayer();

                // end game
                if (this.props.cards[0] !== undefined && this.props.cards[0].length === 0) {
                    let maxNumberOfPoints = this.props.points.reduce((acc, playerPoints) => {
                        return playerPoints > acc ? playerPoints : acc;
                    }, 0);

                    let winners = [];

                    for (let playerIndex = 0; playerIndex < this.props.nump; playerIndex++)
                        if (this.props.points[playerIndex] === maxNumberOfPoints)
                            winners.push(playerIndex);

                    this.props.AddWinners(winners);
                }
            }, 1000);
        }
    };
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        points: state.points,
        tableCards: state.tableCards,
        nump: state.nump
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increasePoints: ((playerIndex, points) => dispatch(IncreasePoints(playerIndex, points))),
        clearTable: ( () => dispatch(Clear())),
        AddWinners: ( (winners) => dispatch(AddWinners(winners))),
        resetCurrentPlayer: ( () => dispatch(Reset()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
