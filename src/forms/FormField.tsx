import React, { ReactElement } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { connect } from './Connect';
import { FormContext } from './Context';
import { Input, IInput } from '../Input';

export interface IFormField extends IInput {
    id: string;
    validatorName?: string;
    form: FormContext;
}

/**
 * Form input element.
 * Extends the TextInput component
 * Automatically handles the onChange and onBlur methods for updating the values and handiling error validation for each field
 */
export const FormField = React.memo(
    connect(
        (props: IFormField): ReactElement => {
            /**
             * The blur handler runs error validation whenever the field leaves focus
             */
            const blurHandler = async (): Promise<void> => {
                const { form, id } = props;

                await form.validate(id);
            };

            /**
             * The change handler automatically updates the value associated with the form field
             */
            const changeHandler = (event: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                const { id, form } = props;

                event.preventDefault();
                const {
                    nativeEvent: { text },
                } = event;

                form.setValue(id, text);
            };

            const { form, id, ...rest } = props;
            const value = form.getField(id);
            const error = form.getError(id);

            return (
                <Input
                    value={value}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    errorMessage={error}
                    {...rest}
                />
            );
        },
    ),
);
