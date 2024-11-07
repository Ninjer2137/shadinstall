import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import Link from "next/link";

export function AvatarLogin({ onLogin }) {
  const pb = new PocketBase("http://172.16.15.150:8080");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(pb.authStore.model);
  }, []);

  const login = async () => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword("karol", "karol123");
      console.log(authData);
      console.log(pb.authStore.isValid);
      console.log(pb.authStore.token);
      console.log(pb.authStore.model.id);

      setUser(pb.authStore.model);
      onLogin(pb.authStore.model);
    } catch (err) {}
  };

  const logout = async () => {
    pb.authStore.clear();
    setUser(null);
    onLogin(null);
  };

  return (
    <div className="p-5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={pb.files.getUrl(user, user?.avatar)}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {user ? <p>zalogowany</p> : <p>niezalogowany</p>}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!user && (
            <Link href="/pb/rejestracja">
              <DropdownMenuItem>Rejestracja</DropdownMenuItem>
            </Link>
          )}
          {!user && (
            <Link href="/pb/login">
              <DropdownMenuItem>Login</DropdownMenuItem>
            </Link>
          )}
          {user && <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
