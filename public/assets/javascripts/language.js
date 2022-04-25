let languageSwitcher = document.querySelector('.language-switcher');
let languages = languageSwitcher.querySelectorAll('img');

const supportedLocales = ['en', 'es'];
const defaultLocale = 'en';

const browserLocales = (languageCodeOnly = false) => {
  return navigator.languages.map((locale) =>
    languageCodeOnly ? locale.split('-')[0] : locale
  );
};
// Return the language code of the primary browser language
let locales = browserLocales(true);

let locale;

// Gets filled with active locale translations
let translations = {};

// Load translations for the given locale and translate the page to this locale
const setLocale = async (newLocale) => {
  if (newLocale === locale) return;
  const newTranslations = await fetchTranslationsFor(newLocale);
  locale = newLocale;
  translations = newTranslations;
  translatePage();
};

// Retrieve translations JSON object for the given locale over the network
const fetchTranslationsFor = async (newLocale) => {
  const response = await fetch(`/lang/${newLocale}.json`);
  return await response.json();
};

// Replace the inner text of each element that has a data-i18n-key attribute with the translation corresponding
// to its data-i18n-key
const translatePage = () => {
  document.querySelectorAll('[data-i18n-key]').forEach(translateElement);
};

// Replace the inner text of the given HTML element with the translation in the active locale,
// corresponding to the element's data-i18n-key
const translateElement = (element) => {
  const key = element.getAttribute('data-i18n-key');
  const translation = translations[key];
  element.innerText = translation;
};

const isSupported = (locale) => {
  return supportedLocales.indexOf(locale) > -1;
};

// Retrieve the first locale we support from the given array, or return our default locale
const supportedOrDefault = (locales) => {
  return locales.find(isSupported) || defaultLocale;
};

const bindLocaleSwitcher = (locale) => {
  const options = languageSwitcher.querySelectorAll('img');
  options.forEach((option) => {
    if (option.dataset['language'] === locale) {
      option.classList.add('active');
      languageSwitcher.insertAdjacentElement('afterbegin', option);
      return;
    }
  });
};

const manageLanguageOptions = (e) => {
  if (!e.target.dataset['language']) return;
  // Check if language options are open
  let optionsOpen = languageSwitcher.classList.contains('options-open');
  // If no - open
  if (!optionsOpen) {
    languageSwitcher.classList.add('options-open');
    return;
  }
  // if yes - change language
  if (optionsOpen) {
    let selectedLanguage;
    if (e.target.dataset['language']) {
      selectedLanguage = e.target;
    } else {
      return;
    }
    // if the language is the current language - close options
    if (selectedLanguage.classList.contains('active')) {
      languageSwitcher.classList.remove('options-open');
      return;
    }
    // if not - update the language
    if (!selectedLanguage.classList.contains('active')) {
      languages.forEach((lang) => lang.classList.remove('active'));
      selectedLanguage.classList.add('active');
      // then close options
      languageSwitcher.classList.remove('options-open');
      setTimeout(() => {
        languageSwitcher.insertAdjacentElement('afterbegin', selectedLanguage);
        setLocale(selectedLanguage.dataset['language']);
        localStorage.setItem(
          'language-preference',
          selectedLanguage.dataset['language']
        );
        return;
      }, 300);
    }
  }
};

// Language switcher options
languageSwitcher.addEventListener('click', manageLanguageOptions);

// When the page content is ready...
document.addEventListener('DOMContentLoaded', () => {
  const initialLocale =
    localStorage.getItem('language-preference') ||
    supportedOrDefault(browserLocales(true));
  // Translate the page to the default locale
  setLocale(initialLocale);
  // Set the correct flag
  bindLocaleSwitcher(initialLocale);
});
