document.addEventListener('postLoaded', function createVideoTags() {
  let videos = [].slice.call(document.getElementsByClassName('video'))
    .forEach(function(videoDiv) {
      let videoEl = document.createElement('video');
      videoEl.setAttribute('controls', '');
      // videoEl.setAttribute('preload', 'none');
      let source = document.createElement('source');
      source.setAttribute('src', videoDiv.getAttribute('src'));
      videoEl.appendChild(source);
      videoDiv.appendChild(videoEl);
    });
});
