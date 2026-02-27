
function renderInventory(){
const list=document.getElementById("inventory");
list.innerHTML="";
player.inventory.forEach((item,i)=>{
let btn=document.createElement("button");
btn.className="button secondary";
btn.innerText=item;
btn.onclick=()=>useItem(i);
list.appendChild(btn);
});
}

function useItem(index){
let item=player.inventory[index];
if(item==="Potion"){
let heal=Math.floor(player.maxHp*0.4);
player.hp=Math.min(player.maxHp,player.hp+heal);
}
if(item==="Essence Occulte"){
player.mana=Math.min(player.maxMana,player.mana+30);
}
player.inventory.splice(index,1);
save();
location.reload();
}
