
let player = JSON.parse(localStorage.getItem("player")) || null;

function initPlayer(){
player={
level:1,xp:0,xpNext:100,
vie:5,magie:5,force:5,defense:5,
maxHp:125,hp:125,
maxMana:75,mana:75,
inventory:[],
score:0
};
save();
}

function save(){localStorage.setItem("player",JSON.stringify(player));}

function gainXP(x){
player.xp+=x;
if(player.xp>=player.xpNext){
player.level++;
player.xp=0;
player.xpNext+=120;
}
save();
}

function resetGame(){localStorage.clear();location.href="index.html";}
