let languageSwitcher = document.querySelector('.language-switcher');

const updatePageLanguage = (lang) => {
  console.log(`The language will now be ${lang}`);
};

// FIX THE EVENT HANDLERS
const manageLanguageOptions = (e) => {
  let languages = languageSwitcher.querySelectorAll('img');
  let selected = e.target;

  if (languages[0] === selected) {
    // Toggle open close language options
    languages[1].classList.toggle('hide-language');
  } else if (languages[1] === selected) {
    // Close the language options
    languages[1].classList.add('selected-language');
    languageSwitcher.removeEventListener('click', manageLanguageOptions);
    // Update the language icon
    setTimeout(() => {
      languages[1].classList.remove('selected-language');
      languageSwitcher.insertAdjacentElement('afterbegin', languages[1]);
      languages[0].classList.add('hide');
      languages[0].classList.add('hide-language');
      setTimeout(() => {
        languages[0].classList.remove('hide');
      }, 1);
    }, 1000);
    // Update the text
    targetLanguage = languages[1].classList[0];
    updatePageLanguage(targetLanguage);
    languageSwitcher.addEventListener('click', manageLanguageOptions);
  }
};

// Language switcher options
languageSwitcher.addEventListener('click', manageLanguageOptions);
