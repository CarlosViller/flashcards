type Props = {
  label?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function Input({ label, value, setValue }: Props) {
  return (
    <>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        className="rounded border-primary border-2"
        {...(label ? { name: label } : {})}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
}
