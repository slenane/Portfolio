const contactRadioGroup = document.querySelector('.contact_radio_group');
const websiteUpdate = document.querySelector('#website_update');
const websiteUrl = document.querySelector('.website_url--input');
const contactGroups = document.querySelectorAll('.form-group');
const contactInputs = document.querySelectorAll('.form-control');
const formCheckLabels = document.querySelectorAll('.form-check-label');

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

// Update UI when user selects a service type
formCheckLabels.forEach((label) =>
  label.addEventListener('click', (e) => {
    if (e.target.classList.contains('checked')) {
      return;
    } else {
      formCheckLabels.forEach((label) => label.classList.remove('checked'));
      e.target.classList.add('checked');
    }
  })
);

// If the user selects the update existing website radio button then show the website URL input field
const toggleWebsiteField = (e) => {
  if (websiteUpdate.checked) {
    websiteUrl.classList.remove('hide');
  } else {
    websiteUrl.classList.add('hide');
  }
};

// Initialise socket.io
const socket = io();

const form = document.querySelector('.contact_form');

const contactName = document.querySelector('#contact_name');
const contactPhone = document.querySelector('#contact_phone');
const contactEmail = document.querySelector('#contact_email');
const contactService = document.querySelectorAll('.form-check-input');
const contactWebsite = document.querySelector('#contact_website');
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
    phone: contactPhone.value,
    service: Array.from(contactService).filter((item) => item.checked)[0].value,
    website: contactWebsite.value,
    message: contactMessage.value,
  };

  if (mail.name && mail.email && mail.phone && mail.service && mail.message) {
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
contactRadioGroup.addEventListener('click', toggleWebsiteField);
form.addEventListener('submit', sendMail, false);
