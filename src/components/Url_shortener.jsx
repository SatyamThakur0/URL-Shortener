import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UrlShortener({ shortURL, handleSubmit, setLongUrl }) {
    return (
        <section className="text-center py-12 b order-2 border-gray-100">
            <h1 className="text-4xl font-bold text-orange-500">
                Shorten your <span className="text-blue-500">loooooong</span>{" "}
                URLs like never before!
            </h1>
            <p className="mt-4 text-lg text-black">
                Copy your long boring url. Paste it below. Then 🔥 You got it,
                right?
            </p>
            <form
                className="mt-8 flex justify-center gap-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    onChange={(e) => setLongUrl(e.target.value)}
                    type="text"
                    placeholder="https://yoursite.com/this-is-a-very-large-url-but-boring"
                    className="w-2/3 p-2 rounded-lg text-black bg-[#f9731650]"
                />
                <Button
                    // onClick={(e) => handleSubmit(e)}
                    className="bg-orange-500 text-black"
                >
                    Shorten URL
                </Button>
            </form>
            {shortURL && (
                <div className="mt-10 text-[#f97316] font-semibold">
                    Shorten URL :{" "}
                    <a
                        target="_blank"
                        href={`${shortURL}`}
                        className="cursor-pointer"
                    >
                        {shortURL}
                    </a>
                </div>
            )}
        </section>
    );
}
