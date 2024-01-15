//your code here
 let clickedImages = [];
    let verifyButtonClicked = false;

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to initialize the images and state
    function initialize() {
        const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
        const duplicateClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];

        // Duplicate one of the images
        imageClasses.push(duplicateClass);

        // Shuffle the images for random arrangement
        shuffleArray(imageClasses);

        const imageContainer = document.querySelector('.image-container');
        imageContainer.innerHTML = ''; // Clear previous images

        // Create and append image elements
        imageClasses.forEach((className, index) => {
            const img = document.createElement('img');
            img.src = `path/to/api/${index + 1}.jpg`; // Replace with your actual API path
            img.classList.add(className);
            img.addEventListener('click', () => selectImage(img, className));
            imageContainer.appendChild(img);
        });

        // Reset state variables
        clickedImages = [];
        verifyButtonClicked = false;

        // Show/hide buttons and message based on the state
        showHideElements();
    }

    // Function to handle image click events
    function selectImage(img, className) {
        if (!verifyButtonClicked) {
            if (clickedImages.length < 2 && !clickedImages.includes(img)) {
                clickedImages.push({ img, className });
                img.classList.add('selected');

                if (clickedImages.length === 2) {
                    document.getElementById('verify').style.display = 'inline';
                }
            }
        }
        // Show the reset button when at least one image is clicked
        document.getElementById('reset').style.display = 'inline';
    }

    // Function to verify selected tiles
    function verifyTiles() {
        verifyButtonClicked = true;
        showHideElements();

        if (clickedImages.length === 2) {
            const isIdentical = clickedImages[0].className === clickedImages[1].className;
            const para = document.getElementById('para');
            
            if (isIdentical) {
                para.textContent = 'You are a human. Congratulations!';
            } else {
                para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
            }
        }
    }

    // Function to reset the state
    function resetState() {
        initialize();
        // Hide the reset button after resetting the state
        document.getElementById('reset').style.display = 'none';
    }

    // Function to show/hide buttons and message based on the state
    function showHideElements() {
        const resetButton = document.getElementById('reset');
        const verifyButton = document.getElementById('verify');
        const para = document.getElementById('para');

        if (clickedImages.length === 0) {
            resetButton.style.display = 'none';
            verifyButton.style.display = 'none';
            para.textContent = '';
        } else if (clickedImages.length === 1) {
            resetButton.style.display = 'inline';
            verifyButton.style.display = 'none';
            para.textContent = '';
        } else if (clickedImages.length === 2 && !verifyButtonClicked) {
            resetButton.style.display = 'inline';
            verifyButton.style.display = 'inline';
            para.textContent = '';
        }
    }

    // Initial setup on page load
    window.onload = initialize;