
let enemy=null;

function spawnEnemy(){
const boss=player.progress%10===9;

const monsters=[
{name:"Cultiste",icon:"🕯️"},
{name:"Horreur Visqueuse",icon:"🦠"},
{name:"Serviteur Abyssal",icon:"👁️"},
{name:"Rejeton",icon:"🐙"}
];

let m=boss?{name:"Ancien Indescriptible",icon:"🐉"}:
monsters[Math.floor(Math.random()*monsters.length)];

enemy={
name:m.name,icon:m.icon,
hp:boss?400:100+player.level*30,
atk:boss?35:12+player.level*4,
xp:boss?300:70+player.level*20
};

document.getElementById("enemyName").innerText=enemy.name;
document.getElementById("enemyIcon").innerText=enemy.icon;
updateHUD();
}

function attack(type){
let dmg=0;

if(type==="physical"){
dmg=player.force*5;
}
else{
let cost=20;
if(player.mana<cost)return alert("Mana insuffisante");
player.mana-=cost;
dmg=player.magie*8;
}

enemy.hp-=dmg;

if(enemy.hp<=0){
gainXP(enemy.xp);
lootDrop();
player.progress++;
player.score=player.progress;
save();
location.href="exploration.html";
return;
}

let received=Math.max(0,enemy.atk-player.defense);
player.hp-=received;

if(player.hp<=0){
document.body.innerHTML=`
<div class="container">
<div class="panel">
<h2>Vous avez sombré dans la folie...</h2>
<p>Score final : ${player.score}</p>
<button class="button danger" onclick="resetGame()">Recommencer</button>
</div>
</div>`;
return;
}

updateHUD();
save();
}

function lootDrop(){
if(Math.random()<0.7){
player.inventory.push("Potion");
}
if(Math.random()<0.3){
player.inventory.push("Essence Occulte");
}
}

function updateHUD(){
document.getElementById("playerHP").innerText=player.hp+"/"+player.maxHp;
document.getElementById("playerMana").innerText=player.mana+"/"+player.maxMana;
document.getElementById("enemyHP").innerText=enemy.hp;
}
