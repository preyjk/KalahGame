class KalahGame:
    def __init__(self):
        # 6 pits per player + 1 Kalah per player
        self.pits = [4] * 6 + [0] + [4] * 6 + [0]  # 6 pits + Kalah for each player
        self.current_player = 0  # 0 = Player 1, 1 = Player 2

    def get_valid_moves(self):
        """Returns valid pit indexes for the current player"""
        if self.current_player == 0:
            return [i for i in range(6) if self.pits[i] > 0]  # Player 1 pits
        else:
            return [i for i in range(7, 13) if self.pits[i] > 0]  # Player 2 pits

    def make_move(self, pit_index):
        """Executes a move, updating the board state"""
        if self.current_player == 0 and pit_index >= 6:
            return False  # Player 1 cannot pick Player 2’s pits
        if self.current_player == 1 and pit_index < 7:
            return False  # Player 2 cannot pick Player 1’s pits

        seeds = self.pits[pit_index]
        if seeds == 0:
            return False  # Cannot select an empty pit
        self.pits[pit_index] = 0

        index = pit_index
        while seeds > 0:
            index = (index + 1) % 14  # Move to the next pit
            if (self.current_player == 0 and index == 13) or (self.current_player == 1 and index == 6):
                continue  # Skip opponent's Kalah
            self.pits[index] += 1
            seeds -= 1

        # Capture rule: If the last seed lands in an empty pit on the player's side
        if self.pits[index] == 1 and (
                (self.current_player == 0 and 0 <= index < 6) or (self.current_player == 1 and 7 <= index < 13)):
            opposite_pit = 12 - index
            if self.pits[opposite_pit] > 0:
                self.pits[6 if self.current_player == 0 else 13] += self.pits[opposite_pit] + 1
                self.pits[opposite_pit] = 0
                self.pits[index] = 0

        # Extra turn rule
        if (self.current_player == 0 and index == 6) or (self.current_player == 1 and index == 13):
            return True  # The player gets another turn

        # Switch player
        self.current_player = 1 - self.current_player
        return True

    def is_game_over(self):
        """Checks if the game is over (one side is empty)"""
        if sum(self.pits[:6]) == 0 or sum(self.pits[7:13]) == 0:
            self.pits[6] += sum(self.pits[:6])  # Player 1 gets remaining seeds
            self.pits[13] += sum(self.pits[7:13])  # Player 2 gets remaining seeds
            for i in range(6):
                self.pits[i] = 0
            for i in range(7, 13):
                self.pits[i] = 0
            return True
        return False

    def get_winner(self):
        """Determines the winner based on Kalah score"""
        if self.pits[6] > self.pits[13]:
            return "Player 1 Wins!"
        elif self.pits[6] < self.pits[13]:
            return "Player 2 Wins!"
        return "It's a tie!"

    def get_board_state(self):
        """Returns the current board state"""
        return {
            "pits": self.pits,
            "current_player": self.current_player,
            "game_over": self.is_game_over()
        }


# Example Game
if __name__ == "__main__":
    game = KalahGame()
    print("Initial Board:", game.get_board_state())

    while not game.is_game_over():
        valid_moves = game.get_valid_moves()
        print(f"Player {game.current_player + 1}'s Turn. Valid Moves: {valid_moves}")
        move = int(input("Enter pit index: "))
        if move in valid_moves:
            game.make_move(move)
            print("Updated Board:", game.get_board_state())
        else:
            print("Invalid move. Try again.")

    print("Game Over! Result:", game.get_winner())
