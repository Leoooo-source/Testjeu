
function generateNodes(){
const map = document.getElementById("map");
map.innerHTML = "";

for(let i=0;i<3;i++){
let node = document.createElement("div");
node.className="node";

if(player.progress % 10 === 9){
node.innerHTML="<div class='icon'>🐉</div>BOSS";
node.onclick=()=>location.href="combat.html";
}else if(Math.random()<0.6){
node.innerHTML="<div class='icon'>⚔️</div>Combat";
node.onclick=()=>location.href="combat.html";
}else{
node.innerHTML="<div class='icon'>🎁</div>Événement";
node.onclick=()=>randomEvent();
}
map.appendChild(node);
}
}

function randomEvent(){
player.inventory.push("Potion");
player.progress++;
save();
alert("Potion obtenue");
generateNodes();
}
