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
        console.log(item);
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

const contactSection = document.querySelector('#contact_section');
const contactGroups = document.querySelectorAll('.form-group');
const contactInputs = document.querySelectorAll('.form-control');

const animateInput = (e) => {
    let input = e.target;
    let group = input.parentElement;
    let label = group.querySelector('.contact_label');

    // Animate the input label
    label.classList.add('input-focused');
    // Style the input
    contactGroups.forEach(group => group.classList.remove('group-focused'));
    group.classList.add('group-focused');
}

contactInputs.forEach(input => input.addEventListener('focus', animateInput));
contactSection.addEventListener('click', () => {
    contactSection.querySelector('.contact_form').classList.add('show_contact_form');
});