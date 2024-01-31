import Email from "@/emails/welcome";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

console.log(resend);

export async function POST(req: Request, res: NextApiResponse) {
  const { firstName, email } = await req.json();

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Hello world",
    react: Email({
      firstName,
    }),
  });

  res.status(200).json(email);
}
