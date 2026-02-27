
let enemy=null;

function spawnEnemy(){
enemy=randomMonster(player.level);
document.getElementById("enemyName").innerText=enemy.icon+" "+enemy.name;
updateBars();
log("Un "+enemy.name+" apparaît.");
}

function log(t){
let box=document.getElementById("combatLog");
box.innerHTML+=t+"<br>";
box.scrollTop=box.scrollHeight;
}

function attack(type){
let dmg=0;
let crit=Math.random()<0.2;
let miss=Math.random()<0.1;

if(miss){log("Attaque ratée.");return}

if(type==="magic"){
if(player.mana<20){log("Mana insuffisante.");return}
player.mana-=20;
dmg=player.magie*8;
}else{
dmg=player.force*5;
}

if(crit){dmg*=2;log("Critique !")}

enemy.hp-=dmg;
log("Vous infligez "+Math.floor(dmg)+" dégâts.");

if(enemy.hp<=0){
gainXP(enemy.xp);
player.score+=enemy.score;
log("Monstre vaincu +"+enemy.score+" pts.");
save();
setTimeout(()=>location.href="exploration.html",800);
return;
}

enemyTurn();
updateBars();
save();
}

function enemyTurn(){
let dmg=Math.max(0,enemy.atk-player.defense);
player.hp-=dmg;
log("Vous subissez "+dmg+" dégâts.");

if(player.hp<=0){
document.body.innerHTML=`<div class="container"><div class="panel">
<h2>Mort</h2><p>Score: ${player.score}</p>
<button class="button danger" onclick="resetGame()">Recommencer</button>
</div></div>`;
}
}

function updateBars(){
document.getElementById("playerHPBar").style.width=(player.hp/player.maxHp*100)+"%";
document.getElementById("playerManaBar").style.width=(player.mana/player.maxMana*100)+"%";
document.getElementById("enemyHPBar").style.width=(enemy.hp/enemy.maxHp*100)+"%";
}
