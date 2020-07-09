import { Animated, InteractionManager } from 'react-native';

import { Modal } from './Modal';

/**
 * Used to allow any component to open and close a modal
 * without needing to be given access to the props or
 * state of that modal
 */
class ModalController {
    modals: { [name: string]: Modal } = {};

    /**
     * Add the modal to the list of modals the controller
     * has access to. Automatically called by the modal
     * component on creation, it should not need to be
     * used by any other components.
     * @param name the name identifying the modal
     * @param modal the modal instance itself
     */
    initModal(name: string, modal: Modal): void {
        this.modals[name] = modal;
    }

    /**
     * Remove the modal to the list of modals the controller
     * has access to. Automatically called by the modal
     * component on unmount, it should not need to be
     * used by any other components.
     * @param name the name identifying the modal
     */
    clearModal(name: string): void {
        delete this.modals[name];
    }

    /**
     * Open the model with the given name.
     * @param name the name identifying the modal
     */
    open(name: string): void {
        this.modals[name].setState({ visible: true });
        Animated.timing(this.modals[name].state.animValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    /**
     * Close the model with the given name.
     * @param name the name identifying the modal
     */
    close(name: string): void {
        Animated.timing(this.modals[name].state.animValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            // iOS navigation cancels the animation, so this it to make sure
            // that the value is still set to what it should be, otherwise
            // it will mess up the next open animation
            InteractionManager.runAfterInteractions(() => {
                this.modals[name].state.animValue.setValue(1);
                this.modals[name].setState({ visible: false });
            });
        });
    }

    /**
     * Close every modal.
     */
    closeAll(): void {
        for (const name in this.modals) {
            // eslint-disable-next-line no-prototype-builtins
            if (this.modals.hasOwnProperty(name)) {
                this.close(name);
            }
        }
    }
}
export default new ModalController();
