import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#f4f4f4",
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
}));

export default function ListNewSubject(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
        {props.listUserSubject.map((item, index) =>{
            let nameSubject = props.listSubject.find(subject => subject._id == item.subjectId)
            let nameSemester = props.listSemester.find(semester => semester._id == item.semester)
            nameSubject = nameSubject?nameSubject.name:''
            nameSemester = nameSemester?nameSemester.name:''
            return(
                <React.Fragment> 
                    <ListItem>
                        <ListItemText primary={nameSubject} secondary={`Semester: ${nameSemester}`} />
                    </ListItem>
                    <Divider component="li" />
                </React.Fragment>
            )
        })}
    </List>
  );
}