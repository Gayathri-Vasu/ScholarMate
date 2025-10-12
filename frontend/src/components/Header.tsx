import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Search, User, MessageSquare, LogOut, GraduationCap } from "lucide-react";
import { categories } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ScholarMate
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/courses?category=${category.slug}`}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition hover:bg-accent hover:text-accent-foreground"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{category.icon}</span>
                                <div>
                                  <div className="text-sm font-medium">{category.name}</div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {category.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className="px-3 py-2 text-sm font-medium hover:text-primary">
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className="px-3 py-2 text-sm font-medium hover:text-primary">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-64 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Auth / Profile */}
           {/* Auth / Profile */}
{!isLoggedIn ? (
  <div className="flex items-center space-x-2">
    <Button variant="ghost" size="sm" asChild>
      <Link to="/login">Login</Link>
    </Button>
    <Button variant="hero" size="sm" asChild>
      <Link to="/register">Sign Up</Link>
    </Button>
  </div>
) : (
  <div className="flex items-center space-x-2">
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="flex items-center space-x-1"
    >
      <Link to="/profile">
        <User className="h-5 w-5" />
        <span>Profile</span>
      </Link>
    </Button>

    <Button
      variant="ghost"
      size="sm"
      asChild
      className="flex items-center space-x-1"
    >
      <Link to="/feedback">
        <MessageSquare className="h-5 w-5" />
        <span>Feedback</span>
      </Link>
    </Button>

    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="flex items-center space-x-1 text-red-500"
    >
      <LogOut className="h-5 w-5" />
      <span>Logout</span>
    </Button>
  </div>
)}

          </div>
        </div>
      </div>
    </header>
  );
}
