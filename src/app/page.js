"use client"
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([""])
  const [err, setErr] = useState(false)
  const [load, setLoad] = useState(true)

  useEffect(()=>{
    const getData = async() =>{
      try{
        const dataR = await fetch("https://api.nbp.pl/api/cenyzlota/last/30/?format=json")
        const dataJson = await dataR.json()
        setData(dataJson.reverse())
      }catch(err){
        setErr(true)
        console.err("błąd")
      }finally{
        setLoad(false)
      }
    }
    getData()
  },[])



  const dat = data && data.map((item, idx) => 
  {
  if(item[idx+1].cena>item[idx].cena){
    const arrow = <ArrowUp size={60} color="green"/>
  }else{
    const arrow = <ArrowDown size={60} color="red"/>
  }
  }
  )

//  if(prevPrice!=null){
//    const arrow = curPrice > prevPrice ? <ArrowUp size={60} color="green"/> : <ArrowDown size={60} color="red"/>
//  }

  return (
    <>
    <div className="flex flex-row flex-wrap justify-center gap-5">
    <h1>{err && "błąd"}</h1>
    <h1>{load && "ładowanie"}</h1>
    {
      data && data.map((item, idx) => 
        <Card className="border p-6" key={idx}>
          <CardContent>{item.data}</CardContent>    
          <CardContent>{item.cena}</CardContent>
          {arrow}
        </Card>
      )
    }
    </div>  
  </>
  );
}
