export default class CardStrength {
    static cardStrength = {
        'KING': 14,
        'QUEEN': 13,
        'JACK': 12,
        '10': 10,
        '9': 9,
        '8': 8,
        '7': 7,
        '6': 6,
        '5': 5,
        '4': 4,
        '3': 3,
        '2': 2,
        'ACE': 1,
    }


    static strongestCard = (table) => {
        let mappedTable = table.map(cardValue=> CardStrength.cardStrength[cardValue]);

        let winningPlayerIndex = 0;
        for(let playerIndex = 1; playerIndex < mappedTable.length; playerIndex++) {
            if(mappedTable[winningPlayerIndex] <= mappedTable[playerIndex])
                winningPlayerIndex = playerIndex;
        }

        return winningPlayerIndex;
    }

    static valueOfCards = (table) => {
        return table.reduce((acc, cardValue) => {
           return acc + CardStrength.cardStrength[cardValue];
        }, 0);
    }
}