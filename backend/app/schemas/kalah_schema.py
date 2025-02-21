from pydantic import BaseModel
from typing import List, Optional

class GameCreate(BaseModel):
    player1_id: int
    player2_id: int

class GameMove(BaseModel):
    player_id: int
    pit_selected: int

class GameResponse(BaseModel):
    game_id: int
    player1_id: int
    player2_id: int
    board_state: dict
    current_turn: int
    winner_id: Optional[int] = None

    class Config:
        orm_mode = True
