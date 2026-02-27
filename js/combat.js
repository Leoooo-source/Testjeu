
let enemy = null;

function enterCombat(isBoss){
    localStorage.setItem("bossFight", isBoss);
    window.location = "combat.html";
}

function spawnEnemy(){
    const isBoss = localStorage.getItem("bossFight") === "true";
    const names = ["Gobelin", "Spectre", "Chevalier Noir", "Ogre", "Démon Mineur"];

    enemy = {
        name: isBoss ? "Seigneur Abyssal" : names[Math.floor(Math.random()*names.length)],
        hp: isBoss ? 200 : 60 + player.level*10,
        atk: isBoss ? 25 : 8 + player.level*2,
        xp: isBoss ? 200 : 40 + player.level*10
    };

    updateCombatHUD();
}

function attack(type){
    let damage = type === "physical" ? player.force*3 : player.magie*3;
    enemy.hp -= damage;

    if(enemy.hp <= 0){
        gainXP(enemy.xp);
        player.progress++;
        save();
        window.location = "exploration.html";
        return;
    }

    let received = Math.max(0, enemy.atk - player.defense);
    player.hp -= received;

    if(player.hp <= 0){
        localStorage.clear();
        alert("Mort permanente.");
        window.location = "index.html";
    }

    save();
    updateCombatHUD();
}

function updateCombatHUD(){
    document.getElementById("enemyName").innerText = enemy.name;
    document.getElementById("enemyHP").innerText = enemy.hp;
    document.getElementById("playerHP").innerText = player.hp + "/" + player.maxHp;
}
