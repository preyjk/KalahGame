from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.kalah_service import create_game, make_move
from app.schemas.kalah_schema import GameCreate, GameMove, GameResponse

router = APIRouter(prefix="/kalah", tags=["Kalah"])

@router.post("/", response_model=GameResponse)
def start_new_game(game_data: GameCreate, db: Session = Depends(get_db)):
    return create_game(db, game_data)

@router.post("/{game_id}/move", response_model=GameResponse)
def player_move(game_id: int, move: GameMove, db: Session = Depends(get_db)):
    game = make_move(db, game_id, move)
    if not game:
        raise HTTPException(status_code=400, detail="Invalid move or game not found")
    return game
