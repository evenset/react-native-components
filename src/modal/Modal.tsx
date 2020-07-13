import React, { ReactElement, ReactChild } from 'react';
import { Animated, Dimensions, Modal as RNModal, ModalProps, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import controller from './controller';
export { controller as ModalController};

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    background: {
        position: 'absolute',
        flexGrow: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    backgroundContainer: {
        flexGrow: 1,
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        padding: 20,
    },
});

export interface IModal extends ModalProps {
    /**
     * 'animationStyle' is used to allow custom animations to be
     * defined for the modal. It has to be a function that takes
     * an animated value and returns a style object, so that
     * state.animValue can be passed in by the modal. Overides
     * 'animationType'.
     */
    animationStyle?: (animValue: Animated.Value) => object;
    /**
     * 'name' is used to identify this modal to the modal
     * controller when opening or closing. It must be unique
     * per modal for the controller to work properly.
     */
    name: string;
    backgroundStyle?: object;
    /**
     * By default tapping outside the modal closes it.
     * This disables that.
     * Defaults to false.
     */
    disableCloseOnTap?: boolean;
    styleInnerContainer?: object;
    containerStyle?: object;
    children: ReactChild;
}

interface State {
    visible: boolean;
    animValue: Animated.Value;
}

/**
 * Custom Modal component. Use the ModalController to open and close
 * Modals with `ModalController.open('{name}')` and
 * `ModalController.close('{name}')`.
 */
export class Modal extends React.PureComponent<IModal, State> {
    constructor(props: IModal) {
        super(props);

        this.state = {
            visible: false,
            animValue: new Animated.Value(1),
        };

        controller.initModal(props.name, this);
    }

    componentWillUnmount(): void {
        controller.clearModal(this.props.name);
    }

    static defaultProps = {
        disableCloseOnTap: false,
    };

    render(): ReactElement {
        const {
            animationStyle,
            animationType,
            backgroundStyle,
            disableCloseOnTap,
            name,
            containerStyle,
            styleInnerContainer,
            children,
            onRequestClose,
            ...other
        } = this.props;
        const { visible, animValue } = this.state;
        const closeModal = onRequestClose || ((): void => controller.close(name));
        let animStyle;

        if (animationStyle) {
            animStyle = animationStyle(animValue);
        } else {
            switch (animationType) {
                case 'fade':
                    animStyle = {
                        opacity:
                            animValue &&
                            animValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0],
                            }),
                    };
                    break;

                case 'slide':
                    animStyle = {
                        transform: [
                            {
                                translateY:
                                    animValue &&
                                    animValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, Dimensions.get('window').height],
                                    }),
                            },
                        ],
                    };
                    break;

                default:
                    break;
            }
        }

        return (
            <RNModal transparent onRequestClose={closeModal} visible={visible} {...other} animationType="none">
                <View style={styles.backgroundContainer}>
                    <Animated.View
                        style={[
                            styles.background,
                            backgroundStyle,
                            {
                                opacity:
                                    animValue &&
                                    animValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 0],
                                    }),
                            },
                        ]}
                    />
                    <TouchableWithoutFeedback
                        disabled={disableCloseOnTap}
                        onPress={closeModal}
                        hitSlop={{ bottom: 50, top: 50, left: 40, right: 40 }}
                    >
                        <View style={[styles.container, containerStyle]}>
                            <Animated.View style={[styles.modalContainer, animStyle]}>
                                <ScrollView
                                    style={[styleInnerContainer]}
                                    // this stops touch events on this inner view
                                    // from propagating to the parent
                                    onStartShouldSetResponder={(): boolean => true}
                                    centerContent
                                    contentContainerStyle={styles.innerContainer}
                                >
                                    {children}
                                </ScrollView>
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </RNModal>
        );
    }
}
