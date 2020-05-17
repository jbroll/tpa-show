import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function RDialog(props){
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return <Dialog maxWidth="md" fullWidth={true} fullScreen={fullScreen} aria-labelledby="form-dialog-title" {...props} />
}
