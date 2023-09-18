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
        className="rounded border-primary lg:w-full w-[300px] border-2 px-2"
        {...(label ? { name: label } : {})}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
}
