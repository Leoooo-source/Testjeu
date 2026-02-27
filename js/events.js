
const eventsPool=[
{type:"positive", text:"Vous trouvez une source d'énergie occulte. +30 Mana.", effect:()=>{player.mana=Math.min(player.maxMana,player.mana+30)}},
{type:"positive", text:"Une relique soigne vos blessures. +30% HP.", effect:()=>{player.hp=Math.min(player.maxHp,player.hp+player.maxHp*0.3)}},
{type:"negative", text:"Une malédiction vous frappe. -20 HP.", effect:()=>{player.hp-=20}},
{type:"negative", text:"Un parasite mental vous affaiblit. -10 Mana.", effect:()=>{player.mana-=10}}
];

function randomEvent(){
let e=eventsPool[Math.floor(Math.random()*eventsPool.length)];
e.effect();
player.floor++;
player.score+=50;
save();
return e;
}
