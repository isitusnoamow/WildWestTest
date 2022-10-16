let count = 0
let started = false;
let score = 0;
let shaking;
let image = new Image()
image.src = "./static/bullded.png"
let rotation = 20

function start() {
    document.getElementById("overlay").style.display = "none";
    started = true
    shaking = setInterval(() => {
        console.log("wow")
        document.getElementById("bull").style.transform = "rotate(" + String(rotation) + "deg)"
        rotation *= -1;
    }, 200)
    setTimeout(()=>{
        started = false
        score = Math.min(count,100);
        clearInterval(shaking)
        document.getElementById("bull").style.transform = "rotate(0deg)"
        if(score < 30){
            document.getElementById("bull").src = "./static/bullded.png"
        }
        setTimeout(() => {
            finish()    
        }, 1000);
    },5000)
}

document.addEventListener("keypress", e => {
    if (e.key === ' ' || e.code === 'Space') {
        if (started) {
            count += 1
        }
    }
})

function finish(){
    clearInterval(shaking);
    document.getElementById("after").style.display = "block";
    document.getElementById("score").innerHTML = String(score) + "/100";
    document.getElementById("saved").value = score;
}