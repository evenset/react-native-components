/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { FormConsumer, FormContext } from './Context';

/**
 * A higher order component used to wrap other components. Allows the wrapped component access to the parent <FormProvider>
 */
export function connect(Comp: (Props?: any) => ReactElement): (props: any) => ReactElement {
    // eslint-disable-next-line react/display-name
    return (props: any): ReactElement => (
        <FormConsumer>{(value: FormContext): ReactElement => <Comp {...props} form={value} />}</FormConsumer>
    );
}
