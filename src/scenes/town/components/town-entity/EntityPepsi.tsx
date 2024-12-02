import styles from "./EntityPepsi.module.css"

type EntityPepsiProps = {
    src: string;
    flip?: true;
}

const EntityPepsi = (props: EntityPepsiProps) => {
    const { src, flip } = props;
    return <img className={[styles.EntityPepsi, flip && styles.Flip].join(" ")} src={src}></img>
}

export default EntityPepsi