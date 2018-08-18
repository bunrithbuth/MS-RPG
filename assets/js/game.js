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
let enemyOptions = ['Lupin','Drake','Balrog','Snail', 'bSnail']
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
    counter: 10
}

let rSnail = {
    health: 20,
    counter: 1
}

let bSnail = {
    health: 15,
    counter: 1
}

/** 
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
    charCurrentAtk: 0,

    maxEnemyCount: enemyCount,
    currEnemyCount: 0,

    defSelected: "none",
    defStats: "none",
    defCurrentHealth: 0,

    phase: 0,
    aFlag: 0,
    newMon: 0,
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
        if (MS_RPG.phase === 0) {
            $(document).ready(function() {
                $('.imgCharBox').on("click", function() {
                        //choose character
                    if (MS_RPG.phase === 0) {
                        MS_RPG.selectedCharacter($(this).attr("data"))
                    }
                })
            })
        }
        /** END */
    },
    // updates RPG with character selected
    selectedCharacter: function (str) {
        this.phase++ //phase 1, cannnot choose another character
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
        this.charCurrentHealth = this.charStats.health
        this.charCurrentAtk = this.charStats.attack

        this.gameScreenInit()       
    },
    gameScreenInit: function () {
        $('.gameScreen').empty()
        this.currEnemyCount = this.maxEnemyCount
        /**
         * .gameScreen
         * >> .gameNames
         */
        $('.gameScreen').append(`<div class="col s12 gameNames">
        </div>`)

        /**
         * .gameScreen
         * >> .gameNames
         * >> >> [YOU][SPACER][DEFENDER][SPACER][NEXT OPPONENTS AREA]
         */
        for (let i =0; i < 5; i++) {
            if(i === 0){
            $('.gameNames').append(`<div class="col s2 center">
            <h5>YOU</h5>
            </div>`)
            }else if(i === 1 || i === 3){
                $('.gameNames').append(`<div class="col s1">
                </div>`)
            }else if(i === 2){
                $('.gameNames').append(`<div class="col s2 center">
                <h5>Defender</h5>
                </div>`)
            }else{
                $('.gameNames').append(`<div class="col s6 center">
                <h5>Next Oppenents Area</h5>
                </div>`) 
            }
        }

        /**
         * .gameScreen
         * >> .gameNames
         * >> .gameModels
         */
        $('.gameScreen').append(`<div class="col s12 gameModels">
        </div>`)
        /**
         * .gameScreen
         * >> .gameNames
         * >> .gameModels
         * >> >> [.charModel][.spacerModel][.defModel][.spacerModel][.nextOpponentsModel]
         */
        $('.gameModels').append(`<div class="col s2 charModel">
        </div>`)
        $('.gameModels').append(`<div class="col s1 spaceModel">
        </div>`)
        $('.gameModels').append(`<div class="col s2 defModel">
        </div>`)
        $('.gameModels').append(`<div class="col s1 spaceModel">
        </div>`)
        $('.gameModels').append(`<div class="col s6 nextOpponentsModel">
        </div>`)

        /**
         * .gameScreen
         * >> .gameNames
         * >> >> [YOU][SPACER][DEFENDER][SPACER][NEXT OPPONENTS AREA]
         * >> .gameModels
         * >> >> [.charModel][.spacerModel][.defModel][.spacerModel][.nextOpponentsModel]
         * >> >> [YOU]                    [EMPTY<emptyatm>]         [[MON1][MON2][MON3]..]
         */

        //[YOU]
        $('.charModel').append(`<div class="col s12 center">
        <div class="imgCharBox ${'imgChar'+this.charSelected} flip" data="${this.charSelected}"></div>
        </div>`)

        //[defModel]
        $('.defModel').append(`<div class="col s12 center defenderModel">
        </div>`)
            
        //nextOpponentsModel
        for (let i =0; i < enemyCount; i++) {
            $('.nextOpponentsModel').append(`<div class="col s4 center nextOpponent ${enemyOptions[i]}">
            <div class="imgMonBox imgCharBorder ${'imgMon'+enemyOptions[i]}" data="${enemyOptions[i]}"></div>
            </div>`) 
        }

        // creates character health bar and character stats
        /**
         * .gameScreen
         * >> .gameNames
         * >> >> [YOU][SPACER][DEFENDER][SPACER][NEXT OPPONENTS AREA]
         * >> .gameModels
         * >> >> [.charModel][.spacerModel][.defModel][.spacerModel][.nextOpponentsModel]
         * >> >> [YOU]                    [EMPTY<emptyatm>]         [[MON1][MON2][MON3]..]
         * >> >> [Health]                 [Health]
         */
        $('.charModel').append(`<div class="col s12 rowHealth">
            <div class="health-bar">
                <div class="health-bar-glass">
                    <div class="health-bar-fluid ${this.charSelected}"></div>
                </div>
            </div>
        </div>`)


        /**
         * .gameScreen
         * >> .gameNames
         * >> >> [YOU][SPACER][DEFENDER][SPACER][NEXT OPPONENTS AREA]
         * >> .gameModels
         * >> >> [.charModel][.spacerModel][.defModel][.spacerModel][.nextOpponentsModel]
         * >> >> [YOU]                    [EMPTY<emptyatm>]         [[MON1][MON2][MON3]..]
         * >> >> [health-bar]                 
         * >> >> [charStats]
         */
        $('.charModel').append(`
            <div class="col s12 charStats"></div>
        `)

        /**
         * .gameScreen
         * >> .gameNames
         * >> >> [YOU][SPACER][DEFENDER][SPACER][NEXT OPPONENTS AREA]
         * >> .gameModels
         * >> >> [.charModel][.spacerModel][.defModel][.spacerModel][.nextOpponentsModel]
         * >> >> [YOU]                    [EMPTY<emptyatm>]         [[MON1][MON2][MON3]..]
         * >> >> [health-bar]                 
         * >> >> [charStats]
         * >> >> >> HP
         * >> >> >> ATK
         * >> >> >> CATK (not used)
         * >> >> >> RATK
         */
        this.updateCharStats()
        this.selectDefenderLoop()
    },
    // on click for nextOpponent 
    selectDefenderLoop: function () {
        $('.defModel .health-bar-fluid').removeClass(`${this.defSelected}`)
        this.updateAnnouncement('Select Next Monster to Attack')
        if (this.aFlag === 0) {
            $(document).ready(function() {     
                $('.nextOpponent .imgMonBox').on("click", function() {
                    //choose Defender
                    if(MS_RPG.phase === 1){
                        MS_RPG.selectedDefenderScreen($(this).attr("data"))
                    }
                })    
            })
        }
    },
    // updates defender stats 
    selectedDefenderScreen: function (str) {
        this.phase++ //phase is 2, cannot choose another defender until it goes back
        /**
         * .gameScreen
         * >> .gameNames
         * >> >> [YOU][SPACER][DEFENDER][SPACER][NEXT OPPONENTS AREA]
         * >> .gameModels
         * >> >> [.charModel][.spacerModel][.defModel][.spacerModel][.nextOpponentsModel]
         * >> >> [YOU]                 [MON1<not empty now>]        [[MON2][MON3]..]
         * >> >> [health-bar]             
         * >> >> [charStats]
         * >> >> >> HP
         * >> >> >> ATK
         * >> >> >> CATK (not used)
         * >> >> >> RATK
         */
        //removes selected monster and puts it on defender area
        $(`.imgMon${str}`).clone().appendTo('.defenderModel')
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
            case 'rSnail':
                this.defSelected = 'rSnail'
                this.defStats = rSnail
                break
            case 'bSnail':
                this.defSelected = 'bSnail'
                this.defStats = bSnail
                break
        }
        this.defCurrentHealth = this.defStats.health
        if(this.aFlag === 0){
            // adds hp bar for defender if it hasnt been added aka curr = max enemies
            /**
             * .gameScreen
             * >> .gameNames
             * >> >> [YOU][SPACER][DEFENDER][SPACER][NEXT OPPONENTS AREA]
             * >> .gameModels
             * >> >> [.charModel][.spacerModel][.defModel][.spacerModel][.nextOpponentsModel]
             * >> >> [YOU]                  [MON1<not empty now>]       [[MON2][MON3]..]
             * >> >> [health-bar]           [health-bar]      
             * >> >> [charStats]
             * >> >> >> HP
             * >> >> >> ATK
             * >> >> >> CATK (not used)
             * >> >> >> RATK
             */
            $('.defModel').append(`
                <div class="col s12">
                    <div class="health-bar">
                        <div class="health-bar-glass">
                            <div class="health-bar-fluid"></div>
                        </div>
                    </div>
                </div>
            `)

            // adds the defender stats
            /**
             * .gameScreen
             * >> .gameNames
             * >> >> [YOU][SPACER][DEFENDER][SPACER][NEXT OPPONENTS AREA]
             * >> .gameModels
             * >> >> [.charModel][.spacerModel][.defModel][.spacerModel][.nextOpponentsModel]
             * >> >> [YOU]                  [MON1<not empty now>]       [[MON2][MON3]..]
             * >> >> [health-bar]           [health-bar]      
             * >> >> [charStats]            [defStats]
             * >> >> >> HP
             * >> >> >> ATK
             * >> >> >> CATK (not used)
             * >> >> >> RATK
             */
            $('.defModel').append(`
            <div class="col s12 defStats"></div>
            `)
        }

        $('.defModel .health-bar-fluid').addClass(`${this.defSelected}`)

        this.updateDefStats()
        this.updateDefHp() //used to update new monsters to attack, so hp is not 0

        //removes border around next opponent area, to take emphasis less on it and more on defender
        $(`.nextOpponent .imgMonBox`).removeClass('imgCharBorder')

        //trigger fighting between char and defender by updating announcement and fightDefenderScreen()
        this.updateAnnouncement(`Click on the ${str} to Attack`)
        this.phase++
        this.fightDefenderScreen(str)
    },
    // fights and goes back into selectDefenderLoop if monster available or not dead yet
    fightDefenderScreen: function (str){
        //if the character or defender is not dead
        if(this.charCurrentHealth > 0  && this.defCurrentHealth > 0) {
            // gotta redeclare click due to DOM remove and ad
            if (this.newMon === 0) {
                this.newMon = 1
                this.aFlag = 1
                $(document).ready(function() {     
                    $('.defenderModel .imgMonBox').on("click", function() {
                        //choose Defender
                        $(`.imgChar${MS_RPG.charSelected}`).addClass(`attack${MS_RPG.charSelected}`)
                        // MS_RPG.fightDefenderScreen(str)
                        setTimeout(function() {
                            $(`.imgChar${MS_RPG.charSelected}`).removeClass(`attack${MS_RPG.charSelected}`)
                        }, 500)

                        MS_RPG.defCurrentHealth = MS_RPG.defCurrentHealth - MS_RPG.charCurrentAtk
                        MS_RPG.charCurrentHealth = MS_RPG.charCurrentHealth - MS_RPG.defStats.counter
                        MS_RPG.charCurrentAtk = MS_RPG.charCurrentAtk + MS_RPG.charStats.attackRaised

                        MS_RPG.updateCharStats()
                        MS_RPG.updateDefStats()

                        MS_RPG.updateCharHp()
                        MS_RPG.updateDefHp()

                        MS_RPG.fightDefenderScreen()
                    })  
                })
            }
        }else if(this.charCurrentHealth > 0 && this.currEnemyCount > 0){ // you can continue fighting, also enemy hp <= 0
            this.currEnemyCount--
            $('.defenderModel').empty()
            $('.health-bar-fluid.defenderHealth').removeClass(`${this.defSelected}`)
            // last monster is just defeated
            if(this.currEnemyCount === 0){
                this.gameEnd()
            }else{ // more enemies to defeat
                $(`.nextOpponent .imgMonBox`).addClass('imgCharBorder')
                this.phase = 1
                this.newMon = 0
                this.selectDefenderLoop()
            }
        }else if(this.charCurrentHealth <= 0){
            $('.defenderModel').empty()
            console.log("HERE")
            this.gameEnd()
        }
    },
    updateAnnouncement: function (str) {
        $('.announcementBanner').html(`<h4>${str}</h4>`)
    },
    updateCharStats: function () {
        let redText = ''
        let greenText = ''
        if (this.charCurrentHealth !== this.charStats.health) {
            redText = `class="red-text"`
        }
        if (this.charCurrentAtk !== this.charStats.attack) {
            greenText = `class="green-text"`
        }
        $('.charStats').html(`
            <h5><b ${redText}>${'HP: ' + this.charCurrentHealth}</b></h5>
            <h5><b ${greenText}>${'ATK: ' + this.charCurrentAtk}</b></h5>
            <h5>${'CATK: ' + this.charStats.counter}</h5>
            <h5>${'RATK: ' + this.charStats.attackRaised}</h5>
        `)
    },
    updateDefStats: function () {
        let redText = ''
        if (this.defCurrentHealth !== this.defStats.health) {
            redText = `class="red-text"`
        }
        $('.defStats').html(`
            <h5><b ${redText}>${'HP: ' + this.defCurrentHealth}</b></h5>
            <h5>${'CATK: ' + this.defStats.counter}</h5>
        `)
    },
    updateCharHp: function () {
        let percent = (this.charCurrentHealth / this.charStats.health) * 100
        $(`.health-bar-fluid.${this.charSelected}`).css( "width", `${percent}%` );
    },
    updateDefHp: function () {
        let percent = (this.defCurrentHealth / this.defStats.health) * 100
        $(`.health-bar-fluid.${this.defSelected}`).css( "width", `${percent}%` );
    },
    runRPG: function () {
        this.selectCharacterScreen()
    },
    gameEnd: function () {
        if(this.charCurrentHealth <= 0){
            this.updateAnnouncement('YOU LOSE!')
        }else{
            this.updateAnnouncement('YOU WIN!')
        }
    }
}

$(document).ready(function() {

    MS_RPG.runRPG()
    
})