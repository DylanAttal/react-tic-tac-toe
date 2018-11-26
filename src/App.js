import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTurn: 'X',
      board: ['', '', '', '', '', '', '', '', ''],
      message: 'Enjoy the Game!',
      isThereAWinner: 'false'
    }
  }

  _click = index => {
    // Doesn't let user click if the square is already
    // occupied by an 'X' or 'O'
    if (this.state.board[index] !== '') {
      return
    }
    // Doesn't let user click if there is already
    // a winner to the game
    if (this.state.isThereAWinner === 'true') {
      return
    }

    if (this.state.currentTurn === 'X') {
      this.state.board[index] = 'X'
      this.setState(
        {
          board: this.state.board,
          currentTurn: 'O'
        },
        () => {
          this.checkForTie()
          this.checkForWinner('X')
        }
      )
    } else if (this.state.currentTurn === 'O') {
      this.state.board[index] = 'O'
      this.setState(
        {
          board: this.state.board,
          currentTurn: 'X'
        },
        () => {
          this.checkForTie()
          this.checkForWinner('O')
        }
      )
    }
  }

  checkForTie = () => {
    if (
      !this.checkForWinner('X') &&
      !this.checkForWinner('O') &&
      this.state.board.every(square => square === 'X' || square === 'O')
    ) {
      return this.setState({
        message: "It's a tie!",
        isThereAWinner: 'true'
      })
    }
  }

  checkForWinner = letter => {
    let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    return winningCombinations.some(combination => {
      if (
        this.state.board[combination[0]] !== '' &&
        this.state.board[combination[1]] !== '' &&
        this.state.board[combination[2]] !== '' &&
        this.state.board[combination[0]] === letter &&
        this.state.board[combination[1]] === letter &&
        this.state.board[combination[2]] === letter
      ) {
        return this.setState({
          message: `${letter} wins!`,
          isThereAWinner: 'true'
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
        <h2 className={this.state.isThereAWinner}>{this.state.message}</h2>
        <div className="board">
          {this.state.board.map((square, index) => {
            return (
              <div
                className="square"
                onClick={() => this._click(index)}
                key={index}
              >
                {square}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App
