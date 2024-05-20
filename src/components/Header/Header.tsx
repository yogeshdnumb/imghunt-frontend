import styles from "./Header.module.scss";
import { Code, Image } from "react-feather";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.Logo}>
        <Link to={"/"}>
          <span>
            <Image size={32}></Image>
            ImgHunt
          </span>
        </Link>
      </div>
      <Link to={"https://github.com/yogeshdnumb/"}>
        <span>
          <Code size={32}></Code>
          Source
        </span>
      </Link>
    </div>
  );
}
