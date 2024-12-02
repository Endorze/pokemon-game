import { CSSProperties, ReactNode } from "react";

import styles from "./TownEntity.module.css"

type TownEntityProps = {
    onGround?: true;
    children?: ReactNode;
    // Percent of screen width
    width: number;
    // Percent of screen width
    height: number;
    className?: string;
    depth?: number;
    onClick?: () => void;
    posX?: number;
    posY?: number;
}

const TownEntity = (props: TownEntityProps) => {

    const { onGround, posX, posY, children, width, height, className, depth = 0, onClick } = props;

    const parallaxEffect = Math.pow(0.5, depth)

    const style: any = {
        width: `${width}%`,
        aspectRatio: `${width} / ${height}`,
        "--parallaxEffect": parallaxEffect
    };

    if (posX !== undefined) {
        style["--entityX"] = posX
    }

    if (posY !== undefined) {
        style.bottom = `${posY * 100}%`
    }

    return <div onClick={onClick} className={[styles.TownEntity, onGround && styles.onGround, className].join(" ")} style={style}>
        {children}
    </div>

}


export default TownEntity;