import { Role } from "../../../services/types";
import PortalPageClient from "./PortalPageClient";

const ROLES: Role[] = ["student", "teacher", "hr", "admission", "admin"];

export function generateStaticParams() {
  return ROLES.map((role) => ({ role }));
}

export default function PortalPage({ params }: { params: { role: Role } }) {
  return <PortalPageClient params={params} />;
}
