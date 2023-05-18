let fields = [null, null, null, null, null, null, null, null, null];

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "circle";

function init() {
  render();
}

function render() {
  let table = "<table>";
  for (let i = 0; i < 3; i++) {
    table += "<tr>";
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let content = fields[index];
      if (content === "circle") {
        content = generateCircleSVG();
      } else if (content === "cross") {
        content = generateCrossSVG();
      } else {
        content = "";
      }
      table += `<td onclick="handleClick(this, ${index})">${content}</td>`;
    }
    table += "</tr>";
  }
  table += "</table>";
  document.getElementById("content").innerHTML = table;
}

function handleClick(cell, index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;
    cell.innerHTML = currentPlayer === "circle" ? generateCircleSVG() : generateCrossSVG();
    cell.onclick = null;
    if (currentPlayer === "circle") {
      currentPlayer = "cross";
    } else {
      currentPlayer = "circle";
    }
    if (isGameFinished()) {
      const winCombination = getWinningCombination();
      drawWinningLine(winCombination);
    }
  }
}

function isGameFinished() {
  return fields.every((field) => field !== null) || getWinningCombination() !== null;
}

function getWinningCombination() {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i]; // [0, 1, 2]
    if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
      return WINNING_COMBINATIONS[i];
    }
  }
  return null;
}

function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;
  
    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
  
    const contentRect = document.getElementById('content').getBoundingClientRect();
  
    const lineLength = Math.sqrt(
      Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);
  
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
  }
  

function generateCircleSVG() {
  let svg = `<svg width="70" height="70">
      <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="10">
        <animate attributeName="stroke-dasharray" from="0, 190" to="190, 190" dur="500ms" 
        calcMode="spline" keyTimes="0;1" keySplines="0.42 0 0.58 1"
        repeatCount="1"/>
      </circle>
    </svg>`;
  return svg;
}

function generateCrossSVG() {
  let svg = `<svg width="70" height="70">
      <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="10">
        <animate attributeName="stroke-dasharray" from="0, 71" to="71, 0" dur="300ms" calcMode="spline" keyTimes="0;1" keySplines="0.42 0 0.58 1" repeatCount="1"/>
      </line>
      
      <line x1="10" y1="60" x2="60" y2="10" stroke="#FFC000" stroke-width="10">
        <animate attributeName="stroke-dasharray" from="0, 71" to="71, 0" dur="300ms" calcMode="spline" keyTimes="0;1" keySplines="0.42 0 0.58 1" repeatCount="1"/>
      </line>
    </svg>`;
  return svg;
}

function restartGame() {
    fields = [null, null, null, null, null, null, null, null, null];
    render();
}