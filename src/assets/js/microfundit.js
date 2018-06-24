$(document).ready(function () {
  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });
  $('.upload1').filer({
    limit: 1,
    maxSize: 3,
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'psd'],
    changeInput: true,
    showThumbs: true,
    addMore: true
  });
  $('[data-fancybox="gallery"]').fancybox({
    // Options will go here
  });
});

