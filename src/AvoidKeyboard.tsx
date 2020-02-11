import React, { ReactElement, ReactChild } from 'react';
import { Animated, EmitterSubscription, Keyboard, KeyboardEvent, Platform } from 'react-native';

export interface IAvoidKeyboard {
    scrollToEnd?: Function;
    children: ReactChild;
    styles?: {};
}

/**
 * Component wrapper that adds padding to the bottom of what it wraps when the
 * keyboard is shown, to move content at the bottom of the screen above the
 * keyboard.
 * This component does no animating on Android, which deals with keyboard avoiding on
 * it's own.
 */
export class AvoidKeyboard extends React.Component<IAvoidKeyboard> {
    static defaultProps = {
        styles: {
            alignItems: 'stretch',
            flexDirection: 'column',
            flexGrow: 1,
        },
    };

    constructor(props: IAvoidKeyboard) {
        super(props);

        this.keyboardHeight = new Animated.Value(0);
        this.keyboardShow = this.keyboardShow.bind(this);
        this.keyboardHide = this.keyboardHide.bind(this);
    }

    componentDidMount(): void {
        if (Platform.OS === 'ios') {
            this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardShow);
            this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardHide);
        }
    }

    componentWillUnmount(): void {
        if (this.keyboardWillShowSub && typeof this.keyboardWillShowSub.remove === 'function') {
            this.keyboardWillShowSub.remove();
        }
        if (this.keyboardWillHideSub && typeof this.keyboardWillHideSub.remove === 'function') {
            this.keyboardWillHideSub.remove();
        }
    }

    keyboardHeight: Animated.Value;

    keyboardWillShowSub: EmitterSubscription | undefined;

    keyboardWillHideSub: EmitterSubscription | undefined;

    keyboardShow(event: KeyboardEvent): void {
        Animated.timing(this.keyboardHeight, {
            duration: event.duration * 2,
            toValue: event.endCoordinates.height,
        }).start(() => {
            if (this.props.scrollToEnd) {
                this.props.scrollToEnd();
            }
        });
    }

    keyboardHide(event: KeyboardEvent): void {
        Animated.timing(this.keyboardHeight, {
            duration: event.duration / 2,
            toValue: 0,
        }).start();
    }

    render(): ReactElement {
        return <Animated.View style={[this.props.styles, { paddingBottom: this.keyboardHeight }]}>{this.props.children}</Animated.View>;
    }
}
