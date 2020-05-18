import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DocContext } from './DocEdit'

// Controlled component - does not manage state internally
export default function DocCheckbox(props) {

    return (
        <DocContext.Consumer>
            {(context => {
                const handleChange = (e) => {
                    context.fieldSave(context, props.field, e.target.checked);
                };

                console.log(props.field, props.label);
                return (
                    <FormControlLabel
                    control={
                        <Checkbox   checked={context.fieldValue(context, props.field)}
                                    onChange={handleChange} 
                                    name={props.field} inputProps={{ 'aria-label': props.label }} />
                        }
                    label={props.label}
                  />);
            })}
        </DocContext.Consumer>
    );
}