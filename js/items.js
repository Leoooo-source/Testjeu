
function renderInventory(){
const list=document.getElementById("inventoryList");
list.innerHTML="";
player.inventory.forEach((item,i)=>{
let btn=document.createElement("button");
btn.className="button secondary";
btn.innerText=item;
btn.onclick=()=>{player.inventory.splice(i,1);save();location.reload();}
list.appendChild(btn);
});
}
