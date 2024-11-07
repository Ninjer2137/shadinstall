"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { EditItem } from "@/components/editButton";
import { AvatarLogin } from "@/components/loginAvatar";

export default function Pb() {
  const pb = new PocketBase("http://172.16.15.150:8080");
  const [data, setData] = useState([]);
  const [dane, setDane] = useState({ nazwa: null, cena: null, opis: null });
  const [zdjecie, setZdjecie] = useState(null);
  const [user, setUser] = useState(null);

  const login = (user_pb) => {
    setUser(user_pb);
  };

  useEffect(() => {
    setUser(pb.authStore.model);
  }, []);

  const importDane = (e, nazwa) => {
    setDane((prev) => {
      return {
        ...prev,
        [nazwa]: e.target.value,
      };
    });
  };

  const save = async () => {
    const formdata = new FormData();

    formdata.append("nazwa", dane.nazwa);
    formdata.append("cena", dane.cena);
    formdata.append("opis", dane.opis);
    formdata.append("zdjecie", zdjecie);

    const record = await pb.collection("gry").create(formdata);
    setData((prev) => {
      return [...prev, record];
    });
  };

  const handleZdjecie = (e) => {
    console.log(e);
    setZdjecie(e.target.files[0]);
  };

  useEffect(() => {
    const GetData = async () => {
      try {
        const records = await pb.collection("gry").getFullList({
          sort: "-created",
        });
        console.log(records);
        setData(records);
      } catch (error) {}
    };

    GetData();
  }, []);

  const delItem = async (id) => {
    try {
      await pb.collection("gry").delete(id);
      setData((prev) =>
        prev.filter((item) => {
          return item.id != id;
        })
      );
    } catch (err) {}
  };

  const updateItem = (item) => {
    console.log(item);

    var tmp_data = [...data];
    var index = null;

    for (let i in data) {
      if (item.id == tmp_data[i].id) {
        index = i;
      }
    }
    tmp_data[index] = item;

    setData(tmp_data);
  };

  const plus = async (gra) => {
    const record = await pb.collection("gry").update(gra.id, { "likes+": 1 });
  };

  const minus = async (gra) => {
    const record = await pb.collection("gry").update(gra.id, { "likes-": 1 });
  };

  return (
    <div className="w-full h-screen">
      <AvatarLogin onLogin={login} />
      <div className="w-full h-[80vh] flex flex-row justify-center gap-2">
        {user && data ? (
          data.map((item, idx) => (
            <Card key={idx} className="w-[300px]">
              <CardHeader>
                <CardTitle>{item.nazwa}</CardTitle>
              </CardHeader>
              <CardContent className="text-justify">
                {item.opis}
                <Image
                  src={pb.files.getUrl(item, item.zdjecie)}
                  alt={item.zdjecie}
                  width="500"
                  height="500"
                ></Image>
              </CardContent>
              <CardFooter className="w-full flex justify-end">
                <Button variant="ghost" onClick={() => plus(item)}>
                  <ThumbsUp />
                </Button>
                {item.likes}
                <Button variant="ghost" onClick={() => minus(item)}>
                  <ThumbsDown />
                </Button>
                {item.cena} PLN
                <EditItem gra={item} onupdate={updateItem} />
                <Button
                  variant="ghost"
                  onClick={() => {
                    delItem(item.id);
                  }}
                >
                  <Trash2 />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1>niezalogowany</h1>
        )}
      </div>
      <div className="w-full h-[20vh] flex justify-center mt-5">
        <Card className="w-[400px] h-[375px] p-5">
          <CardTitle>Dodaj grę</CardTitle>
          <Label htmlFor="nazwa">Nazwa</Label>
          <Input
            onChange={(e) => {
              importDane(e, "nazwa");
            }}
            type="text"
            id="nazwa"
            placeholder="Nazwa"
          />

          <Label htmlFor="opis">Opis</Label>
          <Input
            onChange={(e) => {
              importDane(e, "opis");
            }}
            type="text"
            id="opis"
            placeholder="Opis"
          />

          <Label htmlFor="cena">Cena</Label>
          <Input
            onChange={(e) => {
              importDane(e, "cena");
            }}
            type="number"
            id="cena"
            placeholder="Cena"
          />

          <Label htmlFor="zdjecie">Zdjecie</Label>
          <Input
            onChange={(e) => {
              handleZdjecie(e);
            }}
            type="file"
            id="zdjecie"
            placeholder="Zdjecie"
          />

          <Button className="w-full mt-5" onClick={save}>
            Dodaj grę
          </Button>
        </Card>
      </div>
    </div>
  );
}
