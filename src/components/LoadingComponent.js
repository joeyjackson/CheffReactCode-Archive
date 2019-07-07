import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStateValue } from '../StateManagement';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const LoadingComponent = props => {
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

export default LoadingComponent;
