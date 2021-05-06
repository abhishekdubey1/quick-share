export const Input = ({
  className,
  value,
  label,
  placeholder,
  type = "text",
  onChangeFn,
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={`${className}`}>{label}</label>
      <input
        type={type}
        id={`${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFn}
        // onChange={({ target }) => setTitle(target.value)}
      />
    </div>
  );
};
