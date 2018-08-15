let bowman = {
    heath: 70
}

let magician = {
    heath: 80
}

let thief = {
    health: 75
}

let warrior = {
    health: 100
}

let characterOptions = [warrior, bowman, magician, thief]
let enemyCount = 3

let MS_RPG = {
    gameEnd: 0,
    enemyCount: 3,
    characterSelected: "none",
    selectCharacter: function () {
        this.updateAnnouncement('Select a Character')
    },
    updateAnnouncement: function (str) {
        $('.announcementBanner h4')
    }
}

$(document).ready(function() {


    $('.imgCharBox').on("hover", function( event ) {
        
    })

    
})