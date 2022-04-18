const navLinks = document.querySelectorAll('.nav-link');

const collapseMobileNav = () => {
  // Select the button and click it if it is shown to close it
  let button = document.querySelector('.navbar-toggler');
  if (button.style.display === 'none') return;
  else button.click();
};

// window.addEventListener('scroll', toggleNavColour);
navLinks.forEach((link) => link.addEventListener('click', collapseMobileNav));
