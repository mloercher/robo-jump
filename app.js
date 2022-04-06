document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const robo = document.createElement('div')
    let roboLeftSpace = 50
    let roboBottomSpace = 250
    let platformCount = 5
    let gameOver = false
    let platforms = []

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
            platforms.push(newPlatform)
            console.log(platforms)
        }
    }

    function movePlatforms() {
        if (roboBottomSpace > 200) {
            platforms.forEach((platform) => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
            })
        }
    }
    

    function start () {
        if (!gameOver) {
            createRobo()
            createPlatforms()
            setInterval(movePlatforms, 30)
        }
    }
    //create start button to attach
    start()
})