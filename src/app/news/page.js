"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function News(){
    const [news, setNews] = useState(null)
    const [err, setErr] = useState(false)
    const [load, setLoad] = useState(true)

    useEffect(()=>{
        const getData = async() =>{
          try{
            const NewsData = await fetch("https://newsapi.org/v2/everything?q=Apple&from=2024-10-21&sortBy=popularity&apiKey=95e77173df1a425f9ab668626433be27")
            const NewsDataJson = await NewsData.json()
            setNews(NewsDataJson.articles)
            console.log(NewsDataJson)
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
        <div className="flex flex-row flex-wrap m-10">
            <h1>{err && "błąd podczas ładowania"}</h1>
            <h1>{load && "ładowanie"}</h1>
            {news && news.map((item, idx) => (
                <Card key={idx} className="w-[600px] h-auto flex flex-col">
                <CardContent className="flex flex-wrap flex-col justify-center items-center flex-grow">
                    {item.urlToImage ? <Image src={item.urlToImage} width={500} height={500} alt="News Image" className="h-[300px] w-[500px]"/> : <span className="bg-gray-500 h-[300px] w-[500px] flex items-center justify-center">No Image</span>}
                    <h1 className="font-bold">{item.title}</h1>
                    <h1>{item.description}</h1>
                </CardContent>
                <CardFooter className="flex justify-end mt-auto">
                    <Button asChild>
                    <Link href={item.url}>Więcej</Link>
                    </Button>
                </CardFooter>
                </Card>
            ))}
        </div>
    )
}