"use client";

import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { setDocument } from "@/lib/firestore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function AccountTab() {
  const { user, userDoc } = useAuth();
  const [displayName, setDisplayName] = useState(userDoc?.displayName ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile(user, { displayName });
      await setDocument(`users/${user.uid}`, { displayName });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-[480px]">
      <div className="bg-white border border-stone-300 rounded-card p-6 space-y-4">
        <h2 className="font-display text-[18px] text-stone-900">Account details</h2>
        <div>
          <Label htmlFor="displayName">Display name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div>
          <Label>Email address</Label>
          <Input value={user?.email ?? ""} disabled className="opacity-60" />
          <p className="font-sans text-[12px] text-stone-400 mt-1">
            Email cannot be changed. Contact support if needed.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saving || !displayName}
        >
          {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
        </Button>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-card p-6">
        <h2 className="font-display text-[18px] text-red-900 mb-2">Danger zone</h2>
        <p className="font-sans text-[13px] text-red-700 mb-4">
          Deleting your account is permanent. All your data — including modules, messages, and trustee relationships — will be permanently erased.
        </p>
        <Button
          variant="secondary"
          className="border-red-300 text-red-700 hover:bg-red-100"
          onClick={() => {
            if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
              // TODO: call delete account API
            }
          }}
        >
          Delete account
        </Button>
      </div>
    </div>
  );
}
