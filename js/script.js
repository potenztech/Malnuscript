var messageContainers = document.querySelectorAll(".messages-container");
var typingIndicators = document.querySelectorAll(".typing");
var messageTone = document.getElementById("messageTone");
// Array of arrays of messages
var messagesArrays = [
    [
        "Hey guys. am I the only one in here? Thanks for letting me in, but what’s this?"
    ],
    [
        "Hello Carter and the rest of you!",
        "This is Malnuscripts Chapter 0, welcome to the orientation tour.",
    ],
    [
        "Click play and listen to the end!" 
    ],
    [
        
    ],
    [
        "I think I've heard of this company before" 
    ],
    [
        "Ooooh!" 
    ],
    [
        "What a picture!" 
    ],
    [
        "So who's the guy talking?" 
    ],
    [
        "I read earlier Ivan?" 
    ],
    [
        "Love the transition" 
    ],
    [
        "Ha haaaaa so true! Sing it and you'll knowit! 🔥" 
    ],
    [
        "These words!!!" 
    ],
    [
        "Y'all heard the lion?!?!" 
    ],
    [
        "Yup! even normal family diner at the table. ancient..." 
    ],
    [
        "And these pastors abusing it too!" 
    ],
    [
        "PREAAAACH!!!! 😭 😤 🤬" 
    ],
    [
        "fam, dis niiiiice tho" 
    ],
    [
        "Say it again. Fight fire with fire right?" 
    ],
    [
        "Entertainment y'all. we all know its bad but we can't quit it" 
    ],
    [
        "speak for yourself. I have stopped watching this new age garbage." 
    ],
    [
        "Yup!!! @ so that's Ivan. Thought that voice sounded familiar!" 
    ],
    [
        "Ooooh well well, do tell pasto!" 
    ],
    [
        "I know we need something a bit more wholesome nowadays." 
    ],
    [
        "Feels like an old ancient hidden papyrus book or something" 
    ],
    [
        "Let's gooooo" 
    ],
    [
        "Hmm an 'Unknown God' Felt that heat?" 
    ],
    [
        "the shade is raw. lol 😅" 
    ],
    [
        "Whew! I don't know what's next, but Iwanna see it!" 
    ],
    [
        "Nicely done sir!" 
    ],
    [
        "This needed a director?" 
    ],
    [
        "So, get a chance at winning [***] by ✓sharing it with a loved one, and telling us what you think of this story." 
    ],
    [
        "Thank you for sharing. The next winner will be announced in 13d 23h 56s.",
        "What’s your info so we can notify you?"
    ],
    [
        "Ivan, ivan@mbakop.com" 
    ],
    [
        "Excellent!" 
    ]
];

// Function to add a message
function addMessage(container, message, callback) {
    // Create a new message element
    var newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.textContent = message;

    // Append the new message to the container
    container.appendChild(newMessage);

    // Trigger the animation and play the tone
    setTimeout(function () {
        newMessage.style.opacity = "1";
        newMessage.style.transform = "translateY(0)";
        playMessageTone();

        // Call the callback function when animation is complete
        if (typeof callback === 'function') {
            callback();
        }

        // Auto-scroll the entire page to the bottom
        window.scrollTo(0, document.body.scrollHeight);
    }, 100);
}

// Function to play the message tone
function playMessageTone() {
    messageTone.currentTime = 0; // Reset audio to start
    messageTone.play().catch(function (error) {
        // Handle error, if any
        console.error('Error playing audio:', error);
    });
}


// Function to toggle typing indicator and frame
function toggleTypingIndicatorAndFrame(containerIndex, show) {
    for (var i = 0; i < typingIndicators.length; i++) {
        typingIndicators[i].style.display = i === containerIndex && show ? "block" : "none";
    }

    // Show frame when typing indicator is hidden
    var frameId = "#framer" + (containerIndex + 1); // Assuming framer IDs follow the pattern #framer1, #framer2, ...
    var frameElement = document.querySelector(frameId);

    if (!show && frameElement) {
        frameElement.style.display = "flex";
    }
}

