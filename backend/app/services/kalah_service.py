from sqlalchemy.orm import Session
from app.models.kalah_model import Game
from app.schemas.kalah_schema import GameCreate, GameMove
import json

def create_game(db: Session, game_data: GameCreate):
    """创建新的 Kalah 游戏"""
    board_state = {
        "pits": [4] * 6 + [0] + [4] * 6 + [0]  # 6 pits per player, 1 Kalah per player
    }
    new_game = Game(
        player1_id=game_data.player1_id,
        player2_id=game_data.player2_id,
        board_state=board_state,
        current_turn=1
    )
    db.add(new_game)
    db.commit()
    db.refresh(new_game)
    return new_game

def make_move(db: Session, game_id: int, move: GameMove):
    """执行玩家的移动"""
    game = db.query(Game).filter(Game.game_id == game_id).first()
    if not game:
        return None

    board = game.board_state["pits"]
    player_turn = game.current_turn

    # 计算合法范围
    if player_turn == 1:
        start_index, end_index, kalah_index = 0, 5, 6
    else:
        start_index, end_index, kalah_index = 7, 12, 13

    if move.pit_selected < start_index or move.pit_selected > end_index:
        return None  # 非法移动

    # 取出种子
    seeds = board[move.pit_selected]
    board[move.pit_selected] = 0
    index = move.pit_selected

    # 播种
    while seeds > 0:
        index = (index + 1) % 14
        if index == (6 if player_turn == 2 else 13):  # 跳过对手的 Kalah
            continue
        board[index] += 1
        seeds -= 1

    # 规则 1: 如果最后一个种子落在自己的 Kalah，则继续回合
    if index == kalah_index:
        game.current_turn = player_turn  # 额外回合
    else:
        # 规则 2: 捕获对手的种子
        if start_index <= index <= end_index and board[index] == 1:
            opposite_index = 12 - index
            board[kalah_index] += board[opposite_index] + 1
            board[opposite_index] = 0
            board[index] = 0

        # 切换回合
        game.current_turn = 2 if player_turn == 1 else 1

    if game.is_game_over():
        game.winner_id = 1 if board[6] > board[13] else 2

    db.commit()
    db.refresh(game)
    return game
