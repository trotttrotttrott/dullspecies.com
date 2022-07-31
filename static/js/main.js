let speed = 25;
let scale = 1;
let canvas;
let ctx;
let logoColor;

let dvd = {
  x: 200,
  y: 300,
  xspeed: 5,
  yspeed: 5,
  img: new Image()
};

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
  canvas = document.getElementById("dvd");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  pickColor();
  changeImage();
  update();
})();

function update() {
  setTimeout(() => {
    ctx.fillStyle = '#130706';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = logoColor;
    ctx.fillRect(dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
    ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
    dvd.x+=dvd.xspeed;
    dvd.y+=dvd.yspeed;
    checkHitBox();
    update();
  }, speed)
}

function checkHitBox() {
  if (dvd.x+dvd.img.width*scale >= canvas.width || dvd.x <= 0) {
    dvd.xspeed *= -1;
    pickColor();
    changeImage();
  } else if (dvd.y+dvd.img.height*scale >= canvas.height || dvd.y <= 0) {
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
  dvd.img.src = `/static/images/dvd/${images[Math.floor(Math.random()*images.length)]}.png`;
}
