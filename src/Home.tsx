import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';



const HomeScreen = (): ReactElement => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{'Hello World'}</Text>
    </View>
);

export default HomeScreen;
