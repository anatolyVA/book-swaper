import {CardDescription} from "@/entities/Book/ui/book.card";


export default function CardList ({}) {
    return(
        <div className="flex justify-around">
            <CardDescription/>
            <CardDescription/>
            <CardDescription/>
        </div>
    )
}