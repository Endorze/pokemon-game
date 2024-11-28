import { useEffect, useState } from "react";
import Scene from "src/shared/components/scene/Scene";
import useClock from "src/shared/hooks/useClock";
import { useAppDispatch, useAppSelector } from "src/shared/store/hooks";
import { selectBalance } from "src/shared/store/slices/accountSlice";
import { SceneComponent, SceneProps } from "src/shared/types/types";

const playerStartX = 50;

const playerMaxX = 90;
const playerMinX = -290;

const cameraMaxX = 50;
const cameraMinX = -250;

let keyADown = false;
let keyDDown = false;

let cameraLagSpeed = 0.05;
let playerLagSpeed = 0.4;

let cameraX = playerStartX;
let cameraTargetX = playerStartX;

let playerX = playerStartX;
let playerTargetX = playerStartX;

let playerSpeed = 25;
let enteringWilderness = false;




const TownScene: SceneComponent = (props: SceneProps) => {
    const dispatch = useAppDispatch();
    const balance = useAppSelector(selectBalance)

    const myState = useState("")

    console.log("Render")

    useEffect(() => {
        // Reset values
    }, [])

    useClock(5, async (deltaSeconds) => {
        
    })


    return <Scene>
        <button onClick={() => {
            props.switchScene("MAIN_MENU")
        }}>Exit</button>
    </Scene>
}

export default TownScene