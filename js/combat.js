
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

function animate(id,cls){
let el=document.getElementById(id);
el.classList.add(cls);
setTimeout(()=>el.classList.remove(cls),300);
}

function attack(type){
if(player.stunned){log("Vous êtes étourdi !"); player.stunned=false; return}

let dmg=0;
let crit=Math.random()<0.2;
let miss=Math.random()<0.1;

if(miss){log("Attaque ratée.");return}

if(type==="magic"){
if(player.mana<20){log("Mana insuffisante.");return}
player.mana-=20;
dmg=player.magie*10;
animate("playerPanel","magic");
}else{
dmg=player.force*6;
animate("playerPanel","slash");
}

if(crit){dmg*=2;log("Critique !")}

enemy.hp-=dmg;
animate("enemyPanel","shake");
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

function parry(){
let success=Math.random()<0.5;
if(success){
log("Parade réussie ! Contre critique !");
enemy.hp-=player.force*12;
animate("enemyPanel","shake");
}else{
log("Parade échouée ! Le monstre contre en critique !");
let critDmg=(enemy.atk*2)-(player.defense*2);
if(critDmg<0)critDmg=0;
player.hp-=critDmg;
animate("playerPanel","shake");
}
updateBars();
}

function enemyTurn(){
let dmg=Math.max(0,(enemy.atk)-(player.defense*2));
player.hp-=dmg;
log("Vous subissez "+dmg+" dégâts.");
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
if(item==="Grande Potion Rare"){player.hp+=player.maxHp*0.75}
if(item==="Bombe Occulte"){enemy.hp-=80;log("Bombe inflige 80 dégâts.")}
player.inventory.splice(index,1);
updateBars();
save();
}

function updateBars(){
document.getElementById("playerHPBar").style.width=(player.hp/player.maxHp*100)+"%";
document.getElementById("playerManaBar").style.width=(player.mana/player.maxMana*100)+"%";
document.getElementById("enemyHPBar").style.width=(enemy.hp/enemy.maxHp*100)+"%";
}
