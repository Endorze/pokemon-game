import { useAppSelector } from "src/shared/store/hooks"
import { selectBalance } from "src/shared/store/slices/accountSlice"
import { SceneComponent, SceneProps } from "src/shared/types/types"

const MainMenuScene: SceneComponent = (props: SceneProps) => {


    const balance = useAppSelector(selectBalance)

    return <div>
        <h2>Main Menu</h2>
        <p>Balance: {balance}</p>
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