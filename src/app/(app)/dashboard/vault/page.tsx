"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { DigitalAccount, DeviceAccess, FinancialPointer } from "@/types/digital";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { AlertBox } from "@/components/ui/AlertBox";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageTransition } from "@/components/layout/PageTransition";
import { Modal } from "@/components/ui/Modal";
import { Lock, Plus, Trash2, Globe, Smartphone, Banknote } from "lucide-react";
import { encrypt } from "@/lib/encryption";

type Tab = "accounts" | "devices" | "financial";

export default function VaultPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("accounts");
  const [accounts, setAccounts] = useState<(DigitalAccount & { id: string })[]>([]);
  const [devices, setDevices] = useState<(DeviceAccess & { id: string })[]>([]);
  const [financial, setFinancial] = useState<(FinancialPointer & { id: string })[]>([]);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showFinancialModal, setShowFinancialModal] = useState(false);

  useEffect(() => {
    if (!user) return;
    getDocs(collection(db, `users/${user.uid}/digitalAccounts`)).then((snap) =>
      setAccounts(snap.docs.map((d) => ({ id: d.id, ...(d.data() as DigitalAccount) })))
    );
    getDocs(collection(db, `users/${user.uid}/deviceAccess`)).then((snap) =>
      setDevices(snap.docs.map((d) => ({ id: d.id, ...(d.data() as DeviceAccess) })))
    );
    getDocs(collection(db, `users/${user.uid}/financialPointers`)).then((snap) =>
      setFinancial(snap.docs.map((d) => ({ id: d.id, ...(d.data() as FinancialPointer) })))
    );
  }, [user]);

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "accounts", label: "Online Accounts", icon: Globe },
    { key: "devices", label: "Devices", icon: Smartphone },
    { key: "financial", label: "Financial Pointers", icon: Banknote },
  ];

  return (
    <PageTransition>
      <div className="max-w-article mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-parchment flex items-center justify-center">
            <Lock size={24} className="text-dusk" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-display text-h1 text-stone-900">Digital Vault</h1>
            <p className="font-sans text-body-sm text-stone-500 italic">Your accounts, devices, and financial pointers — all encrypted.</p>
          </div>
        </div>

        <AlertBox className="mb-8">
          All credentials and sensitive information in this section are encrypted with AES-256 before being saved. Only you — and your trustees after unlock — can read them.
        </AlertBox>

        <div className="flex gap-1 mb-6 bg-stone-100 rounded-input p-1 w-fit">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-[6px] font-sans font-medium text-[14px] transition-all duration-fast ${
                tab === key ? "bg-white shadow-sm text-stone-900" : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <Icon size={14} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>

        {tab === "accounts" && (
          <div className="space-y-3">
            {accounts.length === 0 ? (
              <EmptyState
                icon={<Globe size={40} />}
                heading="No accounts yet"
                body="Add social media, email, banking, streaming — any online account you want your trustees to know about."
                action={<Button variant="primary" onClick={() => setShowAccountModal(true)}>Add account</Button>}
              />
            ) : (
              <>
                {accounts.map((acc) => (
                  <AccountRow
                    key={acc.id}
                    account={acc}
                    onDelete={async () => {
                      await deleteDoc(doc(db, `users/${user!.uid}/digitalAccounts`, acc.id));
                      setAccounts((prev) => prev.filter((a) => a.id !== acc.id));
                    }}
                  />
                ))}
                <Button variant="ghost" size="sm" onClick={() => setShowAccountModal(true)} className="mt-2">
                  <Plus size={14} className="mr-2" aria-hidden="true" /> Add another account
                </Button>
              </>
            )}
          </div>
        )}

        {tab === "devices" && (
          <div className="space-y-3">
            {devices.length === 0 ? (
              <EmptyState
                icon={<Smartphone size={40} />}
                heading="No devices added"
                body="Add phones, laptops, tablets — and the PINs or passwords needed to access them."
                action={<Button variant="primary" onClick={() => setShowDeviceModal(true)}>Add device</Button>}
              />
            ) : (
              <>
                {devices.map((dev) => (
                  <DeviceRow
                    key={dev.id}
                    device={dev}
                    onDelete={async () => {
                      await deleteDoc(doc(db, `users/${user!.uid}/deviceAccess`, dev.id));
                      setDevices((prev) => prev.filter((d) => d.id !== dev.id));
                    }}
                  />
                ))}
                <Button variant="ghost" size="sm" onClick={() => setShowDeviceModal(true)} className="mt-2">
                  <Plus size={14} className="mr-2" aria-hidden="true" /> Add another device
                </Button>
              </>
            )}
          </div>
        )}

        {tab === "financial" && (
          <div className="space-y-3">
            {financial.length === 0 ? (
              <EmptyState
                icon={<Banknote size={40} />}
                heading="No financial pointers"
                body="Point your trustees to banks, investments, crypto, pensions — not the amounts, just where to look."
                action={<Button variant="primary" onClick={() => setShowFinancialModal(true)}>Add financial pointer</Button>}
              />
            ) : (
              <>
                {financial.map((fin) => (
                  <FinancialRow
                    key={fin.id}
                    item={fin}
                    onDelete={async () => {
                      await deleteDoc(doc(db, `users/${user!.uid}/financialPointers`, fin.id));
                      setFinancial((prev) => prev.filter((f) => f.id !== fin.id));
                    }}
                  />
                ))}
                <Button variant="ghost" size="sm" onClick={() => setShowFinancialModal(true)} className="mt-2">
                  <Plus size={14} className="mr-2" aria-hidden="true" /> Add another pointer
                </Button>
              </>
            )}
          </div>
        )}

        <AddAccountModal
          open={showAccountModal}
          onClose={() => setShowAccountModal(false)}
          onSave={async (data) => {
            if (!user) return;
            const encPw = data.password ? encrypt(data.password, user.uid) : "";
            const ref = await addDoc(collection(db, `users/${user.uid}/digitalAccounts`), {
              ...data,
              password: encPw,
              createdAt: serverTimestamp(),
            });
            setAccounts((prev) => [...prev, { id: ref.id, ...data, password: encPw }]);
            setShowAccountModal(false);
          }}
        />
        <AddDeviceModal
          open={showDeviceModal}
          onClose={() => setShowDeviceModal(false)}
          onSave={async (data) => {
            if (!user) return;
            const encPin = data.pin ? encrypt(data.pin, user.uid) : "";
            const ref = await addDoc(collection(db, `users/${user.uid}/deviceAccess`), {
              ...data,
              pin: encPin,
              createdAt: serverTimestamp(),
            });
            setDevices((prev) => [...prev, { id: ref.id, ...data, pin: encPin }]);
            setShowDeviceModal(false);
          }}
        />
        <AddFinancialModal
          open={showFinancialModal}
          onClose={() => setShowFinancialModal(false)}
          onSave={async (data) => {
            if (!user) return;
            const ref = await addDoc(collection(db, `users/${user.uid}/financialPointers`), {
              ...data,
              createdAt: serverTimestamp(),
            });
            setFinancial((prev) => [...prev, { id: ref.id, ...data }]);
            setShowFinancialModal(false);
          }}
        />
      </div>
    </PageTransition>
  );
}

