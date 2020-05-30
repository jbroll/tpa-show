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
                    context.fieldSave(props.field, e.target.checked);
                };

                var checked = context.fieldValue(props.field);
                if (checked === "") {
                    checked = false;
                }

                return (
                    <FormControlLabel
                    control={
                        <Checkbox   checked={checked}
                                    onChange={handleChange} 
                                    name={props.field} inputProps={{ 'aria-label': props.label }} />
                        }
                    label={props.label}
                  />);
            })}
        </DocContext.Consumer>
    );
}