
let player = JSON.parse(localStorage.getItem("player")) || null;

function initPlayer(){
player={
level:1,xp:0,xpNext:100,
vie:5,magie:5,force:5,defense:5,
maxHp:120,hp:120,
maxMana:60,mana:60,
inventory:[],progress:0,score:0
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
player.vie++;
player.magie++;
player.force++;
player.defense++;
player.maxHp=player.vie*25;
player.maxMana=player.magie*15;
player.hp=player.maxHp;
player.mana=player.maxMana;
}
save();
}

function resetGame(){localStorage.clear();location.href="index.html";}
