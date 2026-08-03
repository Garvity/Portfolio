import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garv R Changrani — Java Full Stack Developer",
  description: "Portfolio of Garv R Changrani, a Java and Spring Boot full-stack developer building secure backend platforms, React applications, and AI/ML systems.",
  keywords: ["Java Developer", "Spring Boot", "Full Stack Developer", "React", "PostgreSQL", "Backend Engineer", "AI Engineer"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
