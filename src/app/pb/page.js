"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';

export default function Pb(){
    const pb = new PocketBase('http://172.16.15.150:8080');
    const [data, setData] = useState([])
    const [dane, setDane] = useState({nazwa: null, cena: null, opis: null})

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

    const save = async () =>{
        const record = await pb.collection('gry').create(dane);
        setData((prev)=>{
            return(
                [...prev, record]
            )
        })
    }

    useEffect(()=>{
        const GetData = async () =>{
            try{
                const records = await pb.collection('gry').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setData(records)
            }catch(error){

            }
        }

        GetData()
    },[])

    return(
        <div className="w-full h-screen">
            <div className="w-full h-[80vh] flex flex-row justify-center gap-2">
            {
                data && data.map((item, idx) => (
                    <Card key={idx} className="w-[300px]">
                        <CardHeader>
                        <CardTitle>{item.nazwa}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-justify">
                        {item.opis}
                        <Image src={pb.files.getUrl(item, item.zdjecie)} alt={item.zdjecie} width="500" height="500"></Image>
                        </CardContent>
                        <CardFooter>{item.cena} PLN</CardFooter>
                    </Card>
                ))
            }
            </div>
            <div className="w-full h-[20vh] flex justify-center mt-5">
            <Card className="w-[400px] h-[375px] p-5">
                <CardTitle>
                    Dodaj grę
                </CardTitle>
            <Label htmlFor="nazwa">Nazwa</Label>
            <Input onChange={(e)=>{importDane(e, "nazwa")}} type="text" id="nazwa" placeholder="Nazwa"/>
            
            <Label htmlFor="opis">Opis</Label>
            <Input onChange={(e)=>{importDane(e, "opis")}} type="text" id="opis" placeholder="Opis"/>
            
            <Label htmlFor="cena">Cena</Label>
            <Input onChange={(e)=>{importDane(e, "cena")}} type="number" id="cena" placeholder="Cena"/>
            
            <Label htmlFor="zdjecie">Zdjecie</Label>
            <Input type="file" id="zdjecie" placeholder="Zdjecie"/>

            <Button className="w-full mt-5" onClick={save}>Dodaj grę</Button>
            </Card>
            </div>
        </div>
    )
}