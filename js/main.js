$(function() {

  const $keys = $('.drum-pad');
  const $display = $('#display');
  const $drumMachine = $('#drum-machine');
  const $codedBy = $('.wrapper');

  function onPressHandler(e) {
    // In case Caps Lock is on we need to use toLowerCase() method on e.key
    const audio = $(`div[data-key="${e.key.toLowerCase()}"] audio.clip`).get(0);
    const button = $(audio).parent().get(0);  
    // If key is not Q, W, E, A, S, D, Z, X or C do not execute the function 
    if (!audio) return;    
    playAudio(audio)
    displaySoundName(audio);
    $(button).addClass('active');
  }

  function onClickHandler() {
    const audio = $(this).find('audio.clip').get(0);
    playAudio(audio)
    displaySoundName(audio);
    $(this).addClass('active');
  }
  
  function playAudio(source) {
    source.currentTime = 0;
    source.play();
  }
  
  function displaySoundName(sound) {
    const soundName = $(sound).parent().attr('id');
    $display.addClass('play-mode').text(soundName);
    $display.animate({fontSize: 47}, 50).animate({fontSize: 45}, 50);
  }
  
  function removeTransition() {
    $(this).removeClass('active');
  }

  function renderApp() {
    document.body.style.backgroundImage = `url(${bg.src})`;
    $drumMachine.fadeIn(300);
    $codedBy.fadeIn(300);
  }

  const bg = new Image();
  bg.src = 'img/main-bg.jpeg';
  bg.onload = renderApp;

  $(window).on('keydown', onPressHandler);
  $($keys).on('click', onClickHandler);  
  $($keys).on('transitionend', removeTransition);
  
});