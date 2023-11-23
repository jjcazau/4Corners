document.addEventListener('DOMContentLoaded', function() {
    var teams = document.querySelectorAll('.crosses');

    teams.forEach(function(team) {
        for (var i = 0; i < 10; i++) {
            var cross = document.createElement('div');
            cross.classList.add('cross');
            cross.textContent = 'X';
            cross.onclick = function() {
                this.remove();
            };
            team.appendChild(cross);
        }
    });
});
