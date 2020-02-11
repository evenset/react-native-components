import React, { ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export const ExampleComponent = (): ReactElement => (
    <View style={styles.container}>
        {/* eslint-disable-next-line react/jsx-no-literals */}
        <Text>Hello World</Text>
    </View>
);
