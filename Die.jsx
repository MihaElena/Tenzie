import "./Die.css"

export default function Die(props) {
    // Pip positions - corrected for values 1–6
    const pipArray = [
        [4],                    // 1
        [0, 8],                 // 2
        [0, 4, 8],              // 3
        [0, 2, 6, 8],           // 4
        [0, 2, 4, 6, 8],        // 5
        [0, 2, 3, 5, 6, 8]      // 6
    ]

    const pipPositions = pipArray[props.value - 1] || []

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    // added for debug only
    if (props.value < 1 || props.value > 6) {
        console.warn("⚠️ Die with invalid value:", props.value)
    }

    return (
        <button
            className="die-face"
            onClick={props.hold}
            style={styles}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >
            <div className="die-grid">
                {[...Array(9)].map((_, i) => (
                    <span
                        key={i}
                        className={`pip ${pipPositions.includes(i) ? "visible" : ""}`}
                    ></span>
                ))}
            </div>
        </button>
    )
}
