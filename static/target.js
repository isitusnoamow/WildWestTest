let image = new Image()
image.src = "./target.png"
let timeout;
let gamestart = false;
let score = 0;
let targets = 0
let hittimeout;
let gameinterval;

function start() {
    document.getElementById("overlay").style.display = "none";
    gameinterval = setInterval(() => {
        if (targets > 19){
            finish()
        }else{
            let target = new Image();
            target.src = "./static/target.png"
            target.id = 'target'
            target.style.left = String((Math.random() * 70) +15) + "%";
            target.style.top = String((Math.random() * 70) +15) + "%";
            target.style.zIndex = "1000";
            targets++;
            document.body.appendChild(target)
            document.getElementById("ready").innerHTML = String(score) + "/" + String(targets);
            hittimeout = setTimeout(() => {
                target.style.display = "none";
            },700)
            target.addEventListener("click",() => {
                score += 1;
                target.style.display = "none"
                clearTimeout(hittimeout);
                document.getElementById("ready").innerHTML = String(score) + "/" + String(targets);
            })
        }
    },700)
}

function finish(){
    clearInterval(gameinterval);
    document.getElementById("after").style.display = "block";
    document.getElementById("score").innerHTML = String(score) + "/20";
    document.getElementById("saved").value = score;
}