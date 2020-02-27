import React, { ReactElement, ReactChild } from 'react';
import {
    TouchableOpacityProps,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProps,
    View,
    StyleSheet,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle,
    Platform,
} from 'react-native';

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'grey',
        padding: 15,
    },
    // eslint-disable-next-line react-native/no-color-literals
    button: {
        borderColor: 'grey',
        alignItems: 'center',
    },
    // eslint-disable-next-line react-native/no-color-literals
    disabledTitle: {
        opacity: 0.5,
    },
    container: {
        marginBottom: 15,
    },
});

export interface IButton extends TouchableOpacityProps, TouchableNativeFeedbackProps {
    title: string;
    styleButton?: StyleProp<ViewStyle>;
    styleTitle?: StyleProp<TextStyle>;
    styleContainer?: StyleProp<ViewStyle>;
}

export interface ITouchableProps extends TouchableOpacityProps, TouchableNativeFeedbackProps {
    children: ReactChild;
}

const Touchable = (props: ITouchableProps): ReactElement => {
    const { onPress, disabled, style, activeOpacity, ...other } = props;

    if (Platform.OS === 'ios') {
        return (
            <TouchableOpacity disabled={disabled} onPress={onPress} style={style} activeOpacity={activeOpacity} {...other}>
                {props.children}
            </TouchableOpacity>
        );
    }

    return (
        <TouchableNativeFeedback disabled={disabled} onPress={onPress} style={style} {...other}>
            {props.children}
        </TouchableNativeFeedback>
    );
};

export class Button extends React.PureComponent<IButton> {
    render(): ReactElement {
        const { onPress, title, disabled, styleTitle, styleButton, styleContainer, ...other } = this.props;

        return (
            <View style={[styles.container, styleContainer]}>
                <Touchable disabled={disabled} style={[styles.button, styleButton]} onPress={onPress} activeOpacity={0.7} {...other}>
                    <Text
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        disabled={disabled}
                        style={disabled ? [styles.disabledTitle, styles.title, styleTitle] : [styles.title, styleTitle]}
                    >
                        {title}
                    </Text>
                </Touchable>
            </View>
        );
    }
}
