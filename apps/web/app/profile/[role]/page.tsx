import { Role } from "../../../services/types";
import ProfilePageClient from "./ProfilePageClient";

const ROLES: Role[] = ["student", "teacher", "hr", "admission", "admin"];

export function generateStaticParams() {
  return ROLES.map((role) => ({ role }));
}

export default function ProfilePage({ params }: { params: { role: Role } }) {
  return <ProfilePageClient params={params} />;
}
