
export class Monster {
constructor(level){
const pool=[
{name:"Cultiste",icon:"🕯️",score:100},
{name:"Ombre",icon:"👁️",score:150},
{name:"Rejeton",icon:"🐙",score:200}
];
let base=pool[Math.floor(Math.random()*pool.length)];
this.name=base.name;
this.icon=base.icon;
this.score=base.score;
this.hp=150+level*40;
this.maxHp=this.hp;
this.atk=15+level*5;
this.xp=100+level*50;
}
}
