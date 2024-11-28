import { useState } from "react"

import BattleScene from "./scenes/battle/BattleScene"
import DialogueScene from "./scenes/dialogue/DialogueScene"
import MainMenuScene from "./scenes/main-menu/MainMenuScene"
import TownScene from "./scenes/town/TownScene"

const sceneMap = {
    MAIN_MENU: MainMenuScene,
    BATTLE: BattleScene,
    TOWN: TownScene,
    DIALOGUE: DialogueScene
}

export type SceneId = keyof typeof sceneMap

function SceneManager() {
 
    const [currentSceneId, setCurrentScene] = useState<SceneId>("MAIN_MENU")
    
    const switchScene = (toScene: SceneId) => {
        setCurrentScene(previousSceneId => {
            if (previousSceneId == currentSceneId) {
                return toScene
            }
            return previousSceneId
        })
    }

    const CurrentScene = sceneMap[currentSceneId]

    return <CurrentScene switchScene={switchScene} />

}

export default SceneManager