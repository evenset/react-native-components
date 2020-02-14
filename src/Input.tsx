import React, { ReactElement } from 'react';
import { StyleSheet, View, Text, TextInput, TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { LocalizationConsumer } from './contexts/LocalizationContext';

const styles = StyleSheet.create({
    text: {
        fontWeight: 'normal',
        paddingLeft: 15,
        textAlignVertical: 'center',
        paddingTop: 10,
    },
    label: {
        fontWeight: 'normal',
        width: '30%',
        marginLeft: -15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    },
    // eslint-disable-next-line react-native/no-color-literals
    bubble: {
        borderRadius: 10,
        backgroundColor: 'grey',
        width: '80%',
    },
    // eslint-disable-next-line react-native/no-color-literals
    error: {
        color: 'red',
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10,
        height: 55,
    },
    errorRow: {
        marginLeft: '20%',
        alignContent: 'center',
    },
});

export interface IInput extends TextInputProps {
    screen?: string;
    errorMessageScreen?: string;
    label?: string;
    styleText?: StyleProp<TextStyle>;
    styleLabel?: StyleProp<TextStyle>;
    styleRow?: StyleProp<ViewStyle>;
    styleBubble?: StyleProp<ViewStyle>;
    errorMessage?: string;
    styleError?: StyleProp<TextStyle>;
    styleColumn?: StyleProp<ViewStyle>;
    styleErrorRow?: StyleProp<ViewStyle>;
    styleInnerErrorRow?: StyleProp<ViewStyle>;
}

export class Input extends React.PureComponent<IInput> {
    render(): ReactElement {
        const {
            screen,
            styleLabel,
            styleRow,
            styleText,
            styleBubble,
            label,
            placeholder,
            errorMessage,
            errorMessageScreen,
            styleError,
            styleColumn,
            styleErrorRow,
            styleInnerErrorRow,
            ...other
        } = this.props;

        // Adjusts the styling of the error message to match the placement of the input field automatically.
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore: ViewStyle should have a width element but TS is not picking it up correctly
        const errorWidth = styleBubble && styleBubble.width ? styleBubble.width : styles.bubble.width;
        const errorScreen = errorMessageScreen ? errorMessageScreen : screen;

        return (
            <LocalizationConsumer>
                {({ translate }): ReactElement => (
                    <View style={[styles.column, styleColumn]}>
                        <View style={[styles.row, styleRow]}>
                            {label ? <Text style={[styles.label, styleLabel]}>{translate(`${screen}.${label}`)}</Text> : null}
                            <View style={[styles.bubble, styleBubble]}>
                                <TextInput
                                    placeholderTextColor="lightgrey"
                                    {...other}
                                    placeholder={translate(`${screen}.${placeholder}`)}
                                    style={[styles.text, styleText]}
                                ></TextInput>
                            </View>
                        </View>
                        <View style={[styles.errorRow, styleErrorRow]}>
                            <View style={[{ width: errorWidth }, styleInnerErrorRow]}>
                                <Text style={[styles.error, styleError]}>{translate(`${errorScreen}.${errorMessage}`)}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </LocalizationConsumer>
        );
    }
}
