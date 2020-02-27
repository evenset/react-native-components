import React, { ReactElement } from 'react';
import { LocalizationConsumer } from '../';

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
            const { form, screen, id, type, ...rest } = props;
            let value = form.getField(id);

            if (type === 'error') {
                value = form.getError(id);
            }

            if (screen) {
                value = `${screen}.${value}`;
            }

            return (
                <LocalizationConsumer>
                    {({ translate }): ReactElement => <TextField {...rest} value={translate(value)} />}
                </LocalizationConsumer>
            );
        },
    ),
);
