document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const robo = document.createElement('div')
    let roboLeftSpace = 50
    let roboBottomSpace = 150
    let platformCount = 5
    let gameOver = false

    function createRobo() {
        grid.appendChild(robo)
        robo.classList.add('robo')
        robo.style.left = roboLeftSpace + 'px'
        robo.style.bottom = roboBottomSpace + 'px'
    }

    class Platform {
        constructor(newPlatformBottom){
            this.bottom = newPlatformBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
        
    }

    function createPlatforms() {
        for (let i=0; i < platformCount; i++) {
            let platformGap = 600 / platformCount
            let newPlatformBottom = 100 + i * platformGap
            let newPlatform = new Platform(newPlatformBottom)
        }
    }
    

    function start () {
        if (!gameOver) {
            createRobo()
            createPlatforms()
        }
    }
    //create start button to attach
    start()
})