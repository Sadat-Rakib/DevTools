import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

const slugs = [
    "react", "typescript", "javascript", "github", "visualstudiocode",
    "supabase", "tailwindcss", "nodejs", "vite", "vercel", "npm", "yarn"
];

const useIcons = (slugs: string[]) => {
    const [icons, setIcons] = useState<React.ReactNode[] | null>(null);
    useEffect(() => {
        fetchSimpleIcons({ slugs }).then(({ simpleIcons }) => {
            const renderedIcons = Object.values(simpleIcons).map((icon) =>
                renderSimpleIcon({
                    icon,
                    size: 42,
                    aProps: { onClick: (e: any) => e.preventDefault() },
                })
            );
            setIcons(renderedIcons);
        });
    }, [slugs]);
    return icons || <span>Loading icons...</span>;
};

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { signIn, session } = useAuth();
    const navigate = useNavigate();
    const icons = useIcons(slugs);

    useEffect(() => {
        if (session) navigate("/dashboard");
    }, [session, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const { data, error } = await signIn(email, password);
        if (error) {
            setError(error.message);
        } else if (data.user && !data.user.email_confirmed_at) {
            setError("Please confirm your email before logging in. Check your inbox.");
            navigate("/signup");
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="w-full max-w-4xl flex rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-muted/50 p-8 flex items-center justify-center">
                    <Cloud>{icons}</Cloud>
                </div>
                <div className="flex-1 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">Login to DevTools</h2>
                    {error && <p className="text-destructive mb-4 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Don't have an account? <NavLink to="/signup" className="text-primary hover:underline">Sign up</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}