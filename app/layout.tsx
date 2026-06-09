// Root layout is intentionally a pass-through. The public site renders its
// <html>/<body> in app/(site)/layout.tsx, and the Payload admin renders its
// own document in app/(payload). Keeping this minimal lets both coexist.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
