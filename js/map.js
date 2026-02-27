
function generateNodes(){
    const container = document.getElementById("map");
    container.innerHTML = "";

    for(let i=0;i<3;i++){
        const node = document.createElement("div");
        node.className = "node";

        if(player.progress % 10 === 9){
            node.innerText = "BOSS";
            node.onclick = () => enterCombat(true);
        }
        else if(Math.random() < 0.6){
            node.innerText = "Combat";
            node.onclick = () => enterCombat(false);
        }
        else{
            node.innerText = "Événement";
            node.onclick = () => randomEvent();
        }

        container.appendChild(node);
    }
}

function randomEvent(){
    const items = ["Potion", "Elixir", "Artefact"];
    const item = items[Math.floor(Math.random()*items.length)];
    player.inventory.push(item);
    player.progress++;
    save();
    alert("Objet obtenu : " + item);
    generateNodes();
}
