import React, { createContext, ReactChild, ReactElement } from 'react';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

type memoizeConfig = { [key: string]: string };

const disabled = 'disabled';

// Default i18n to be disabled
i18n.locale = disabled;

/**
 * Translation function, pass key matching the locale file and any params
 * Uses memoize for better performance
 */
export const translate = memoize(
    (key: string, config?: memoizeConfig) => {
        // If localization is not enabled, return the string as is
        if (i18n.currentLocale() === disabled) {
            return key;
        }

        if (typeof key !== 'string') {
            return '';
        }

        const split = key.split('.');

        if (split.length < 1) {
            return '';
        }

        // Do not try to translate the empty string or undefined
        const lastKey = split[split.length - 1];

        if (lastKey === '' || lastKey === 'undefined') {
            return '';
        }

        return i18n.t(key, config);
    },
    (key: string, config?: memoizeConfig) => (config ? key + JSON.stringify(config) : key),
);

/**
 * Initialize the language settings.
 * Defaults to using the phones detected lanaguage with a fallback to English.
 * During initialization an language tag and right-to-left setting can be based to overwrite the defaults.
 * Translation can be completely disabled by passing enabled=false.
 */
export const setI18nConfig: (
    enabled: boolean,
    translations?: { [language: string]: () => { [key: string]: { [key: string]: string } } },
    language?: string | null,
    setRTL?: boolean | null,
) => void = (enabled, translations, language = null, setRTL = null) => {
    if (!enabled || !translations) {
        i18n.locale = disabled;

        return;
    }

    // Fallback if no available language fits
    const fallback = { languageTag: 'en', isRTL: false };

    const phoneSettings = RNLocalize.findBestAvailableLanguage(Object.keys(translations)) || fallback;
    const languageTag = language ? language : phoneSettings.languageTag;
    const isRTL = setRTL ? setRTL : phoneSettings.isRTL;

    // Clear translation cache
    translate.cache = new memoize.Cache; // eslint-disable-line new-parens, prettier/prettier

    i18n.defaultLocale = 'en';
    // Set RTL
    I18nManager.forceRTL(isRTL);
    // Set i18n-js config
    i18n.translations = { [languageTag]: translations[languageTag]() };
    i18n.locale = languageTag;
};

export interface LocalizationInterface {
    translate: (key: string, config?: memoizeConfig) => string;
}

export const LocalizationContext = createContext<LocalizationInterface>({ translate });

export const LocalizationProvider = ({ children }: { children: ReactChild }): ReactElement => (
    <LocalizationContext.Provider value={{ translate }}>{children}</LocalizationContext.Provider>
);

export const LocalizationConsumer = LocalizationContext.Consumer;
