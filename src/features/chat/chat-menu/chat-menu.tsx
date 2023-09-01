'use client'

import { useState, useEffect } from 'react';
import { Menu, MenuContent, MenuFooter, MenuHeader } from "@/components/menu";
import { FindAllChatThreadForCurrentUser } from "@/features/chat/chat-services/chat-thread-service";
import { ThemeToggle } from "@/features/theme/theme-toggle";
import { MenuItems } from "./menu-items";
import { NewChat } from "./new-chat";
import { ChatThreadModel } from '../chat-services/models';
import { Button } from '@/components/ui/button';

export const ChatMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  //const items = await FindAllChatThreadForCurrentUser();
  const [items, setItems] = useState<ChatThreadModel[]>([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await FindAllChatThreadForCurrentUser();
      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Button size={"icon"} onClick={() => setIsOpen(!isOpen)} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>
      {isOpen ? 
        <Menu>
        <MenuHeader className="justify-end">
            <NewChat />
        </MenuHeader>
        <MenuContent>
          <MenuItems menuItems={isOpen ? items: []} />
        </MenuContent>
        <MenuFooter>
          <div className="flex flex-col gap-3">
            <ThemeToggle />
          </div>
        </MenuFooter>
        </Menu> 
      : ''}
    </div>
  );
};
