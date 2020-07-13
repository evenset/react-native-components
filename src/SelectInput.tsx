import React, { ReactElement } from 'react';
import { StyleSheet, View, Text, TextInput, TextInputProps, StyleProp, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { LocalizationConsumer } from './contexts/LocalizationContext';
// TODO Remove material icon and use own icon component instead
// @ts-ignore - react-native-vector-icons must be installed as a peer dependency
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // eslint-disable-line import/no-unresolved

import { Modal, ModalController } from './modal/Modal';

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
    },
    more: {
        marginTop: 10,
        marginLeft: '90%',
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
    modalInner: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    optionText: {
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    separator: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    }
});

export interface ISelectInput extends TextInputProps {
    options: Array<string>;
    modalName: string;
    value: string;
    setValue: Function;
    screen?: string;
    styleText?: StyleProp<TextStyle>;
    styleLabel?: StyleProp<TextStyle>;
    styleRow?: StyleProp<ViewStyle>;
    styleBubble?: StyleProp<ViewStyle>;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    errorMessageScreen?: string;
    styleError?: StyleProp<TextStyle>;
    styleColumn?: StyleProp<ViewStyle>;
    styleErrorRow?: StyleProp<ViewStyle>;
    backgroundStyle?: object;
    disableCloseOnTap?: boolean;
    styleInnerContainer?: object;
    styleOption?: object;
}

interface State {
    selected: string;
}

export class SelectInput extends React.PureComponent<ISelectInput, State> {
    constructor(props: Readonly<ISelectInput>) {
        super(props);
        this.openOptions = this.openOptions.bind(this);
        this.setSelected = this.setSelected.bind(this);
    }

    openOptions(): void {
        ModalController.open(this.props.modalName);  
    }

    setSelected(selected: string): void {
        this.props.setValue(selected)
        ModalController.close(this.props.modalName);  
    }

    render(): ReactElement {
        const {
            options,
            modalName,
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
            backgroundStyle,
            disableCloseOnTap,
            styleInnerContainer,
            styleOption,
            value,
            setValue,
            ...other
        } = this.props;
        const iconName = 'expand-more';
        const errorScreen = errorMessageScreen ? errorMessageScreen : screen;

        return (
            <LocalizationConsumer>
                {({ translate }): ReactElement => (
                    <View style={[styles.column, styleColumn]}>
                        <View style={[styles.row, styleRow]}>
                            {label ? <Text style={[styles.label, styleLabel]}>{translate(`${screen}.${label}`)}</Text> : null}
                            <TouchableOpacity style={[styles.bubble, styleBubble]} onPress={this.openOptions}>
                                <TextInput
                                    placeholderTextColor="grey"
                                    editable={false}
                                    pointerEvents="none"
                                    {...other}
                                    placeholder={translate(`${screen}.${placeholder}`)}
                                    value={value}
                                    style={[styles.text, styleText]}
                                    autoCorrect={false}
                                />
                                <MaterialIcon
                                    style={styles.more}
                                    size={24}
                                    color="rgba(0, 0, 0, .38)"
                                    suppressHighlighting
                                    name={iconName}
                                />
                                <Modal
                                    name={modalName}
                                    backgroundStyle={[backgroundStyle]}
                                    disableCloseOnTap={disableCloseOnTap}
                                    styleInnerContainer={[styles.modalInner, styleInnerContainer]}
                                >
                                    <View>
                                        {options.map((option: string, index: number) => (
                                            <TouchableOpacity onPress={() => this.setSelected(option)}>
                                                <Text style={[styles.optionText, styleOption]} key={option}>{option}</Text>
                                                {index + 1 !== options.length ? <View style={styles.separator}></View> : null}
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </Modal>
                            </TouchableOpacity>
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
