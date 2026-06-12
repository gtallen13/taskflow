interface Props {
  title: string;
  subtitle: string;
  light?: boolean
}

export default function PageHeader({
  title,
  subtitle,
  light
}: Props) {
  return (
    <div>
      <h1
        className={`text-4xl font-bold ${light ? "text-white": "text-[#14213D]"}`}>
        {title}
      </h1>

      <p
        className={`mt-1 ${light? "text-slate-300": "text-slate-500"}`}>
        {subtitle}
      </p>
    </div>
  );
}