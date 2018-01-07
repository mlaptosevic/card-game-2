import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "./Card";
import CardStrength from "../CardStrength";
import {IncreasePoints} from "../action";

class Table extends Component {
    render(){
        let reducedCardList = this.props.tableCards.filter((card)=>{
            return card!==undefined;
        });
        let cardList = reducedCardList.map((card)=>{
            return (<Card url={card.image} code={card.code} key={card.code}
                  removeCard={(e) => {return;}}/>);
        });

        return(
            <div className="table">
                {cardList}
            </div>
        );
    }


    componentWillReceiveProps = (newProps) => {
        if (newProps.tableCards.length === newProps.nump) {
            setTimeout(()=>{
                const cardValues = newProps.tableCards.map(card => card.value);
                const winnerPlayerIndex = CardStrength.strongestCard(cardValues);
                const pointsIncrease = CardStrength.valueOfCards(cardValues);
                this.props.increasePoints(winnerPlayerIndex, pointsIncrease);
            }, 1000);
        }
    };
}


const mapStateToProps = (state) => {
    return {
        tableCards: state.tableCards,
        nump: state.nump
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increasePoints: ( (playerIndex, points) => dispatch(IncreasePoints(playerIndex, points)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);