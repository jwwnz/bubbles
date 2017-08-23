var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
//
// c.fillStyle = 'rgba(255, 0, 0, 0.1)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0,0,255,0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0,255,255,0.5)';
// c.fillRect(300, 300, 100, 100);
// console.log(canvas);
//
// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "purple";
// c.stroke();
//
// // //arc / Circle
// // c.beginPath();
// // c.arc(300, 300, 30, Math.PI * 2, false);
// // c.strokeStyle = "blue";
// // c.stroke();
//
// //repeated circle
// var color;
// var randrad;
//
// for (var i = 0; i < 20; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   var randomNo = Math.floor(Math.random() * 3 + 1);
//   randrad = Math.random() * 2 + 1;
//   console.log(randrad);
//
//   if (randomNo == 1) {
//     color = "yellow";
//   } else if (randomNo == 2) {
//     color = "blue";
//   } else {
//     color = "red";
//   }
//
//   c.beginPath();
//   c.arc(x, y, 30, Math.PI * randrad, false);
//   c.strokeStyle = color;
//   c.stroke();
// }
var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 40;
var minRadius = 10;

var colorArray = [
    '#1283B2',
    '#FF1942',
    '#00B4FF',
    '#CEC850',
    '#F7EF45',
]

window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
  })

window.addEventListener('resize', function(){

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})


function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color
    c.fill();

  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //this is where the interactivity occurs

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 && mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius){
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 10;
// var dy = (Math.random() - 0.5) * 10;
// var radius = 30;

var circleArray = [];



console.log(circleArray);

// var circle = new Circle(200, 200, 3, 3, 30);

function init() {

circleArray = [];
  for (var i = 0; i < 400; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));

  }
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  // circle.update();

  // c.beginPath();
  // c.arc(x, y, 30, Math.PI * 2, false);
  // c.strokeStyle = "red";
  // c.stroke();
}

init();

animate();
