
const MAP_X = 560
const MAP_Y = 320
const FIGURE_X = 40
const FIGURE_Y = 40

const div = document.getElementById('block1')
let snake = []

randomInteger = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

// получение стартовой позиции:
const x = randomInteger(0, (MAP_X / FIGURE_X) - 1) * 40
const y = randomInteger(0, (MAP_Y / FIGURE_Y) - 1) * 40

snake.push([x, y])

for (let block of snake) {
    const innerDiv = document.createElement('div')
    innerDiv.className = 'block2'
    innerDiv.style.background = 'red'
    innerDiv.style.marginLeft = `${block[0]}px`
    innerDiv.style.marginTop = `${block[1]}px`
    div.appendChild(innerDiv)
}

