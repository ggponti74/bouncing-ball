class StateManager {
    static KEY = 'game_save_data';

    // Save progress as a JSON string
    static save(data) {
        localStorage.setItem(this.KEY, JSON.stringify(data));
    }

    // Load progress, returning a default object if empty
    static load() {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : { level: 1, score: 0, playerPos: { x: 0, y: 0 } };
    }
}

// Usage in your game
let gameState = StateManager.load();

// When the player performs an action
function updateScore(points) {
    gameState.score += points;
    StateManager.save(gameState);
}
