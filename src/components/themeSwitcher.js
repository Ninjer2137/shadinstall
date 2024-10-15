"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Switch } from "@/components/ui/switch"


export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Switch onCheckedChange={(checked) =>     
    {
        if(checked){
            setTheme("dark")
        }else{
            setTheme("light")
        }
    }
    }/>
  )
}
