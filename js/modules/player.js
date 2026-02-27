
export class Player {
constructor(){
const saved = JSON.parse(localStorage.getItem("playerV10"));
if(saved){Object.assign(this, saved);}
else{
this.level=1;this.xp=0;this.xpNext=100;this.points=0;
this.vie=5;this.magie=5;this.force=5;this.defense=5;
this.floor=1;this.score=0;this.inventory=[];
this.recalc();
}
}

recalc(){
this.maxHp=this.vie*30;
this.maxMana=this.magie*20;
if(!this.hp||this.hp<=0)this.hp=this.maxHp;
if(!this.mana||this.mana<=0)this.mana=this.maxMana;
}

save(){localStorage.setItem("playerV10",JSON.stringify(this));}

gainXP(x){
this.xp+=x;
if(this.xp>=this.xpNext){
this.level++;this.xp=0;this.xpNext+=150;this.points+=3;
return true;
}
return false;
}
}
