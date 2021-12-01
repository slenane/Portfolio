// ##################################
//              NAVBAR
// ##################################
const navbar = document.querySelector('.navbar');
const whatIDoSection = document.querySelector('#what-i-do_section');
const worksSection = document.querySelector('#project_section');
const skillsSection = document.querySelector('#skillset_section');
const contactSection = document.querySelector('#contact_section');

const toggleNavColour = () => {
    if (window.scrollY < whatIDoSection.offsetTop) {
        navbar.classList.remove('secondary_navbar');
    } else if (window.scrollY >= whatIDoSection.offsetTop && window.scrollY < worksSection.offsetTop) {
        navbar.classList.add('secondary_navbar');
    } else if (window.scrollY >= worksSection.offsetTop && window.scrollY < skillsSection.offsetTop) {
        navbar.classList.remove('secondary_navbar');
    } else if (window.scrollY >= skillsSection.offsetTop && window.scrollY < contactSection.offsetTop) {
        navbar.classList.add('secondary_navbar');
    } else {
        navbar.classList.remove('secondary_navbar');
    }
}

window.addEventListener('scroll', toggleNavColour);

// ##################################
//            WHAT I DO
// ##################################
const whatIDoGrid = document.querySelector('.what_i_do--grid');
const whatIDoGridItem = document.querySelectorAll('.what_i_do--grid_item');

const toggleShowGridItem = (e) => {
    const gridStart = whatIDoGrid.offsetTop - 500;
    const gridEnd = whatIDoGrid.offsetTop + whatIDoGrid.clientHeight;
    // If the user is not scrolling the grid section
    if (window.scrollY < gridStart || window.scrollY > gridEnd) return;
    //  If they are then check where the user is and show the correct item 
    for (let item of whatIDoGridItem) {
        if (window.scrollY > (item.offsetTop - 500)) {
            item.classList.add('active');
        }
    }
}

window.addEventListener('scroll', toggleShowGridItem);

// ##################################
//              WORKS
// ##################################
const projectToggleShowBtns = document.querySelectorAll(".project_item--read_more");
const bounce = document.querySelectorAll('.bouncing_icon');

const toggleShowProject = (e) => {
    let project = e.target.closest('.project_item');
    let stack = project.querySelector('.project_stack');
    let stackLarge = project.querySelector('.project_open--stack');
    let body = project.querySelector('.project_body');
    let images = project.querySelector('.project_images');
    let secondaryImages = project.querySelectorAll('.secondary_images');
    let blurb = project.querySelector('.project_blurb');
    let projectLinks = project.querySelector('.project_links');
    let chessChallenge =  project.querySelector('.chess--challenge_link');
  
    if (e.target.classList.contains('closed')) {
        // Hide the blurb (set max-height and opacity to 0)
        blurb.classList.add('blurb_shrink');
        // BEGIN TIMEOUT
        setTimeout(() => {
            // Set the project to be open (increase margin-bottom)
            project.classList.add('project_open');
            // Add gap between the main and secondary images
            images.classList.add('images_open');
            // Show the additional images
            secondaryImages.forEach(img => img.classList.add('show_secondary_images'));
            // Show the project description
            body.classList.add('project_body--open');
            // Update the read more button
            e.target.classList.remove("closed");
            e.target.textContent = "Read less";
            // Remove the small stack
            stack.classList.add('hide_stack');
            // If the project is the daily puzzle then add the challenge me button
            if (chessChallenge) {
                projectLinks.classList.add("chess_links");
                chessChallenge.classList.remove("hide");
            }
            setTimeout(() => {
                // Show the large stack
                stackLarge.classList.add('show_large_stack');
                // Remove the small stack completely after animation is finished
                stack.classList.add('hide');
            }, 1000);
        }, 400);
    } else {
        // Set display to block to alow for animation
        stack.classList.remove('hide');
        // Remove gap between the main and secondary images
        images.classList.remove('images_open');
        // Hide secondary images
        secondaryImages.forEach(img => img.classList.remove('show_secondary_images'));
        // Show the project blurb
        blurb.classList.remove('blurb_shrink');
        // Hide the large stack
        stackLarge.classList.remove('show_large_stack');
        // Show the small stack
        stack.classList.remove('hide_stack');
        // Update the read less button
        e.target.classList.add("closed");
        e.target.textContent = "Read more";
        // Hide the project body
        body.classList.remove('project_body--open');
        // If the project is the daily puzzle then remove the challenge me button
        if (chessChallenge) {
            projectLinks.classList.remove("chess_links");
            chessChallenge.classList.add("hide");
        }
        // Set the scroll position to the top of the project div
        let scroll = project.offsetTop - 100;
        window.scrollTo({
            top: scroll,
            behavior: "smooth"
        });
        // Set the project to be closed (reduce margin-bottom)
        project.classList.remove('project_open');
    }
};

