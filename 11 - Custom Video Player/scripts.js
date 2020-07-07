// Target elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Functions

const togglePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

const updatePlayButton = () => {
  const icon = event.target.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

const skip = () => {
  video.currentTime += parseInt(event.target.dataset.skip)
}

const handleRangeUpdate = () => {
  video[event.target.name] = event.target.value
}

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

const scrub = () => {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => {
  if (mousedown) {
    scrub()
  }
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mousemove',  () => mousedown = false);
