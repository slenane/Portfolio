const projectToggleShowBtns = document.querySelectorAll(".project_item--read_more");

const toggleShowProject = (e) => {
    let project = e.target.closest('.project_item');
    let stack = project.querySelector('.project_stack');
    let body = project.querySelector('.project_body');
    let images = project.querySelector('.project_images');
    let mainImage = project.querySelector('.project_image--main');
    let secondaryImageDiv = project.querySelector('.project_secondary_images');
    let secondaryImages = project.querySelectorAll('.project_image--secondary');
    
    let projectLinks = project.querySelector('.project_links');
    let chessChallenge =  project.querySelector('.chess--challenge_link');
  

    if (e.target.classList.contains('closed')) {
        // Animate the removal of the stack
        stack.classList.add('stack_shrink');
        // Hide the main image
        mainImage.classList.add('slide_out');
        setTimeout(() => {
            // Order the images correctly
            images.classList.add('open');
            // Show secondary images
            secondaryImageDiv.classList.remove('hide');
            secondaryImages.forEach(img => img.classList.add('slide_in'));
            // Show the project body
            body.classList.add('project_body--open');
            // Set the project to be shown
            e.target.classList.remove("closed");
            e.target.textContent = "Read less";
            // if the project is the Daily Chess Puzzle show challenge link
            if (chessChallenge) {
                projectLinks.classList.add("chess_links");
                chessChallenge.classList.remove("hide");
            }
        }, 400);
    } else {
        // Animate the showing of the stack
        stack.classList.remove('stack_shrink');
        // Hide secondary images
        secondaryImageDiv.classList.add('hide');
        secondaryImages.forEach(img => img.classList.remove('slide_in'));
        // Order the images correctly
        images.classList.remove('open');
        // Show the main image
        mainImage.classList.remove('slide_out');
        // Hide the project body
        body.classList.remove('project_body--open');
        // if the project is the Daily Chess Puzzle hide challenge link
        if (chessChallenge) {
            projectLinks.classList.remove("chess_links");
            chessChallenge.classList.add("hide");
        }
        // Set the project to be closed
        e.target.classList.add("closed");
        e.target.textContent = "Read more";

        // Set the scroll position to the top of the project div
        window.scrollTo({
            top: project.offsetTop - 100,
            behaviour: "smooth"
        });
    }
};

projectToggleShowBtns.forEach(btn => btn.addEventListener('click', toggleShowProject));