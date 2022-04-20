// const navLinks = document.querySelectorAll('.nav-link');

// const collapseMobileNav = () => {
//   // Select the button and click it if it is shown to close it
//   let button = document.querySelector('.navbar-toggler');
//   if (button.style.display === 'none') return;
//   else button.click();
// };

// // window.addEventListener('scroll', toggleNavColour);
// navLinks.forEach((link) => link.addEventListener('click', collapseMobileNav));

const navbar = document.querySelector('.navbar');
const navbarBrand = document.querySelector('.navbar-brand');
const navbarBrandImg = document.querySelector('.navbar-brand_image');
const navEmail = document.querySelector('.nav-email');
const navCv = document.querySelector('.nav-cv');
const hero = document.querySelector('#hero_section');

const toggleNavDisplay = () => {
  let position = window.scrollY + navbar.offsetHeight;
  if (position < hero.offsetHeight / 4) {
    navbar.classList.remove('display-navbar');
    navbarBrandImg.classList.remove('display-brand');
    navEmail.classList.remove('display-nav-email');
    navCv.classList.remove('display-nav-cv');
  } else {
    navbar.classList.add('display-navbar');
    navbarBrandImg.classList.add('display-brand');
    navEmail.classList.add('display-nav-email');
    navCv.classList.add('display-nav-cv');
  }
};

const scrollToTop = (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

window.addEventListener('scroll', toggleNavDisplay);
navbarBrand.addEventListener('click', scrollToTop);
