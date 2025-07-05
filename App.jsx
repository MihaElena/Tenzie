import { useState, useRef, useEffect } from "react"
import rollSoundFile from "./sounds/roll.mp3"
import winSoundFile from "./sounds/win.mp3"
import { nanoid } from "nanoid"
import Die from "./Die"
import Confetti from "./Confetti"
import Fireworks from "./Fireworks"

function generateAllNewDice() {
  const newDice = new Array(10).fill(0).map(() => ({
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid()
  }));
  console.log("generateAllNewDice:", newDice.map(d => d.value));
  return newDice;
}


export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const [rollCount, setRollCount] = useState(0)
    const [time, setTime] = useState(0)
    const [isTiming, setIsTiming] = useState(true)

    const buttonRef = useRef(null)

    // Audio refs to control the sounds
    const rollSound = useRef(new Audio(rollSoundFile))
    const winSound = useRef(new Audio(winSoundFile))

    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
            setIsTiming(false)
             winSound.current.play()
        }
    }, [gameWon])

    useEffect(() => {
        let interval
        if (isTiming && !gameWon) {
            interval = setInterval(() => {
                setTime(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isTiming, gameWon])

  

    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ? { ...die, isHeld: !die.isHeld } : die
        ))
    }

    function rollDice() {
    if (!gameWon) {
        setDice(oldDice => {
            const newDice = oldDice.map(die =>
                die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
            )
            console.log("🎲 Zaruri după roll:", newDice.map(d => d.value))
            return newDice
        })
        setRollCount(prev => prev + 1)
        rollSound.current.play()  // ⬅️ Adăugat AICI
    } else {
        const freshDice = generateAllNewDice()
        console.log("🔄 Nou joc, zaruri generate:", freshDice.map(d => d.value))
        setDice(freshDice)
        setRollCount(0)
        setTime(0)
        setIsTiming(true)
    }
}



    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            hold={() => hold(die.id)}
        />
    ))

    return (
        <main>
           {gameWon && (
  <>
    <Confetti />
    <Fireworks />
  </>
)}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">
                <span className="emoji">🎲</span>
                <span className="gradient-text">Tenzies</span>
                <span className="emoji">🎉</span>
            </h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>

            <div className="scoreboard">
                <p>Rolls: {rollCount}</p>
                <p>Time: {time} sec</p>
            </div>

            <div className="dice-container">
                {diceElements}
            </div>

            <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}
