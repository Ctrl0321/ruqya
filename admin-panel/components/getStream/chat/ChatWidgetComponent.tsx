'use client'

import React, { useState } from 'react';
import { Chat, Channel, ChannelHeader, MessageList, MessageInput, Thread, Window } from "stream-chat-react";
import { useChatClient } from "@/components/getStream/chat/useChatClient";
import { MessageCircle, Minimize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingChatWidget = ({ userId, otherUserId }:{userId:string; otherUserId:string}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const { client, channel,isAdmin,selectChannel ,allChannels} = useChatClient(userId, otherUserId);


    if (!client || !channel) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
                    >
                        <MessageCircle size={24} />
                    </motion.button>
                )}

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            height: isMinimized ? '60px' : '600px',
                            width: isMinimized ? '300px' : '400px'
                        }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
                    >
                        {/* Chat Header */}
                        <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
                            <h3 className="font-semibold">
                                {channel.data?.name || 'Chat Support'}
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="hover:bg-blue-700 p-1 rounded"
                                >
                                    <Minimize2 size={18} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="hover:bg-blue-700 p-1 rounded"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {isAdmin && (
                            <div className="w-64 border-r border-gray-200 overflow-y-auto">
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-4">All Channels</h2>
                                    {allChannels.map((ch) => (
                                        <button
                                            key={ch.id}
                                            onClick={() => selectChannel(ch)}
                                            className={`w-full text-left p-2 rounded mb-2 ${
                                                channel?.id === ch.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            {ch.data?.name || `Chat ${ch.id}`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <AnimatePresence>
                            {!isMinimized && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-1 flex flex-col"
                                >
                                    <Chat client={client}>
                                        <Channel channel={channel}>
                                            <Window>
                                                <ChannelHeader />
                                                <MessageList />
                                                <MessageInput />
                                            </Window>
                                            <Thread />
                                        </Channel>
                                    </Chat>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingChatWidget;