import { ReactNode } from "react"
import styles from "./Scene.module.css"


type SceneProps = {
    children?: ReactNode
}

const Scene = (props: SceneProps) => {
    return <div className={styles.Scene}>
        {props.children}
    </div>
}

export default Scene