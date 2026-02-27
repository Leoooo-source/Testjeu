
function updateHUD(){
    const hud = document.getElementById("hud");
    if(hud){
        hud.innerHTML = `
        Niv ${player.level} |
        HP ${player.hp}/${player.maxHp} |
        XP ${player.xp}/${player.xpNext}
        `;
    }
}
