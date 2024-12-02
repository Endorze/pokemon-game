import EntityPepsi from "../town-entity/EntityPepsi";
import TownEntity from "../town-entity/TownEntity";

import PlayerSprite from "src/assets/images/character.gif"

import styles from "./PlayerEntity.module.css"

const PlayerEntity = () => {

    return <TownEntity className={styles.PlayerEntity} onGround width={5} height={5}>
        <EntityPepsi src={PlayerSprite}/>
    </TownEntity>

}

export default PlayerEntity;