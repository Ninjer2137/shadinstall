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
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

export default function PageSettings() {
  const router = useRouter();
  const pb = new PocketBase("http://172.16.15.150:8080");
  const [zdjecie, setZdjecie] = useState(null);
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setUser(pb.authStore.model);
  }, []);
  const handleZdjecie = (e) => {
    setZdjecie(e.target.files[0]);
  };
  const Zmien = async () => {
    try {
      const formdata = new FormData();

      formdata.append("avatar", zdjecie);
      const record = await pb.collection("users").update(user.id, formdata);
      router.push("/logowanie/str1");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Zmien avatar</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="zdjecie">Username</Label>
        <Input
          type="file"
          id="zdjecie"
          onChange={(e) => {
            handleZdjecie(e);
          }}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={Zmien}>Zmien</Button>
      </CardFooter>
    </Card>
  );
}
