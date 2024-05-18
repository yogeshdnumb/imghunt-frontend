import api from "src/api";
import styles from "./ContextMenu.module.scss";

export default function ContextMenu({
  coords,
  clickedCoordsRef,
  findables,
  founds,
  setFounds,
}) {
  return (
    <div
      className={styles.ContextMenu}
      style={{ left: coords.x, top: coords.y }}
    >
      {findables.map((findable) => {
        // const found = false;
        return (
          <button
            key={findable._id}
            onClick={async () => {
              const response = await api.get(`findable/${findable._id}`);
              console.log(response.data.coords);

              if (
                clickedCoordsRef.current.x >= response.data.coords.x1 &&
                clickedCoordsRef.current.x <= response.data.coords.x2 &&
                clickedCoordsRef.current.y <= response.data.coords.y1 &&
                clickedCoordsRef.current.y >= response.data.coords.y2
              ) {
                console.log("inside");

                if (!founds.includes(findable._id)) {
                  // founds.push(findable._id);
                  setFounds([...founds, findable._id]);
                }
                // alert("found");
              } else {
                console.log("not inside");
              }
            }}
          >
            <img
              className={
                founds.includes(findable._id)
                  ? styles.found
                  : styles.contextMenuImg
              }
              src={findable.img}
              alt=""
            />
          </button>
        );
      })}
    </div>
  );
}
