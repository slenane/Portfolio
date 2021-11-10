const projectToggleShowBtns = document.querySelectorAll(".project_item--read_more");

const toggleShowProject = (e) => {
    let project = e.target.closest('.project_item');
    let stack = project.querySelector('.project_stack');
    let stackLarge = project.querySelector('.project_open--stack');
    let body = project.querySelector('.project_body');
    let secondaryImages = project.querySelector('.secondary_images');
    let blurb = project.querySelector('.project_blurb');
    
    let projectLinks = project.querySelector('.project_links');
    let chessChallenge =  project.querySelector('.chess--challenge_link');
  

    if (e.target.classList.contains('closed')) {
        // Hide the blurb (set )
        blurb.classList.add('blurb_shrink');

        // BEGIN TIMEOUT
        setTimeout(() => {
            // Set the project to be open (increase margin-bottom)
            project.classList.add('project_open');
            // Show the project description
            body.classList.add('project_body--open');
            // Update the read more button
            e.target.classList.remove("closed");
            e.target.textContent = "Read less";
            // Show the additional images
            secondaryImages.classList.add('show_secondary_images');
            // Remove the small stack
            stack.classList.add('hide_stack');
            // Show the large stack
            stackLarge.classList.add('show_large_stack');
            // If the project is the daily puzzle then add the challenge me button
            if (chessChallenge) {
                projectLinks.classList.add("chess_links");
                chessChallenge.classList.remove("hide");
            }
        }, 400);

    } else {
        // Hide secondary images
        secondaryImages.classList.remove('show_secondary_images');
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
        window.scrollTo({
            top: project.offsetTop - 100,
            behaviour: "smooth"
        });

        // Set the project to be closed (reduce margin-bottom)
        project.classList.remove('project_open');
    }
};

projectToggleShowBtns.forEach(btn => btn.addEventListener('click', toggleShowProject));