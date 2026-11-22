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
