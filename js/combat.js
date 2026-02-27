
let enemy = null;

function spawnEnemy(){
const boss = player.progress % 10 === 9;
const monsters = [
{name:"Gobelin",icon:"👺"},
{name:"Spectre",icon:"👻"},
{name:"Ogre",icon:"🧌"},
{name:"Démon",icon:"😈"}
];

let m = boss ? {name:"Dragon Ancien",icon:"🐉"} :
monsters[Math.floor(Math.random()*monsters.length)];

enemy = {
name:m.name,
icon:m.icon,
hp: boss ? 300 : 80 + player.level*20,
atk: boss ? 30 : 10 + player.level*3,
xp: boss ? 250 : 50 + player.level*15
};

document.getElementById("enemyName").innerText = enemy.name;
document.getElementById("enemyIcon").innerText = enemy.icon;
updateHUD();
}

function attack(type){
let dmg = type === "physical" ? player.force*4 : player.magie*4;
enemy.hp -= dmg;

if(enemy.hp <= 0){
gainXP(enemy.xp);
player.progress++;
save();
location.href="exploration.html";
return;
}

let received = Math.max(0, enemy.atk - player.defense);
player.hp -= received;

if(player.hp <= 0){
document.body.innerHTML = `
<div class="container">
<div class="panel">
<h2>Vous êtes mort</h2>
<button class="button danger" onclick="resetGame()">Recommencer</button>
</div>
</div>`;
return;
}

updateHUD();
save();
}

function updateHUD(){
document.getElementById("playerHP").innerText = player.hp + "/" + player.maxHp;
document.getElementById("enemyHP").innerText = enemy.hp;
}