// Initially hide the frames
for (var i = 0; i < messageContainers.length; i++) {
    var frameId = "#framer" + (i + 1);
    var frameElement = document.querySelector(frameId);

    if (frameElement) {
        frameElement.style.display = "none";
    }
}


// Function to display messages
function displayMessages(container, messagesArray, containerIndex, messageIndex, callback) {
    if (messageIndex < messagesArray.length) {
        var message = messagesArray[messageIndex];
        var nextMessage = messageIndex < messagesArray.length - 1 ? messagesArray[messageIndex + 1] : '';
        var delay = calculateDynamicDelay(message, nextMessage);

        // Show typing indicator for the current container
        toggleTypingIndicatorAndFrame(containerIndex, true);

        addMessage(container, message, function () {
            setTimeout(function () {
                displayMessages(container, messagesArray, containerIndex, messageIndex + 1, callback);
                if (container.id === "messages2" && messageIndex === messagesArray.length - 1) {
                    // Additionally, show the .accordion container
                    var fullContainer = document.querySelector(".video-div");
                    if (fullContainer) {
                        fullContainer.style.display = "block";
                    }
                } 
                if (containerIndex === 2 && messageIndex === messagesArray.length - 1) {
                    var plansDetailsWraps = document.querySelectorAll(".plans-details-wrap1, .plans-details-wrap2, .plans-details-wrap3");

                    // Function to reveal elements with a scroll effect
                    function revealElementsWithScroll(index) {
                        if (index < plansDetailsWraps.length) {
                            plansDetailsWraps[index].style.display = "block";
                            plansDetailsWraps[index].scrollIntoView({ behavior: "smooth" });
                            setTimeout(function () {
                                revealElementsWithScroll(index + 1);
                            }, 500); // Adjust the delay between elements as needed (in milliseconds)
                        }
                    }

                    // Start revealing elements with a scroll effect
                    revealElementsWithScroll(0);
                }

                // Check if the current container is #messages7
                if (containerIndex === 2) { // Check if it's the #messages3 container
                    // Display the .video-div before starting the animation
                    document.querySelector('.video-div').style.display = 'block !important';
                }
                if (containerIndex === 30) { // Check if it's the #messages3 container
                    // Display the .video-div before starting the animation
                    document.querySelector('.replay-div').style.display = 'flex !important';
                }
            }, delay);
        });
    } else {
        // All messages in the current container are displayed
        // Hide typing indicator and show frame for this container
        toggleTypingIndicatorAndFrame(containerIndex, false);

        // Call the callback function when all messages are displayed
        if (typeof callback === 'function') {
            setTimeout(callback, 1000);
        }
    }
}

// Function to calculate dynamic time delay based on current and next messages
function calculateDynamicDelay(currentMessage, nextMessage) {
    // You can adjust this factor based on your preference
    var baseDelay = 100; // Base delay in milliseconds
    var additionalDelayPerChar = 20; // Additional delay per character in milliseconds

    // Calculate the dynamic delay based on the length of the next message
    var dynamicDelay = baseDelay + additionalDelayPerChar * nextMessage.length;

    return dynamicDelay;
}


function startAnimation() {
    document.getElementById("intro").style.display = "none";
    function displayWithDelay(containerIndex) {
        setTimeout(function () {
            displayMessages(
                messageContainers[containerIndex],
                messagesArrays[containerIndex],
                containerIndex,
                0,
                function () {
                    if (containerIndex < 3) { // Only show 2 array values, so change condition to '< 1'
                        displayWithDelay(containerIndex + 1);
                    }
                }
            );
        }, 1000); // Add a delay of 1000 milliseconds (1 second)
    }
    displayWithDelay(0);
}
function timeToMilliseconds(time) {
    var splitTime = time.split(":");
    var minutes = parseInt(splitTime[0]);
    var seconds = parseInt(splitTime[1]);
    return (minutes * 60 + seconds) * 1000; // Convert to milliseconds
}
var video = document.getElementById('videoplay');
var animationStarted = false; // Flag to track whether animation has already started

