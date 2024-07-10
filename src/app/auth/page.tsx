import { LoginForm } from "@/features/login";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import Image from "next/image";
import { RegisterForm } from "@/features/register";
import { UserLogin } from "@/widgets/user-login";
function AuthPage() {
  return (
    <main className="grid xl:grid-cols-2 min-h-screen bg-primary">
      <UserLogin />
    </main>
  );
}

export default AuthPage;
//<RegisterForm />
