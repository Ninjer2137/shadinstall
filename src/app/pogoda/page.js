"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Cloud, Droplet, Minimize2, Wind } from 'lucide-react';

export default function Pogoda(){
    const [daneDzis, setDaneDzis] = useState(null)
    const [dane5, setDane5] = useState(null)
    const [err, setErr] = useState(false)
    const [load, setLoad] = useState(true)

    var today = new Date()
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear(); 

    useEffect(()=>{
      const getData = async() =>{
        try{
          const dataDzis = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=52&lon=21&units=metric&appid=b6b25c78c679c8415fd7ab2defc95d8b")
          const data5 = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=52&lon=21&units=metric&appid=b6b25c78c679c8415fd7ab2defc95d8b")
          const dataDzisJson = await dataDzis.json()
          const data5Json = await data5.json()
          setDaneDzis(dataDzisJson)
          setDane5(data5Json)
          console.log(dataDzisJson)
          console.log(data5Json)
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
        <div className="flex flex-row flex-wrap justify-center m-10">
            <h1>{err && "błąd podczas ładowania"}</h1>
            <h1>{load && "ładowanie"}</h1>
            {daneDzis && (
                <Card className="h-28 w-65 m-1 pt-4">
                <CardContent className="flex flex-wrap flex-col justify-center items-center">
                  <h1 className="text-3xl">{daneDzis.main.temp}℃</h1>
                  <h1 className="text-xl">{dd+"/"+mm+"/"+yyyy}</h1>
                  <h1 className="flex justify-between gap-2"><Cloud/>{daneDzis.clouds.all}%|<Wind/>{daneDzis.wind.speed}m/s|<Minimize2/>{daneDzis.main.pressure}hPa|<Droplet/>{daneDzis.main.humidity}%</h1>
                </CardContent>
                </Card>
            )}
        </div>
    )
}