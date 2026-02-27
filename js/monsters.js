
const monsterPool = [
{name:"Cultiste Dément", icon:"🕯️"},
{name:"Horreur Rampante", icon:"🦠"},
{name:"Ombre Abyssale", icon:"👁️"},
{name:"Rejeton du Néant", icon:"🐙"}
];

function randomMonster(level){
let base = monsterPool[Math.floor(Math.random()*monsterPool.length)];
return {
name:base.name,
icon:base.icon,
hp:120 + level*30,
maxHp:120 + level*30,
atk:12 + level*4,
xp:80 + level*35
};
}
