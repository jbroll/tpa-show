import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function RDialog(props){
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return <Dialog maxWidth="md" fullWidth={true} fullScreen={fullScreen} aria-labelledby="form-dialog-title" {...props} />
}
