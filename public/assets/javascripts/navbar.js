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
const navbarBrand = document.querySelector('.navbar-brand_image');
const hero = document.querySelector('#hero_section');

const toggleNavDisplay = () => {
  let position = window.scrollY + navbar.offsetHeight;
  if (position < hero.clientHeight / 2) {
    navbar.classList.remove('display-navbar');
    navbarBrand.classList.remove('display-brand');
  } else {
    navbar.classList.add('display-navbar');
    navbarBrand.classList.add('display-brand');
  }
};

window.addEventListener('scroll', toggleNavDisplay);
