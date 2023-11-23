document.addEventListener('DOMContentLoaded', function() {
    initializeGame(document.getElementById('numCrosses').value);
    // Help modal
    var modal = document.getElementById("rulesModal");
    var btn = document.getElementById("helpBtn");
    var span = document.getElementsByClassName("close")[0];

        // Event listener for the change button
        document.getElementById('changeCrosses').addEventListener('click', function() {
            initializeGame(document.getElementById('numCrosses').value);
        });

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

// Reset button functionality if needed
document.getElementById("resetBtn").addEventListener('click', function() {
    initializeGame(document.getElementById('numCrosses').value);
});
});

function initializeGame(crossCount) {
    var teams = document.querySelectorAll('.crosses');
    teams.forEach(function(team) {
        team.innerHTML = ''; // Clear existing crosses
        for (var i = 0; i < crossCount; i++) {
            var cross = document.createElement('div');
            cross.classList.add('cross');
            cross.textContent = 'X';
            cross.onclick = function() {
                this.remove();
            };
            team.appendChild(cross);
        }
    });
}
