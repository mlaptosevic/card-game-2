import React, {Component} from 'react';
import Card from './Card';
import { connect } from 'react-redux';

class Player extends Component {

  cardList = (index) => {
      return this.props.cards[index].map((card)=>(
          <Card key={card.code} url={card.image} cardId={card.code} playerId={index}/>
      ));
  };

  render(){
    return(
      this.cardList(this.props.index)
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
