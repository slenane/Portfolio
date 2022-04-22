const contactGroups = document.querySelectorAll('.form-group');
const contactInputs = document.querySelectorAll('.form-control');

//  Animate the transformation of the input label to move from input field
const animateInput = (e) => {
  let input = e.target;
  let group = input.parentElement;
  let label = group.querySelector('.contact_label');

  // Animate the input label
  label.classList.add('input-focused');
  // Style the input
  contactGroups.forEach((group) => group.classList.remove('group-focused'));
  group.classList.add('group-focused');
};

// Initialise socket.io
const socket = io();

const form = document.querySelector('.contact_form');

const contactName = document.querySelector('#contact_name');
const contactEmail = document.querySelector('#contact_email');
const contactMessage = document.querySelector('#contact_message');

const formLoader = document.querySelector('.form_loader');
const formOverlay = document.querySelector('.form_overlay');
const formFailure = document.querySelector('.form_failure');
const formSuccess = document.querySelector('.form_success');
const formSubmit = document.querySelector('.form_submit button');

const sendMail = (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  }

  form.classList.add('was-validated');

  const mail = {
    name: contactName.value,
    email: contactEmail.value,
    message: contactMessage.value,
  };

  if (mail.name && mail.email && mail.message) {
    // Style contact form
    formSubmit.setAttribute('disabled', true);
    formLoader.classList.add('active');
    formOverlay.classList.add('active');
    // Use socket.io to send mail information to backend
    socket.emit('send mail', mail);
  } else {
    return;
  }
};

socket.on('mail sent', (mailSent) => {
  if (mailSent === true) {
    // Update contact for html
    formSubmit.setAttribute('disabled', false);
    formLoader.classList.remove('active');
    formOverlay.classList.remove('active');
    formOverlay.classList.add('hide');
    formSuccess.classList.remove('hide');
    formFailure.classList.add('hide');
  } else {
    form.setAttribute('disabled', false);
    formLoader.classList.remove('active');
    formOverlay.classList.remove('active');
    formFailure.classList.remove('hide');
  }
});

contactInputs.forEach((input) => input.addEventListener('focus', animateInput));
form.addEventListener('submit', sendMail, false);
