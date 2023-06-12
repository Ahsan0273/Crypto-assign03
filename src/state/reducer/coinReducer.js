
const initalState = {
    userCoinData : [
        {
          key: '16532d928df34130b4ec73e44ad0588a',
          Id: '16532d928df34130b4ec73e44ad0578a',
          coin: 'USD',
          liveRate: 13
        },
        {
          key: '165329028df34130b4ec73e44ad0578a',
          Id: '165329028df34130b4ec73e44ad0578a',
          coin: 'EUR',
        },
      ]
}
const reducer = (state = initalState, action) => {
    switch(action.type){
        case 'Add':
            state.userCoinData = [...state.userCoinData, action.payload];
            return state;
        case 'Remove':
            const updatedCoin = state.userCoinData.filter(x =>  x.Id !== action.payload);
            return {...state, userCoinData : updatedCoin};
        default:
           return state;
    }
}

export default reducer;