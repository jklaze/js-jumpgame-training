const games = document.querySelectorAll('.game');

games.forEach(game => {
    game.addEventListener('click', () => {
        console.log(game.getAttributeNode('data-game').value);
    });
});