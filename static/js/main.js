let speed = 30;
let canvas;
let ctx;
let logoColor;
let currentImageIndex;

let dvd = {
  x: 200,
  y: 300,
  xspeed: 5,
  yspeed: 5,
  img: new Image()
};

// All images must be the same size for this to work
let images = [
  'angry-pirate',
  'bunny-boy',
  'cheeky',
  'closet-concerns',
  'clown-contentment',
  'dvd',
  'fish-fang',
  'happy-hell',
  'hats-on',
  'picture-this',
  'sleepy-ear-smell',
  'super-d',
  'think-space',
  'whoa-mama',
];

(function main(){
  canvas = document.getElementById('dvd');
  ctx = canvas.getContext('2d');
  canvasResize();
  addEventListener('resize', canvasResize);
  pickColor();
  changeImage();
  update();
})();

function update() {
  setTimeout(() => {
    ctx.fillStyle = '#130706';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = logoColor;
    ctx.fillRect(dvd.x, dvd.y, dvd.img.width, dvd.img.height);
    ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width, dvd.img.height);
    dvd.x+=dvd.xspeed;
    dvd.y+=dvd.yspeed;
    checkHitBox();
    update();
  }, speed)
}

function checkHitBox() {
  if (dvd.x+dvd.img.width > canvas.width || dvd.x <= 0) {
    dvd.xspeed *= -1;
    pickColor();
    changeImage();
  }
  if (dvd.y+dvd.img.height > canvas.height || dvd.y <= 0) {
    dvd.yspeed *= -1;
    pickColor();
    changeImage();
  }
}

function pickColor() {
  r = Math.random() * 254;
  g = Math.random() * 254;
  b = Math.random() * 254;
  logoColor = `rgb(${r},${g},${b})`;
}

function changeImage() {
  let randomIndex = function() { return Math.floor(Math.random()*images.length); };
  let newIndex = randomIndex();
  while (currentImageIndex == newIndex) {
    newIndex = randomIndex();
  }
  dvd.img.src = `/static/images/dvd/${images[newIndex]}.png`;
  currentImageIndex = newIndex;
}

function canvasResize() {
  if (dvd.x+dvd.img.width > window.innerWidth || dvd.y+dvd.img.height > window.innerHeight) {
    setTimeout(canvasResize, 5000);
    return;
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
