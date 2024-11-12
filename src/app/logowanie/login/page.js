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

export default function PageLogin() {
  const router = useRouter();
  const pb = new PocketBase("http://172.16.15.150:8080");
  const [login, setLogin] = useState(null);
  const [pass, setPass] = useState(null);
  const [err, setErr] = useState(false);

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const Login = async () => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(login, pass);
      console.log(authData);
      router.push("/logowanie/str1");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <Card>
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
        />
        <Label htmlFor="pass">Password</Label>
        <Input
          type="password"
          id="pass"
          onChange={(e) => {
            handlePass(e);
          }}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={Login}>Zaloguj</Button>
      </CardFooter>
    </Card>
  );
}
