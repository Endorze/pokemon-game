import { SceneComponent, SceneProps } from "src/shared/types/types"

const MainMenuScene: SceneComponent = (props: SceneProps) => {
    return <div>
        <h2>Main Menu</h2>

        <button onClick={() => {
            // loadSaveDataIntoMemory()
            props.switchScene("TOWN")
        }}>Continue</button>
        <button onClick={() => {

            // clearSaveData();
            props.switchScene("DIALOGUE")

        }}>New Game</button>
        <button>Exit</button>
    </div>
}

export default MainMenuScene