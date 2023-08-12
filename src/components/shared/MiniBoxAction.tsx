type Props = {
  onClick: () => void;
  children: React.ReactNode;
  variant: "add" | "remove";
};

export default function MiniBoxAction({ onClick, variant, children }: Props) {
  if (variant === "add") {
    return (
      <button onClick={onClick} className={`bg-primary minibox-action`}>
        {children}
      </button>
    );
  }

  return (
    <button onClick={onClick} className={`bg-red-600 minibox-action`}>
      {children}
    </button>
  );
}
