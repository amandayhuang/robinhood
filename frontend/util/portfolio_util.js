// returns an integer of user's available cash as of the endDate
export const getCashFromBalanceChange = (balance_changes, endDate) =>{
    let cash = 0;
    let bcArray = Object.values(balance_changes);

    for (let i = 0; i < bcArray.length; i++) {
        const element = bcArray[i];
        const bcDate = new Date(element.created_at);
        if(bcDate < endDate){
            cash += element.amount;
        }
    }

    return cash;
}

// returns an object with ticker_name keys pointing to an object summarizing shares bought and sold 
// and current value per share as of endDate
export const getStockSummaryFromTrades = (trades, trends, endDate) =>{
    let summaryStock = {};

    for (let i = 0; i < Object.values(trades).length; i++) {
        const trade = Object.values(trades)[i];
        const tradeDate = new Date(trade.created_at);
        if (tradeDate < endDate){
            if (summaryStock[trade.ticker_name] === undefined) {
                let trendsArray = Object.values(trends[trade.ticker_name]);
                let currentSharePrice = 0;
                for (let i = 0; i < trendsArray.length; i++) {
                    const element = trendsArray[i];
                    if (element.name === endDate.toISOString().split('T')[0]){
                        currentSharePrice = element.$;
                    }
                }
                summaryStock[trade.ticker_name] = { ticker_name: trade.ticker_name, quantity_bought: trade.quantity, quantity_sold: 0, total_paid: trade.quantity * trade.share_price, total_sold_for: 0, current_share_price: currentSharePrice};
            } else {
                if (trade.trade_type === 'buy') {
                    summaryStock[trade.ticker_name].quantity_bought += trade.quantity;
                    summaryStock[trade.ticker_name].total_paid += (trade.quantity*trade.share_price);
                } else {
                    summaryStock[trade.ticker_name].quantity_sold += trade.quantity;
                    summaryStock[trade.ticker_name].total_sold_for += (trade.quantity*trade.share_price);
                }
            }
        }
    }
    return summaryStock;
}

// takes in the return object from getStockSummaryFromTrades to summarize total portfolio 
// value across all stocks
export const getPortfolioValue = stockSummary =>{
    let value = 0;
    if(stockSummary === undefined){
        return value;
    }else{
        for (let i = 0; i < stockSummary.length; i++) {
            const element = stockSummary[i];
            value += (element.quantity_bought-element.quantity_sold)*element.current_share_price;
        }
    }

    return value;
}