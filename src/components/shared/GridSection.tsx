type Props = {
  title?: string;
  children: React.ReactNode;
  cols?: number;
};

export default function GridSection({ title, children, cols = 5 }: Props) {
  return (
    <section className="px-6 mt-4">
      {title && <h1 className="text-xl mb-4">{title}</h1>}
      <div className={`grid lg:grid-cols-${cols} grid-cols-1 gap-4`}>{children}</div>
    </section>
  );
}
