import React, { ReactElement } from 'react';

import { connect } from './Connect';
import { TextField, ITextField } from '../TextField';
import { FormContext } from './Context';

interface Props extends ITextField {
    id: string;
    screen?: string;
    type?: 'value' | 'error' | undefined;
    form: FormContext;
}

/**
 * Form text field element.
 * Extends the TextField component
 * Displays the Text stored in the field with the given id
 */
export const FormDisplay = React.memo(
    connect(
        (props: Props): ReactElement => {
            const { form, id, type, ...rest } = props;
            let value = form.getField(id);

            if (type === 'error') {
                value = form.getError(id);
            }

            return (
                <TextField {...rest} value={value} />
            );
        },
    ),
);
