document.addEventListener('DOMContentLoaded', function() {
    initializeGame(document.getElementById('numCrosses').value);
    // Help modal setup
    var modal = document.getElementById("rulesModal");
    var btn = document.getElementById("helpBtn");
    var span = document.getElementsByClassName("close")[0];

    // Increase and decrease button event listeners
    document.getElementById('increaseCrosses').addEventListener('click', function() {
        changeNumberOfCrosses(1);
    });

    document.getElementById('decreaseCrosses').addEventListener('click', function() {
        changeNumberOfCrosses(-1);
    });

    // Event listener for applying the number of crosses directly after change
    // This can be omitted if you wish to use an 'apply' button instead
    function changeNumberOfCrosses(change) {
        var numCrossesInput = document.getElementById('numCrosses');
        var currentVal = parseInt(numCrossesInput.value);
        var newVal = currentVal + change;

        // Check the range of the new value
        if(newVal >= 1 && newVal <= 20) {
            numCrossesInput.value = newVal;
            initializeGame(newVal); // Re-initialize the game with the new value
        }
    }

    // Help modal interactions
    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Reset button functionality
    document.getElementById("resetBtn").addEventListener('click', function() {
        initializeGame(document.getElementById('numCrosses').value);
    });
});

function initializeGame(crossCount) {
    var teams = document.querySelectorAll('.crosses');
    teams.forEach(function(team) {
        // Reset X font style
        team.style.color = 'black';
        team.style.fontSize = '1em';
        
        team.innerHTML = ''; // Clear existing crosses
        for (var i = 0; i < crossCount; i++) {
            var cross = document.createElement('div');
            cross.classList.add('cross');
            cross.textContent = 'X';
            cross.onclick = function() {
                this.remove();
                // Check if the team is out
                if (team.getElementsByClassName('cross').length === 0) {
                    team.textContent = 'Out!';
                    team.style.color = 'red';
                    team.style.fontSize = '3em';
                }
            };
            team.appendChild(cross);
        }
        // Initial check if the team is out
        if (team.getElementsByClassName('cross').length === 0) {
            team.textContent = 'Out!';
            team.style.color = 'red';
            team.style.fontSize = '3em';
        }
    });
}
