import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"

// import userReducer from "./features/nodetask10feat"
import colorReducer from "./features/colorcont"
import favUserReducer from "./features/favuserlist"
import playerReducer from "./features/monopoly"
import petReducer from "./features/tamagothiapp"
import userReducer from "./features/user"

const store = configureStore({
    reducer:{
        user: userReducer,
        color: colorReducer,
        favuser: favUserReducer,
        player: playerReducer,
        pet: petReducer
    }
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
