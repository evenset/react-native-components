import React, { ReactElement } from 'react';
import { GestureResponderEvent } from 'react-native';

import { Connect } from './Connect';
import { FormContext } from './Context';
import { Button, IButton } from '../Button';

type ExcludedProps = Omit<IButton, 'onPress'>;
interface IFormSubmitButton extends ExcludedProps {
    id: string;
    form: FormContext;
    onPress: (form?: FormContext, event?: GestureResponderEvent) => void;
    onPressAlways?: (form?: FormContext, event?: GestureResponderEvent) => void;
}

/**
 * Form submit button element.
 * Extends the Button component
 * Runs form validation and then runs the passed onPress functionality
 */
export const FormSubmitButton = React.memo(Connect((props: IFormSubmitButton): ReactElement => {
    const { ...rest } = props;

    const onSubmit = async (event: GestureResponderEvent): Promise<void> => {
        const { onPress, onPressAlways, form } = props;

        await form.validateForm();
        const formError = form.getError('formError');

        if (!formError) {
            onPress(form, event);
        }

        if (onPressAlways) {
            onPressAlways(form, event);
        }
    };

    return <Button {...rest} onPress={onSubmit} />;
}));

