export default function AcademicsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="card-surface p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Academics</p>
        <h1 className="mt-3 text-4xl font-semibold">Structured learning from foundational years to senior school.</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Lotus Valley School supports class-wise academic planning, attendance monitoring, marks publishing, school notices, and teacher workflows through one interactive system.
        </p>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          ["Primary Wing", "Foundational literacy, numeracy, and activity-based learning."],
          ["Middle School", "STEM exploration, humanities, language growth, and student clubs."],
          ["Senior School", "Board-focused academics, assessments, mentoring, and career guidance."]
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
