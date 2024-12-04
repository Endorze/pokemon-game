import { CSSProperties, useEffect, useState } from "react";
import Scene from "src/shared/components/scene/Scene";
import useClock from "src/shared/hooks/useClock";
import { useAppDispatch, useAppSelector } from "src/shared/store/hooks";
import { selectBalance } from "src/shared/store/slices/accountSlice";
import { SceneComponent, SceneProps } from "src/shared/types/types";
import PlayerEntity from "./components/player/PlayerEntity";

import styles from "./TownScene.module.css"
import TownEntity from "./components/town-entity/TownEntity";
import EntityPepsi from "./components/town-entity/EntityPepsi";

import BackgroundSprite from "src/assets/images/town.gif"

import Grass from "src/assets/images/grass.png"
import Ground from "src/assets/images/road.png"
import GrassEntity from "./components/grass/GrassEntity";

let allowUserMovement = true

const playerStartX = 0;

const playerMaxX = 90;
const playerMinX = -290;

const cameraMaxX = 50;
const cameraMinX = -250;

let keyADown = false;
let keyDDown = false;

let cameraLagSpeed = 3;
let playerLagSpeed = 5;

let cameraX = playerStartX;
let cameraLagX = playerStartX;

let playerX = playerStartX;
let playerLagX = playerStartX;

let playerSpeed = 25;
let enteringWilderness = false;

let playerRunning = false;
let playerDirection: "left" | "right" = "left"

let scrollableWorldElement: HTMLElement | null = null

function keyDownListener(e: KeyboardEvent) {
    if (e.code === "KeyA") {
        keyADown = true;
    } else if (e.code === "KeyD") {
        keyDDown = true;
    }
}

function keyUpListener(e: KeyboardEvent) {
    if (e.code === "KeyA") {
        keyADown = false;
    } else if (e.code === "KeyD") {
        keyDDown = false;
    }
}


const updatePlayerMovement = (deltaSeconds: number) => {
    if (!allowUserMovement) return;

    if (keyADown) {
        playerX -= playerSpeed * deltaSeconds;
        playerRunning = true;
        playerDirection = "left";
    } else if (keyDDown) {
        playerX += playerSpeed * deltaSeconds;
        playerRunning = true;
        playerDirection = "right";
    } else {
        playerRunning = false;
    }

    playerX = Math.min(playerMaxX, Math.max(playerMinX, playerX));
}

const updateCameraMovement = (deltaSeconds: number) => {
    cameraX = playerX; // Follow player
    cameraX = Math.min(cameraMaxX, Math.max(cameraMinX, cameraX));
}

const updatePlayerCameraLag = (deltaSeconds: number) => {

    const cameraTime = Math.min(1, cameraLagSpeed * deltaSeconds);
    const playerTime = Math.min(1, playerLagSpeed * deltaSeconds);

    cameraLagX = cameraLagX + (cameraX - cameraLagX) * cameraTime;
    playerLagX = playerLagX + (playerX - playerLagX) * playerTime;
}

const checkWildernessCollision = () => {
    if (playerX + 2 > playerMaxX) {
        if (!enteringWilderness) {
            enterWilderness();
            console.log("Attempting to enter wilderness.");
            enteringWilderness = true;
            return;
        }
    }
}

const updatePlayerCameraVariables = () => {
    if (scrollableWorldElement == null) return;

    scrollableWorldElement.style.setProperty("--cameraX", `${cameraLagX}`);
    scrollableWorldElement.style.setProperty("--playerX", `${playerLagX}`);
}

const TownScene: SceneComponent = (props: SceneProps) => {
    const dispatch = useAppDispatch();
    const balance = useAppSelector(selectBalance)

    const myState = useState("")

    console.log("Render")

    useEffect(() => {
        // Reset values
        document.addEventListener("keydown", keyDownListener)
        document.addEventListener("keyup", keyUpListener)

        return () => {
            document.removeEventListener("keydown", keyDownListener)
            document.removeEventListener("keyup", keyUpListener)
        }
    }, [])

    useClock(60, async (deltaSeconds) => {
        updatePlayerMovement(deltaSeconds)
        updateCameraMovement(deltaSeconds)
        updatePlayerCameraLag(deltaSeconds)
        updatePlayerCameraVariables()
    })


    return <Scene>
        

        <div className={styles.ScrollableWorld} ref={(element) => { scrollableWorldElement = element }} style={{
            "--groundLevel": "5%",
            "--cameraX": `${cameraLagX}`,
            "--playerX": `${playerLagX}`
        } as CSSProperties}>

            <TownEntity width={100} height={9 / 16 * 100} depth={1} >
                <EntityPepsi src={BackgroundSprite}/>
            </TownEntity>

            <TownEntity width={100} height={9 / 16 * 100} depth={1} posX={-99.9} >
                <EntityPepsi src={BackgroundSprite} flip/>
            </TownEntity>

            <TownEntity width={100} height={9 / 16 * 100} depth={1} posX={99.9} >
                <EntityPepsi src={BackgroundSprite} flip/>
            </TownEntity>

            <TownEntity className={styles.TownPath} width={100} height={3} posX={0} posY={0.02} />
            
            <TownEntity className={styles.TownGrass} width={100} height={3} posX={0} posY={0} />

            <PlayerEntity />


            <div id="player-character" className="player-character on-ground" style={{ "height": "10%" }}>
                <img src="/resources/images/character.gif" id="player-sprite" style={{ "height": "100%" }} />
            </div>

        </div>

        <button style={{position: "absolute"}}onClick={() => {
            props.switchScene("MAIN_MENU")
        }}>Exit</button>
    </Scene>
}

export default TownScene