
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
hp:150+level*40,
maxHp:150+level*40,
atk:15+level*5,
xp:100+level*50
};
}
