"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { treatments, formatDurations } from "@/lib/treatments-data";
import { CallButton, WhatsAppButton } from "./CTAButtons";

const steps = ["Treatment", "Date", "Time", "Details", "Confirm"];

const timeSlots = [
  "Morning · 10am–1pm",
  "Afternoon · 1pm–4pm",
  "Evening · 4pm–8pm",
];

type FormState = {
  treatmentSlug: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
};

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("treatment") ?? "";

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    treatmentSlug: preselected,
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });

  const selectedTreatment = useMemo(
    () => treatments.find((t) => t.slug === form.treatmentSlug),
    [form.treatmentSlug]
  );

  const canProceed = [
    !!form.treatmentSlug,
    !!form.date,
    !!form.time,
    form.name.trim().length > 1 && form.phone.trim().length > 5,
    true,
  ][step];

  const todayISO = new Date().toISOString().split("T")[0];

  const whatsappMessage = `Hi SoulSpirit Spa, I would like to book:\n- Treatment: ${
    selectedTreatment?.name ?? "-"
  }\n- Date: ${form.date || "-"}\n- Preferred time: ${
    form.time || "-"
  }\n- Name: ${form.name || "-"}\n- Phone: ${form.phone || "-"}`;

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Request Received</p>
        <h2 className="mt-5 text-display-sm font-serif text-balance">
          Thank you, {form.name.split(" ")[0] || "friend"}.
        </h2>
        <p className="mt-5 text-ink/65">
          Your booking request has been prepared. Our booking system is not
          yet connected, so please confirm your slot with our team on
          WhatsApp or by phone, we&rsquo;ll respond as quickly as possible.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <CallButton label="Call to Confirm" />
          <WhatsAppButton label="Confirm on WhatsApp" message={whatsappMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ol className="mb-14 flex items-center justify-between">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-2 text-center">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full font-serif text-sm transition-colors duration-500 ${
                i <= step ? "bg-charcoal text-ivory" : "bg-cream text-ink/40"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`hidden text-[10px] uppercase tracking-widest2 sm:block ${
                i <= step ? "text-ink" : "text-ink/40"
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <div>
              <h2 className="font-serif text-2xl">Choose your treatment</h2>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {treatments.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, treatmentSlug: t.slug }))}
                    className={`tap-target border px-5 py-4 text-left transition-colors duration-400 ${
                      form.treatmentSlug === t.slug
                        ? "border-bronze bg-bronze/5"
                        : "border-line hover:border-ink/40"
                    }`}
                  >
                    <p className="font-serif text-lg">{t.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest2 text-ink/40">
                      {formatDurations(t)} min
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-serif text-2xl">Choose your date</h2>
              <input
                type="date"
                min={todayISO}
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="mt-6 w-full border border-line bg-transparent px-5 py-4 text-base text-ink focus:border-bronze"
                aria-label="Preferred date"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-serif text-2xl">Choose your preferred time</h2>
              <div className="mt-6 flex flex-col gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, time: slot }))}
                    className={`tap-target border px-5 py-4 text-left transition-colors duration-400 ${
                      form.time === slot
                        ? "border-bronze bg-bronze/5"
                        : "border-line hover:border-ink/40"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-serif text-2xl">Your details</h2>
              <div className="mt-6 flex flex-col gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-line bg-transparent px-5 py-4 text-base placeholder:text-ink/40 focus:border-bronze"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-line bg-transparent px-5 py-4 text-base placeholder:text-ink/40 focus:border-bronze"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-line bg-transparent px-5 py-4 text-base placeholder:text-ink/40 focus:border-bronze"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-serif text-2xl">Confirm your booking</h2>
              <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                {[
                  ["Treatment", selectedTreatment?.name ?? "-"],
                  ["Date", form.date || "-"],
                  ["Time", form.time || "-"],
                  ["Name", form.name || "-"],
                  ["Phone", form.phone || "-"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-4">
                    <dt className="text-ink/50">{label}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`tap-target text-xs uppercase tracking-widest2 text-ink/50 hover:text-ink ${
            step === 0 ? "invisible" : ""
          }`}
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            disabled={!canProceed}
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continue
          </button>
        ) : (
          <button type="button" onClick={() => setSubmitted(true)} className="btn-primary">
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
}
