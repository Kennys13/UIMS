export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-black/5 bg-white/70">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 text-sm text-slate-600 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-semibold text-slate-900">Lotus Valley School</p>
          <p className="mt-2">A school ERP for students, teachers, staff, and administrators.</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Demo Credentials</p>
          <p className="mt-2">Student: student@lotusvalley.test</p>
          <p>Password for all demo accounts: Password@123</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Security Built In</p>
          <p className="mt-2">JWT auth, RBAC, CAPTCHA verification hooks, rate limiting, and protected APIs.</p>
        </div>
      </div>
    </footer>
  );
}
