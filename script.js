//show or hide video controls
let showControls = false;

document.getElementById('controls-btn').addEventListener('click', function() {
  showControls = !showControls;

  document.querySelectorAll('video').forEach(function(video) {
    video.controls = showControls;
  });

  if (showControls) {
    document.getElementById('controls-btn').textContent = 'HIDE CONTROLS';
  } else {
    document.getElementById('controls-btn').textContent = 'SHOW CONTROLS';
  }
});

function showPage(pageId) {
  document.querySelectorAll('.home-page, .video-page').forEach(function(page) {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'flex';
  document.getElementById('video-error').style.display = 'none';
}

//video starts from the beginning
function playScene(pageId, videoId) {
  document.querySelectorAll('video').forEach(function(video) {
    video.pause();
  });
  showPage(pageId);
  const video = document.getElementById(videoId);
  video.currentTime = 0;
  video.play().catch(function() {});
}

//if a video doesn't load
 document.querySelectorAll('video').forEach(function(video) {
  video.addEventListener('error', function() {
    document.getElementById('video-error').style.display = 'block';
  });
});

//start film
 document.getElementById('start-btn').addEventListener('click', function() {
  document.getElementById('choice1').style.display = 'none';
  playScene('scene1', 'scene1-video');
});

//first decision/option
 document.getElementById('scene1-video').addEventListener('ended', function() {
  document.getElementById('choice1').style.display = 'flex';
});

document.getElementById('answer-btn').addEventListener('click', function() {
  document.getElementById('answer-next').style.display = 'none';
  playScene('answer-scene', 'answer-video');
});

document.getElementById('decline-btn').addEventListener('click', function() {
  document.getElementById('choice2').style.display = 'none';
  playScene('decline-scene', 'decline-video');
});

//Answer: car accident then hospital
 document.getElementById('answer-video').addEventListener('ended', function() {
  document.getElementById('answer-next').style.display = 'block';
});

document.getElementById('answer-next').addEventListener('click', function() {
  document.getElementById('hospital-ending').style.display = 'none';
  playScene('hospital-scene', 'hospital-video');
});

document.getElementById('hospital-video').addEventListener('ended', function() {
  document.getElementById('hospital-ending').style.display = 'flex';
});

//back to the first decision
 document.getElementById('try-again-btn').addEventListener('click', function() {
  showPage('scene1');
  document.getElementById('choice1').style.display = 'flex';
});

//Decline: choose gym or walk
document.getElementById('decline-video').addEventListener('ended', function() {
  document.getElementById('choice2').style.display = 'flex';
});

//go to the gym
document.getElementById('gym-btn').addEventListener('click', function() {
  document.getElementById('gym-next').style.display = 'none';
  playScene('gym-scene', 'gym-video');
});

//go for a walk
document.getElementById('walk-btn').addEventListener('click', function() {
  document.getElementById('walk-next').style.display = 'none';
  playScene('walk-scene', 'walk-video');
});

//continue button after gym
document.getElementById('gym-video').addEventListener('ended', function() {
  document.getElementById('gym-next').style.display = 'block';
});

//hospital after gym
document.getElementById('gym-next').addEventListener('click', function() {
  document.getElementById('gym-hospital-ending').style.display = 'none';
  playScene('gym-hospital', 'gym-hospital-video');
});

//options after gym hospital
document.getElementById('gym-hospital-video').addEventListener('ended', function() {
  document.getElementById('gym-hospital-ending').style.display = 'flex';
});

//choose walking instead
document.getElementById('gym-to-walk').addEventListener('click', function() {
  document.getElementById('walk-next').style.display = 'none';
  playScene('walk-scene', 'walk-video');
});

//go back to declining the call
document.getElementById('gym-to-decline').addEventListener('click', function() {
  document.getElementById('choice2').style.display = 'none';
  playScene('decline-scene', 'decline-video');
});

//continue button after walk
document.getElementById('walk-video').addEventListener('ended', function() {
  document.getElementById('walk-next').style.display = 'block';
});

//hospital after walk
document.getElementById('walk-next').addEventListener('click', function() {
  document.getElementById('walk-hospital-ending').style.display = 'none';
  playScene('walk-hospital', 'walk-hospital-video');
});

//options after walk hospital
document.getElementById('walk-hospital-video').addEventListener('ended', function() {
  document.getElementById('walk-hospital-ending').style.display = 'flex';
});

//choose gym instead
document.getElementById('walk-to-gym').addEventListener('click', function() {
  document.getElementById('gym-next').style.display = 'none';
  playScene('gym-scene', 'gym-video');
});

//go back to declining the call
document.getElementById('walk-to-decline').addEventListener('click', function() {
  document.getElementById('choice2').style.display = 'none';
  playScene('decline-scene', 'decline-video');
});
