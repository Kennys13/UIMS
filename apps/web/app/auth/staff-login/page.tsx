import { LoginPanel } from "../../../components/auth/login-panel";

export default function StaffLoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-180px)] max-w-7xl items-center px-5 py-10 lg:px-8">
      <LoginPanel
        title="Lotus Valley staff access"
        subtitle="Single secure login for teachers, admission team, and HR. CAPTCHA validation is enforced before authentication."
        allowedRoles={["teacher", "hr", "admission"]}
        preferredRole="teacher"
      />
    </div>
  );
}
