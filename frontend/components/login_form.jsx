import React from 'react'

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.loginUser(this.state);
        this.setState({email:this.state.email,password:""});
    }

    render() {
        return (
            <>
                <div className='login-container'>
                <div className='login-image'>
                <img src={window.signupURL} alt="abstract green stuff"/>
                </div>
                <div className='login-form'>
                <h1>Welcome to Robin's Hood</h1>
                
                <form onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input type="text" value={this.state.email} onChange={this.update("email")} />
                    

                    <label>Password </label>
                    <input type="password" value={this.state.password} onChange={this.update("password")} />
                   
                    <div className='login-error'>{this.props.errors[0]}</div>
                    <div className='buttons'>
                    <button>Sign In</button>
                    <button className='demo-login' onClick={() => this.props.loginUser({ email: "demo@robinhood.com", password: "demopassword" })}>Demo Login</button>
                    </div>
                </form>
                </div>
            </div>
            </>
        )
    }

}

export default LoginForm;