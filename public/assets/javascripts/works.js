const projectToggleShowBtns = document.querySelectorAll(
  '.project_item--read_more'
);
const bounce = document.querySelectorAll('.bouncing_icon');
const stackItems = document.querySelectorAll('.project_stack--item');

const toggleShowProject = (e) => {
  let project = e.target.closest('.project_item');
  let stack = project.querySelector('.project_stack');
  let stackLarge = project.querySelector('.project_open--stack');
  let body = project.querySelector('.project_body');
  let images = project.querySelector('.project_images');
  let secondaryImages = project.querySelectorAll('.secondary_images');
  let blurb = project.querySelector('.project_blurb');
  let projectLinks = project.querySelector('.project_links');
  let chessChallenge = project.querySelector('.chess--challenge_link');

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
      secondaryImages.forEach((img) =>
        img.classList.add('show_secondary_images')
      );
      // Show the project description
      body.classList.add('project_body--open');
      // Update the read more button
      e.target.classList.remove('closed');
      e.target.textContent = 'Read less';
      // Remove the small stack
      stack.classList.add('hide_stack');
      // If the project is the daily puzzle then add the challenge me button
      if (chessChallenge) {
        projectLinks.classList.add('chess_links');
        chessChallenge.classList.remove('hide');
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
    secondaryImages.forEach((img) =>
      img.classList.remove('show_secondary_images')
    );
    // Show the project blurb
    blurb.classList.remove('blurb_shrink');
    // Hide the large stack
    stackLarge.classList.remove('show_large_stack');
    // Show the small stack
    stack.classList.remove('hide_stack');
    // Update the read less button
    e.target.classList.add('closed');
    e.target.textContent = 'Read more';
    // Hide the project body
    body.classList.remove('project_body--open');
    // If the project is the daily puzzle then remove the challenge me button
    if (chessChallenge) {
      projectLinks.classList.remove('chess_links');
      chessChallenge.classList.add('hide');
    }
    // Set the scroll position to the top of the project div
    let scroll = project.offsetTop - 100;
    window.scrollTo({
      top: scroll,
      behavior: 'smooth',
    });
    // Set the project to be closed (reduce margin-bottom)
    project.classList.remove('project_open');
  }
};
projectToggleShowBtns.forEach((btn) =>
  btn.addEventListener('click', toggleShowProject)
);

const stopBounceAnimation = (e) => {
  let stack = e.target.closest('.project_open--stack');
  stack.classList.remove('bouncing_icon');
};
bounce.forEach((stack) =>
  stack.addEventListener('mouseenter', stopBounceAnimation)
);

const justifyDescriptionCenter = (e) => {
  let screenWidth = window.innerWidth;
  let target = e.target.getBoundingClientRect();
  let left = target.left;
  let description = e.target.querySelector('.project_stack--description');
  // At max-width 900 first translate the description box to the left side of the screen by translating the left of the item
  // Then push it back 10% because the description box is 80vw - to center the box
  description.style.transform = `translateX(-${
    left - (screenWidth / 100) * 10
  }px)`;
};

// If the window is resized then alter the positioning
window.addEventListener('resize', () => {
  if (window.innerWidth <= 900) {
    stackItems.forEach((item) =>
      item.addEventListener('mouseenter', justifyDescriptionCenter)
    );
  } else {
    stackItems.forEach((item) =>
      item.removeEventListener('mouseenter', justifyDescriptionCenter)
    );
    stackItems.forEach((item) => {
      let description = item.querySelector('.project_stack--description');
      description.style.transform = `translateX(0px)`;
    });
  }
});
// If the viewport is 900px or less the descriptions should show in the center
if (window.innerWidth <= 900) {
  stackItems.forEach((item) =>
    item.addEventListener('mouseenter', justifyDescriptionCenter)
  );
}
