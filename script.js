const scene =
  document.querySelector(".scene");

const envelopeButton =
  document.getElementById(
    "envelopeButton"
  );

const letterButton =
  document.getElementById(
    "letterButton"
  );

const messageOverlay =
  document.getElementById(
    "messageOverlay"
  );

const closeMessage =
  document.getElementById(
    "closeMessage"
  );



/* =========================
   فتح الظرف
========================= */

envelopeButton.addEventListener(
  "click",
  () => {

    if (
      scene.classList.contains(
        "opened"
      )
    ) {
      return;
    }

    envelopeButton.classList.add(
      "pressed"
    );

    setTimeout(() => {

      scene.classList.add(
        "opened"
      );

    }, 480);

  }
);



/* =========================
   فتح الرسالة
========================= */

letterButton.addEventListener(
  "click",
  () => {

    messageOverlay.classList.add(
      "show"
    );

  }
);



/* إغلاق الرسالة */

closeMessage.addEventListener(
  "click",
  () => {

    messageOverlay.classList.remove(
      "show"
    );

  }
);



/* الضغط خارج الرسالة */

messageOverlay.addEventListener(
  "click",
  (event) => {

    if (
      event.target ===
      messageOverlay
    ) {

      messageOverlay.classList.remove(
        "show"
      );

    }

  }
);



/* =========================
   الألعاب النارية
========================= */

const canvas =
  document.getElementById(
    "fireworks"
  );

const ctx =
  canvas.getContext("2d");


let rockets = [];

let particles = [];


const colors = [

  "#e87996",
  "#e7ad59",
  "#9b83c6",
  "#71a9c4",
  "#f1c7a8",
  "#d96d9a"

];



/* حجم Canvas */

function resizeCanvas() {

  const ratio =
    window.devicePixelRatio || 1;


  canvas.width =
    window.innerWidth *
    ratio;


  canvas.height =
    window.innerHeight *
    ratio;


  canvas.style.width =
    window.innerWidth +
    "px";


  canvas.style.height =
    window.innerHeight +
    "px";


  ctx.setTransform(
    ratio,
    0,
    0,
    ratio,
    0,
    0
  );

}


window.addEventListener(
  "resize",
  resizeCanvas
);


resizeCanvas();



/* إنشاء صاروخ */

function launchFirework() {

  rockets.push({

    x:
      Math.random() *
      window.innerWidth,

    y:
      window.innerHeight + 20,

    targetY:
      8 +
      Math.random() *
      window.innerHeight *
      0.42,

    speed:
      4.5 +
      Math.random() * 2,

    color:
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ]

  });

}



/* انفجار */

function explode(rocket) {

  const amount = 42;


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const angle =
      Math.PI *
      2 *
      i /
      amount;


    const speed =
      1.2 +
      Math.random() * 3;


    particles.push({

      x:
        rocket.x,

      y:
        rocket.y,

      vx:
        Math.cos(angle) *
        speed,

      vy:
        Math.sin(angle) *
        speed,

      life: 1,

      size:
        1 +
        Math.random() * 1.8,

      color:
        rocket.color

    });

  }

}



/* حركة الألعاب النارية */

function animateFireworks() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );


  /* الصواريخ */

  for (
    let i = rockets.length - 1;
    i >= 0;
    i--
  ) {

    const rocket =
      rockets[i];


    rocket.y -=
      rocket.speed;


    ctx.beginPath();


    ctx.arc(
      rocket.x,
      rocket.y,
      1.7,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      rocket.color;


    ctx.fill();


    if (
      rocket.y <=
      rocket.targetY
    ) {

      explode(rocket);

      rockets.splice(i, 1);

    }

  }



  /* الشرارات */

  for (
    let i = particles.length - 1;
    i >= 0;
    i--
  ) {

    const particle =
      particles[i];


    particle.x +=
      particle.vx;


    particle.y +=
      particle.vy;


    particle.vy +=
      0.025;


    particle.life -=
      0.018;


    ctx.globalAlpha =
      particle.life;


    ctx.beginPath();


    ctx.arc(
      particle.x,
      particle.y,
      particle.size,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      particle.color;


    ctx.fill();


    if (
      particle.life <= 0
    ) {

      particles.splice(
        i,
        1
      );

    }

  }


  ctx.globalAlpha = 1;


  requestAnimationFrame(
    animateFireworks
  );

}


animateFireworks();



/* إطلاق الألعاب النارية */

function scheduleFirework() {

  launchFirework();


  setTimeout(
    scheduleFirework,
    900 +
    Math.random() * 1300
  );

}


scheduleFirework();