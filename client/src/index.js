import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    // props: {
    //     MuiListItem: {
    //         disabletouchripple: true
    //     }
    // }
});


ReactDOM.render((  
    <MuiThemeProvider theme={theme}>
        {/* <App/> */}
        <BrowserRouter>
            <Switch>
                <Route path='/' render={(props) => <App {...props} />} />
            </Switch>
        </BrowserRouter>
    </MuiThemeProvider>   
), document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
