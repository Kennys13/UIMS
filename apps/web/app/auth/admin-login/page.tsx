import { LoginPanel } from "../../../components/auth/login-panel";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-180px)] max-w-7xl items-center px-5 py-10 lg:px-8">
      <LoginPanel
        title="Lotus Valley admin panel"
        subtitle="Separate administrator authentication for school governance, analytics, content control, and system configuration."
        allowedRoles={["admin"]}
        preferredRole="admin"
        redirectAdmin
      />
    </div>
  );
}
