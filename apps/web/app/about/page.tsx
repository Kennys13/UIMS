export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="card-surface p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">About Lotus Valley School</p>
        <h1 className="mt-3 text-4xl font-semibold">A school experience built on academics, values, and student growth.</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Lotus Valley School combines strong academics, co-curricular development, attentive student support, and structured school operations through a modern school management platform.
        </p>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          ["Our Vision", "To nurture responsible, curious, and confident learners in a disciplined and supportive environment."],
          ["Our Culture", "A balance of academic excellence, creativity, sports, and community values."],
          ["Our System", "A connected school ERP for attendance, results, admissions, HR, and parent-facing communication."]
        ].map(([title, copy]) => (
          <div key={title} className="card-surface p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm text-slate-600">{copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
