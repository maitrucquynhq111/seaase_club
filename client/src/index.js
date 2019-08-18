import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { colorDisabled, colorPrimary } from './utils/setting';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1e6bcc',
        },
        secondary: {
            main: '#ff513f',
        }, 
        text: {
            primary: colorPrimary,
            disabled: colorDisabled
        },
    },
    typography: {
        useNextVariants: true,
    },
    overrides: {
        MuiTypography: {
            body1: {
                color: colorPrimary,
                fontSize: '1rem'
            }, 
            h4: {
                color: colorPrimary,
                fontSize: '2rem'
            }
        },
        MuiTableCell: {
            head: {
                color: colorPrimary,
                fontSize: '0.85rem'
            }
        },
        MuiTableCell: {
            root: {
               padding: '0.25rem 1.5rem 0.25rem 1.5rem'
            }
        },
        MuiInputBase: {
            input: {
                fontSize: '0.8rem',
            }
        },
        MuiInputLabel: {
            root: {
                color: colorPrimary,
                fontWeight: '500'
            }
        },
        MuiFormLabel: {
            // "&$disabled": {
            //     color: 'rgba(0, 0, 0, 0.53)',
            // }
        },
        MuiListItem: {
            focusVisible: {
                color: 'rgba(255, 81, 63, 0.21)',
            },
            root: {
                '&$selected': {
                    backgroundColor: 'rgba(41, 47, 72, 0.25)',
                    '&:hover': {
                        backgroundColor: 'rgba(41, 47, 72, 0.25)',
                    }
                }
            },
        },
        MuiTouchRipple: {
              root: {
                'width': 0,
                'height': 0,
            },
        }, 
    },
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
