// characters
let Bowman = {
    health: 70,
    attack: 20,
    counter: 4,
    attackRaised: 5
}

let Magician = {
    health: 80,
    attack: 16,
    counter: 5,
    attackRaised: 5
}

let Thief = {
    health: 90,
    attack: 16,
    counter: 10,
    attackRaised: 2
}

let Warrior = {
    health: 100,
    attack: 15,
    counter: 4,
    attackRaised: 5
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

    charSelected: "none",
    charStats: "none",
    charCurrentHealth: 0,

    maxEnemyCount: enemyCount,
    currEnemyCount: 0,

    defSelected: "none",
    defStats: "none",
    defCurrentHeath: 0,

    phase: 0,
    // phase 0 = choose character
    // phase 1 = choose defender
    // phase 2 = battle defender
    // repeat phase 1 and 2 until no defender or player is dead

    /** FUNCTIONS */

    // displays character infos
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
                    <h5>${'RATK: ' + Warrior.attackRaised}</h5>
                    </div>`)
                    break
                case 'Bowman':
                    $('.gameScreen').append(`<div class="col s3">
                    <h5>${'HP: ' + Bowman.health}</h5>
                    <h5>${'ATK: ' + Bowman.attack}</h5>
                    <h5>${'CATK: ' + Bowman.counter}</h5>
                    <h5>${'RATK: ' + Bowman.attackRaised}</h5>
                    </div>`)
                    break
                case 'Magician':
                    $('.gameScreen').append(`<div class="col s3">
                    <h5>${'HP: ' + Magician.health}</h5>
                    <h5>${'ATK: ' + Magician.attack}</h5>
                    <h5>${'CATK: ' + Magician.counter}</h5>
                    <h5>${'RATK: ' + Magician.attackRaised}</h5>
                    </div>`)
                    break
                case 'Thief':
                    $('.gameScreen').append(`<div class="col s3">
                    <h5>${'HP: ' + Thief.health}</h5>
                    <h5>${'ATK: ' + Thief.attack}</h5>
                    <h5>${'CATK: ' + Thief.counter}</h5>
                    <h5>${'RATK: ' + Thief.attackRaised}</h5>
                    </div>`)
                    break
            }
        }
        /** CAN CLICK ON CHAR HERE */
        $(document).ready(function() {
            $('.imgCharBox').on("click", function() {
                if (MS_RPG.phase === 0) {
                    //choose character
                    console.log($(this).attr("data"))
                    MS_RPG.selectedCharacter($(this).attr("data"))
                }
            })
        })
        /** END */
    },
    // updates RPG with character selected
    selectedCharacter: function (str) {
        this.phase++ //phase 1
        this.updateAnnouncement('You Haven Chosen ' + str)
        switch (str) {
            case 'Warrior':
                this.charSelected = 'Warrior'
                this.charStats = Warrior
                break
            case 'Bowman':
                this.charSelected = 'Bowman'
                this.charStats = Bowman
                break
            case 'Magician':
                this.charSelected = 'Magician'
                this.charStats = Magician
                break
            case 'Thief':
                this.charSelected = 'Thief'
                this.charStats = Thief
                break
        }
        this.selectDefenderScreen()       
    },
    // counts & displays monsters 
    selectDefenderScreen: function () {
        $('.gameScreen').empty()
        this.currEnemyCount = this.maxEnemyCount

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

        for (let i =0; i < 4; i++) {
            if(i === 0){
                $('.gameScreen').append(`<div class="col s2">
                <div class="imgCharBox ${'imgChar'+this.charSelected} flip" data="${this.charSelected}"></div>
                </div>`)
            }else if(i === 1 || i === 3){
                $('.gameScreen').append(`<div class="col s1 spacer">
                </div>`)
            }else if(i === 2){
                $('.gameScreen').append(`<div class="col s2 defender">
                </div>`)
            }
        }
        for (let i =0; i < enemyCount; i++) {
            $('.gameScreen').append(`<div class="col s2 nextOpponent ${enemyOptions[i]}">
            <div class="imgMonBox imgCharBorder ${'imgMon'+enemyOptions[i]}" data="${enemyOptions[i]}"></div>
            </div>`) 
        }

        // creates character health bar and character stats
        $('.gameScreen').append(`
        <div class="col s12 rowHealthbar">
            <div class="col s2 center">
                <div class="health-bar">
                    <div class="health-bar-glass">
                        <div class="health-bar-fluid" data="${this.charSelected}"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col s12 rowStats">
            <div class="col s2 charStats"></div>
            <div class="col s1 spacer"></div>
            <div class="col s2 defStats"></div>
        </div>
        `)
        this.updateCharStats()

        this.updateAnnouncement('Select a Monster to Attack')
        this.selectDefenderLoop()
    },
    // on click for nextOpponent 
    selectDefenderLoop: function () {
        /** CAN CLICK ON MONSTERS TO BE DEFENDER */
        $(document).ready(function() {     
            $('.imgMonBox').on("click", function() {
                if (MS_RPG.phase === 1) {
                    //choose Defender
                    console.log($(this).attr("data"))
                    MS_RPG.selectedDefenderScreen($(this).attr("data"))
                }
            })  
        })
    },
    // updates defender stats 
    selectedDefenderScreen: function (str) {
        //updates phase to 2
        this.phase++

        //removes selected monster and puts it on defender area
        $(`.imgMon${str}`).clone().appendTo('.defender')
        $(`.nextOpponent.${str}`).remove()

        //updates current defender
        switch (str) {
            case 'Lupin':
                this.defSelected = 'Lupin'
                this.defStats = Lupin
                break
            case 'Drake':
                this.defSelected = 'Drake'
                this.defStats = Drake
                break
            case 'Balrog':
                this.defSelected = 'Balrog'
                this.defStats = Balrog
                break
        }

        // adds hp bar for defender if it hasnt been added aka curr = max enemies
        if(this.currEnemyCount === this.maxEnemyCount){
            $('.rowHealthbar').append(`
                <div class="col s1 spacer"></div>
                <div class="col s2 center">
                    <div class="health-bar">
                        <div class="health-bar-glass">
                            <div class="health-bar-fluid" data="${this.charSelected}"></div>
                        </div>
                    </div>
                </div>
            `)
        }

        // adds the defender stats
        this.updateDefStats()

        //removes border around next opponent area
        $(`.nextOpponent .imgCharBorder`).removeClass('imgCharBorder')

        //trigger fighting between char and defender
        this.fightDefenderScreen(str)
    },
    // fights and goes back into selectDefenderLoop if monster available or not dead yet
    fightDefenderScreen: function (str){
        this.updateAnnouncement(`Click on the ${str} to Attack`)
    },
    updateAnnouncement: function (str) {
        $('.announcementBanner').html(`<h4>${str}</h4>`)
    },
    updateCharStats: function () {
        $('.charStats').html(`
            <h5>${'HP: ' + this.charStats.health}</h5>
            <h5>${'ATK: ' + this.charStats.attack}</h5>
            <h5>${'CATK: ' + this.charStats.counter}</h5>
            <h5>${'RATK: ' + this.charStats.attackRaised}</h5>
        `)
    },
    updateDefStats: function () {
        $('.defStats').html(`
            <h5>${'HP: ' + this.defStats.health}</h5>
            <h5>${'CATK: ' + this.defStats.counter}</h5>
        `)
    },
    runRPG: function () {
        this.selectCharacterScreen()
    }
}

$(document).ready(function() {
    MS_RPG.runRPG()
})