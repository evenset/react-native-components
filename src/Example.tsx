import React, { ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const ExampleComponent = (): ReactElement => (
    <View style={styles.container}>
        <Text>{'Hello World'}</Text>
    </View>
);

export default ExampleComponent;
