// characters
let Bowman = {
    health: 70,
    attack: 20,
    counter: 4,
}

let Magician = {
    health: 80,
    attack: 16,
    counter: 5
}

let Thief = {
    health: 90,
    attack: 16,
    counter: 5
}

let Warrior = {
    health: 100,
    attack: 15,
    counter: 4
}


//character array
let characterOptions = ['Warrior', 'Bowman', 'Magician', 'Thief']

//monsters
let enemyOptions = ['Lupin','Drake','Balrog']
let enemyCount = enemyOptions.length

let Lupin =  {
    health: 50,
    counter: 2
}

let Drake = {
    health: 100,
    counter: 4
}

let Balrog = {
    health: 200,
    counter: 8
}


/** example health bar
let currentHealth = 100;
$(".health-bar").click(function(){
    let nextHealth = (currentHealth - 10)
    let newWidth = nextHealth + '%'
    $(".health-bar-fluid").animate({ width: `${newWidth}`});
    currentHealth = nextHealth
});
**/

/** start game */
let MS_RPG = {
    gameEnd: 0,
    characterSelected: "none",
    charStats: "none",
    charCurrentHealth: 0,

    currEnemyCount: 0,
    defStats: "none",
    defCurrentHeath: 0,
    phase: 0,
    selectCharacterScreen: function () {
        this.updateAnnouncement('Select a Character')

        for (let i =0; i < characterOptions.length; i++) {
            switch (characterOptions[i]) {
                case 'Warrior':
                    $('.gameScreen').append(`<div class="col s3">
                    <span>Warrior</span>
                    </div>`)
                    break
                case 'Bowman':
                    $('.gameScreen').append(`<div class="col s3">
                    <span>Bowman</span>
                    </div>`)
                    break
                case 'Magician':
                    $('.gameScreen').append(`<div class="col s3">
                    <span>Magician</span>
                    </div>`)
                    break
                case 'Thief':
                    $('.gameScreen').append(`<div class="col s3">
                    <span>Thief</span>
                    </div>`)
                    break
            }
        }

        for (let i =0; i < characterOptions.length; i++) {
            $('.gameScreen').append(`<div class="col s3">
            <div class="imgCharBox imgCharBorder ${'imgChar'+characterOptions[i]} ${'active'+characterOptions[i]}" data="${characterOptions[i]}"></div>
            </div>`)
        }
    
        for (let i =0; i < characterOptions.length; i++) {
            switch (characterOptions[i]) {
                case 'Warrior':
                    $('.gameScreen').append(`<div class="col s3">
                    <h5>${'HP: ' + Warrior.health}</h5>
                    <h5>${'ATK: ' + Warrior.attack}</h5>
                    <h5>${'CATK: ' + Warrior.counter}</h5>
                    </div>`)
                    break
                case 'Bowman':
                    $('.gameScreen').append(`<div class="col s3">
                    <h5>${'HP: ' + Bowman.health}</h5>
                    <h5>${'ATK: ' + Bowman.attack}</h5>
                    <h5>${'CATK: ' + Bowman.counter}</h5>
                    </div>`)
                    break
                case 'Magician':
                    $('.gameScreen').append(`<div class="col s3">
                    <h5>${'HP: ' + Magician.health}</h5>
                    <h5>${'ATK: ' + Magician.attack}</h5>
                    <h5>${'CATK: ' + Magician.counter}</h5>
                    </div>`)
                    break
                case 'Thief':
                    $('.gameScreen').append(`<div class="col s3">
                    <h5>${'HP: ' + Thief.health}</h5>
                    <h5>${'ATK: ' + Thief.attack}</h5>
                    <h5>${'CATK: ' + Thief.counter}</h5>
                    </div>`)
                    break
            }
        }
    },
    selectCharacter(str){
        this.updateAnnouncement('You Haven Chosen ' + str)
        switch (str) {
            case 'Warrior':
                this.characterSelected = 'Warrior'
                this.stats = Warrior
                break
            case 'Bowman':
                this.characterSelected = 'Bowman'
                this.stats = Bowman
                break
            case 'Magician':
                this.characterSelected = 'Magician'
                this. stats = Magician
                break
            case 'Thief':
                this.characterSelected = 'Thief'
                this.stats = Thief
                break
        }
        $('.gameScreen').empty()
        this.currEnemyCount = enemyCount
        this.battleScreen()
        
    },
    battleScreen(){
        /* [you]_[defender]_[d1][d2][d3] */
        for (let i =0; i < 5; i++) {
            if(i === 0){
            $('.gameScreen').append(`<div class="col s2 center">
            <h5>YOU</h5>
            </div>`)
            }else if(i === 1 || i === 3){
                $('.gameScreen').append(`<div class="col s1">
                </div>`)
            }else if(i === 2){
                $('.gameScreen').append(`<div class="col s2 center">
                <h5>Defender</h5>
                </div>`)
            }else{
                $('.gameScreen').append(`<div class="col s6 center">
                <h5>Next Oppenents Area</h5>
                </div>`) 
            }
        }

        for (let i =0; i < 5; i++) {
            if(i === 0){
                $('.gameScreen').append(`<div class="col s2">
                <div class="imgCharBox ${'imgChar'+this.characterSelected} flip" data="${this.characterSelected}"></div>
                </div>`)
            }else if(i === 1 || i === 3){
                $('.gameScreen').append(`<div class="col s1">
                </div>`)
            }else if(i === 2 || i == 4){
                $('.gameScreen').append(`<div class="col s1">
                </div>`)
            }
        }
        for (let i =0; i < enemyCount; i++) {
            $('.gameScreen').append(`<div class="col s2">
            <div class="imgMonBox imgCharBorder ${'imgMon'+enemyOptions[i]}" data="${enemyOptions[i]}"></div>
            </div>`) 
        }

        $('.gameScreen').append(`
        <div class="col s2 center">
            <div class="health-bar">
                <div class="health-bar-glass">
                    <div class="health-bar-fluid" data="${this.characterSelected}"></div>
                </div>
            </div>
        </div>
        `)
    },
    selectDefender(){

    },
    updateAnnouncement: function (str) {
        $('.announcementBanner').html(`<h4>${str}</h4>`)
    },
    runRPG: function () {
        this.selectCharacterScreen()
    }
}

$(document).ready(function() {

    MS_RPG.runRPG()

    $('.imgCharBox').on("click", function( event ) {
        if (MS_RPG.phase === 0) {
            //choose character
            MS_RPG.selectCharacter($(this).attr("data"))
        }
    })

    $('.imgCharBox').on("click", function( event ) {
        if (MS_RPG.phase === 1) {
            //choose Defender
            console.log($(this).attr("data"))
        } else if (MS_RPG.phase === 2) {
            //attack Defender
        }
    })

})