let themeSwitcher = document.querySelectorAll('.theme-switcher img');
let lightModeIcon = document.querySelector('.light-mode');
let darkModeIcon = document.querySelector('.dark-mode');
let heroAvatar = document.querySelector('.hero-avatar img');
let navbarBrandImage = document.querySelector('.navbar-brand_image');
let cv = document.querySelector('.cv--link');
let github = document.querySelector('.github--link');
let linkedin = document.querySelector('.linkedin--link');
let developDesignImg = document.querySelector('.des-dev-img');
let responsiveImg = document.querySelector('.res-img');
let seoImg = document.querySelector('.seo-img');
let eCommerceImg = document.querySelector('.e-com-img');
let htmlIcon = document.querySelectorAll('.html-icon');
let cssIcon = document.querySelectorAll('.css-icon');
let nodeIcon = document.querySelectorAll('.nodejs-icon');
let expressIcon = document.querySelectorAll('.express-icon');
let githubIcon = document.querySelector('.github-icon');
let successTick = document.querySelector('.form_success--1');

// Update theme and images
let updateTheme = (theme) => {
  if (theme === 'dark') {
    // Update the icon
    lightModeIcon.classList.remove('hide');
    darkModeIcon.classList.add('hide');
    // Update avatar
    heroAvatar.src = '/assets/images/icons/avatar-dark.png';
    navbarBrandImage.src = '/assets/images/icons/avatar-sm-dark.png';
    // Update Icons
    github.src = '/assets/images/icons/github-dark.png';
    developDesignImg.src = '/assets/images/icons/design-develop-dark.png';
    responsiveImg.src = '/assets/images/icons/responsive-dark.png';
    seoImg.src = '/assets/images/icons/seo-dark.png';
    eCommerceImg.src = '/assets/images/icons/ecommerce-dark.png';
    htmlIcon.forEach(
      (icon) => (icon.src = '/assets/images/icons/html5-dark.png')
    );
    cssIcon.forEach(
      (icon) => (icon.src = '/assets/images/icons/css3-dark.png')
    );
    nodeIcon.forEach(
      (icon) => (icon.src = '/assets/images/icons/nodejs-dark.png')
    );
    expressIcon.forEach(
      (icon) => (icon.src = '/assets/images/icons/express-dark.png')
    );
    githubIcon.src = '/assets/images/icons/github-dark.png';
    successTick.src = '/assets/images/icons/tick-dark.png';
  } else {
    // Update the icon
    darkModeIcon.classList.remove('hide');
    lightModeIcon.classList.add('hide');
    // Update avatar
    heroAvatar.src = '/assets/images/icons/avatar.png';
    navbarBrandImage.src = '/assets/images/icons/avatar-sm.png';
    // Update Icons
    github.src = '/assets/images/icons/github.png';
    developDesignImg.src = '/assets/images/icons/design-develop-light.png';
    responsiveImg.src = '/assets/images/icons/responsive-light.png';
    seoImg.src = '/assets/images/icons/seo-light.png';
    eCommerceImg.src = '/assets/images/icons/ecommerce-light.png';
    htmlIcon.forEach((icon) => (icon.src = '/assets/images/icons/html5.png'));
    cssIcon.forEach((icon) => (icon.src = '/assets/images/icons/css3.png'));
    nodeIcon.forEach((icon) => (icon.src = '/assets/images/icons/nodejs.png'));
    expressIcon.forEach(
      (icon) => (icon.src = '/assets/images/icons/express.png')
    );
    githubIcon.src = '/assets/images/icons/github.png';
    successTick.src = '/assets/images/icons/tick.png';
  }
};

// If the user has a preference for light or dark - set to preference
let preference =
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light');

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
    localStorage.setItem('theme', targetTheme);
  })
);
