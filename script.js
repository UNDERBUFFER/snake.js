const div = document.getElementById('block1')

const innerDiv = document.createElement('div')
innerDiv.className = 'block2'
innerDiv.style.background = 'red'
div.appendChild(innerDiv)
