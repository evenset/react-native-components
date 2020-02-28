import React, { ReactElement, ReactNode } from 'react';
// eslint-disable-next-line import/no-unresolved
import * as yup from 'yup';

import { FormProvider, FieldValue } from './Context';
import { translate } from '../';

type ValueList = {
    [key: string]: FieldValue;
};

type ErrorList = {
    formError: FieldValue;
    [key: string]: FieldValue;
};

export type stateSetter = (s: string) => void;

export interface IForm {
    schema: yup.ObjectSchema;
    initialValues: { [key: string]: string };
    children: ReactNode;
}

export interface State {
    valueList: ValueList;
    errorList: ErrorList;
}

/**
 * Validates a value using a single validator from the schema.
 * @param schema Yup Schema
 * @param id Id of schema validator
 * @param value Value to be validated
 *
 * @returns If validation fails, return the first error, other return the empty string
 */
const yupValidateField = async (schema: yup.ObjectSchema, id: string, value: string): Promise<string> => {
    try {
        await yup.reach(schema, id).validate(value);

        return '';
    } catch ({ errors }) {
        return errors[0];
    }
};

/**
 * Returns an error of errors present in the form or null if no errors are present
 */
const yupValidateForm = async (schema: yup.ObjectSchema, formData: ValueList): Promise<yup.ValidationError[] | null> => {
    try {
        const options = {
            strict: true,
            abortEarly: false,
        };

        await schema.validate(formData, options);

        return null;
    } catch (errors) {
        // Typescript doesn't support annotation here, but this error will always be of the type `yup.ValidationError`
        return errors.inner;
    }
};

export const defaultFormError = 'defaultFormError';

/**
 * Form Component
 * This component is intended to wrap any forms built in the application.
 * It makes a React Context available to its children.
 * This context is responsible for managing the Forms values, validation and errors.
 * See Form.md for more details.
 */
export class Form extends React.PureComponent<IForm, State> {
    constructor(props: IForm) {
        super(props);

        const { initialValues } = props;

        this.state = {
            valueList: initialValues,
            errorList: {
                formError: '',
            },
        };

        this.getField = this.getField.bind(this);
        this.getError = this.getError.bind(this);
        this.getFormErrors = this.getFormErrors.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setError = this.setError.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    /**
     * Gets the value stored in the given filed
     */
    getField(id: string): FieldValue {
        const { valueList } = this.state;

        return valueList[id] || '';
    }

    /**
     * Gets the error for the given filed
     */
    getError(id: string): FieldValue {
        const { errorList } = this.state;
        return errorList[id] || '';
    }

    /**
     * Returns an array of fields that have errors
     */
    getFormErrors(): { id: string; error: string }[] {
        const { errorList } = this.state;

        return Object.entries(errorList).map(([id, error]) => ({ id, error }));
    }

    /**
     * Updates the value for the given field id
     */
    setValue(id: string, value: string): void {
        const { valueList, errorList } = this.state;

        this.setState({ valueList: { ...valueList, [id]: value }, errorList: { ...errorList, [id]: '', formError: '' } });
    }

    /**
     * Updates the error for the given field id
     */
    setError(id: string, value: string): void {
        const { errorList } = this.state;

        this.setState({ errorList: { ...errorList, [id]: value } });
    }

    /**
     * Validates the entire form and sets each fields error approriately.
     */
    async validateForm(): Promise<void> {
        const { schema } = this.props;
        const { valueList } = this.state;
        const result = await yupValidateForm(schema, valueList);

        if (result) {
            result.forEach(({ path, errors }) => {
                this.setError(path, errors[0]);
            });

            this.setError('formError', translate(`formErrors.${defaultFormError}`));
        } else {
            this.setError('formError', '');
        }
    }

    /**
     * Validates the field with the given id.
     * Uses the id to find the validator by default but can be optionally passed a custom validator name
     */
    async validateField(id: string): Promise<void> {
        const { schema } = this.props;
        const { valueList } = this.state;
        const value = valueList[id];
        const result = await yupValidateField(schema, id, value);

        this.setError(id, result);
    }

    render(): ReactElement {
        const { children, schema } = this.props;

        return (
            <FormProvider
                value={{
                    schema,
                    getField: this.getField,
                    getError: this.getError,
                    setValue: this.setValue,
                    setError: this.setError,
                    validate: this.validateField,
                    validateForm: this.validateForm,
                }}
            >
                {children}
            </FormProvider>
        );
    }
}
