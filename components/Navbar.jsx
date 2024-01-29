import Link from "next/link";

export default function Navbar () {
    return (
        <div className="flex w-full p-3 justify-center gap-14 bg-white">
            <Link href="/">
                <div className="bg-purple-600 px-4 py-2 rounded-sm shadow-md shadow-purple-400">
                    <h1 className="text-lg text-white font-bold">Home</h1>
                </div>
            </Link>
            <Link href="/uploads">
                <div className="bg-purple-600 px-4 py-2 rounded-sm shadow-md shadow-purple-400">
                    <h1 className="text-lg text-white font-bold">Uploads</h1>
                </div>
            </Link>
            <Link href="/dataframes">
                <div className="bg-purple-600 px-4 py-2 rounded-sm shadow-md shadow-purple-400">
                    <h1 className="text-lg text-white font-bold">Datasets</h1>
                </div>
            </Link>
            <Link href="/thesaurus">
                <div className="bg-purple-600 px-4 py-2 rounded-sm shadow-md shadow-purple-400">
                    <h1 className="text-lg text-white font-bold">Thesaurus</h1>
                </div>
            </Link>
            <Link href="/networks">
                <div className="bg-purple-600 px-4 py-2 rounded-sm shadow-md shadow-purple-400">
                    <h1 className="text-lg text-white font-bold">Redes</h1>
                </div>
            </Link>
        </div>
    )
}