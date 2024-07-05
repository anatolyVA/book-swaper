import { ArrowLeftRight } from 'lucide-react';
import { Login } from '@/features/login/login'
import { Search } from '@/features/Search/Search'

export default function Header(){
    return(
        <div className="fixed top-0 right-0 left-0 flex content-center justify-between py-3 px-5 bg-black shadow">
            <div className="flex text-white leading-[2.2rem]">
                <ArrowLeftRight className="mr-2 mt-[0.3rem]"/>
                BookSwaper
            </div>
            <Search/>
            <Login/>
    </div>)
}