import styles from "../../../../styles/Home/Timer.module.css";

interface Props {
  Time: number;
  Label: String;
}

function TimeBox({ Time, Label }: Props) {
  return (
    <div className={styles.timeContainer}>
      <p>{Time}</p>
      <p>{Label}</p>
    </div>
  );
}

export default TimeBox;
