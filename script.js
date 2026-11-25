
//keeping track of the storylines
let completedAnswer = false;
let completedGym = false;
let completedWalk = false;

//show or hide video controls
let showControls = false;

document.getElementById('controls-btn').addEventListener('click', function() {
  showControls = !showControls;

  document.querySelectorAll('video').forEach(function(video) {
    video.controls = showControls;
  });

  if (showControls) {
    this.textContent = 'HIDE CONTROLS';
  } else {
    this.textContent = 'SHOW CONTROLS';
  }
});

//show the selected page
function showPage(pageId) {
  document.querySelectorAll('video').forEach(function(video) {
    video.pause();
  });

  document.querySelectorAll('.home-page, .video-page').forEach(function(page) {
    page.style.display = 'none';
  });

  document.getElementById(pageId).style.display = 'flex';
  document.getElementById('video-error').style.display = 'none';

  //hide title and controls on home and final page
  if (pageId === 'home' || pageId === 'final-scene') {
    document.getElementById('controls-btn').style.display = 'none';
    document.getElementById('site-title').style.display = 'none';
  } else {
    document.getElementById('controls-btn').style.display = 'block';
    document.getElementById('site-title').style.display = 'block';
  }
}

//play a video from the beginning
function playScene(pageId, videoId) {
  showPage(pageId);

  //hide previous choices
  document.querySelectorAll('.video-choices').forEach(function(choice) {
    choice.style.display = 'none';
    choice.classList.remove('is-visible');
  });

  const video = document.getElementById(videoId);

  video.currentTime = 0;

  video.play().catch(function() {
    document.getElementById('video-error').textContent =
      'Could not play: ' + video.getAttribute('src');

    document.getElementById('video-error').style.display = 'block';
  });
}

//show choices over the video
function showChoice(choiceId) {
  updateChoices();

  const choice = document.getElementById(choiceId);

  choice.style.display = 'flex';
  void choice.offsetWidth;
  choice.classList.add('is-visible');
}

//update the remaining choices
function updateChoices() {
  document.getElementById('answer-btn').style.display =
    completedAnswer ? 'none' : '';

  document.getElementById('decline-btn').style.display =
    completedGym && completedWalk ? 'none' : '';

  document.getElementById('gym-btn').style.display =
    completedGym ? 'none' : '';

  document.getElementById('walk-btn').style.display =
    completedWalk ? 'none' : '';

  document.getElementById('gym-to-walk').style.display =
    completedWalk ? 'none' : '';

  document.getElementById('walk-to-gym').style.display =
    completedGym ? 'none' : '';
}

//check if all three storylines are completed
function checkEnding() {
  if (completedAnswer && completedGym && completedWalk) {
    showPage('final-scene');
    return true;
  }

  return false;
}

//start film
document.getElementById('start-btn').addEventListener('click', function() {
  playScene('scene1', 'scene1-video');
});

//first decision after the opening video
document.getElementById('scene1-video').addEventListener('ended', function() {
  showChoice('choice1');
});

//answer the call - play answer clip first
document.getElementById('answer-btn').addEventListener('click', function() {
  playScene('answer-scene', 'answer-video');
});

//then go to hospital when that clip ends
document.getElementById('answer-video').addEventListener('ended', function() {
  playScene('hospital-scene', 'hospital-video');
});

//decline the call
document.getElementById('decline-btn').addEventListener('click', function() {
  playScene('decline-scene', 'decline-video');
});

//hospital after answering the call
document.getElementById('hospital-video').addEventListener('ended', function() {
  completedAnswer = true;

  if (!checkEnding()) {
    showChoice('hospital-ending');
  }
});

//return to the first decision
function returnToCall() {
  showPage('scene1');
  showChoice('choice1');
}

//try a different choice
document.getElementById('try-again-btn').addEventListener('click', function() {
  returnToCall();
});

//choices after declining the call
document.getElementById('decline-video').addEventListener('ended', function() {
  showChoice('choice2');
});

//go to the gym
document.getElementById('gym-btn').addEventListener('click', function() {
  playScene('gym-scene', 'gym-video');
});

//go for a walk
document.getElementById('walk-btn').addEventListener('click', function() {
  playScene('walk-scene', 'walk-video');
});

//continue button after gym
document.getElementById('gym-video').addEventListener('ended', function() {
  showChoice('gym-next');
});

//continue to hospital after gym
document.querySelector('#gym-next button').addEventListener('click', function() {
  playScene('gym-hospital', 'gym-hospital-video');
});

//hospital after gym
document.getElementById('gym-hospital-video').addEventListener('ended', function() {
  completedGym = true;

  if (!checkEnding()) {
    showChoice('gym-hospital-ending');
  }
});

//choose walking instead
document.getElementById('gym-to-walk').addEventListener('click', function() {
  playScene('walk-scene', 'walk-video');
});

//try a different choice after gym
document.getElementById('gym-to-decline').addEventListener('click', function() {
  returnToCall();
});

//continue button after walk
document.getElementById('walk-video').addEventListener('ended', function() {
  showChoice('walk-next');
});

//continue to hospital after walk
document.querySelector('#walk-next button').addEventListener('click', function() {
  playScene('walk-hospital', 'walk-hospital-video');
});

//hospital after walk
document.getElementById('walk-hospital-video').addEventListener('ended', function() {
  completedWalk = true;

  if (!checkEnding()) {
    showChoice('walk-hospital-ending');
  }
});

//choose gym instead
document.getElementById('walk-to-gym').addEventListener('click', function() {
  playScene('gym-scene', 'gym-video');
});

//try a different choice after walk
document.getElementById('walk-to-decline').addEventListener('click', function() {
  returnToCall();
});

//restart the entire film
document.getElementById('restart-btn').addEventListener('click', function() {
  completedAnswer = false;
  completedGym = false;
  completedWalk = false;
  showControls = false;

  document.querySelectorAll('video').forEach(function(video) {
    video.pause();
    video.currentTime = 0;
    video.controls = false;
  });

  document.querySelectorAll('.video-choices').forEach(function(choice) {
    choice.style.display = 'none';
    choice.classList.remove('is-visible');
  });

  document.getElementById('controls-btn').textContent = 'SHOW CONTROLS';

  updateChoices();
  showPage('home');
});

//show an error if the current video cannot load
document.querySelectorAll('video').forEach(function(video) {
  video.addEventListener('error', function() {
    const page = video.closest('.video-page');

    if (page.style.display === 'flex') {
      document.getElementById('video-error').textContent =
        'Could not load: ' + video.getAttribute('src');

      document.getElementById('video-error').style.display = 'block';
    }
  });
});
