"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function Autorzy() {
  const [dane, setDane] = useState(null)
  const [err, setErr] = useState(false)
  const [load, setLoad] = useState(true)

  useEffect(()=>{
    const getData = async() =>{
    try{
        const dataR = await fetch("https://wolnelektury.pl/api/books/")
        const dataJson = await dataR.json()
        setDane(dataJson)
    }catch(error){
        console.log(error)
        setErr(true)
    }finally{
        setLoad(false)
    }
    }
    getData()
  },[])

return (
    <>
    <div>
        
    </div>
    <div className="flex flex-row flex-wrap justify-center m-10">
        <h1>{err && "błąd podczas ładowania"}</h1>
        <h1>{load && "ładowanie"}</h1>
        {dane  && dane.map((item, idx) => (
            <Card key={idx} className="w-[400px] h-[500px] flex flex-col">
                <CardContent className="flex flex-wrap flex-col justify-center items-center flex-grow">
                    {item.simple_thumb ? 
                    <Image src={item.simple_thumb} width={250} height={400} alt={item.title}></Image>
                    : null}
                    <h1 className="font-bold">{item.title}</h1>
                    <h1>{item.author}</h1>
                    <Button asChild>
                    <Link href={item.url}>Przeczytaj książke</Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
    </>
);
}