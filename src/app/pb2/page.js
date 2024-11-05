"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EditItem } from "@/components/editButton";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Ellipsis, Pencil, Plus, Trash2 } from "lucide-react";

export default function Pb2() {
  const pb = new PocketBase("http://172.16.15.150:8080");
  const [data, setData] = useState([]);
  const [dane, setDane] = useState({ model: null, marka: null, wypoz: false });
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

    formdata.append("model", dane.model);
    formdata.append("marka", dane.marka);
    formdata.append("zdj", zdjecie);

    const record = await pb.collection("samochody").create(formdata);
    setData((prev) => {
      return [...prev, record];
    });
  };

  useEffect(() => {
    const GetData = async () => {
      try {
        const records = await pb.collection("samochody").getFullList({
          sort: "-created",
        });
        console.log(records);
        setData(records);
      } catch (error) {}
    };

    GetData();
  }, []);

  const zmien = async (auto, value) => {
    const record = await pb
      .collection("samochody")
      .update(auto, { wypoz: value });
  };

  const delItem = async (id) => {
    try {
      await pb.collection("samochody").delete(id);
      setData((prev) =>
        prev.filter((item) => {
          return item.id != id;
        })
      );
    } catch (err) {}
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full h-[80vh] flex flex-row justify-center gap-2">
        {data &&
          data.map((auto, idx) => (
            <Card key={idx} className="w-[300px] h-[300px]">
              <CardHeader>
                <CardTitle>
                  <Image
                    src={pb.files.getUrl(auto, auto.zdj)}
                    alt={auto.zdj}
                    width="500"
                    height="500"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <h1>{auto.model}</h1>
                <h1>{auto.marka}</h1>
              </CardContent>
              <CardFooter className="w-full flex justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col justify-between">
                    <Button>
                      <Pencil />
                    </Button>
                    <Button
                      onClick={() => {
                        delItem(auto.id);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Switch
                  id="wypoz"
                  defaultChecked={auto.wypoz}
                  onCheckedChange={(e) => zmien(auto.id, e)}
                />
              </CardFooter>
            </Card>
          ))}
        <Card className="w-[300px] h-[300px] flex justify-center items-center">
          <Sheet>
            <SheetTrigger>
              <Plus className="w-[100px] h-[100px]" />
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="h-[40%] flex justify-center items-center flex-col"
            >
              <SheetTitle>Dodaj auto</SheetTitle>
              <Label htmlFor="marka">Marka</Label>
              <Input
                onChange={(e) => {
                  importDane(e, "marka");
                }}
                type="text"
                id="marka"
                placeholder="Marka"
              />

              <Label htmlFor="model">Model</Label>
              <Input
                onChange={(e) => {
                  importDane(e, "model");
                }}
                type="text"
                id="model"
                placeholder="Model"
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
                Dodaj auto
              </Button>
            </SheetContent>
          </Sheet>
        </Card>
      </div>
    </div>
  );
}
