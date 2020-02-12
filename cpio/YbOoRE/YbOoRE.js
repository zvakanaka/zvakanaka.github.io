window.starfieldOptions = {};
starfieldOptions.starSize = .1;
starfieldOptions.minMax = 20;
starfieldOptions.fps = 30;
starfieldOptions.blurAmount = 0;
starfieldOptions.focalBlankSize = 2;
starfieldOptions.newStarsPerFrame = 5;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const stars = [];
window.addEventListener('resize', resizeCanvas, false);

function addStars(num) {
  for (let i = 0; i < num; i++) {
    stars.push(getStar());
  }
}
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars.length = 0; // empty stars array
  drawStuff();
}
function getStar() {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dX: getRandomInt(-starfieldOptions.minMax, starfieldOptions.minMax) + getRandomInt(0, 9) / 10,
    dY: getRandomInt(-starfieldOptions.minMax, starfieldOptions.minMax) + getRandomInt(0, 9) / 10,
    size: starfieldOptions.starSize,
    color: `rgb(${getRandomInt(200, 255)}, ${getRandomInt(200, 255)}, ${getRandomInt(200, 255)})`
  };
}

resizeCanvas();
let lastFps = starfieldOptions.fps;
let handle = setInterval(mainLoop, 1000 / starfieldOptions.fps);

function mainLoop() {
  if (starfieldOptions.fps !== lastFps) {
    clearInterval(handle);
    handle = setInterval(mainLoop, 1000 / starfieldOptions.fps);
  }
  // delete stars that have moved off screen
  const garbageStars = stars.reduce((acc, star, i) => {
    if (star.x > canvas.width || star.y > canvas.height ||
       star.x < 0 || star.y < 0) acc.push(i);
    return acc;
  }, []);
  if (garbageStars.length > 0) {
    garbageStars.reverse();
    garbageStars.forEach(index => stars.splice(index, 1));
  }
  // add new star
  addStars(starfieldOptions.newStarsPerFrame);
  drawStuff();
}

function drawStuff() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // bg
  ctx.fillStyle = `rgb(0,0,0)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.x += star.dX; // calculate star's new position
    star.y += star.dY;
    star.size += (Math.abs(star.dX) + Math.abs(star.dY)) / 2 * .01;
    for (let i = starfieldOptions.blurAmount + 1; i > 1; i--) {
      const colorStrength = 255 / i;
      ctx.fillStyle = `rgb(${colorStrength}, ${colorStrength}, ${colorStrength})`;
      ctx.fillRect(star.x - star.dX / 2 * i, star.y - star.dY / 2 * i, star.size, star.size);
    }

    ctx.fillStyle = star.color;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
  ctx.fillStyle = 'rgb(20, 0, 35)';
  ctx.fillRect(canvas.width / 2 - starfieldOptions.focalBlankSize / 2, canvas.height / 2 - starfieldOptions.focalBlankSize / 2, starfieldOptions.focalBlankSize, starfieldOptions.focalBlankSize);
}

function getRandomInt(min, max) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const camelCase = str => str.replace(/-[a-z]/g, val => val[1].toUpperCase());
const kabobCase = str => str.replace(/[A-Z]/g, val => '-'+val.toLowerCase());

const configDiv = document.querySelector('.starfield-options');
const boundObj = window[configDiv.dataset.windowObject];
Object.entries(boundObj).forEach(([key, value]) => {
  const label = document.createElement('label');
  const kabobKey = kabobCase(key);
  label.textContent = key;
  const control = document.createElement('input');
  control.setAttribute('type', 'number');
  control.value = value;
  ['input', 'change'].forEach(event => {
    control.addEventListener(event, e => {
      boundObj[key] = Number(e.target.value);
    });
  });
  label.htmlFor = control.id = `${kabobCase(configDiv.dataset.windowObject)}-${kabobKey}`;
  label.appendChild(control);
  configDiv.appendChild(label);
});

document.addEventListener('keyup', e => {
  if (e.code === 'KeyH') configDiv.hidden = !configDiv.hidden;
});
