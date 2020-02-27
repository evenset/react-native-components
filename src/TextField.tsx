import React, { ReactElement } from 'react';
import { Text, StyleSheet, View, StyleProp, TextStyle, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
    text: {
        fontWeight: 'normal',
    },
});

export interface ITextField {
    value: string;
    styleText?: StyleProp<TextStyle>;
    styleContainer?: StyleProp<ViewStyle>;
}

export class TextField extends React.PureComponent<ITextField> {
    render(): ReactElement {
        const { styleText, styleContainer, value, ...other } = this.props;

        return (
            <View style={styleContainer}>
                <Text {...other} style={[styles.text, styleText]}>
                    {value}
                </Text>
            </View>
        );
    }
}
