import React, { ReactElement } from 'react';
import { StyleSheet, View, Text, TextInput, TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { LocalizationConsumer } from './contexts/LocalizationContext';
// TODO Remove material icon and use own icon component instead
// @ts-ignore - react-native-vector-icons must be installed as a peer dependency
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // eslint-disable-line import/no-unresolved

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
        // FIXME: Move to color stylesheet once it is implemented
        backgroundColor: 'grey',
        width: '80%',
        height: 40,
    },
    eye: {
        marginTop: 8.5,
        marginLeft: '85%',
        position: 'absolute',
        textAlignVertical: 'center',
    },
    // eslint-disable-next-line react-native/no-color-literals
    error: {
        // FIXME: Move to color stylesheet once it is implemented
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

export interface IPasswordInput extends TextInputProps {
    screen?: string;
    styleText?: StyleProp<TextStyle>;
    styleLabel?: StyleProp<TextStyle>;
    styleRow?: StyleProp<ViewStyle>;
    styleBubble?: StyleProp<ViewStyle>;
    label?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    errorMessage?: string;
    errorMessageScreen?: string;
    styleError?: StyleProp<TextStyle>;
    styleColumn?: StyleProp<ViewStyle>;
    styleErrorRow?: StyleProp<ViewStyle>;
}

interface State {
    hideTextEntry: boolean;
}

export class PasswordInput extends React.PureComponent<IPasswordInput, State> {
    constructor(props: Readonly<IPasswordInput>) {
        super(props);

        this.state = {
            hideTextEntry: true,
        };

        this.onAccessoryPress = this.onAccessoryPress.bind(this);
    }

    onAccessoryPress(): void {
        const { hideTextEntry } = this.state;

        this.setState({ hideTextEntry: !hideTextEntry });
    }

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
            ...other
        } = this.props;
        const { hideTextEntry } = this.state;
        const name = hideTextEntry ? 'visibility-off' : 'visibility';
        const errorScreen = errorMessageScreen ? errorMessageScreen : screen;

        return (
            <LocalizationConsumer>
                {({ translate }): ReactElement => (
                    <View style={[styles.column, styleColumn]}>
                        <View style={[styles.row, styleRow]}>
                            {label ? <Text style={[styles.label, styleLabel]}>{translate(`${screen}.${label}`)}</Text> : null}
                            <View style={[styles.bubble, styleBubble]}>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCompleteType="password"
                                    textContentType="password"
                                    placeholderTextColor="lightgrey"
                                    {...other}
                                    placeholder={translate(`${screen}.${placeholder}`)}
                                    style={[styles.text, styleText]}
                                    secureTextEntry={hideTextEntry}
                                    autoCorrect={false}
                                />
                                <MaterialIcon
                                    style={styles.eye}
                                    size={24}
                                    color="rgba(0, 0, 0, .38)"
                                    onPress={this.onAccessoryPress}
                                    suppressHighlighting
                                    name={name}
                                />
                            </View>
                        </View>
                        <View style={[styles.errorRow, styleErrorRow]}>
                            <Text style={[styles.error, styleError]}>
                                {Boolean(errorMessage) ? translate(`${errorScreen}.${errorMessage}`) : ''}
                            </Text>
                        </View>
                    </View>
                )}
            </LocalizationConsumer>
        );
    }
}
