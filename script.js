document.addEventListener('DOMContentLoaded', function() {
    initializeGame(getNumCrosses());
    preventDefaultContextMenu();
    setupModalInteractions();
    setupCrossCountChangeButtons();
    setupResetButton();
});

function getNumCrosses() {
    return parseInt(document.getElementById('numCrosses').value);
}

function preventDefaultContextMenu() {
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    }, false);
}

function setupModalInteractions() {
    const modal = document.getElementById("rulesModal");
    const btn = document.getElementById("helpBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.addEventListener('click', () => modal.style.display = "block");
    span.addEventListener('click', () => modal.style.display = "none");

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

function setupCrossCountChangeButtons() {
    document.getElementById('increaseCrosses').addEventListener('click', () => changeNumberOfCrosses(1));
    document.getElementById('decreaseCrosses').addEventListener('click', () => changeNumberOfCrosses(-1));
}

function changeNumberOfCrosses(change) {
    const numCrossesInput = document.getElementById('numCrosses');
    const currentVal = getNumCrosses();
    const newVal = currentVal + change;

    if (newVal >= 1 && newVal <= 20) {
        numCrossesInput.value = newVal;
        initializeGame(newVal);
    }
}

function setupResetButton() {
    document.getElementById("resetBtn").addEventListener('click', () => initializeGame(getNumCrosses()));
}

function initializeGame(crossCount) {
    const teams = document.querySelectorAll('.crosses');
    teams.forEach(team => setupTeam(team, crossCount));
}

function setupTeam(team, crossCount) {
    resetTeamStyle(team);
    clearTeam(team);
    addCrossesToTeam(team, crossCount);
    addPlusButtonToTeam(team);
    checkTeamStatus(team);
}

function resetTeamStyle(team) {
    team.style.color = 'black';
    team.style.fontSize = '1em';
}

function clearTeam(team) {
    team.innerHTML = '';
}

function addCrossesToTeam(team, count) {
    for (let i = 0; i < count; i++) {
        team.appendChild(createCross(team));
    }
}

function createCross(team) {
    const cross = document.createElement('div');
    cross.classList.add('cross');
    cross.textContent = '❌';
    cross.addEventListener('click', () => {
        cross.remove();
        checkTeamStatus(team);
    });
    return cross;
}

function addPlusButtonToTeam(team) {
    const plus = createPlusButton(team);
    team.appendChild(plus);
}

function createPlusButton(team) {
    const plus = document.createElement('div');
    plus.classList.add('plus');
    plus.textContent = '➕';
    plus.addEventListener('click', () => {
        resetTeamStyle(team);
        team.insertBefore(createCross(team), plus);
        removeOutDiv(team);

    });
    return plus;
}

function resetTextFontStyle(element) {
    element.style.color = 'black';
    element.style.fontSize = '1em';
}

function checkTeamStatus(team) {
    if (team.getElementsByClassName('cross').length === 0) {
        declareTeamOut(team);
    }
}

function declareTeamOut(team) {
    var out = document.createElement('div');
    out.id = 'out';
    out.textContent = 'Out!';
    out.style.color = 'red';
    out.style.fontSize = '3em';
    team.insertBefore(out, team.firstChild);
    triggerConfetti(team.parentNode);
}

function removeOutDiv(team) {
    // Remove any divs with id "out" if present
    const outDiv = team.querySelector('#out');
    if (outDiv) {
        outDiv.remove();
    }
}

function triggerConfetti(element) {
    const rect = element.getBoundingClientRect();
    confetti({
        particleCount: 350,
        spread: 100,
        origin: { y: rect.top / window.innerHeight, x: (rect.left + rect.width / 2) / window.innerWidth },
        colors: ['#FF0000']
    });
}
