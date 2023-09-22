"use client";
import { MenuItem } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { SoftDeleteChatThreadByID, userUpdateThreadTitle } from "@/features/chat/chat-services/chat-thread-service";
import { FileText, MessageCircle, Trash, PenSquare, Navigation } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { ChatThreadModel } from "../chat-services/models";

interface RProp {
  menuItems: Array<ChatThreadModel>;
  refresh: () => void
}

export const MenuItems: FC<RProp> = (props) => {
  const { id } = useParams();
  const router = useRouter();

  const sendData = async (threadID: string) => {
    await SoftDeleteChatThreadByID(threadID);
    router.refresh();
    router.replace("/chat");
  };

  const renameTitle = async (threadID: string, title: string) => {
    await userUpdateThreadTitle(threadID, title);
    props.refresh()
  };

  return (
    <>
      {props.menuItems.map((thread) => (
        <MenuItem
          href={"/chat/" + thread.id}
          isSelected={id === thread.id}
          key={thread.id}
          className="justify-between group/item"
        >
          {thread.chatType === "data" ? (
            <FileText
              size={16}
              className={id === thread.id ? " text-brand" : ""}
            />
          ) : (
            <MessageCircle
              size={16}
              className={id === thread.id ? " text-brand" : ""}
            />
          )}

          <span className="flex gap-2 items-center overflow-hidden flex-1">
            <span className="overflow-ellipsis truncate"> {thread.name}</span>
          </span>
          <Button
            className="invisible  group-hover/item:visible"
            size={"sm"}
            variant={"ghost"}
            onClick={async (e) => {
              e.preventDefault();
              const threadTitle = prompt("Enter the thread title", thread.name);
              if (threadTitle) {
                await renameTitle(thread.id, threadTitle);
              }
            }}
          >
            <PenSquare size={16} />
          </Button>
          <Button
            className="invisible  group-hover/item:visible hover:text-brand"
            size={"sm"}
            variant={"ghost"}
            onClick={async (e) => {
              e.preventDefault();
              const yesDelete = confirm(
                "Are you sure you want to delete this chat?"
              );
              if (yesDelete) {
                await sendData(thread.id);
              }
            }}
          >
            <Trash size={16} />
          </Button>
        </MenuItem>
      ))}
    </>
  );
};
