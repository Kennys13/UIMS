import { API_URL } from "./config";
import {
  AnalyticsPayload,
  DashboardPayload,
  PaginatedUsers,
  PublicPayload,
  ResultRecord,
  Session,
  User,
  UserStatus
} from "./types";

async function request<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const body = init?.body;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function login(payload: { email: string; password: string; captchaToken: string; allowedRoles: string[] }) {
  return request<Session>("/api/auth/login", { method: "POST", body: JSON.stringify(payload) });
}

export function getPublicContent() {
  return request<PublicPayload>("/api/content/public");
}

export function getDashboard(token: string) {
  return request<DashboardPayload>("/api/dashboard/me", undefined, token);
}

export function markAttendance(
  token: string,
  payload: { studentId: string; subject: string; classesHeld: number; present: number }
) {
  return request("/api/attendance/mark", { method: "POST", body: JSON.stringify(payload) }, token);
}

export function getProfile(token: string) {
  return request<User>("/api/profile/me", undefined, token);
}

export function updateProfile(token: string, payload: FormData | { phone?: string; address?: string; bio?: string }) {
  return request<User>(
    "/api/profile/me",
    {
      method: "PUT",
      body: payload instanceof FormData ? payload : JSON.stringify(payload)
    },
    token
  );
}

export function changePassword(token: string, payload: { currentPassword: string; newPassword: string }) {
  return request("/api/profile/change-password", { method: "POST", body: JSON.stringify(payload) }, token);
}

export function listUsers(token: string, params?: { role?: string; search?: string; page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.role) query.set("role", params.role);
  if (params?.search) query.set("search", params.search);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  return request<PaginatedUsers>(`/api/users${query.size ? `?${query.toString()}` : ""}`, undefined, token);
}

export function createUser(token: string, payload: Record<string, unknown>) {
  return request<User>("/api/users", { method: "POST", body: JSON.stringify(payload) }, token);
}

export function updateUserStatus(token: string, id: string, status: UserStatus) {
  return request<User>(`/api/users/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }, token);
}

export function createLeave(token: string, payload: Record<string, unknown>) {
  return request("/api/leaves", { method: "POST", body: JSON.stringify(payload) }, token);
}

export function reviewLeave(token: string, id: string, payload: Record<string, unknown>) {
  return request(`/api/leaves/${id}`, { method: "PATCH", body: JSON.stringify(payload) }, token);
}

export function createResult(token: string, payload: Omit<ResultRecord, "id" | "publishedBy">) {
  return request<ResultRecord>("/api/results", { method: "POST", body: JSON.stringify(payload) }, token);
}

export function createAnnouncement(token: string, payload: Record<string, unknown>) {
  return request("/api/content/announcements", { method: "POST", body: JSON.stringify(payload) }, token);
}

export function createBanner(token: string, payload: Record<string, unknown>) {
  return request("/api/content/banners", { method: "POST", body: JSON.stringify(payload) }, token);
}

export function updateSiteContent(token: string, payload: Record<string, unknown>) {
  return request("/api/content/site", { method: "PUT", body: JSON.stringify(payload) }, token);
}

export function getAnalytics(token: string) {
  return request<AnalyticsPayload>("/api/analytics/overview", undefined, token);
}

