"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { FinalMessage, ToneTag, TONE_TAG_STYLES } from "@/types/messages";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { AlertBox } from "@/components/ui/AlertBox";
import { Modal } from "@/components/ui/Modal";
import { PageTransition } from "@/components/layout/PageTransition";
import { MessageSquareHeart, Plus, Trash2, Lock } from "lucide-react";
import { encryptField } from "@/lib/encryption";

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<(FinalMessage & { id: string })[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) return;
    getDocs(collection(db, `users/${user.uid}/messages`)).then((snap) =>
      setMessages(snap.docs.map((d) => ({ id: d.id, ...(d.data() as FinalMessage) })))
    );
  }, [user]);

  return (
    <PageTransition>
      <div className="max-w-article mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-parchment flex items-center justify-center">
              <MessageSquareHeart size={24} className="text-ember" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-h1 text-stone-900">Final Messages</h1>
              <p className="font-sans text-body-sm text-stone-500 italic">The words you&apos;ve always meant to say.</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
              <Plus size={14} className="mr-2" aria-hidden="true" /> New message
            </Button>
          )}
        </div>

        <AlertBox className="mb-8">
          Messages are encrypted end-to-end. They remain private until your trustees initiate the unlock process.
          You can write to specific people, or to everyone. There&apos;s no wrong way to do this.
        </AlertBox>

        {messages.length === 0 ? (
          <EmptyState
            icon={<MessageSquareHeart size={44} />}
            heading="Nothing written yet"
            body="This is the section most people say they&apos;re most grateful they filled in. Start with one person."
            action={<Button variant="primary" onClick={() => setShowModal(true)}>Write a message</Button>}
          />
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <MessageCard
                key={msg.id}
                message={msg}
                onDelete={async () => {
                  await deleteDoc(doc(db, `users/${user!.uid}/messages`, msg.id));
                  setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                }}
              />
            ))}
          </div>
        )}

        <AddMessageModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={async (data) => {
            if (!user) return;
            const encBody = encryptField(data.body, user.uid);
            const ref = await addDoc(collection(db, `users/${user.uid}/messages`), {
              ...data,
              body: encBody,
              isEncrypted: true,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
            setMessages((prev) => [...prev, { id: ref.id, ...data, body: encBody, isEncrypted: true }]);
            setShowModal(false);
          }}
        />
      </div>
    </PageTransition>
  );
}

function MessageCard({ message, onDelete }: { message: FinalMessage & { id: string }; onDelete: () => void }) {
  return (
    <div className="bg-white border-l-4 border-l-ember rounded-[0_10px_10px_0] p-6 shadow-card group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-sans font-semibold text-[15px] text-stone-900">
              To: {message.recipientName || "Everyone"}
            </h3>
            {message.toneTag && <Badge variant="tone" toneTag={message.toneTag} />}
            {message.isEncrypted && (
              <span className="flex items-center gap-1 text-[11px] text-stone-400">
                <Lock size={10} aria-hidden="true" /> Encrypted
              </span>
            )}
          </div>
          <p className="font-display text-[16px] italic text-stone-600 line-clamp-2">
            {message.subject || "Untitled message"}
          </p>
          {message.deliverOn && (
            <p className="font-sans text-[12px] text-stone-400 mt-2">
              Deliver: {message.deliverOn}
            </p>
          )}
        </div>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-2 text-stone-400 hover:text-danger rounded transition-all shrink-0"
          aria-label="Delete message"
        >
          <Trash2 size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

type MessageForm = {
  recipientName: string;
  recipientEmail: string;
  subject: string;
  body: string;
  toneTag: ToneTag;
  deliverOn: string;
  accessLevel: string;
  mediaUrls: string[];
};

function AddMessageModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: MessageForm) => void;
}) {
  const [form, setForm] = useState<MessageForm>({
    recipientName: "",
    recipientEmail: "",
    subject: "",
    body: "",
    toneTag: "loving",
    deliverOn: "at_death",
    accessLevel: "trustees_only",
    mediaUrls: [],
  });

  const toneOptions = Object.entries(TONE_TAG_STYLES).map(([value, style]) => ({
    value,
    label: style.label,
  }));

  return (
    <Modal open={open} onClose={onClose} title="Write a final message" sensitive className="max-w-[640px]">
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>To (name)</Label>
            <Input
              placeholder="e.g. Sarah, or 'My children'"
              value={form.recipientName}
              onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
            />
          </div>
          <div>
            <Label>Email address (optional)</Label>
            <Input
              type="email"
              placeholder="To send directly to them"
              value={form.recipientEmail}
              onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label>Subject / title</Label>
          <Input
            placeholder="e.g. 'Things I never said'"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
        </div>
        <div>
          <Label>Tone</Label>
          <Select
            value={form.toneTag}
            onChange={(e) => setForm({ ...form, toneTag: e.target.value as ToneTag })}
            options={toneOptions}
          />
        </div>
        <div>
          <Label>Deliver when</Label>
          <Select
            value={form.deliverOn}
            onChange={(e) => setForm({ ...form, deliverOn: e.target.value as FinalMessage["deliverOn"] })}
            options={[
              { value: "at_death", label: "At time of death" },
              { value: "on_birthday", label: "On their next birthday" },
              { value: "on_anniversary", label: "On an anniversary" },
              { value: "immediate", label: "Immediately on unlock" },
              { value: "custom", label: "Custom date" },
            ]}
          />
        </div>
        <div>
          <Label>Your message</Label>
          <Textarea
            rows={10}
            placeholder="Write freely. This is just for them. You can come back and edit this at any time."
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button
            variant="primary"
            onClick={() => onSave(form)}
            className="flex-1"
            disabled={!form.body.trim()}
          >
            Save message
          </Button>
        </div>
      </div>
    </Modal>
  );
}
