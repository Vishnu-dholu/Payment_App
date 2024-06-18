import { Button } from "./button";
import { useRouter } from "next/navigation";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: () => void;
  onSignout: () => Promise<void>;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const router = useRouter();

  const handleLogout = () => {
    user ? onSignout : onSignin;
    router.push("/auth/signin");
  };

  return (
    <div className="flex justify-between border-b px-4 border-slate-300">
      <div className="text-2xl flex items-center justify-center font-bold text-purple-700">
        <img src="/logo.png" className="h-12 mr-2" alt="PayTM Logo" />
        PayTM
      </div>

      <div className="flex flex-col justify-center pt-2">
        <Button onClick={handleLogout}>{user ? "Logout" : "Login"}</Button>
      </div>
    </div>
  );
};
