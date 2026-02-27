
function renderInventory(){
const list=document.getElementById("inventoryList");
list.innerHTML="";
player.inventory.forEach((item,i)=>{
let desc="";
if(item==="Petite Potion")desc="Rend 25% des PV";
if(item==="Potion Moyenne")desc="Rend 50% des PV";
if(item==="Grande Potion")desc="Rend 75% des PV";

let btn=document.createElement("button");
btn.className="button secondary";
btn.innerText=item+" - "+desc;
btn.onclick=()=>useItem(i);
list.appendChild(btn);
});
}

function useItem(index){
let item=player.inventory[index];
if(item==="Petite Potion"){
player.hp=Math.min(player.maxHp,player.hp+player.maxHp*0.25);
}
if(item==="Potion Moyenne"){
player.hp=Math.min(player.maxHp,player.hp+player.maxHp*0.5);
}
if(item==="Grande Potion"){
player.hp=Math.min(player.maxHp,player.hp+player.maxHp*0.75);
}
player.inventory.splice(index,1);
save();
location.reload();
}
