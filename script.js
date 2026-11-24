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

document.getElementById('gym-btn').addEventListener('click', function() {
  document.getElementById('gym-ending').style.display = 'none';
  playScene('gym-scene', 'gym-video');
});

document.getElementById('walk-btn').addEventListener('click', function() {
  document.getElementById('walk-ending').style.display = 'none';
  playScene('walk-scene', 'walk-video');
});

//hospital after gym
document.getElementById('gym-video').addEventListener('ended', function() {
  document.getElementById('gym-hospital-ending').style.display = 'none';
  playScene('gym-hospital', 'gym-hospital-video');
});

document.getElementById('gym-hospital-video').addEventListener('ended', function() {
  document.getElementById('gym-hospital-ending').style.display = 'flex';
});

//return to gym or walk decision
document.getElementById('gym-try-again').addEventListener('click', function() {
  showPage('decline-scene');
  document.getElementById('choice2').style.display = 'flex';
});

// ~temporary endings until final scene is filmed?
 document.getElementById('gym-video').addEventListener('ended', function() {
  document.getElementById('gym-ending').style.display = 'flex';
});

document.getElementById('walk-video').addEventListener('ended', function() {
  document.getElementById('walk-ending').style.display = 'flex';
});

document.getElementById('gym-replay').addEventListener('click', function() {
  showPage('decline-scene');
  document.getElementById('choice2').style.display = 'flex';
});

document.getElementById('walk-replay').addEventListener('click', function() {
  showPage('decline-scene');
  document.getElementById('choice2').style.display = 'flex';
});


