export const addCoin = (coin) => {
    console.log(coin);
    return (dispatch) => {
        dispatch({
            type: 'Add',
            payload: coin
        })
    }
} 

export const removeCoin = (coinId) => {
    return (dispatch) => {
        dispatch({
            type: 'Remove',
            payload: coinId
        })
    }
} 