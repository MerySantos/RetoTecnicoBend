import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "redux-zero/react";
import store from "./store";
import { componentDidMount, componentWillUnmount} from './actions';

const Index = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
componentDidMount();
componentWillUnmount();

ReactDOM.render(<Index />, document.getElementById('root'));
