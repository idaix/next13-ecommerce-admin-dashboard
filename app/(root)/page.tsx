import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <main className="h-full">
      <nav className="py-3 px-5">
        <UserButton afterSignOutUrl="/" />
      </nav>
    </main>
  );
}
