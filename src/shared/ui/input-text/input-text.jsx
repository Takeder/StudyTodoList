import styles from "./styles.module.css";

export const InputText = ({ id, onChange, value }) => {
  return (
    <label styles={styles.label} htmlFor={id}>
      <input id={id} type="text" onChange={onChange} value={value} />
    </label>
  );
};
