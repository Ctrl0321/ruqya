"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {Home, Users, Settings, DollarSign, Calendar, BookOpen,LogOut } from "lucide-react";
import { LogoutConfirmDialog } from './LogOutConfirmDialog'
import {usePathname} from "next/navigation";


const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: BookOpen, label: 'Rakis', href: '/admin/rakis' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Calendar, label: 'Availability', href: '/admin/availability' },
  { icon: Calendar, label: 'Sessions', href: '/admin/classes' },
  { icon: DollarSign, label: 'Revenue', href: '/admin/revenue' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const pathname = usePathname();

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true)
  }

  return (
      <>
        <motion.div
            className="bg-primary-200 text-white h-full "
            initial={{width: collapsed ? 64 : 200}}
            animate={{width: collapsed ? 64 : 200}}
            transition={{duration: 0.3}}
        >
          <div className="mt-4 p0  w-150 h-12 flex items-center justify-center">
            <div className="bg-primary-200 w-12 h-12 flex items-center justify-center custom-box ">
              <motion.img
                  src="/images/logo2.png"
                  alt="Logo"
                  className="custom-logo "
                  animate={{rotate: collapsed ? 360 : 0}}
                  transition={{duration: 0.5}}/>
            </div>

          </div>
          {/*<div className="mt-4 w-150 h-12 flex items-center justify-center">*/}
          {/*  <div className="bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">*/}
          {/*    <motion.img*/}
          {/*        src="/images/logo.png"*/}
          {/*        alt="Logo"*/}
          {/*        className="custom-logo w-full h-full"*/}
          {/*        animate={{rotate: collapsed ? 360 : 0}}*/}
          {/*        transition={{duration: 0.5}}*/}
          {/*    />*/}
          {/*  </div>*/}

          <nav className="mt-8">
            <ul>
              {menuItems.map((item, index) => (
                  <li key={item.label} className="mb-2">
                    <Link href={item.href}>
                      <motion.div
                          // className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-100 transition-colors duration-200"
                          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                              pathname === item.href ? "bg-primary-100" : "hover:bg-primary-100"
                          }`}
                          onHoverStart={() => setHoveredIndex(index)}
                          onHoverEnd={() => setHoveredIndex(null)}
                      >
                        <item.icon className="w-5 h-5 mr-3"/>
                        {!collapsed && <span>{item.label}</span>}
                        {collapsed && hoveredIndex === index && (
                            <motion.div
                                className="absolute left-16 bg-primary-200 text-white px-2 py-1 rounded z-50"
                                initial={{opacity: 0, x: -10}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.2}}
                            >
                              {item.label}
                            </motion.div>
                        )}
                      </motion.div>
                    </Link>
                  </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-10 left-1">
            <button
                onClick={handleLogoutClick}
                className="flex items-center w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-600 transition-colors duration-200"
                onMouseEnter={() => setHoveredIndex(menuItems.length)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
              <LogOut className="w-5 h-5 mr-3"/>
              {!collapsed && <span>Logout</span>}
              {collapsed && hoveredIndex === menuItems.length && (
                  <motion.div
                      className="absolute left-16 bg-red-600 text-white px-2 py-1 rounded custom-shadow"
                      initial={{opacity: 0, x: -10}}
                      animate={{opacity: 1, x: 0}}
                      transition={{duration: 0.2}}
                  >
                    Logout
                  </motion.div>
              )}
            </button>
          </div>
        </motion.div>
        <LogoutConfirmDialog
            isOpen={isLogoutDialogOpen}
            onClose={() => setIsLogoutDialogOpen(false)}/></>
  );
}
