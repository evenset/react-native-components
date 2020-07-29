import React, { ReactElement } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { connect } from './Connect';
import { FormContext } from './Context';
import { SelectInput, ISelectInput } from '../SelectInput';

export interface IFormSelectField extends ISelectInput {
    id: string;
    validatorName?: string;
    form: FormContext;
}

/**
 * Form Select element.
 * Extends the SelectInput component
 * Creates
 */
export const FormSelectField = React.memo(
    connect(
        (props: IFormSelectField): ReactElement => {
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
            const error = form.getError(id);

            return (
                <SelectInput
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    errorMessage={error}
                    errorMessageScreen="formErrors"
                    {...rest}
                />
            );
        },
    ),
);
