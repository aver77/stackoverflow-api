import React from 'react';
import RoutingChain from '../RoutingChain/RoutingChain';

import store from '../redux/store';
import { Provider } from 'react-redux';

const App = () => {
    return (
        <Provider store={store}>
            <RoutingChain/>
        </Provider>
    );
};

export default App;