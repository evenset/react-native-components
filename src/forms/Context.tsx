/**
 * Form Context
 * Each form gets access to its own context.
 */
import React from 'react';
import * as yup from 'yup';

export type FieldValue = string;

export interface FormContext {
    schema: yup.ObjectSchema<object>;
    getField: (id: string) => FieldValue;
    getError: (id: string) => FieldValue;
    setValue: (id: string, value: string) => void;
    setError: (id: string, value: string) => void;
    validate: (id: string) => Promise<void>;
    validateForm: () => Promise<void>;
}

export const FormContext: React.Context<FormContext> = React.createContext({
    schema: yup.object().shape({}),
    getField: (_id: string) => '',
    getError: (_id: string) => '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
    setValue: (_id: string, _value: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
    setError: (_id: string, _value: string) => {},
    validate: (_id: string) => Promise.resolve(),
    validateForm: () => Promise.resolve(),
});

export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;

// This can be used instead of HOC connect() to get access to the provider
// NOTE: can only be used in functional components
export function useFormContext(): FormContext {
    return React.useContext(FormContext);
}
