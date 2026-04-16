"use client";

import { useState } from "react";
import { changePassword, updateProfile } from "../../services/api";
import { User } from "../../services/types";

export function ProfileForm({ token, profile }: { token: string; profile: User["profile"] }) {
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState("Password@123");
  const [newPassword, setNewPassword] = useState("Password@123");
  const [message, setMessage] = useState("");

  async function handleProfileUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("bio", bio);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    await updateProfile(token, formData);
    setMessage("Profile updated successfully.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form className="card-surface space-y-4 p-6" onSubmit={handleProfileUpdate}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Editable Fields</p>
          <h2 className="mt-2 text-2xl font-semibold">Update profile</h2>
        </div>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="w-full rounded-2xl border border-black/10 px-4 py-3" />
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="min-h-28 w-full rounded-2xl border border-black/10 px-4 py-3" />
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short bio" className="min-h-28 w-full rounded-2xl border border-black/10 px-4 py-3" />
        <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] ?? null)} className="w-full rounded-2xl border border-dashed border-black/10 px-4 py-3 text-sm" />
        <button className="rounded-full bg-[var(--brand)] px-5 py-3 font-semibold text-white">Save changes</button>
      </form>
      <form
        className="card-surface space-y-4 p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          await changePassword(token, { currentPassword, newPassword });
          setMessage("Password changed successfully.");
        }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Security</p>
          <h2 className="mt-2 text-2xl font-semibold">Change password</h2>
        </div>
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full rounded-2xl border border-black/10 px-4 py-3" />
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full rounded-2xl border border-black/10 px-4 py-3" />
        <button className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white">Update password</button>
      </form>
      {message ? <p className="text-sm font-medium text-emerald-700 lg:col-span-2">{message}</p> : null}
    </div>
  );
}
