"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinWaitlist(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  if (!email || !email.includes("@")) return { error: "Enter a valid email." };

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify({ email }),
  });

  if (res.status === 409) return { error: "You're already on the list!" };
  if (!res.ok) return { error: "Something went wrong. Try again." };

  // Notify owner (best-effort — don't fail signup if email fails)
  try {
    await resend.emails.send({
      from: "Thinkio <onboarding@resend.dev>",
      to: "vukasindragutinovic8@gmail.com",
      subject: `New waitlist signup: ${email}`,
      html: `<p style="font-family:sans-serif;color:#111"><strong>${email}</strong> just joined the Thinkio waitlist.</p>`,
    });
  } catch (_) {
    // Email failure doesn't block the signup
  }

  return { success: true };
}
