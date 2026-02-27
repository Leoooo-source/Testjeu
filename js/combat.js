
let enemy=null;

function spawnEnemy(){
enemy=randomMonster(player.level);
document.getElementById("enemyName").innerText=enemy.icon+" "+enemy.name;
updateBars();
log("Un "+enemy.name+" apparaît.");
}

function log(text){
let logBox=document.getElementById("combatLog");
logBox.innerHTML+=text+"<br>";
logBox.scrollTop=logBox.scrollHeight;
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

if(crit){dmg*=2;log("Coup critique !")}

enemy.hp-=dmg;
log("Vous infligez "+Math.floor(dmg)+" dégâts.");
animate("enemyPanel");

if(enemy.hp<=0){
gainXP(enemy.xp);
player.score+=enemy.score;
log("Monstre vaincu +"+enemy.score+" points.");
loot();
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
animate("playerPanel");

if(player.hp<=0){
document.body.innerHTML=`<div class="container"><div class="panel">
<h2>Mort</h2><p>Score: ${player.score}</p>
<button class="button danger" onclick="resetGame()">Recommencer</button>
</div></div>`;
}
}

function useCombatItem(index){
let item=player.inventory[index];
if(item==="Petite Potion"){player.hp+=player.maxHp*0.25}
if(item==="Potion Mana"){player.mana+=30}
if(item==="Parchemin de Feu"){enemy.hp-=50;log("Parchemin inflige 50 dégâts.")}
player.inventory.splice(index,1);
updateBars();
save();
}

function loot(){
let roll=Math.random();
if(roll<0.4){player.inventory.push("Petite Potion");log("Drop: Petite Potion")}
else if(roll<0.7){player.inventory.push("Potion Mana");log("Drop: Potion Mana")}
else{player.inventory.push("Parchemin de Feu");log("Drop rare: Parchemin de Feu")}
}

function animate(id){
let el=document.getElementById(id);
el.style.animation="hitFlash .3s";
setTimeout(()=>el.style.animation="",300);
}

function updateBars(){
document.getElementById("playerHPBar").style.width=(player.hp/player.maxHp*100)+"%";
document.getElementById("playerManaBar").style.width=(player.mana/player.maxMana*100)+"%";
document.getElementById("enemyHPBar").style.width=(enemy.hp/enemy.maxHp*100)+"%";
}
