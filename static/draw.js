let images = [];
let links = ["./static/drawdd.png", "./static/drawdw.png", "./static/drawwd.png"];
for (let i = 0; i < 3; i++) {
    images[i] = new Image();
    images[i].src = links[i];
}

let startTime;
let reactionTime = 1000;
let timeout;
let gamestart = false;

document.addEventListener("keypress", e => {
    if (e.key === ' ' || e.code === 'Space') {
        if (gamestart) {
            reactionTime = Date.now() - startTime
            console.log(reactionTime)
            gamestart = false;
            clearTimeout(timeout);
            document.getElementById("flash").style.display = "block";
            setTimeout(() => {
                document.getElementById("flash").style.display = "none";
                document.getElementById("bg").style.backgroundImage = "url(./static/drawwd.png)";
                showScore();
            }, 100)
        }
    }
})



function start() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("ready").style.display = "block";
    document.getElementById("bg").style.backgroundImage = "url(./static/drawdd.png)";
    setTimeout(() => {
        document.getElementById("ready").innerHTML = "FIRE"
        document.getElementById("ready").style.color = "#0f0";
        gamestart = true;
        startTime = Date.now();
        timeout = setTimeout(() => {
            gamestart = false
            document.getElementById("flash").style.display = "block";
            setTimeout(() => {
                document.getElementById("flash").style.display = "none";
                document.getElementById("bg").style.backgroundImage = "url(./static/drawdw.png)";
                showScore();
            }, 100)
        }, 1000)
    }, ((Math.random() * 3000) + 2000));
}

function showScore() {
    document.getElementById("after").style.display = "block";
    document.getElementById("score").innerHTML = String(1000 - reactionTime) + "/1000";
    document.getElementById("saved").value = 1000 - reactionTime;
}