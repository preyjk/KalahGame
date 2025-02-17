CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(50) UNIQUE NOT NULL CHECK (LENGTH(username) >= 3), 
    email VARCHAR(100) UNIQUE NOT NULL CHECK (email LIKE '%@%'), 
    password_hash TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT NOW(), 
    games_played INT DEFAULT 0 NOT NULL,  
    games_won INT DEFAULT 0 NOT NULL,  
    is_guest BOOLEAN DEFAULT FALSE  
);

CREATE TABLE IF NOT EXISTS games (
    game_id SERIAL PRIMARY KEY, 
    player1_id INT REFERENCES users(user_id) ON DELETE SET NULL,  
    player2_id INT REFERENCES users(user_id) ON DELETE SET NULL,  
    board_state JSONB NOT NULL,  
    current_turn INT CHECK (current_turn IN (1, 2)),  
    winner_id INT REFERENCES users(user_id) ON DELETE SET NULL, 
    started_at TIMESTAMP DEFAULT NOW(),  
    finished_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS game_moves (
    move_id SERIAL PRIMARY KEY,  
    game_id INT REFERENCES games(game_id) ON DELETE CASCADE, 
    player_id INT REFERENCES users(user_id) ON DELETE SET NULL,  
    move_number INT NOT NULL,  
    pit_selected INT NOT NULL CHECK (pit_selected BETWEEN 0 AND 5),  
    board_state_before JSONB NOT NULL,  
    board_state_after JSONB NOT NULL,  
    created_at TIMESTAMP DEFAULT NOW() 
);

-- Test Data
INSERT INTO users (username, email, password_hash) 
VALUES ('Admin1', 'admin1@example.com', 'hashed_password'),
       ('Admin2', 'admin2@example.com', 'hashed_password');
