document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const robo = document.createElement('div')

    function createRobo() {
        grid.appendChild(robo)
        robo.classList.add('robo')
    }
    createRobo()
})