
let enemy=null;

function spawnEnemy(){
const boss=player.progress%10===9;

enemy={
name: boss?"Ancien Cosmique":"Horreur Abyssale",
hp: boss?450:150+player.level*30,
maxHp: boss?450:150+player.level*30,
atk: boss?40:15+player.level*4,
xp: boss?400:100+player.level*30
};

updateBars();
}

function attack(type){
let dmg=0;
let crit=Math.random()<0.2;
let miss=Math.random()<0.1;

if(miss){
alert("Attaque ratée !");
}else{
if(type==="magic"){
if(player.mana<20)return alert("Mana insuffisante");
player.mana-=20;
dmg=player.magie*8;
}else{
dmg=player.force*5;
}
if(crit)dmg*=2;
enemy.hp-=dmg;
}

if(enemy.hp<=0){
gainXP(enemy.xp);
player.progress++;
player.score=player.progress;
save();
location.href="exploration.html";
return;
}

enemyTurn();
updateBars();
save();
}

function enemyTurn(){
let crit=Math.random()<0.15;
let miss=Math.random()<0.1;
if(miss)return;

let dmg=Math.max(0,enemy.atk-player.defense);
if(crit)dmg*=2;
player.hp-=dmg;

if(player.hp<=0){
document.body.innerHTML=`
<div class="container">
<div class="panel">
<h2>Vous avez sombré...</h2>
<p>Score : ${player.score}</p>
<button class="button danger" onclick="resetGame()">Recommencer</button>
</div></div>`;
}
}

function updateBars(){
document.getElementById("playerHPBar").style.width=(player.hp/player.maxHp*100)+"%";
document.getElementById("playerManaBar").style.width=(player.mana/player.maxMana*100)+"%";
document.getElementById("enemyHPBar").style.width=(enemy.hp/enemy.maxHp*100)+"%";
}
