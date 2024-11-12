"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page1() {
  const pb = new PocketBase("http://172.16.15.150:8080");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(pb.authStore.model);
  }, []);

  const logout = async () => {
    pb.authStore.clear();
    setUser(null);
  };
  return (
    <div>
      <div className="flex justify-between">
        <Link href="/logowanie/str1">Strona1</Link>
        <Link href="/logowanie/str2">Strona2</Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={pb.files.getUrl(user, user?.avatar)}
                alt="avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!user && (
              <Link href="/logowanie/login">
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
            )}
            {user && (
              <Link href="/logowanie/ustawienia">
                <DropdownMenuItem>Ustawienia</DropdownMenuItem>
              </Link>
            )}
            {user && (
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <h1>strona dla wszystkich</h1>
      </div>
    </div>
  );
}
