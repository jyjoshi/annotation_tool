let currentFrame = 0;
const frameCount = 50; // Assuming a maximum of 50 frames
let isPlaying = false;
const fps = 10; // Frames per second

document.getElementById("first-frame").addEventListener("click", function () {
  currentFrame = 0;
  loadFrame(currentFrame);
  updatePlayButton();
});

document.getElementById("last-frame").addEventListener("click", function () {
  currentFrame = frameCount - 1;
  loadFrame(currentFrame);
  updatePlayButton();
});

function updatePlayButton() {
  const toggleButton = document.getElementById("toggle-play-pause");
  if (isPlaying) {
    clearInterval(playInterval);
    toggleButton.classList.remove("playing");
    toggleButton.textContent = "Play";
    isPlaying = false;
  }
}

function loadFrame(frameNumber) {
  document.getElementById("frame").src = "/frame/" + frameNumber;
  // Update any other UI elements or data as needed
}

const toggleButton = document.getElementById("toggle-play-pause");
toggleButton.addEventListener("click", function () {
  if (isPlaying) {
    clearInterval(playInterval);
    this.classList.remove("playing");
    this.textContent = "Play";
    isPlaying = false;
  } else {
    playFrames();
    this.classList.add("playing");
    this.textContent = "Pause";
    isPlaying = true;
  }
});

function playFrames() {
  playInterval = setInterval(() => {
    if (currentFrame < frameCount - 1) {
      currentFrame++;
      loadFrame(currentFrame);
    } else {
      clearInterval(playInterval); // Stop playing at the end
      toggleButton.click(); // Simulate toggle button click
    }
  }, 1000 / fps); // Convert fps to delay in milliseconds
}

function loadFrame(frameNumber) {
  document.getElementById("frame").src = "/frame/" + frameNumber;
  // Update any other UI elements or data as needed
}

document.getElementById("upload-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var formData = new FormData();
  var videoFile = document.getElementById("video-input").files[0];
  formData.append("video", videoFile);

  fetch("http://127.0.0.1:5000/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
});

function loadFrame(frameNumber) {
  document.getElementById("frame").src =
    "http://127.0.0.1:5000/frame/" + frameNumber;
}

document.getElementById("next-frame").addEventListener("click", function () {
  if (currentFrame < frameCount - 1) {
    currentFrame++;
    loadFrame(currentFrame);
  }
});

document.getElementById("prev-frame").addEventListener("click", function () {
  if (currentFrame > 0) {
    currentFrame--;
    loadFrame(currentFrame);
  }
});

// Add more JS code here for handling annotations and saving them
