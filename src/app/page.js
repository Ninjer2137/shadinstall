"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function Home() {
  const [dane, setDane] = useState([""])

  useEffect(()=>{
    const getData = async() =>{
      try{
        const dataR = await fetch("https://api.nbp.pl/api/cenyzlota/last/30/?format=json")
        const dataJson = await dataR.json()
        setDane(dataJson.reverse())
      }catch(error){

      }finally{
        
      }
    }
    getData()
  },[])

return (
  <div className="flex flex-row flex-wrap justify-center m-10">
    {dane && dane.map((dane, idx, prev) => (
      idx > 0 && dane.cena > prev[idx - 1].cena ? (
        <Card className="h-28 w-64 m-1 pt-4" key={idx}>
          <CardContent className>
            <ArrowUp className="text-green-500 float-right size-16"/>
            <h1 className="text-3xl">{dane.cena}</h1>
            <h1 className="text-xl">{dane.data}</h1>
          </CardContent>
        </Card>
      ) : (
        <Card className="h-28 w-64 m-1 pt-4" key={idx}>
          <CardContent>
            <ArrowDown className="text-red-500 float-right size-16"/>
            <h1 className="text-3xl">{dane.cena}</h1>
            <h1 className="text-xl">{dane.data}</h1>
          </CardContent>
        </Card>
      )
    ))}
  </div>
);
}