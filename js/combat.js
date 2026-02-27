
let enemy=null;

function spawnEnemy(){
enemy={
name:"Créature Abyssale",
hp:150+player.level*25,
maxHp:150+player.level*25,
atk:15+player.level*4,
xp:100+player.level*40
};
updateBars();
}

function attack(type){
let dmg=0;
let crit=Math.random()<0.2;
let miss=Math.random()<0.1;

if(!miss){
if(type==="magic"){
if(player.mana<20)return;
player.mana-=20;
dmg=player.magie*8;
}else{
dmg=player.force*5;
}
if(crit)dmg*=2;
enemy.hp-=dmg;
animate("enemyPanel");
}

if(enemy.hp<=0){
gainXP(enemy.xp);
loot();
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
animate("playerPanel");

if(player.hp<=0){
document.body.innerHTML=`
<div class="container">
<div class="panel">
<h2>Vous avez péri</h2>
<p>Score : ${player.score}</p>
<button class="button danger" onclick="resetGame()">Recommencer</button>
</div></div>`;
}
}

function loot(){
if(Math.random()<0.6)player.inventory.push("Potion");
if(Math.random()<0.3)player.inventory.push("Essence Mana");
}

function animate(id){
let el=document.getElementById(id);
el.style.animation="hitFlash 0.3s";
setTimeout(()=>el.style.animation="",300);
}

function updateBars(){
document.getElementById("playerHPBar").style.width=(player.hp/player.maxHp*100)+"%";
document.getElementById("playerManaBar").style.width=(player.mana/player.maxMana*100)+"%";
document.getElementById("enemyHPBar").style.width=(enemy.hp/enemy.maxHp*100)+"%";
}
