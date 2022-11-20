(function main(){

  var canvas = document.getElementById('doods');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext('2d');
  ctx.globalAlpha = 0.25;

  var images = [
    'angry-pirate',
    'bunny-boy',
    'cheeky',
    'closet-concerns',
    'clown-contentment',
    'fish-fang',
    'happy-hell',
    'hats-on',
    'picture-this',
    'sleepy-ear-smell',
    'super-d',
    'think-space',
    'whoa-mama',
  ];

  for (const i in images) {
    let img = new Image();
    img.src = `/static/images/doods/${images[i]}.png`
    let x = Math.random() * (canvas.width - img.width);
    let y = Math.random() * (canvas.height - img.height);
    img.onload = function() {
      ctx.drawImage(img, x, y);
    }
  }

})();
