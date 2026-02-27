
import { Player } from './modules/player.js';
import { Monster } from './modules/monster.js';

const player=new Player();
player.save();

let enemy=null;

window.startCombat=()=>{
enemy=new Monster(player.level);
renderCombat();
};

window.attack=(type)=>{
let dmg= type==="magic" ? player.magie*10 : player.force*6;
if(type==="magic" && player.mana<20)return;
if(type==="magic")player.mana-=20;
enemy.hp-=dmg;
if(enemy.hp<=0){
player.score+=enemy.score;
let levelUp=player.gainXP(enemy.xp);
player.floor++;
player.save();
if(levelUp)showLevelUp();
else location.href="exploration.html";
}
enemyTurn();
renderCombat();
};

function enemyTurn(){
let dmg=Math.max(0,enemy.atk-(player.defense*2));
player.hp-=dmg;
if(player.hp<=0){
alert("Mort — Score: "+player.score);
localStorage.clear();
location.href="index.html";
}
}

window.useItem=(i)=>{
let item=player.inventory[i];
if(item==="Potion"){player.hp+=player.maxHp*0.5;}
if(item==="Bombe"){enemy.hp-=80;}
player.inventory.splice(i,1);
player.save();
renderCombat();
};

function showLevelUp(){
document.body.innerHTML=`
<div class="overlay">
<div class="overlay-content">
<h2>Niveau Supérieur</h2>
<button class="button" onclick="upgrade('vie')">Vie</button>
<button class="button secondary" onclick="upgrade('magie')">Magie</button>
<button class="button secondary" onclick="upgrade('force')">Force</button>
<button class="button secondary" onclick="upgrade('defense')">Défense</button>
</div></div>`;
}

window.upgrade=(stat)=>{
player[stat]++;player.points--;player.recalc();player.save();
location.href="exploration.html";
};

window.generateMap=()=>{
const map=document.getElementById("map");
map.innerHTML="";
for(let i=0;i<3;i++){
let r=Math.random();
let node=document.createElement("div");
node.className="node";
if(r<0.6){node.innerText="⚔️";node.onclick=()=>location.href="combat.html";}
else if(r<0.9){node.innerText="❓";node.onclick=()=>eventNode();}
else{node.innerText="💎";node.classList.add("treasure");node.onclick=()=>treasure();}
map.appendChild(node);
}
};

function eventNode(){
player.floor++;
player.score+=50;
player.save();
alert("Événement mystérieux...");
}

function treasure(){
player.inventory.push("Potion");
player.floor++;
player.score+=200;
player.save();
alert("Trésor trouvé !");
}

window.renderCombat=()=>{
document.getElementById("enemyName").innerText=enemy.icon+" "+enemy.name;
document.getElementById("playerHP").style.width=(player.hp/player.maxHp*100)+"%";
document.getElementById("enemyHP").style.width=(enemy.hp/enemy.maxHp*100)+"%";
document.getElementById("mana").style.width=(player.mana/player.maxMana*100)+"%";
const inv=document.getElementById("combatInv");
inv.innerHTML="";
player.inventory.forEach((item,i)=>{
inv.innerHTML+=`<button class='button secondary' onclick='useItem(${i})'>${item}</button>`;
});
player.save();
};
