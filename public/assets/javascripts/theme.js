let themeSwitcher = document.querySelectorAll('.theme-switcher img');
let lightModeIcon = document.querySelector('.light-mode');
let darkModeIcon = document.querySelector('.dark-mode');
let cv = document.querySelector('.cv--link');
let github = document.querySelector('.github--link');
let linkedin = document.querySelector('.linkedin--link');
let developDesignImg = document.querySelector('.des-dev-img');
let responsiveImg = document.querySelector('.res-img');
let seoImg = document.querySelector('.seo-img');
let eCommerceImg = document.querySelector('.e-com-img');

// Update theme and images
let updateTheme = (theme) => {
  if (theme === 'dark') {
    // Update the icon
    lightModeIcon.classList.remove('hide');
    darkModeIcon.classList.add('hide');
    // Update Icons
    cv.src = '/assets/images/icons/cv-dark.png';
    github.src = '/assets/images/icons/github-dark.png';
    linkedin.src = '/assets/images/icons/linkedin-dark.png';
    developDesignImg.src = '/assets/images/icons/design-develop-dark.png';
    responsiveImg.src = '/assets/images/icons/responsive-dark.png';
    seoImg.src = '/assets/images/icons/seo-dark.png';
    eCommerceImg.src = '/assets/images/icons/ecommerce-dark.png';
  } else {
    // Update the icon
    darkModeIcon.classList.remove('hide');
    lightModeIcon.classList.add('hide');
    // Update Icons
    cv.src = '/assets/images/icons/cv-light.png';
    github.src = '/assets/images/icons/github-light.png';
    linkedin.src = '/assets/images/icons/linkedin-light.png';
    developDesignImg.src = '/assets/images/icons/design-develop-light.png';
    responsiveImg.src = '/assets/images/icons/responsive-light.png';
    seoImg.src = '/assets/images/icons/seo-light.png';
    eCommerceImg.src = '/assets/images/icons/ecommerce-light.png';
  }
};

// If the user has a preference for light or dark - set to preference
let preference = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';

if (preference) {
  document.documentElement.setAttribute('data-theme', preference);
  if (preference === 'dark') {
    updateTheme('dark');
  }
}

// Switch light/dark mode with UI update
themeSwitcher.forEach((icon) =>
  icon.addEventListener('click', (e) => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', targetTheme);
    targetTheme === 'light' ? updateTheme('light') : updateTheme('dark');
  })
);
