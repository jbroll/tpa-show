import React from 'react';
import TextField from '@material-ui/core/TextField';
import { DocContext } from './DocEdit'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textField: {
      width: '100%'
    },
}));

// Controlled component - does not manage state internally
export default function DocField(props) {
    const classes = useStyles();

    return (
        <DocContext.Consumer>
            {(context => {

                const handleKeyDown = (e) => {
                    if (e.keyCode === 13) {
                        context.fieldSave(context, props.field);
                    }
                }
                const handleBlur = (e) => {
                    context.fieldSave(context, props.field);
                }
                const handleChange = (e) => {
                    context.handleChange(e, props.field);
                }

                const {field, size, ...rest} = props; 

                return (
                    <TextField className={classes.textField}
                        onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur}
                        value={context.fieldValue(context, field)}
                        inputProps={{ size: size }}
                        margin="dense"
                        type="text"
                        {...rest}
                    />);
            })}
        </DocContext.Consumer>
    );
}