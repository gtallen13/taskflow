interface Props {
  title: string;
  subtitle: string;
}

export default function PageHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-[#14213D]">
        {title}
      </h1>

      <p className="mt-1 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}