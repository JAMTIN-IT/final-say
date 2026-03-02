"use client";

import React, { useState } from "react";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { AlertBox } from "@/components/ui/AlertBox";

export function SecurityTab() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleChange() {
    if (!user || !user.email) return;
    if (newPassword !== confirm) {
      setErrorMsg("Passwords do not match.");
      setStatus("error");
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      setStatus("error");
      return;
    }
    setStatus("saving");
    setErrorMsg("");
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setStatus("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update password.";
      setErrorMsg(msg.includes("wrong-password") ? "Current password is incorrect." : msg);
      setStatus("error");
    }
  }

  return (
    <div className="space-y-6 max-w-[480px]">
      <div className="bg-white border border-stone-300 rounded-card p-6 space-y-4">
        <h2 className="font-display text-[18px] text-stone-900">Change password</h2>

        <AlertBox>
          You will need to enter your current password to set a new one.
        </AlertBox>

        <div>
          <Label htmlFor="currentPassword">Current password</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <div>
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </div>
        <div>
          <Label htmlFor="confirm">Confirm new password</Label>
          <Input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {status === "error" && (
          <p className="font-sans text-[13px] text-danger">{errorMsg}</p>
        )}
        {status === "success" && (
          <p className="font-sans text-[13px] text-green-700">Password updated successfully.</p>
        )}

        <Button
          variant="primary"
          onClick={handleChange}
          disabled={status === "saving" || !currentPassword || !newPassword || !confirm}
        >
          {status === "saving" ? "Updating…" : "Update password"}
        </Button>
      </div>
    </div>
  );
}
