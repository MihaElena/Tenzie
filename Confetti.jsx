
import { useEffect, useState } from "react"
import "./Confetti.css"

export default function Confetti() {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    const newPieces = []
    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        left: Math.random() * 100,
        hue: Math.floor(Math.random() * 360),
        delay: Math.random() * 2,
      })
    }
    setPieces(newPieces)

    // Cleaning after 9 secs
    const timer = setTimeout(() => {
      setPieces([])
    }, 9000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "hidden" }}>
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            animationDelay: `${piece.delay}s`,
            "--hue": piece.hue
          }}
        />
      ))}
    </div>
  )
}
