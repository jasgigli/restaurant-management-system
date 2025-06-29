/**
 * User Profile Dropdown Component
 * Comprehensive profile management with tabs and enhanced UX
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Globe,
  HelpCircle,
  Key,
  LogOut,
  Mail,
  Moon,
  Settings,
  Shield,
  Sun,
  User,
  UserCheck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/utils";
import { useAuth } from "../../providers/AuthProvider";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export interface UserProfileDropdownProps {
  className?: string;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  className,
}) => {
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-all duration-200 shadow-sm hover:shadow-md border border-border/30",
            className
          )}
        >
          <Avatar
            alt={user?.name || "User"}
            fallback={user?.name?.charAt(0) || "U"}
            size="sm"
            className="ring-2 ring-primary/20"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-foreground">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role || "Unknown"}
            </p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="p-4 border-b border-border/50">
          <DropdownMenuLabel className="font-normal p-0">
            <div className="flex items-center gap-3">
              <Avatar
                alt={user?.name || "User"}
                fallback={user?.name?.charAt(0) || "U"}
                size="md"
                className="ring-2 ring-primary/20"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold leading-none">
                  {user?.name || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground mt-1">
                  {user?.email || "user@example.com"}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {user?.role || "Unknown"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                    Online
                  </Badge>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-0 h-auto bg-transparent border-b border-border/50 rounded-none">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-muted/50 data-[state=active]:text-primary rounded-none border-b-2 data-[state=active]:border-primary border-transparent"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-muted/50 data-[state=active]:text-primary rounded-none border-b-2 data-[state=active]:border-primary border-transparent"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-muted/50 data-[state=active]:text-primary rounded-none border-b-2 data-[state=active]:border-primary border-transparent"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <div className="max-h-96 overflow-y-auto">
            <TabsContent value="profile" className="p-4 space-y-3">
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50">
                  <User className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <span className="font-medium">Edit Profile</span>
                    <p className="text-xs text-muted-foreground">
                      Update your personal information
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50">
                  <Mail className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <span className="font-medium">Email Preferences</span>
                    <p className="text-xs text-muted-foreground">
                      Manage notification settings
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50">
                  <Bell className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <span className="font-medium">Notifications</span>
                    <p className="text-xs text-muted-foreground">
                      Configure alert preferences
                    </p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </TabsContent>

            <TabsContent value="settings" className="p-4 space-y-3">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={toggleTheme}
                  className="cursor-pointer p-3 rounded-lg hover:bg-muted/50"
                >
                  <AnimatePresence mode="wait">
                    {resolvedTheme === "light" ? (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mr-3"
                      >
                        <Moon className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mr-3"
                      >
                        <Sun className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex-1">
                    <span className="font-medium">Theme</span>
                    <p className="text-xs text-muted-foreground">
                      Switch between light and dark mode
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50">
                  <Globe className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <span className="font-medium">Language</span>
                    <p className="text-xs text-muted-foreground">
                      Change interface language
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50">
                  <Zap className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <span className="font-medium">Performance</span>
                    <p className="text-xs text-muted-foreground">
                      Optimize app performance
                    </p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </TabsContent>

            <TabsContent value="security" className="p-4 space-y-3">
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50">
                  <Key className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <span className="font-medium">Change Password</span>
                    <p className="text-xs text-muted-foreground">
                      Update your account password
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50">
                  <Shield className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <span className="font-medium">Two-Factor Auth</span>
                    <p className="text-xs text-muted-foreground">
                      Enable additional security
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50">
                  <UserCheck className="mr-3 h-4 w-4" />
                  <div className="flex-1">
                    <span className="font-medium">Active Sessions</span>
                    <p className="text-xs text-muted-foreground">
                      Manage logged-in devices
                    </p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </TabsContent>
          </div>

          <div className="p-4 border-t border-border/50 space-y-3">
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50">
                <HelpCircle className="mr-3 h-4 w-4" />
                <div className="flex-1">
                  <span className="font-medium">Help & Support</span>
                  <p className="text-xs text-muted-foreground">
                    Get help and contact support
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50">
                <CreditCard className="mr-3 h-4 w-4" />
                <div className="flex-1">
                  <span className="font-medium">Billing</span>
                  <p className="text-xs text-muted-foreground">
                    Manage subscription and billing
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer p-3 rounded-lg hover:bg-destructive/10 text-destructive focus:text-destructive"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <div className="flex-1">
                <span className="font-medium">Sign out</span>
                <p className="text-xs text-muted-foreground">
                  Log out of your account
                </p>
              </div>
            </DropdownMenuItem>
          </div>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
