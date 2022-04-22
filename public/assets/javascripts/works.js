const projectReadMore = document.querySelectorAll('.project_item--read_more');
const projectReadLess = document.querySelectorAll('.project_item--read_less');

const showProject = (e) => {
  let project = e.target.closest('.project_item');
  let body = project.querySelector('.project_body');
  let projectLinks = project.querySelector('.project_links');
  let chessChallenge = project.querySelector('.chess--challenge_link');
  let readLessBtn = project.querySelector('.project_item--read_less');

  // BEGIN TIMEOUT
  setTimeout(() => {
    // Set the project to be open (increase margin-bottom)
    project.classList.add('project_open');
    // Show the project description
    body.classList.add('project_body--open');
    // Update the read more button
    e.target.classList.add('hide');
    readLessBtn.classList.remove('hide');
    // If the project is the daily puzzle then add the challenge me button
    if (chessChallenge) {
      projectLinks.classList.add('chess_links');
      chessChallenge.classList.remove('hide');
    }
  }, 400);
};

const hideProject = (e) => {
  let project = e.target.closest('.project_item');
  let body = project.querySelector('.project_body');
  let projectLinks = project.querySelector('.project_links');
  let chessChallenge = project.querySelector('.chess--challenge_link');
  let readMoreBtn = project.querySelector('.project_item--read_more');

  // Update the read less button
  e.target.classList.add('hide');
  readMoreBtn.classList.remove('hide');
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
};

projectReadMore.forEach((btn) => btn.addEventListener('click', showProject));

projectReadLess.forEach((btn) => btn.addEventListener('click', hideProject));
