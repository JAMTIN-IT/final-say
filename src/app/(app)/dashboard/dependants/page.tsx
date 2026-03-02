"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Dependant, DependantType } from "@/types/dependants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { AlertBox } from "@/components/ui/AlertBox";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { PageTransition } from "@/components/layout/PageTransition";
import { Heart, Plus, Trash2 } from "lucide-react";

export default function DependantsPage() {
  const { user } = useAuth();
  const [dependants, setDependants] = useState<(Dependant & { id: string })[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) return;
    getDocs(collection(db, `users/${user.uid}/dependants`)).then((snap) =>
      setDependants(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Dependant) })))
    );
  }, [user]);

  return (
    <PageTransition>
      <div className="max-w-article mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-parchment flex items-center justify-center">
              <Heart size={24} className="text-ember" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-h1 text-stone-900">Pets & Dependants</h1>
              <p className="font-sans text-body-sm text-stone-500 italic">
                Care instructions for those who rely on you.
              </p>
            </div>
          </div>
          {dependants.length > 0 && (
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
              <Plus size={14} className="mr-2" aria-hidden="true" /> Add another
            </Button>
          )}
        </div>

        <AlertBox className="mb-8">
          Include anyone — or anything — that depends on you. Children, elderly parents, pets with special needs. Your trustees will know exactly what to do.
        </AlertBox>

        {dependants.length === 0 ? (
          <EmptyState
            icon={<Heart size={44} />}
            heading="No dependants added"
            body="If someone or something depends on your care, add them here so your trustees know who to look after."
            action={<Button variant="primary" onClick={() => setShowModal(true)}>Add a dependant</Button>}
          />
        ) : (
          <div className="space-y-4">
            {dependants.map((dep) => (
              <DependantCard
                key={dep.id}
                dependant={dep}
                onDelete={async () => {
                  await deleteDoc(doc(db, `users/${user!.uid}/dependants`, dep.id));
                  setDependants((prev) => prev.filter((d) => d.id !== dep.id));
                }}
              />
            ))}
          </div>
        )}

        <AddDependantModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={async (data) => {
            if (!user) return;
            const ref = await addDoc(collection(db, `users/${user.uid}/dependants`), {
              ...data,
              createdAt: serverTimestamp(),
            });
            setDependants((prev) => [...prev, { id: ref.id, ...data }]);
            setShowModal(false);
          }}
        />
      </div>
    </PageTransition>
  );
}

function DependantCard({ dependant, onDelete }: { dependant: Dependant & { id: string }; onDelete: () => void }) {
  const typeEmoji: Partial<Record<DependantType, string>> = {
    child: "👶",
    minor_child: "👶",
    adult_dependent: "🤝",
    pet: "🐾",
    parent: "👴",
    other: "🤝",
  };

  return (
    <div className="bg-white border border-stone-300 rounded-[10px] p-6 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center shrink-0 text-xl">
            {(dependant.type ? typeEmoji[dependant.type as DependantType] : null) ?? "🤝"}
          </div>
          <div>
            <p className="font-sans font-semibold text-[15px] text-stone-900">{dependant.name}</p>
            <p className="font-sans text-[13px] text-stone-500 capitalize">{dependant.type}</p>
            {dependant.guardian && (
              <p className="font-sans text-[13px] text-stone-500 mt-1">
                Guardian: <span className="font-medium text-stone-700">{dependant.guardian}</span>
              </p>
            )}
            {dependant.careInstructions && (
              <p className="font-sans text-[13px] text-stone-500 mt-2 leading-relaxed line-clamp-2">
                {dependant.careInstructions}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-2 text-stone-400 hover:text-danger rounded transition-all shrink-0"
          aria-label={`Remove ${dependant.name}`}
        >
          <Trash2 size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

type DependantForm = {
  name: string;
  type: DependantType;
  guardian: string;
  nominatedGuardian: string;
  guardianEmail: string;
  careInstructions: string;
  fundingSource: string;
};

function AddDependantModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: DependantForm) => void;
}) {
  const [form, setForm] = useState<DependantForm>({
    name: "",
    type: "child",
    guardian: "",
    nominatedGuardian: "",
    guardianEmail: "",
    careInstructions: "",
    fundingSource: "",
  });

  return (
    <Modal open={open} onClose={onClose} title="Add a dependant">
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Buddy, Liam, Mum"
            />
          </div>
          <div>
            <Label>Type</Label>
            <Select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as DependantType })}
              options={[
                { value: "child", label: "Child" },
                { value: "pet", label: "Pet" },
                { value: "parent", label: "Parent / Elderly relative" },
                { value: "other", label: "Other dependant" },
              ]}
            />
          </div>
        </div>
        <div>
          <Label>Designated guardian / caregiver</Label>
          <Input
            value={form.guardian}
            onChange={(e) => setForm({ ...form, guardian: e.target.value })}
            placeholder="Full name of the person who should take over"
          />
        </div>
        <div>
          <Label>Care instructions</Label>
          <Textarea
            rows={4}
            value={form.careInstructions}
            onChange={(e) => setForm({ ...form, careInstructions: e.target.value })}
            placeholder="Daily routines, medical needs, dietary requirements, personality notes…"
          />
        </div>
        <div>
          <Label>Funding source (if applicable)</Label>
          <Input
            value={form.fundingSource}
            onChange={(e) => setForm({ ...form, fundingSource: e.target.value })}
            placeholder="e.g. Trust fund, insurance policy number"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button
            variant="primary"
            onClick={() => onSave(form)}
            className="flex-1"
            disabled={!form.name}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
