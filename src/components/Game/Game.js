import React, { useReducer } from 'react';
import Board from '../Board';
import reducer from './reducer';
import calculateWinner from './calculateWinner';


export default function Game() {
  const [state, dispatch] = useReducer(reducer, {
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
  });

  const { xIsNext, history } = state;

  const jumpTo = (step) => {
    dispatch({ type: 'JUMP', payload: { step } });
  };

  const handleClick = (i) => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    dispatch({ type: 'MOVE', payload: { squares } });
  };

  const current = history[history.length - 1];

  const winner = calculateWinner(current.squares);

  const status = winner
    ? winner === 'D'
      ? 'Draw'
      : 'Winner is ' + winner
    : 'Next player is ' + (xIsNext ? 'X' : 'O');

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to #' + move : 'Start the Game';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className={winner ? 'game disabled' : 'game'}>
      <div className="game-board">
        <Board
          onClick={(i) => handleClick(i)}
          squares={current.squares}
        ></Board>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ul>{moves}</ul>
      </div>
    </div>
  );
}
