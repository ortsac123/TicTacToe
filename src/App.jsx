import { useState, useEffect}  from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { WINNER_COMBOS } from './constants'
import { TURNS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { checkWinner, checkEndGame } from './logic'
import { Board } from './components/Board'
import { useLocalStorage } from './hooks/useLocalStorage'



function App() {

  
  const [board, setBoard] = useLocalStorage('board', Array(9).fill(null))

  const [turn, setTurn] = useLocalStorage('turn', TURNS.X)
  const [winner, setWinner] = useState(null)
  const [theme, setTheme] = useState('dark')

  const toggleTheme = ()=>{
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }
  


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

    

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    const newTurn = turn == TURNS.O ? TURNS.X : TURNS.O
    setTurn(newTurn)
    

  }
  

  return (
<body className= {`app ${theme}`}>
      <main className='board'>
      <label className="switch">
  <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
  <span className="slider"></span>
</label>
      <h1>Tic-Tac-Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <Board board={board} updateBoard={updateBoard}></Board>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>

    </main>
</body>
  )
}

export default App
