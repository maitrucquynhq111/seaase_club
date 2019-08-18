import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import React from 'react';
import { toolbarStyles } from './styles';

// Sortable Table UI-Material
class ListMemberCardToolbar extends React.Component {

  render() { 
    const { numSelected, classes, handleDelete,t } = this.props;

    return (
      <div>
      {numSelected > 0 ? (
   <Toolbar
     className={classNames(classes.root, {
       [classes.highlight]: numSelected > 0,
     })}
   >
     <div className={classes.title}>
         <Typography color="inherit" variant="subtitle1">
           {numSelected} {t('membercard_list_tabletoolbar_selected')}
           </Typography>
     </div>
     <div className={classes.spacer}>

     </div>
     <div className={classes.actions}>
         <Tooltip title={t("membercard_list_tabletoolbar_delete")}>
           <IconButton aria-label="Delete">
             <DeleteIcon
               onClick={handleDelete}
             />
           </IconButton>
         </Tooltip>
         </div>
         </Toolbar>):
       ''}
   </div>
    );
  }
};

const mapState = state => ({ 
});

const mapDispatch = dispatch => ({
});

export default (withStyles(toolbarStyles)(ListMemberCardToolbar));