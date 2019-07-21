import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const CircularIndeterminate = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress className={classes.progress} />
    </div>
  );
};

export default CircularIndeterminate;
