"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Trustee } from "@/types/trustees";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { AlertBox } from "@/components/ui/AlertBox";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { PageTransition } from "@/components/layout/PageTransition";
import { Users, Plus, Trash2, Mail, UserCheck } from "lucide-react";

type TrusteeForm = {
  fullName: string;
  email: string;
  relationship: string;
  roles: Trustee["roles"];
  accessLevel: Trustee["accessLevel"];
  customRelationship: string;
  phone: string;
  unlockConfirmationRequired: boolean;
  status: Trustee["status"];
};

export default function TrusteesPage() {
  const { user, userDoc, planTier } = useAuth();
  const [trustees, setTrustees] = useState<(Trustee & { id: string })[]>([]);
  const [showModal, setShowModal] = useState(false);

  const maxTrustees = planTier === "family" ? Infinity : planTier === "legacy" ? 5 : 1;

  useEffect(() => {
    if (!user) return;
    getDocs(collection(db, `users/${user.uid}/trustees`)).then((snap) =>
      setTrustees(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Trustee) })))
    );
  }, [user]);

  return (
    <PageTransition>
      <div className="max-w-article mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-parchment flex items-center justify-center">
              <Users size={24} className="text-sage" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-h1 text-stone-900">Trustees</h1>
              <p className="font-sans text-body-sm text-stone-500 italic">
                The people you trust to carry out your wishes.
              </p>
            </div>
          </div>
          {trustees.length < maxTrustees && (
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
              <Plus size={14} className="mr-2" aria-hidden="true" /> Add trustee
            </Button>
          )}
        </div>

        <AlertBox className="mb-8">
          Trustees receive an email invitation but cannot view your Final Say until the unlock process is initiated. You control who sees what, and when.
        </AlertBox>

        {planTier === "essential" && (
          <div className="bg-amber-50 border border-amber-200 rounded-[10px] p-4 mb-6 flex items-start gap-3">
            <span className="text-amber-600 font-sans text-[13px]">
              Your <strong>Essential</strong> plan includes 1 trustee.{" "}
              <a href="/settings?tab=billing" className="text-ember font-medium underline">
                Upgrade to Legacy or Family
              </a>{" "}
              for up to 5 or unlimited trustees.
            </span>
          </div>
        )}

        {trustees.length === 0 ? (
          <EmptyState
            icon={<Users size={44} />}
            heading="No trustees yet"
            body="At least one trustee is required to unlock your Final Say. Choose someone you trust completely."
            action={<Button variant="primary" onClick={() => setShowModal(true)}>Add your first trustee</Button>}
          />
        ) : (
          <div className="space-y-4">
            {trustees.map((trustee) => (
              <TrusteeCard
                key={trustee.id}
                trustee={trustee}
                onDelete={async () => {
                  await deleteDoc(doc(db, `users/${user!.uid}/trustees`, trustee.id));
                  setTrustees((prev) => prev.filter((t) => t.id !== trustee.id));
                }}
              />
            ))}
          </div>
        )}

        <AddTrusteeModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={async (data) => {
            if (!user || !userDoc) return;
            const ref = await addDoc(collection(db, `users/${user.uid}/trustees`), {
              ...data,
              status: "invited",
              invitedAt: serverTimestamp(),
              createdAt: serverTimestamp(),
            });
            setTrustees((prev) => [...prev, { id: ref.id, ...(data as Trustee) }]);
            try {
              await fetch("/api/trustees/invite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  toEmail: data.email,
                  toName: data.fullName,
                  fromName: userDoc.displayName,
                  userId: user.uid,
                }),
              });
            } catch {
              // email failure is non-blocking
            }
            setShowModal(false);
          }}
        />
      </div>
    </PageTransition>
  );
}

function TrusteeCard({ trustee, onDelete }: { trustee: Trustee & { id: string }; onDelete: () => void }) {
  const statusColors: Record<string, string> = {
    invited: "bg-amber-100 text-amber-700",
    accepted: "bg-green-100 text-green-700",
    declined: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white border border-stone-300 rounded-[10px] p-6 flex items-center justify-between gap-4 group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center shrink-0">
          <UserCheck size={18} className="text-sage" aria-hidden="true" />
        </div>
        <div>
          <p className="font-sans font-semibold text-[15px] text-stone-900">{trustee.fullName}</p>
          <p className="font-sans text-[13px] text-stone-500 flex items-center gap-1.5">
            <Mail size={11} aria-hidden="true" /> {trustee.email}
          </p>
          {trustee.relationship && (
            <p className="font-sans text-[12px] text-stone-400 mt-0.5">{trustee.relationship}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-sans text-[11px] font-medium px-2 py-0.5 rounded-badge ${statusColors[trustee.status ?? "invited"]}`}>
          {trustee.status ?? "Invited"}
        </span>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-2 text-stone-400 hover:text-danger rounded transition-all"
          aria-label={`Remove ${trustee.fullName}`}
        >
          <Trash2 size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function AddTrusteeModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: TrusteeForm) => void;
}) {
  const [form, setForm] = useState<TrusteeForm>({
    fullName: "", email: "", relationship: "", roles: [], accessLevel: "full",
    customRelationship: "", phone: "", unlockConfirmationRequired: true, status: "invited",
  });

  return (
    <Modal open={open} onClose={onClose} title="Add a trustee">
      <div className="space-y-4">
        <div>
          <Label>Full name</Label>
          <Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="e.g. Sarah Johnson" />
        </div>
        <div>
          <Label>Email address</Label>
          <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Their email address" />
        </div>
        <div>
          <Label>Relationship</Label>
          <Input value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })} placeholder="e.g. Spouse, Sibling, Best friend" />
        </div>
        <div>
          <Label>Access level</Label>
          <Select
            value={form.accessLevel}
            onChange={(e) => setForm({ ...form, accessLevel: e.target.value as Trustee["accessLevel"] })}
            options={[
              { value: "full", label: "Full access — all modules" },
              { value: "messages_only", label: "Messages only" },
              { value: "financial_only", label: "Financial pointers only" },
              { value: "custom", label: "Custom (configure after adding)" },
            ]}
          />
        </div>
        <p className="font-sans text-[13px] text-stone-500 italic">
          They&apos;ll receive an email invitation. They cannot view anything until the unlock process is initiated.
        </p>
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button variant="primary" onClick={() => onSave(form)} className="flex-1" disabled={!form.fullName || !form.email}>
            Send invitation
          </Button>
        </div>
      </div>
    </Modal>
  );
}
