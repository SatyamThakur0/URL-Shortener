import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import TypeIt from "typeit-react";

export default function UrlShortener({
    shortURL,
    handleSubmit,
    setLongUrl,
    loading,
    inputRef,
}) {
    return (
        <section className="text-center py-12 b order-2 border-gray-100">
            <h1 className="text-4xl font-bold text-orange-500">
                <TypeIt
                    options={{
                        strings: ["This will be typed!"],
                        speed: -30,
                        waitUntilVisible: true,
                    }}
                >
                    Shorten your{" "}
                    <span className="text-blue-500">loooooong</span> URLs like
                    never before!
                </TypeIt>
            </h1>
            <p className="mt-4 text-lg text-black">
                Copy your long boring url. Paste it below. Then 🔥 You got it,
                right?
            </p>
            <form
                className={`${window.innerWidth<562 && "flex-col items-center"} mt-20 flex justify-center gap-4`}
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    onChange={(e) => setLongUrl(e.target.value)}
                    type="text"
                    ref={inputRef}
                    placeholder="https://yoursite.com/this-is-a-very-large-url-but-boring"
                    className={`${window.innerWidth<562 && "w-full"} w-2/3 p-2 rounded-lg text-black bg-[#f9731650] outline-none placeholder:text-gray-700`}
                />
                {!loading ? (
                    <Button className="bg-orange-500 w-[120px] text-black hover:bg-orange-600">
                        Shorten URL
                    </Button>
                ) : (
                    <Button className="bg-orange-500 w-[120px] text-black hover:bg-orange-600">
                        <Loader className="animate-spin" />
                    </Button>
                )}
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
