
let player = JSON.parse(localStorage.getItem("player")) || null;

function initPlayer(){
player={
level:1,xp:0,xpNext:100,points:0,
vie:5,magie:5,force:5,defense:5,
maxHp:0,hp:0,
maxMana:0,mana:0,
inventory:[],
score:0,
floor:1
};
recalculateStats();
save();
}

function recalculateStats(){
player.maxHp = player.vie * 30;
player.maxMana = player.magie * 20;
if(player.hp==0) player.hp = player.maxHp;
if(player.mana==0) player.mana = player.maxMana;
}

function save(){localStorage.setItem("player",JSON.stringify(player));}

function gainXP(x){
player.xp+=x;
if(player.xp>=player.xpNext){
player.level++;
player.xp=0;
player.xpNext+=150;
player.points+=3;
}
save();
}

function addPoint(stat){
if(player.points<=0)return;
player[stat]++;
player.points--;
recalculateStats();
save();
location.reload();
}

function resetGame(){localStorage.clear();location.href="index.html";}
