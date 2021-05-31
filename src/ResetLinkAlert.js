import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import OkButton from './OkButton';
import { MailToTPA } from './TabWelcome';

export default function ResetLinkAlert(props) {

    return (
      <Dialog maxWidth="sm" fullWidth={true} open={props.type !== ""} onClose={props.onClose} >
        <DialogTitle>
            {props.type === "SentOK" 
                ? "Reset Link Sent OK" :
            (props.type === "auth/user-not-found" 
                ? <span>
                    The email address <b> {props.email} </b> is not registered.  
                </span>   
                : 
            (props.type === "auth/invalid-email" 
                ? <span>
                    The email address <b> {props.email} </b> is not valid.  
                </span>   
                : "An Error Ocured"))
            }
            <OkButton onClick={props.onClose}/>
        </DialogTitle>
        <DialogContent>
            {props.type === "SentOK" 
                ? `An email with a reset password link has been set to ${props.email}` :
            (props.type === "auth/user-not-found" 
                ?  <span>
                        Please contact us by sending an email to 
                        &ensp;<MailToTPA /> to request registration as a participating artist.
                    </span> 
                    :
            (props.type === "auth/invalid-email" 
                ?  <span>
                        Please enter a valid email or us by sending an email to 
                        &ensp;<MailToTPA /> to request registration as a participating artist.
                    </span>
                : "huh? " + props.type))
            }
        </DialogContent>
      </Dialog>
    );
}
