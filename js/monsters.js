
const monsterPool=[
{name:"Cultiste",icon:"🕯️",score:100},
{name:"Ombre",icon:"👁️",score:150},
{name:"Rejeton",icon:"🐙",score:200}
];

function randomMonster(level){
let base=monsterPool[Math.floor(Math.random()*monsterPool.length)];
return{
name:base.name,
icon:base.icon,
score:base.score,
hp:120+level*30,
maxHp:120+level*30,
atk:12+level*4,
xp:80+level*35
};
}
