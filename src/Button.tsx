import React, { ReactElement } from 'react';
import { LocalizationConsumer } from './contexts/LocalizationContext';
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
    TouchableOpacityComponent,
    TouchableNativeFeedbackComponent,
} from 'react-native';

const Touchable: typeof TouchableOpacityComponent | typeof TouchableNativeFeedbackComponent =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        // FIXME: Move to color constants file
        backgroundColor: 'grey',
        padding: 15,
    },
    // eslint-disable-next-line react-native/no-color-literals
    button: {
        // FIXME: Move to color constants file
        borderColor: 'grey',
        alignItems: 'center',
    },
    // eslint-disable-next-line react-native/no-color-literals
    disabledTitle: {
        // FIXME: Move to color constants file
        opacity: 0.5,
    },
    container: {
        marginBottom: 15,
    },
});

export interface Props extends TouchableOpacityProps, TouchableNativeFeedbackProps {
    screen?: string;
    title: string;
    styleButton?: StyleProp<ViewStyle>;
    styleTitle?: StyleProp<TextStyle>;
    styleContainer?: StyleProp<ViewStyle>;
}

class DefaultButton extends React.PureComponent<Props> {
    render(): ReactElement {
        const { screen, onPress, title, disabled, styleTitle, styleButton, styleContainer, ...other } = this.props;

        return (
            <LocalizationConsumer>
                {({ translate }): ReactElement => (
                    <View style={[styles.container, styleContainer]}>
                        <Touchable
                            disabled={disabled}
                            style={[styles.button, styleButton]}
                            onPress={onPress}
                            activeOpacity={0.7}
                            {...other}
                        >
                            <Text
                                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                                // @ts-ignore
                                disabled={disabled}
                                style={disabled ? [styles.disabledTitle, styles.title, styleTitle] : [styles.title, styleTitle]}
                            >
                                {translate(`${screen}.${title}`)}
                            </Text>
                        </Touchable>
                    </View>
                )}
            </LocalizationConsumer>
        );
    }
}

export default DefaultButton;