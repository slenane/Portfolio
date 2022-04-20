let languageSwitcher = document.querySelector('.language-switcher');
let languages = languageSwitcher.querySelectorAll('img');

const updatePageLanguage = (lang) => {
  console.log(`The language will now be ${lang}`);
};

const manageLanguageOptions = (e) => {
  // Check if language options are open
  let optionsOpen = languageSwitcher.classList.contains('options-open');
  // If no - open
  if (!optionsOpen) {
    languageSwitcher.classList.add('options-open');
    return;
  }
  // if yes - change language
  if (optionsOpen) {
    let selectedLanguage = e.target;
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
        updatePageLanguage(selectedLanguage.classList[0]);
        return;
      }, 300);
    }
  }
};

// Language switcher options
languageSwitcher.addEventListener('click', manageLanguageOptions);

// function browserLocales(languageCodeOnly = false) {
//   return navigator.languages.map((locale) =>
//     languageCodeOnly ? locale.split('-')[0] : locale
//   );
// }

// let test = browserLocales(true);
// alert(test);
