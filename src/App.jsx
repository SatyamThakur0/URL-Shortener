import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import UrlShortener from "./components/Url_shortener";
import ShortenedUrls from "./components/Shortened_urls";

function App() {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [URL, setURL] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        setURL(JSON.parse(localStorage.getItem("urls")));
    }, []);

    const handleSubmit = async (e) => {
        const backendurl = import.meta.env.VITE_BACKEND_URL;
        e.preventDefault();
        setLoading(true);
        try {
            let response = await axios.post(
                `${backendurl}/api/shorten`,
                {
                    longUrl,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Ensures cookies are sent if required
                }
            );
            response = response.data;
            inputRef.current.value = "";
            setLoading(false);

            if (!localStorage.getItem("urls")) {
                localStorage.setItem("urls", JSON.stringify([]));
            }
            let urls = JSON.parse(localStorage.getItem("urls"));
            urls.push(response);
            localStorage.setItem("urls", JSON.stringify(urls));
            setURL(urls);
            setShortUrl(response.shortUrl);
        } catch (error) {
            console.error("Error shortening URL:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[80vw] justify-cente bor der-2 border-red-700 flex-col bg-background text-foreground min-h-screen">
            <Header />
            <main className="container mx-auto px-4">
                <UrlShortener
                    shortURL={shortUrl}
                    handleSubmit={handleSubmit}
                    setLongUrl={setLongUrl}
                    loading={loading}
                    inputRef={inputRef}
                />
                <ShortenedUrls URL={URL} setURL={setURL} />
            </main>
        </div>
    );
}

export default App;