const stopBounceAnimation = (e) => {
    let stack = e.target.closest('.project_open--stack');
    stack.classList.remove('bouncing_icon');
};

projectToggleShowBtns.forEach(btn => btn.addEventListener('click', toggleShowProject));
bounce.forEach(stack => stack.addEventListener('mouseenter', stopBounceAnimation));

// ##################################
//          CONTACT FORM
// ##################################

const contactRadioGroup = document.querySelector('.contact_radio_group');
const websiteUpdate = document.querySelector('#website_update');
const websiteUrl = document.querySelector('.website_url--input');
const contactGroups = document.querySelectorAll('.form-group');
const contactInputs = document.querySelectorAll('.form-control');

const phoneNumber = document.querySelector('.contact--phone_number');
const email = document.querySelector('.contact--email');

//  Animate the transformation of the input label to move from input field
const animateInput = (e) => {
    let input = e.target;
    let group = input.parentElement;
    let label = group.querySelector('.contact_label');

    // Animate the input label
    label.classList.add('input-focused');
    // Style the input
    contactGroups.forEach(group => group.classList.remove('group-focused'));
    group.classList.add('group-focused');
};


// If the user selects the update existing website radio button then show the website URL input field
const toggleWebsiteField = (e) => {
    if (websiteUpdate.checked) {
        websiteUrl.classList.remove('hide');
    } else {
        websiteUrl.classList.add('hide');
    }
};

// Copy phone or email address to clipboard on click and show clipboard message 
const copyToClipboard = (e) => {
    let target = e.target.closest('.contact_grid_item');

    if (target === phoneNumber) {
        navigator.clipboard.writeText("+353830920355").then(function() {
            phoneNumber.querySelector('.copied_to_clipboard').classList.add('clipboard_updated');
            setTimeout(() => {
                phoneNumber.querySelector('.copied_to_clipboard').classList.remove('clipboard_updated');
            }, 1500);
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    } else {
        navigator.clipboard.writeText("info@stephenlenane.com").then(function() {
            email.querySelector('.copied_to_clipboard').classList.add('clipboard_updated');
            setTimeout(() => {
                email.querySelector('.copied_to_clipboard').classList.remove('clipboard_updated');
            }, 1500);
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    }
}

// Initialise socket.io
const socket = io();

const form = document.querySelector('.contact_form');

const contactName = document.querySelector('#contact_name');
const contactEmail = document.querySelector('#contact_email');
const contactPhone = document.querySelector('#contact_phone');
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
    };
    
    form.classList.add('was-validated');

    const mail = {
        name: contactName.value,
        email: contactEmail.value,
        phone: contactPhone.value,
        service: Array.from(contactService).filter(item => item.checked)[0].value,
        website: contactWebsite.value,
        message: contactMessage.value,
    }

    if (mail.name && mail.email && mail.phone && mail.service && mail.message) {
        // Style contact form
        formSubmit.setAttribute("disabled", true)
        formLoader.classList.add('active');
        formOverlay.classList.add('active');
        // Use socket.io to send mail information to backend
        socket.emit("send mail", mail); 
    } else {
        return;
    }
};

socket.on("mail sent", (mailSent) => {
    if (mailSent === true) {
        // Update contact for html
        formSubmit.setAttribute("disabled", false);
        formLoader.classList.remove('active');
        formOverlay.classList.remove('active');
        formOverlay.classList.add('hide');
        formSuccess.classList.remove('hide');
        formFailure.classList.add('hide');
    } else {
        form.setAttribute("disabled", false);
        formLoader.classList.remove('active');
        formOverlay.classList.remove('active');
        formFailure.classList.remove('hide');
    }
});

contactInputs.forEach(input => input.addEventListener('focus', animateInput));
contactRadioGroup.addEventListener("click", toggleWebsiteField);
phoneNumber.addEventListener('click', copyToClipboard);
email.addEventListener('click', copyToClipboard);
form.addEventListener('submit', sendMail, false);