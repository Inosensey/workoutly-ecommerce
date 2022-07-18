import styles from "../../../styles/Common/input/Input.module.css";

interface Props {
  Name: string;
  Type: string;
  Label: string;
  inputValue: string;
  setInputValue: any;
  enableValidation: boolean;
  Notification: string;
  Valid: any;
  Disabled: boolean;
}

function Input({
  Name,
  Type,
  Label,
  inputValue,
  setInputValue,
  enableValidation,
  Notification,
  Valid,
  Disabled,
}: Props) {
  return (
    <div className={styles.inputControl}>
      <label>{Label}:</label>
      <input
        type={Type}
        name={Name}
        disabled={Disabled}
        value={inputValue}
        onChange={setInputValue}
        style={{
          border: enableValidation
            ? Valid === false
              ? "1px solid #ff3333"
              : "1px solid #343634"
            : "1px solid #343634",
        }}
      />
      {enableValidation
        ? Valid === false && (
            <p style={{ color: Valid === false ? "#ff3333" : "#000" }}>
              {Notification}
            </p>
          )
        : null}
    </div>
  );
}

export default Input;
