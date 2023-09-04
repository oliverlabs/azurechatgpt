'use client'

import { useState } from 'react';

import { ChatMenu } from "@/features/chat/chat-menu/chat-menu";
import { MainMenu } from "@/features/menu/menu";

export const Context = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <MainMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            <ChatMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
