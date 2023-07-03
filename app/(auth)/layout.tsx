import "./globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full grid place-items-center dx-pattern-2">
      {children}
    </div>
  );
}
