const games = document.querySelectorAll('.game');

let selected_game = null;

games.forEach(game => {
    let game_name = game.getAttributeNode('data-game').value;
    game.addEventListener('click', () => selectGame(game_name));
    
});
function selectGame(game_name) {
    console.log(game_name);
    switch(game_name) {
        case 'brankosaurus':
            window.location.href = 'brankosaurus/index.html';
            break;
        case 'pikachu':
            window.location.href = 'pikachu/index.html';
            break;
    }
}