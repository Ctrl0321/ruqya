'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';


const ChatContext = createContext(undefined);

export const ChatProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    // const [otherUserData, setOtherUserData] = useState(null);

    return (
        <ChatContext.Provider value={{
            isOpen,
            setIsOpen,
            userId,
            setUserId,
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};