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

  // Send emails (best-effort — don't fail signup if email fails)
  try {
    await Promise.all([
      // Welcome email to the user
      resend.emails.send({
        from: "Thinkio <hello@thinkio.app>",
        to: email,
        subject: "You're on the Thinkio waitlist!",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#111">
            <h2 style="margin:0 0 12px">You're in!</h2>
            <p style="margin:0 0 16px;color:#444;line-height:1.6">
              Thanks for joining the Thinkio waitlist. We'll email you the moment early access opens.
            </p>
            <p style="margin:0 0 16px;color:#444;line-height:1.6">
              Thinkio turns your notes into quizzes, flashcards, and lessons — in seconds.
            </p>
            <p style="margin:0;color:#888;font-size:13px">— The Thinkio team</p>
          </div>
        `,
      }),
      // Notification to you
      resend.emails.send({
        from: "Thinkio <hello@thinkio.app>",
        to: "vukasindragutinovic8@gmail.com",
        subject: `New waitlist signup: ${email}`,
        html: `<p style="font-family:sans-serif;color:#111"><strong>${email}</strong> just joined the Thinkio waitlist.</p>`,
      }),
    ]);
  } catch (_) {
    // Email failure doesn't block the signup
  }

  return { success: true };
}
