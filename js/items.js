
function renderInventory(){
    const list = document.getElementById("inventoryList");
    list.innerHTML = "";

    player.inventory.forEach((item, index)=>{
        const div = document.createElement("div");
        div.className = "node";
        div.innerText = item;
        div.onclick = ()=> useItem(item, index);
        list.appendChild(div);
    });
}

function useItem(item, index){
    if(item === "Potion"){
        player.hp = Math.min(player.maxHp, player.hp + 40);
    }
    if(item === "Elixir"){
        player.magie += 2;
    }
    if(item === "Artefact"){
        player.force += 2;
    }

    player.inventory.splice(index,1);
    save();
    renderInventory();
}
