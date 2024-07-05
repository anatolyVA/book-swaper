'use client'

import React from 'react'
import {BookTag} from '@/shared/ui/BookTag'
import { BookCarousel } from "./book.carousel"
import {Button} from "@/shared/ui/button";

export const CardDescription = ({}) => {

    const nameDemo : string = 'Дурак(сигма)'
    const descriptionDemo : string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam eum ipsa modi non quam. Amet eveniet id laudantium perferendis?'


    const descriptionSlice : string = descriptionDemo.length >= 50? descriptionDemo.slice(0, 50) + '...' : descriptionDemo
    return(
        <div className="max-w-[15rem] mx-4 rounded-2xl overflow-hidden shadow-lg">
            <BookCarousel/>
            <div className="m-2">
        <div className="mb-2">
            <BookTag value="classic" className="mr-2"/>
        </div>

            <h2 className="font-bold text-xl text-center mb-4">
                {nameDemo}
            </h2>
            <p className="mb-4">
                {descriptionSlice}
            </p>
            <Button className="w-full" onClick={() => alert("otkrivaetsia modalka(skoree vsego eto budet page) /swap")}>
                swap
            </Button>
            </div>
        </div>
    )
}