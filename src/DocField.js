import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { DocContext } from './DocEdit'

const useStyles = makeStyles((theme) => ({
    textField: {
      width: '100%'
    },
}));

function dollar(dolar, docents) {
    var cents;

    dolar = dolar.toString().replace(/\$|,|\s/g,'');

    if (isNaN(dolar)) dolar = "0";

    if ( docents ) {
        cents=Math.floor((dolar*Math.pow(10,docents)+0.5)%Math.pow(10,docents));
        while ( cents.toString().length < docents ) {
            cents = "0" + cents;
        }
    }
    dolar = Math.floor(dolar).toString();
    for (var i = 0; i < Math.floor((dolar.length-(1+i))/3); i++) {
        dolar = dolar.substring(0,dolar.length-(4*i+3)) + ','
            + dolar.substring(dolar.length-(4*i+3));
    }

    if ( docents ) {    return ('$' + dolar + '.' + cents);
    } else {            return ('$' + dolar);
    }
}

export const Format = {
    ANY: 0,
    NUMBER: 1,
    DOLLAR: 2,
}

const checkFormat = (format, value) => {

    if ( format === Format.NUMBER ) {
        return value.replace(/[^0-9]/g, "");
    }
    if ( format === Format.DOLLAR ) {
        return dollar(value);
    }

    return value;
}

// Controlled component - does not manage state internally
export default function DocField(props) {
    const classes = useStyles();

    return (
        <DocContext.Consumer>
            {(context => {

                const handleKeyDown = (e) => {
                    if (e.keyCode === 13) {
                        context.fieldSave(props.field);
                    }
                }
                const handleBlur = (e) => {
                    context.fieldSave(props.field);
                }
                const handleChange = (e, value) => {
                    if (value == null) {
                        value = checkFormat(props.format, e.target.value);
                    }
                    context.onChange(value, props.field);
                }

                const {field, size, format, ...rest} = props; 
                const value = checkFormat(format, context.fieldValue(props.field));

                const textfield = (
                    <TextField className={classes.textField}
                        onChange={handleChange} onBlur={handleBlur}
                        value={value}
                        inputProps={{ size: size }}
                        margin="dense"
                        type="text"
                        {...rest}
                    />);

                if (props.options) {
                    return (
                        <Autocomplete
                            onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur}
                            value={value}
                            freeSolo
                            options={props.options}
                            renderInput={(params) => (
                            <TextField {...params}  
                                    //inputProps={{ size: size }}
                                    margin="dense"
                                    {...rest}
                            />
                            )}
                        />);
                } else {
                    return textfield;
                }
            })}
        </DocContext.Consumer>
    );
}