"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const pb = new PocketBase("http://172.16.15.150:8080");
  const [login, setLogin] = useState(null);
  const [pass, setPass] = useState(null);
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const test = async () => {
    console.log(login);
    console.log(pass);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(login, pass);
      console.log(authData);
      console.log(pb.authStore.isValid);
      console.log(pb.authStore.token);
      console.log(pb.authStore.model.id);
      router.push("/pb");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <Card className="w-[400px] h-[500px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            onChange={(e) => {
              handleLogin(e);
            }}
          ></Input>
          <Label htmlFor="pass">Password</Label>
          <Input
            type="password"
            id="pass"
            onChange={(e) => {
              handlePass(e);
            }}
          ></Input>
          <Button onClick={test}>Login</Button>
          {error && <p className="text-red-700">error</p>}
        </CardContent>
        <CardFooter>
          <Link href="/pb/rejestracja">
            <p>Rejestracja</p>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
