import React from 'react'

class TradeForm extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.trade;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.state.user_id = this.props.userId;
        this.state.stock_id = this.props.stockId;
        debugger
        this.props.createTrade(this.state);
    }


    render(){
        return(
            <>
                <div className='trade-form'>

                    <form onSubmit={this.handleSubmit}>
                    <label>Shares {}</label>
                        <input type="text" value={this.state.quantity} placeholder='0' onChange={this.update("quantity")} />

                        <div className='trade-error'></div>
                        <button>{this.props.formType} Shares</button>
                    </form>
                </div>
            </>
        )
    }
}

export default TradeForm;