import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff7ed"
};

export const metadata: Metadata = {
  title: "Sign In — EduLearn Smart Learning Platform",
  description:
    "Sign in to EduLearn to access your courses, assignments, and progress. A smart learning platform for students and educators.",
  openGraph: {
    title: "Sign In — EduLearn",
    description:
      "Access your courses, assignments, and progress on EduLearn — the smart learning platform.",
    type: "website",
    locale: "en_US",
    siteName: "EduLearn"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In — EduLearn",
    description:
      "Access your courses, assignments, and progress on EduLearn — the smart learning platform."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
