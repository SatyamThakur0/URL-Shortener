import { Card, CardContent } from "@/components/ui/card";
import { Clipboard, Link, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TypeIt from "typeit-react";
export default function ShortenedUrls({ URL, setURL }) {
    const deleteUrl = (shortUrl) => {
        let updatedURL = URL.filter((url) => url.shortUrl !== shortUrl);
        localStorage.setItem("urls", JSON.stringify(updatedURL));
        setURL(updatedURL);
    };

    return (
        <section className="py bord er-2 border-yellow-700">
            <h2 className="text-3xl font-bold text-center text-blue-500">
                Hoho!
            </h2>
            <p className="text-center mt-2 text-black">
                Here are your shortened URLs! Now start rick-rolling your
                friends 😏
            </p>
            {URL?.length == 0 ? (
                <div className="text-[#f97316] text-5xl flex flex-col items-center justify-center m-10">
                    <MdHistory className="text-[100px]" />
                    <TypeIt
                        options={{
                            strings: ["This will be typed!"],
                            speed: -30,
                            waitUntilVisible: true,
                        }}
                    >
                        No Records!
                    </TypeIt>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {[...URL]?.reverse().map((url, i) => (
                        <Card
                            key={i}
                            className="bg-[#f9731650] border-none p-6"
                        >
                            <CardContent className="bor der-2 p-0 border-red-500">
                                <p className="text-sm truncate break-words">
                                    {url.longUrl}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    <a
                                        target="_blank"
                                        href={`${url.longUrl}`}
                                        className="text-blue-500 bord er-2 border-red-500"
                                    >
                                        {url.shortUrl}
                                    </a>
                                    <div className="flex items-center gap-2 bor der-2 border-green-500">
                                        <IoCopy
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    url.shortUrl
                                                );
                                            }}
                                            className="cursor-pointer text-2xl"
                                        />
                                        <MdDelete
                                            onClick={() =>
                                                deleteUrl(url.shortUrl)
                                            }
                                            className="cursor-pointer text-2xl"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}
