import { Card, CardContent } from "@/components/ui/card";
import { Clipboard, Link, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
export default function ShortenedUrls({ URL, setURL }) {

    const deleteUrl = (shortUrl) => {
        let updatedURL = URL.filter((url) => url.shortUrl !== shortUrl);
        localStorage.setItem("urls", JSON.stringify(updatedURL));
        setURL(updatedURL);
    };

    return (
        <section className="py-12 bord er-2 border-yellow-700">
            <h2 className="text-3xl font-bold text-center text-blue-500">
                Hoho!
            </h2>
            <p className="text-center mt-2 text-black">
                Here are your shortened URLs! Now start rick-rolling your
                friends 😏
            </p>
            {URL?.length == 0 ? (
                <div className="text-[#f97316] text-5xl flex justify-center m-10">
                    No Records!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {[...URL]?.reverse().map((url, i) => (
                        <Card key={i} className="bg-[#f9731650] p-4">
                            <CardContent>
                                <p className="text-sm truncate break-words">{url.longUrl}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <a
                                        target="_blank"
                                        href={`${url.longUrl}`}
                                        className="text-blue-500"
                                    >
                                        {url.shortUrl}
                                    </a>
                                    <div className="flex m-2 items-center gap-2">
                                        {/* <Link className="cursor-pointer" /> */}
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
