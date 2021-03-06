import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import {signup, login, logout} from './util/session_api_util'
import {getNews, getArticles} from './util/trends_api_util'
import {fetchTrades} from './util/trade_api_util'

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    // let preloadedState = undefined;
    let store;
    if (window.currentUser) {
        const preloadedState = {
            session: window.currentUser
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    ReactDOM.render(<Root store={store} />, root)

    //TESTING
    // window.signup = signup;
    // window.getState = store.getState;
    // window.getNews = getNews;
    // window.fetchTrades = fetchTrades;
    // window.getArticles = getArticles;
    //TESTING
})