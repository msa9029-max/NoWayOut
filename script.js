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

//video starts from the beginning
function playScene(pageId, videoId) {
  document.querySelectorAll('video').forEach(function(video) {
    video.pause();
  });

  showPage(pageId);

  //hide previous choices
  document.getElementById(pageId).querySelectorAll('.video-choices').forEach(function(choice) {
    choice.style.display = 'none';
  });

  const video = document.getElementById(videoId);
  video.currentTime = 0;

  video.play().catch(function() {
    document.getElementById('video-error').textContent =
      'Could not play: ' + video.getAttribute('src');

    document.getElementById('video-error').style.display = 'block';
  });
}

//check if all three storylines are completed
function checkEnding() {
  if (completedAnswer && completedGym && completedWalk) {
    showPage('final-scene');
    return true;
  }

  return false;
}

//update of choices
function updateChoices() {
  document.getElementById('answer-btn').style.display =
    completedAnswer ? 'none' : '';

  document.getElementById('gym-btn').style.display =
    completedGym ? 'none' : '';

  document.getElementById('walk-btn').style.display =
    completedWalk ? 'none' : '';

  document.getElementById('gym-to-walk').style.display =
    completedWalk ? 'none' : '';

  document.getElementById('walk-to-gym').style.display =
    completedGym ? 'none' : '';
  document.getElementById('decline-btn').style.display =
  completedGym && completedWalk ? 'none' : '';
}

//start film
document.getElementById('start-btn').addEventListener('click', function() {
  playScene('scene1', 'scene1-video');
});

//first decision
document.getElementById('scene1-video').addEventListener('ended', function() {
  updateChoices();
  document.getElementById('choice1').style.display = 'flex';
});

//answer the call
document.getElementById('answer-btn').addEventListener('click', function() {
  playScene('answer-scene', 'answer-video');
});

//decline the call
document.getElementById('decline-btn').addEventListener('click', function() {
  playScene('decline-scene', 'decline-video');
});

//continue after answering
document.getElementById('answer-video').addEventListener('ended', function() {
  document.getElementById('answer-next').style.display = 'flex';
});

//hospital after answering
document.querySelector('#answer-next button').addEventListener('click', function() {
  playScene('hospital-scene', 'hospital-video');
});

//completed answer storyline
document.getElementById('hospital-video').addEventListener('ended', function() {
  completedAnswer = true;
  updateChoices();

  if (!checkEnding()) {
    document.getElementById('hospital-ending').style.display = 'flex';
  }
});

//back to the first decision
document.getElementById('try-again-btn').addEventListener('click', function() {
  showPage('scene1');
  updateChoices();
  document.getElementById('choice1').style.display = 'flex';
});

//choices after declining
document.getElementById('decline-video').addEventListener('ended', function() {
  updateChoices();
  document.getElementById('choice2').style.display = 'flex';
});

//go to the gym
document.getElementById('gym-btn').addEventListener('click', function() {
  playScene('gym-scene', 'gym-video');
});

//go for a walk
document.getElementById('walk-btn').addEventListener('click', function() {
  playScene('walk-scene', 'walk-video');
});

//continue after gym
document.getElementById('gym-video').addEventListener('ended', function() {
  document.getElementById('gym-next').style.display = 'flex';
});

//hospital after gym
document.querySelector('#gym-next button').addEventListener('click', function() {
  playScene('gym-hospital', 'gym-hospital-video');
});

//completed gym storyline
document.getElementById('gym-hospital-video').addEventListener('ended', function() {
  completedGym = true;
  updateChoices();

  if (!checkEnding()) {
    document.getElementById('gym-hospital-ending').style.display = 'flex';
  }
});

//choose walking instead
document.getElementById('gym-to-walk').addEventListener('click', function() {
  playScene('walk-scene', 'walk-video');
});

//return to the first decision
document.getElementById('gym-to-decline').addEventListener('click', function() {
  showPage('scene1');
  updateChoices();
  document.getElementById('choice1').style.display = 'flex';
});

//continue after walk
document.getElementById('walk-video').addEventListener('ended', function() {
  document.getElementById('walk-next').style.display = 'flex';
});

//hospital after walk
document.querySelector('#walk-next button').addEventListener('click', function() {
  playScene('walk-hospital', 'walk-hospital-video');
});

//completed walk storyline
document.getElementById('walk-hospital-video').addEventListener('ended', function() {
  completedWalk = true;
  updateChoices();

  if (!checkEnding()) {
    document.getElementById('walk-hospital-ending').style.display = 'flex';
  }
});

//choose gym instead
document.getElementById('walk-to-gym').addEventListener('click', function() {
  playScene('gym-scene', 'gym-video');
});

//return to the first decision
document.getElementById('walk-to-decline').addEventListener('click', function() {
  showPage('scene1');
  updateChoices();
  document.getElementById('choice1').style.display = 'flex';
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
  });

  document.getElementById('controls-btn').textContent = 'SHOW CONTROLS';

  updateChoices();
  showPage('home');
});
