type Props = {
  title: string;
  children: React.ReactNode;
};

export default function MiniBoxGrid({ title, children }: Props) {
  return (
    <section className="px-6 mt-4">
      <h1 className="text-xl mb-4">{title}</h1>
      <div className="grid lg:grid-cols-5 grid-cols-1 gap-4">{children}</div>
    </section>
  );
}
