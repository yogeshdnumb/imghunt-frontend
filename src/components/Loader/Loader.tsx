import styles from "./Loader.module.scss";
import { infinity } from "ldrs";

infinity.register();

export default function Loader({ size }) {
  return (
    <div className={styles.Loader}>
      <l-infinity
        size={size}
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.3"
        color="black"
      ></l-infinity>
    </div>
  );
}
