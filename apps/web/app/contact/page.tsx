export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="card-surface p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold">Connect with Lotus Valley School.</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Reach the school office for admissions, academics, transport, fee support, and administrative queries.
        </p>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="card-surface p-6">
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="mt-3 text-sm text-slate-600">hello@lotusvalleyschool.edu</p>
        </div>
        <div className="card-surface p-6">
          <h2 className="text-xl font-semibold">Phone</h2>
          <p className="mt-3 text-sm text-slate-600">+91 33 4000 2211</p>
        </div>
        <div className="card-surface p-6">
          <h2 className="text-xl font-semibold">Campus</h2>
          <p className="mt-3 text-sm text-slate-600">Lotus Valley School Campus, Kolkata</p>
        </div>
      </div>
    </div>
  );
}
