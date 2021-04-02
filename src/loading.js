import {Spinner} from 'spin.js';
var opts = {
  lines: 12, // The number of lines to draw
  length: 11, // The length of each line
  width: 5, // The line thickness
  radius: 15, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 0.9, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#4656aa', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

var target;
var spinner

export function startLoading() {
  if (!target) {
    target = document.getElementById('spin-holder');
  }
  target.style.visibility = 'visible';

  if (!spinner)
    spinner = new Spinner(opts).spin(target);
  else 
    spinner.spin(target);
}

export function stopLoading() {
  spinner.stop();
  target.style.visibility = 'hidden';
}
