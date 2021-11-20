import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './utils/globals';
import theme from './utils/theme';
import store from './store';
import App from './containers/App';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
            <GlobalStyle />
        </ThemeProvider>
    </Provider>,
    document.querySelector('#root')
)