function startAnimationFromIndex5() {
    // Define an array of delay times for each container index
    var delayTimes = ["02:00", "03:00", "01:30", "00:10","00:02","00:08"]; // Add your desired delay times here

    // Convert delay times to milliseconds
    var delayTimesInMilliseconds = delayTimes.map(timeToMilliseconds);// Add your desired delay times here

    function displayWithDelay(containerIndex) {
        setTimeout(function () {
            if (containerIndex < messagesArrays.length) {
                displayMessages(
                    messageContainers[containerIndex],
                    messagesArrays[containerIndex],
                    containerIndex,
                    0,
                    function () {
                        if (containerIndex < 29) { // Only show 2 array values, so change condition to '< 1'
                            displayWithDelay(containerIndex + 1);
                        }
                    }
                );
            }
        },  delayTimesInMilliseconds[containerIndex] || 1000); // Use the specified delay time or default to 1000 milliseconds (1 second)
    }

    displayWithDelay(4); // Start with array index 3
}


video.addEventListener('play', function() {
    if (!animationStarted) {
        changeLogo();
        startAnimationFromIndex5();
        animationStarted = true;
    }
});

// Event listener for button click
document.getElementById("startAnimationButton").addEventListener("click", startAnimation);

document.addEventListener('DOMContentLoaded', function () {
    let boxes = document.querySelectorAll('.time');
    let index = 0;
  
    function showNextBox() {
      if (index < boxes.length) {
        setTimeout(() => {
          boxes[index].style.opacity = 1; // Set opacity to 1 to show the element
          boxes[index].style.display = 'flex'; // Ensure the element is displayed
          index++;
          showNextBox();
        }, 1000); // Adjust the delay here (in milliseconds)
      }
    }
  
    function hideAllBoxes() {
      boxes.forEach(box => {
        box.style.opacity = 0; // Set opacity to 0 to hide all boxes initially
        box.style.display = 'none'; // Hide all boxes initially
      });
    }
  
    hideAllBoxes(); // Hide all boxes initially
    showNextBox(); // Show boxes one by one
});



//   Popup Js 

function togglePopup() {
    var popupSection = document.getElementById("popupSection");
    if (popupSection.style.display === "none" || popupSection.style.display === "") {
        popupSection.style.display = "flex";
    } else {
        popupSection.style.display = "none";
    }
}
function togglePopupClose() {
    var popupSection = document.getElementById("popupSection");
    if (popupSection.style.display === "flex" || popupSection.style.display === "") {
        popupSection.style.display = "none";
    } else {
        popupSection.style.display = "flex";
    }
}

    // Navbar Logo Change 

var logoSources = [
    { src: "images/Group 1 (32).svg", interval: 10000 },
    { src: "images/Group 1 (33).svg", interval: 15000 }
];

var changingLogo = document.getElementById("changingLogo");
var currentIndex = 0;
var intervalId;

function changeLogo() {
    if (currentIndex < logoSources.length) {
        changingLogo.src = logoSources[currentIndex].src;
        var nextInterval = logoSources[currentIndex].interval;
        currentIndex++;

        clearInterval(intervalId);
        intervalId = setInterval(changeLogo, nextInterval);
    } else {
        clearInterval(intervalId);
    }
}

// let currenttIndex = 0;
// const slides = document.querySelectorAll('.slide');
// const totalSlides = slides.length;

// function showSlide(index) {
//     if (index < 0) {
//         index = totalSlides - 1;
//     } else if (index >= totalSlides) {
//         index = 0;
//     }

//     const transformValue = -index * 100 + '%';
//     document.querySelector('.merch-slider').style.transform = 'translateX(' + transformValue + ')';
//     currenttIndex = index;
// }

// function nextSlide() {
//     showSlide(currenttIndex + 1);
// }

// function prevSlide() {
//     showSlide(currenttIndex - 1);
// }

// setInterval(nextSlide, 3000);