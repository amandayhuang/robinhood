import { connect } from 'react-redux';
import { fetchStock} from '../actions/stock_actions'
import StockShow from './stock_show'
import {getTrends} from '../actions/trends_actions'

const msp = (state,ownProps) => {
    const stock = state.entities.stocks[ownProps.match.params.stockId];
    const trends = state.entities.trends[ownProps.match.params.stockId];
    if(trends === undefined){
        return {
            stock: {id:"",display_name:"", ticker_name:""},
            currentPrice: 0
        }
    }else{
        debugger
        let currentPrice;
        if (trends[trends.length - 1] === undefined){
            currentPrice = 99.99;
        }else{
            currentPrice = trends[trends.length-1].num
        }
        return {
            
            stock: stock,
            currentPrice: currentPrice
        }
    }
};

const mdp = (dispatch) => ({
    fetchStock: stockId =>  dispatch(fetchStock(stockId)),
    getTrends: stock => dispatch(getTrends(stock))
});

export default connect(msp,mdp)(StockShow);