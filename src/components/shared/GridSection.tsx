type Props = {
  title?: string;
  children: React.ReactNode;
  cols?: number;
};

export default function GridSection({ title, children }: Props) {
  return (
    <section className="lg:px-6 my-6 w-[90vw]">
      {title && <h1 className="text-xl mb-4">{title}</h1>}
      <div className="grid grid-cols-1 px-6 gap-4 lg:grid-cols-5">{children}</div>
    </section>
  );
}
