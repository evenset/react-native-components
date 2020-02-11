import React, { ReactElement } from 'react';
import { Text, StyleSheet, View, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { LocalizationConsumer } from './contexts/LocalizationContext';

const styles = StyleSheet.create({
    text: {
        fontWeight: 'normal',
    },
});

export interface IText {
    value: string;
    styleText?: StyleProp<TextStyle>;
    styleContainer?: StyleProp<ViewStyle>;
    screen?: string;
}

export class DefaultTextField extends React.PureComponent<IText> {
    render(): ReactElement {
        const { screen, styleText, styleContainer, value, ...other } = this.props;

        return (
            <LocalizationConsumer>
                {({ translate }): ReactElement => (
                    <View style={styleContainer}>
                        <Text {...other} style={[styles.text, styleText]}>
                            {translate(`${screen}.${value}`)}
                        </Text>
                    </View>
                )}
            </LocalizationConsumer>
        );
    }
}
