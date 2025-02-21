from sqlalchemy import Column, Integer, JSON, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base

class Game(Base):
    __tablename__ = "games"

    game_id = Column(Integer, primary_key=True, index=True)
    player1_id = Column(Integer, nullable=False)
    player2_id = Column(Integer, nullable=False)
    board_state = Column(JSON, nullable=False)
    current_turn = Column(Integer, nullable=False)  # 1 = player1, 2 = player2
    winner_id = Column(Integer, nullable=True)
    started_at = Column(TIMESTAMP, server_default=func.now())
    finished_at = Column(TIMESTAMP, nullable=True)

    def is_game_over(self):
        return all(seeds == 0 for seeds in self.board_state["pits"][0:6]) or \
               all(seeds == 0 for seeds in self.board_state["pits"][7:13])
