import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { WINNER_COMBOS } from './constants'
import { TURNS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { checkWinner, checkEndGame } from './logic'
import { Board } from './components/Board'



function App() {

  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(()=>{
      const turnFromStorage = window.localStorage.getItem('turn')
      return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }



  const updateBoard = (index) => {

    //Evitar sobreescribir 
    if (board[index] || winner) return

    //Actualizar tablero 
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    window.localStorage.setItem('board', JSON.stringify(newBoard))

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    const newTurn = turn == TURNS.O ? TURNS.X : TURNS.O
    setTurn(newTurn)
    window.localStorage.setItem('turn', newTurn)

  }

  return (
    <main className='board'>
      <h1>Tic-Tac-Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <Board board={board} updateBoard={updateBoard}></Board>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>

    </main>
  )
}

export default App
