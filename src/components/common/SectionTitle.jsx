export default function SectionTitle({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={align === 'left' ? 'text-left' : 'mx-auto max-w-2xl text-center'}>
      {eyebrow ? <p className="mb-3 text-sm font-black uppercase tracking-wide text-green-700">{eyebrow}</p> : null}
      <h2 className="text-3xl font-black tracking-normal text-green-950 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
