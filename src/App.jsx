import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import UrlShortener from "./components/Url_shortener";
import ShortenedUrls from "./components/Shortened_urls";

function App() {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [URL, setURL] = useState([]);

    useEffect(() => {
        setURL(JSON.parse(localStorage.getItem("urls")));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(
                "http://localhost:5000/api/shorten",
                { longUrl }
            );
            response = response.data;

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
                />
                <ShortenedUrls URL={URL} setURL={setURL} />
            </main>
        </div>
    );
}

export default App;
