"use client";

import { useState } from "react";
import { QUESTIONS } from "@/lib/whitelist/config";
import styles from "./whitelist.module.css";

export default function ApplyForm() {
  const [values, setValues] = useState(() =>
    Object.fromEntries(QUESTIONS.map((q) => [q.id, ""]))
  );
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [error, setError] = useState("");

  const setValue = (id, v) => setValues((prev) => ({ ...prev, [id]: v }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("done");
    } catch {
      setError("Could not reach the server. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className={styles.done} role="status">
        <h2>Application sent</h2>
        <p>The staff will review it. You will get the result with a mention on Discord.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      {QUESTIONS.map((q) => {
        const label = (
          <>
            {q.label}
            {!q.required && " (optional)"}
          </>
        );

        if (q.type === "radio") {
          return (
            <fieldset key={q.id}>
              <legend className={styles.legend}>{label}</legend>
              <div className={styles.choices}>
                {q.options.map((opt) => (
                  <label className={styles.choice} key={opt}>
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      required={q.required}
                      checked={values[q.id] === opt}
                      onChange={() => setValue(q.id, opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        }

        return (
          <div className={styles.field} key={q.id}>
            <label className={styles.fieldLabel} htmlFor={q.id}>
              <span>{label}</span>
              {q.type === "textarea" && (
                <span className={styles.fieldCount}>
                  {values[q.id].length}/{q.maxLength}
                </span>
              )}
            </label>

            {q.type === "textarea" ? (
              <textarea
                id={q.id}
                dir="auto"
                rows={q.rows ?? 4}
                required={q.required}
                minLength={q.minLength}
                maxLength={q.maxLength}
                placeholder={q.placeholder}
                value={values[q.id]}
                onChange={(e) => setValue(q.id, e.target.value)}
              />
            ) : (
              <input
                id={q.id}
                dir="auto"
                type={q.type === "number" ? "number" : q.type === "email" ? "email" : "text"}
                required={q.required}
                min={q.min}
                max={q.max}
                minLength={q.minLength}
                maxLength={q.maxLength}
                placeholder={q.placeholder}
                value={values[q.id]}
                onChange={(e) => setValue(q.id, e.target.value)}
              />
            )}
          </div>
        );
      })}

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button className={styles.btn} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Submit application"}
      </button>
    </form>
  );
}
