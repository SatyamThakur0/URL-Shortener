import { Button } from "@/components/ui/button";
import { FaLink } from "react-icons/fa";
import { toast } from "sonner";

export default function Header() {
    return (
        <header className="text-black flex sticky top-[30px] justify-between items-center mt-[30px] bg-[#f97316] backdrop-blur-sm rounded-xl bord er-2 border-green-700 p-4 bg-background text-foreground">
            <div className="flex items-center gap-2">
                <FaLink className="text-2xl" />
                <div className="text-2xl font-bold">Shorty</div>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-semibold">Hi, Satyam 👋</span>
                <Button
                    onClick={() => {
                        toast.warning("Authentication not implemented yet!");
                    }}
                    variant="outline"
                    className="text-black"
                >
                    Logout
                </Button>
            </div>
        </header>
    );
}
