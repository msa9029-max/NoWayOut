function showPage(pageId) {
  document.querySelectorAll('.home-page, .video-page').forEach(function(page) {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'flex';
  document.getElementById('video-error').style.display = 'none';
}
