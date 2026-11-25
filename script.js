
//keeping track of the storylines
let completedAnswer = false;
let completedGym = false;
let completedWalk = false;

//phone call decision
const callVideo = document.getElementById('scene1-video');
const callChoiceTime = 10;

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

//show the choices over the video
function showChoice(choiceId) {
  updateChoices();

  const choice = document.getElementById(choiceId);

  choice.style.display = 'flex';
  void choice.offsetWidth;
  choice.classList.add('is-visible');
}

//show choices when the video ends
function armChoiceAtEnd(videoId, choiceId) {
  const video = document.getElementById(videoId);

  video.addEventListener('ended', function() {
    showChoice(choiceId);
  });
}

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

//video starts from the beginning
function playScene(pageId, videoId) {
  showPage(pageId);

  //hide previous choices
  document.getElementById(pageId).querySelectorAll('.video-choices').forEach(function(choice) {
    choice.style.display = 'none';
    choice.classList.remove('is-visible');
  });

  const video = document.getElementById(videoId);

  delete video.dataset.choiceShown;
  delete video.dataset.answered;

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

//update available choices
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

//pause the video when Abdulla receives the call
callVideo.addEventListener('timeupdate', function() {
  if (document.getElementById('scene1').style.display === 'none') {
    return;
  }

  if (callVideo.currentTime >= callChoiceTime &&
      !callVideo.dataset.choiceShown) {

    callVideo.dataset.choiceShown = 'true';
    callVideo.pause();
    callVideo.currentTime = callChoiceTime;

    showChoice('choice1');
  }
});

//answer the call and continue the same video
document.getElementById('answer-btn').addEventListener('click', function() {
  document.getElementById('choice1').style.display = 'none';
  document.getElementById('choice1').classList.remove('is-visible');

  callVideo.dataset.choiceShown = 'true';
  callVideo.dataset.answered = 'true';

  callVideo.play().catch(function() {
    document.getElementById('video-error').style.display = 'block';
  });
});

//decline the call
document.getElementById('decline-btn').addEventListener('click', function() {
  playScene('decline-scene', 'decline-video');
});

//hospital after answering the call
callVideo.addEventListener('ended', function() {
  if (callVideo.dataset.answered === 'true') {
    playScene('hospital-scene', 'hospital-video');
  } else {
    showChoice('choice1');
  }
});

//completed answer storyline
document.getElementById('hospital-video').addEventListener('ended', function() {
  completedAnswer = true;

  if (!checkEnding()) {
    showChoice('hospital-ending');
  }
});

//return to the first phone call decision
function returnToCall() {
  showPage('scene1');

  callVideo.dataset.choiceShown = 'true';
  delete callVideo.dataset.answered;

  callVideo.currentTime = callChoiceTime;
  callVideo.pause();

  showChoice('choice1');
}

//try a different choice after answering
document.getElementById('try-again-btn').addEventListener('click', function() {
  returnToCall();
});

//choices after declining
armChoiceAtEnd('decline-video', 'choice2');

//go to the gym
document.getElementById('gym-btn').addEventListener('click', function() {
  playScene('gym-scene', 'gym-video');
});

//go for a walk
document.getElementById('walk-btn').addEventListener('click', function() {
  playScene('walk-scene', 'walk-video');
});

//continue button after gym
armChoiceAtEnd('gym-video', 'gym-next');

//hospital after gym
document.querySelector('#gym-next button').addEventListener('click', function() {
  playScene('gym-hospital', 'gym-hospital-video');
});

//completed gym storyline
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

//return to the first decision after gym
document.getElementById('gym-to-decline').addEventListener('click', function() {
  returnToCall();
});

//continue button after walk
armChoiceAtEnd('walk-video', 'walk-next');

//hospital after walk
document.querySelector('#walk-next button').addEventListener('click', function() {
  playScene('walk-hospital', 'walk-hospital-video');
});

//completed walk storyline
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

//return to the first decision after walk
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

    delete video.dataset.choiceShown;
    delete video.dataset.answered;
  });

  document.querySelectorAll('.video-choices').forEach(function(choice) {
    choice.style.display = 'none';
    choice.classList.remove('is-visible');
  });

  document.getElementById('controls-btn').textContent = 'SHOW CONTROLS';

  updateChoices();
  showPage('home');
});

