/* =========================
   ELEMENT
========================= */

const mobilA =
document.querySelector("#mobilA");

const mobilB =
document.querySelector("#mobilB");

const cameraRig =
document.querySelector("#cameraRig");

const speedSlider =
document.getElementById("speedSlider");

const ageSelect =
document.getElementById("ageSelect");

const startBtn =
document.getElementById("startBtn");

const resetBtn =
document.getElementById("resetBtn");

const statusText =
document.getElementById("status");

const speedometer =
document.getElementById("speedometer");

const speedValue =
document.getElementById("speedValue");

const reactionTimeText =
document.getElementById("reactionTime");

const reactionDistanceText =
document.getElementById("reactionDistance");

const brakingDistanceText =
document.getElementById("brakingDistance");

const stoppingDistanceText =
document.getElementById("stoppingDistance");

const brakeSound =
document.getElementById("brakeSound");

/* =========================
   CHART
========================= */

const ctx =
document
.getElementById("velocityChart")
.getContext("2d");

const velocityChart =
new Chart(ctx,{

    type:'line',

    data:{

        labels:[],

        datasets:[{

            label:
            'Kecepatan Mobil B',

            data:[],

            borderColor:'#e74c3c',

            backgroundColor:
            'rgba(231,76,60,0.1)',

            borderWidth:3,

            fill:true,

            pointRadius:0
        }]
    },

    options:{

        responsive:true,

        animation:false
    }
});

/* =========================
   VARIABEL
========================= */

let g = 9.81;

let mu = 0.7;

let reactionTime = 1.5;

let speedA = 18;

let speedB = 80 / 3.6;

let zA = -20;
let zB = 5;

let braking = false;

let running = false;

let simTime = 0;

/* =========================
   HITUNG FISIKA
========================= */

function calculatePhysics(){

    let speedKmh =
    parseInt(speedSlider.value);

    speedValue.innerHTML =
    speedKmh;

    speedB =
    speedKmh / 3.6;

    /* usia */

    let age =
    ageSelect.value;

    if(age === "young"){

        reactionTime = 1.0;
    }

    else if(age === "adult"){

        reactionTime = 1.5;
    }

    else{

        reactionTime = 2.5;
    }

    /* fisika */

    let reactionDistance =
    speedB * reactionTime;

    let brakingDistance =
    (speedB * speedB) /
    (2 * mu * g);

    let stoppingDistance =
    reactionDistance +
    brakingDistance;

    /* update */

    reactionTimeText.innerHTML =
    reactionTime.toFixed(2);

    reactionDistanceText.innerHTML =
    reactionDistance.toFixed(2);

    brakingDistanceText.innerHTML =
    brakingDistance.toFixed(2);

    stoppingDistanceText.innerHTML =
    stoppingDistance.toFixed(2);
}

/* =========================
   START
========================= */

startBtn.onclick = ()=>{

    if(running) return;

    running = true;

    braking = false;

    simTime = 0;

    velocityChart.data.labels = [];

    velocityChart.data.datasets[0].data = [];

    velocityChart.update();

    statusText.innerHTML =
    "Mobil B Mendekat Cepat";

    setTimeout(()=>{

        braking = true;

        statusText.innerHTML =
        "Pengemudi Mengerem";

        brakeSound.play();

    }, reactionTime * 1000);

    animate();
};

/* =========================
   RESET
========================= */

resetBtn.onclick = ()=>{

    running = false;

    braking = false;

    zA = -120;

    zB = 0;

    mobilA.setAttribute("position", `0 3 ${zA}`);
mobilB.setAttribute("position", `0 3 ${zB}`);

    speedometer.innerHTML =
    "0 km/jam";

    statusText.innerHTML =
    "Status: Direset";
};

/* =========================
   ANIMASI
========================= */

function animate(){

    if(!running) return;

    let dt = 0.016;

    simTime += dt;

    /* mobil A */

    zA -= speedA * dt;

    mobilA.setAttribute("position", `0 3 ${zA}`);
mobilB.setAttribute("position", `0 3 ${zB}`);
    /* jangan tabrak */

    if(zB - (speedB * dt)
    > zA + 5){

        zB -= speedB * dt;
    }

    mobilB.setAttribute(
    "position",
    `0 0 ${zB}`
    );

    /* camera */

    cameraRig.setAttribute(
    "position",
    `0 3 ${zB + 12}`
    );

    /* speedometer */

    let kmh =
    speedB * 3.6;

    speedometer.innerHTML =
    Math.round(kmh)
    + " km/jam";

    /* grafik */

    velocityChart.data.labels
    .push(simTime.toFixed(1));

    velocityChart.data.datasets[0]
    .data.push(kmh);

    velocityChart.update('none');

    /* status */

    let distance =
    Math.abs(zA - zB);

    if(distance < 10){

        statusText.innerHTML =
        "HAMPIR TABRAKAN!";
    }

    if(distance < 5){

        running = false;

        statusText.innerHTML =
        "TABRAKAN!";
    }

    requestAnimationFrame(
    animate
    );
}

/* =========================
   MARKA JALAN
========================= */

const markaContainer =
document.getElementById(
"markaContainer"
);

for(let i=0;i<5000;i+=15){

    let marka =
    document.createElement(
    "a-box"
    );

    marka.setAttribute(
    "position",
    `0 -0.98 ${-10 - i}`
    );

    marka.setAttribute(
    "width",
    "0.4"
    );

    marka.setAttribute(
    "height",
    "0.02"
    );

    marka.setAttribute(
    "depth",
    "6"
    );

    marka.setAttribute(
    "color",
    "white"
    );

    markaContainer
    .appendChild(marka);
}

/* =========================
   TIANG LAMPU
========================= */

const lampContainer =
document.getElementById(
"lampContainer"
);

for(let i=0;i<1000;i+=40){

    /* kiri */

    let leftPole =
    document.createElement(
    "a-cylinder"
    );

    leftPole.setAttribute(
    "position",
    `-10 4 ${-i}`
    );

    leftPole.setAttribute(
    "radius",
    "0.1"
    );

    leftPole.setAttribute(
    "height",
    "8"
    );

    leftPole.setAttribute(
    "color",
    "#888"
    );

    lampContainer
    .appendChild(leftPole);

    /* kanan */

    let rightPole =
    document.createElement(
    "a-cylinder"
    );

    rightPole.setAttribute(
    "position",
    `10 4 ${-i}`
    );

    rightPole.setAttribute(
    "radius",
    "0.1"
    );

    rightPole.setAttribute(
    "height",
    "8"
    );

    rightPole.setAttribute(
    "color",
    "#888"
    );

    lampContainer
    .appendChild(rightPole);
}

/* =========================
   EVENT
========================= */

speedSlider.addEventListener(
"input",
calculatePhysics
);

ageSelect.addEventListener(
"change",
calculatePhysics
);

/* =========================
   INIT
========================= */

calculatePhysics();
/* =========================
   TOGGLE PANEL
========================= */

const toggleBtn =
document.getElementById("toggleUI");

const panel =
document.getElementById("panel");

toggleBtn.onclick = () => {

  panel.classList.toggle("hide");

};
