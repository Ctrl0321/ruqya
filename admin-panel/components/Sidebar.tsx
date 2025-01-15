"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {Home, Users, Settings, HelpCircle, LogOut, DollarSign, Calendar, BookOpen} from "lucide-react";


const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: BookOpen, label: 'Tutors', href: '/admin/tutors' },
  { icon: Calendar, label: 'Classes', href: '/admin/classes' },
  { icon: DollarSign, label: 'Revenue', href: '/admin/revenue' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
      <motion.div
          className="bg-primary-200 text-white h-full "
          initial={{width: collapsed ? 64 : 200}}
          animate={{width: collapsed ? 64 : 200}}
          transition={{duration: 0.3}}
      >
        <div className="mt-4 w-150 h-12 flex items-center justify-center">
          <div className="bg-primary-50 rounded-full  w-12 h-12 flex items-center justify-center ">
            <motion.img
                src="/images/logo.png"
                alt="Logo"
                className=" custom-logo rounded-full"
                animate={{rotate: collapsed ? 360 : 0}}
                transition={{duration: 0.5}}
            />
          </div>

        </div>
        <nav className="mt-8">
          <ul>
            {menuItems.map((item, index) => (
                <li key={item.label} className="mb-2">
                  <Link href={item.href}>
                  <motion.div
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-100 transition-colors duration-200"
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                    >
                      <item.icon className="w-5 h-5 mr-3"/>
                      {!collapsed && <span>{item.label}</span>}
                      {collapsed && hoveredIndex === index && (
                          <motion.div
                              className="absolute left-16 bg-primary-200 text-white px-2 py-1 rounded"
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
      </motion.div>
  );
}
