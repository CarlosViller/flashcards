type Props = {
  title?: string;
  children: React.ReactNode;
  cols?: number;
};

export default function GridSection({ title, children }: Props) {
  return (
    <section className="px-6 my-6 w-full">
      {title && <h1 className="text-xl mb-4">{title}</h1>}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">{children}</div>
    </section>
  );
}
