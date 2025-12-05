import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FERSCOAT CBT Platform | Modern Computer-Based Testing",
  description: "Streamline exams with FERSCOAT CBT Platform. Create, manage, and grade computer-based tests easily and securely for students, teachers, and administrators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
