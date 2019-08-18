import {
    Paper,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { styles } from './styles';

class Subject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
    }
    render() {
        const { classes, theme, t } = this.props;
        return (
            <div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Subject);