import { ReactNode } from "react"
import styles from "./GameWindow.module.css"


type GameWindowProps = {
    children: ReactNode
}

const GameWindow = (props: GameWindowProps) => {
    return <div className={styles.GameWindow}>
        {props.children}
    </div>
}

export default GameWindow