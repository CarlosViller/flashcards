type Props = {
  onClick: () => void;
  children: React.ReactNode;
  color: string;
};

export default function MiniBoxAction({ onClick, color, children }: Props) {
  return (
    <button onClick={onClick} className={`bg-${color} minibox-action`}>
      {children}
    </button>
  );
}
