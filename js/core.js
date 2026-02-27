
let player = JSON.parse(localStorage.getItem("player")) || null;

function initPlayer(){
    player = {
        level:1,
        xp:0,
        xpNext:100,
        vie:5,
        magie:5,
        force:5,
        defense:5,
        hp:60,
        maxHp:60,
        inventory:[],
        progress:0
    };
    save();
}

function save(){
    localStorage.setItem("player", JSON.stringify(player));
}

function gainXP(amount){
    player.xp += amount;

    if(player.xp >= player.xpNext){
        player.level++;
        player.xp = 0;
        player.xpNext += 75;

        player.vie++;
        player.magie++;
        player.force++;
        player.defense++;

        player.maxHp = player.vie * 12;
        player.hp = player.maxHp;
    }
    save();
}
