import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const CircularIndeterminate = props => {
  const classes = useStyles();
  return (
    props.loading && (
      <div className="-loading -active">
        <div className="-loading-inner">
          <CircularProgress className={classes.progress} />
        </div>
      </div>
    )
  );
};

export default CircularIndeterminate;