function AccountRow({ account, onDelete }: { account: DigitalAccount & { id: string }; onDelete: () => void }) {
  return (
    <div className="bg-white border border-stone-300 rounded-[10px] p-5 flex items-center justify-between gap-4 group">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-parchment flex items-center justify-center shrink-0">
          <Globe size={16} className="text-dusk" aria-hidden="true" />
        </div>
        <div>
          <p className="font-sans font-medium text-[15px] text-stone-900">{account.platform}</p>
          <p className="font-sans text-[13px] text-stone-500">{account.email || account.username}</p>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-2 text-stone-400 hover:text-danger rounded transition-all"
        aria-label={`Delete ${account.platform}`}
      >
        <Trash2 size={15} aria-hidden="true" />
      </button>
    </div>
  );
}

function DeviceRow({ device, onDelete }: { device: DeviceAccess & { id: string }; onDelete: () => void }) {
  return (
    <div className="bg-white border border-stone-300 rounded-[10px] p-5 flex items-center justify-between gap-4 group">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-parchment flex items-center justify-center shrink-0">
          <Smartphone size={16} className="text-dusk" aria-hidden="true" />
        </div>
        <div>
          <p className="font-sans font-medium text-[15px] text-stone-900">{device.deviceName}</p>
          <p className="font-sans text-[13px] text-stone-500">{device.deviceType}</p>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-2 text-stone-400 hover:text-danger rounded transition-all"
        aria-label={`Delete ${device.deviceName}`}
      >
        <Trash2 size={15} aria-hidden="true" />
      </button>
    </div>
  );
}

function FinancialRow({ item, onDelete }: { item: FinancialPointer & { id: string }; onDelete: () => void }) {
  return (
    <div className="bg-white border border-stone-300 rounded-[10px] p-5 flex items-center justify-between gap-4 group">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-parchment flex items-center justify-center shrink-0">
          <Banknote size={16} className="text-dusk" aria-hidden="true" />
        </div>
        <div>
          <p className="font-sans font-medium text-[15px] text-stone-900">{item.institution}</p>
          <p className="font-sans text-[13px] text-stone-500">{item.accountType}</p>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-2 text-stone-400 hover:text-danger rounded transition-all"
        aria-label={`Delete ${item.institution}`}
      >
        <Trash2 size={15} aria-hidden="true" />
      </button>
    </div>
  );
}

function AddAccountModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (data: Omit<DigitalAccount, "createdAt">) => void }) {
  const [form, setForm] = useState({
    platformName: "",
    platform: "",
    category: "" as DigitalAccount["category"],
    email: "",
    username: "",
    password: "",
    twoFaCodes: "",
    deathInstruction: "" as DigitalAccount["deathInstruction"],
    onDeath: "delete" as DigitalAccount["onDeath"],
    nominatedTrusteeId: "",
    notes: "",
  });
  return (
    <Modal open={open} onClose={onClose} title="Add online account" sensitive>
      <div className="space-y-4">
        <div><Label>Platform / service</Label><Input value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} placeholder="e.g. Google, Facebook, Netflix" /></div>
        <div><Label>Email address</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><Label>Username (if different)</Label><Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></div>
        <div><Label>Password</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Encrypted before saving" /></div>
        <div><Label>On death</Label>
          <Select value={form.onDeath} onChange={(e) => setForm({ ...form, onDeath: e.target.value as DigitalAccount["onDeath"] })} options={[{ value: "deactivate", label: "Deactivate account" }, { value: "memorialize", label: "Memorialize" }, { value: "delete", label: "Delete" }, { value: "transfer", label: "Transfer to family" }, { value: "leave", label: "Leave as-is" }]} />
        </div>
        <div><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} /></div>
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button variant="primary" onClick={() => onSave(form)} className="flex-1" disabled={!form.platform}>Save</Button>
        </div>
      </div>
    </Modal>
  );
}

function AddDeviceModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (data: Omit<DeviceAccess, "createdAt">) => void }) {
  const [form, setForm] = useState({ deviceName: "", deviceType: "phone" as DeviceAccess["deviceType"], pin: "", backupPin: "", location: "", notes: "" });
  return (
    <Modal open={open} onClose={onClose} title="Add device" sensitive>
      <div className="space-y-4">
        <div><Label>Device name</Label><Input value={form.deviceName} onChange={(e) => setForm({ ...form, deviceName: e.target.value })} placeholder="e.g. iPhone 15, MacBook Pro" /></div>
        <div><Label>Device type</Label>
          <Select value={form.deviceType} onChange={(e) => setForm({ ...form, deviceType: e.target.value as DeviceAccess["deviceType"] })} options={[{ value: "phone", label: "Phone" }, { value: "laptop", label: "Laptop / Computer" }, { value: "tablet", label: "Tablet" }, { value: "other", label: "Other" }]} />
        </div>
        <div><Label>PIN / Password</Label><Input type="password" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} placeholder="Encrypted before saving" /></div>
        <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Home office drawer" /></div>
        <div><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} /></div>
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button variant="primary" onClick={() => onSave(form)} className="flex-1" disabled={!form.deviceName}>Save</Button>
        </div>
      </div>
    </Modal>
  );
}

function AddFinancialModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (data: Omit<FinancialPointer, "createdAt">) => void }) {
  const [form, setForm] = useState({ institution: "", accountType: "bank" as FinancialPointer["accountType"], referenceNumber: "", contactPerson: "", contactNumber: "", notes: "", documentUrl: "" });
  return (
    <Modal open={open} onClose={onClose} title="Add financial pointer">
      <div className="space-y-4">
        <div><Label>Institution name</Label><Input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} placeholder="e.g. Standard Bank, Nedbank, Allan Gray" /></div>
        <div><Label>Account type</Label>
          <Select value={form.accountType} onChange={(e) => setForm({ ...form, accountType: e.target.value as FinancialPointer["accountType"] })} options={[{ value: "bank", label: "Bank account" }, { value: "investment", label: "Investment / unit trust" }, { value: "retirement", label: "Retirement / pension" }, { value: "crypto", label: "Cryptocurrency" }, { value: "insurance", label: "Insurance policy" }, { value: "other", label: "Other" }]} />
        </div>
        <div><Label>Reference / Account number</Label><Input value={form.referenceNumber} onChange={(e) => setForm({ ...form, referenceNumber: e.target.value })} /></div>
        <div><Label>Contact person</Label><Input value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} /></div>
        <div><Label>Contact number</Label><Input value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} /></div>
        <div><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} /></div>
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button variant="primary" onClick={() => onSave(form)} className="flex-1" disabled={!form.institution}>Save</Button>
        </div>
      </div>
    </Modal>
  );
}
