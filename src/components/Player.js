import React, {Component} from 'react';
import Card from './Card';
import { connect } from 'react-redux';

class Player extends Component {

  constructor(props) {
    super(props);

    let cardList = this.cardList(this.props.index); 
    this.state = {
      cardList: cardList
    };
  }

  cardList = (index) => {
      return this.props.cards[index].map((card)=>(
          <Card key={card.code} url={card.image} cardId={card.code} playerId={index} func={(index) => this.removeFromState(index)} updateTableCards={() => this.props.updateTableCards()}/>
      ));
  };

  removeFromState = (cardCode) => {
    let newCardList = this.state.cardList.filter((card) => {
      return card.key !== cardCode;
    });

    this.setState({
      cardList: newCardList
    });
  };

  render(){ 

    return(
      <div>
        {this.state.cardList}
      </div>
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
