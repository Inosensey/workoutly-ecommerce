import styles from "../../../styles/Common/input/Input.module.css";

interface Props {
  Name: string;
  Type: string;
  Label: string;
  Disabled: boolean;
}

function Input({ Name, Type, Label, Disabled }: Props) {
  return (
    <div className={styles.inputControl}>
      <label>{Label}:</label>
      <input type={Type} name={Name} disabled={Disabled} />
    </div>
  );
}

export default Input;
