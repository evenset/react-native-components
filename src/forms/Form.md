# Forms

This set of components is meant to be used to build forms quickly and easily.

## Usage

1. Import the form and any helper components you want to use
```
import Form, { Field, SubmitButton } from './components/forms';
```
2. Create or import the schema you want to use with the form
```
import * as yup from 'yup';
import Form, { Field, SubmitButton, emailValidator } from './components/forms';
const schema = yup.object().shape({
    username: emailValidator,
});
```
3. Initialize the form. Any values you indent to use in the form must be added to the initialValues object
```
<Form initialValues={{ username: '' }} schema={schema}>
// Your Form components
</Form>
```
4. Add your form fields. Each field must have an `id` that matches to an initial value (and optionally a validator)
You can add custom components if you want, but you give them access to the form context (see Context.tsx or Connect.tsx)
```
<Form initialValues={{ username: '' }} schema={schema}>
    <Field id="username" label="Enter your username" placeholder="" screen="formExample" />
</Form>
```
5. Add an action button.
You can handle arbitary logic with the onPress method of the submit button. The button will have access to the forms values through
the `form` object passed to the onPress function. The example below will console log whatever is currently in the username field.
Additionally the form will run all of its validators and display error messages if any of them fail. A global form error is also set in the `formError` field and can be displayed with use of the `<FormText>` component.

Note that the `onPress` method is only called if all form validation passes. If you need a method to always be called, use `onPressAlways` instead.
```
<Form initialValues={{ username: '' }} schema={schema}>
    <Field id="username" label="Enter your username" placeholder="" screen="formExample" />
    <SubmitButton
        screen="formExample"
        title="Log to console"
        onPress={(form: FormContext): void => console.log(form.getField('username'))}
    />
    <FormText id="formError" />
</Form>
```

For a full working example see `examples/FormExample.tsx`

## Validators

The form currently supports yup validation out of the box. Please review the [yup documentation](https://github.com/jquense/yup) for details on how to use it.
