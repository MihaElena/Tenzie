import { useEffect, useState } from "react"
import "./Fireworks.css"

export default function Fireworks() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = []

    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * 2 * Math.PI
      const radius = Math.random() * 600
      newParticles.push({
        id: i,
        x: `${Math.cos(angle) * radius}px`,
        y: `${Math.sin(angle) * radius}px`,
        top: `${50 + Math.random() * 30}%`,
        left: `${30 + Math.random() * 40}%`,
        color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`
      })
    }

    setParticles(newParticles)

    const timer = setTimeout(() => setParticles([]), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="firework-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="firework"
          style={{
            top: p.top,
            left: p.left,
            "--x": p.x,
            "--y": p.y,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  )
}
