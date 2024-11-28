import { ReactNode } from "react"
import { SceneId } from "src/SceneManager"


export type SwitchSceneFunction = (toScene: SceneId) => void

export type SceneProps = {
    switchScene: SwitchSceneFunction
}

export type SceneComponent = (props: SceneProps) => ReactNode