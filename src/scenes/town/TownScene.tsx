import { SceneComponent, SceneProps } from "src/shared/types/types"

const TownScene: SceneComponent = (props: SceneProps) => {
    
    return <div>
        <h2>Town Scene</h2>
        <button onClick={() => {
            props.switchScene("MAIN_MENU")
        }}>Back to menu</button>
    </div>
}

export default TownScene