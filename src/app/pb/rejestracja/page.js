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

export default function Page() {
  const router = useRouter();
  const pb = new PocketBase("http://172.16.15.150:8080");
  const [dane, setDane] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [zdjecie, setZdjecie] = useState(null);

  const importDane = (e, nazwa) => {
    setDane((prev) => {
      return {
        ...prev,
        [nazwa]: e.target.value,
      };
    });
  };

  const handleZdjecie = (e) => {
    console.log(e);
    setZdjecie(e.target.files[0]);
  };

  const save = async () => {
    const formdata = new FormData();
    formdata.append("username", dane.username);
    formdata.append("email", dane.email);
    formdata.append("password", dane.password);
    formdata.append("passwordConfirm", dane.passwordConfirm);
    if (zdjecie) {
      formdata.append("avatar", zdjecie);
    }

    try {
      const record = await pb.collection("users").create(formdata);
      setDane(record);
    } catch (error) {
      console.error(error);
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
              importDane(e, "username");
            }}
          ></Input>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            onChange={(e) => {
              importDane(e, "email");
            }}
          ></Input>
          <Label htmlFor="pass">Password</Label>
          <Input
            type="password"
            id="pass"
            onChange={(e) => {
              importDane(e, "password");
            }}
          ></Input>
          <Label htmlFor="passC">Confirm password</Label>
          <Input
            type="password"
            id="passC"
            onChange={(e) => {
              importDane(e, "passwordConfirm");
            }}
          ></Input>
          <Label htmlFor="avatar">Avatar</Label>
          <Input
            onChange={(e) => {
              handleZdjecie(e);
            }}
            type="file"
            id="avatar"
            placeholder="Avatar"
          />
          <Button onClick={save}>Zarejestruj</Button>
        </CardContent>
      </Card>
    </div>
  );
}
