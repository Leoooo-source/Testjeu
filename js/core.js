
let player = JSON.parse(localStorage.getItem("player")) || null;

function initPlayer(){
player={
level:1,xp:0,xpNext:100,points:0,
vie:5,magie:5,force:5,defense:5,
maxHp:120,hp:120,
maxMana:50,mana:50,
inventory:[],progress:0,score:0
};
save();
}

function save(){localStorage.setItem("player",JSON.stringify(player));}

function gainXP(amount){
player.xp+=amount;
if(player.xp>=player.xpNext){
player.level++;
player.xp=0;
player.xpNext+=120;
player.points+=3;
}
save();
}

function applyAttributes(){
player.maxHp=player.vie*25;
player.maxMana=player.magie*15;
player.hp=Math.min(player.hp,player.maxHp);
player.mana=Math.min(player.mana,player.maxMana);
save();
}

function addPoint(stat){
if(player.points<=0)return;
player[stat]++;
player.points--;
applyAttributes();
location.reload();
}

function resetGame(){localStorage.clear();location.href="index.html";}
