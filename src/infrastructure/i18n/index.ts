import i18n from "i18next";
import intervalPlural from "i18next-intervalplural-postprocessor";
import ReactPostprocessor from "i18next-react-postprocessor";
import { initReactI18next } from "react-i18next";
import text from "./text.json";

function toCapitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}

function toRequiredString(value: string) {
    return `${value} *`;
}

const toUpperCase = (str: string) => {
    return str.toUpperCase();
};

i18n
    // load translation using http -> see /public/locales
    // learn more: https://github.com/i18next/i18next-http-backend
    // pass the i18n instance to react-i18next.
    .use(intervalPlural)
    .use(initReactI18next)
    .use({
        type: "postProcessor",
        name: "capitalize",
        process: toCapitalizeFirstLetter,
    })
    .use({
        type: "postProcessor",
        name: "uppercase",
        process: toUpperCase,
    })
    .use({
        type: "postProcessor",
        name: "required",
        process: toRequiredString,
    })
    .use(new ReactPostprocessor())
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: false,
        ns: [],
        defaultNS: "general",
        compatibilityJSON: "v3",
        // lng: Localization.locale,
        resources: text,
        fallbackLng: {
            default: ["es-CO"],
        },
    });

/**
 * Update resources for i18n
 * @param newResources json object that contains the new locales for i18n
 * @example {"es": {"general": {"key": "value"}}, ...otherLanguages}
 */
export function updateResources(newResources: object) {
    const languages = Object.entries(newResources);
    // Loop through namespaces and update resources
    // Iterate over languages
    for (const [language, namespaces] of languages) {
        // Iterate over namespaces for each language
        for (const [namespace, resources] of Object.entries(namespaces)) {
            i18n.addResourceBundle(
                language,
                namespace,
                resources,
                true, // deep merge
                true // overwrite
            );
        }
    }
}

export default i18n;
