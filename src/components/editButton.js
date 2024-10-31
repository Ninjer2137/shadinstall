import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from 'lucide-react';
import { useState } from "react";
import PocketBase from 'pocketbase';
import { Trigger } from "@radix-ui/react-dialog";

export function EditItem({gra, onupdate}) {
    const pb = new PocketBase('http://172.16.15.150:8080');
    const [dane, setDane] = useState({nazwa: gra.nazwa, cena: gra.cena, opis: gra.opis})

    const importDane = (e, nazwa) =>{
        setDane((prev)=>{
            return(
                {
                ...prev,
                [nazwa]:e.target.value
                }
            )
        })
    }

    const update = async () =>{
        const formdata = new FormData()

        formdata.append("nazwa", dane.nazwa)
        formdata.append("cena", dane.cena)
        formdata.append("opis", dane.opis)
        //formdata.append("zdjecie", zdjecie)

        const record = await pb.collection('gry').update(gra.id, formdata);
        
        onupdate(record)
    }

    return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant="ghost"><Pencil/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nazwa">Nazwa</Label>
            <Input defaultValue={gra.nazwa} onChange={(e)=>{importDane(e, "nazwa")}} type="text" id="nazwa" placeholder="Nazwa"/>
            
            <Label htmlFor="opis">Opis</Label>
            <Input defaultValue={gra.opis} onChange={(e)=>{importDane(e, "opis")}} type="text" id="opis" placeholder="Opis"/>
            
            <Label htmlFor="cena">Cena</Label>
            <Input defaultValue={gra.cena} onChange={(e)=>{importDane(e, "cena")}} type="number" id="cena" placeholder="Cena"/>
            
            {/*<Label htmlFor="zdjecie">Zdjecie</Label>
            <Input onChange={(e)=>{handleZdjecie(e)}} type="file" id="zdjecie" placeholder="Zdjecie"/>*/}
          </div>
        </div>
        <DialogFooter>
            <Trigger asChild>
                <Button onClick={update}>Save changes</Button>
            </Trigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}