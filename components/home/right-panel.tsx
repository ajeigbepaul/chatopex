"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, X } from "lucide-react";
import MessageInput from "./message-input";
import MessageContainer from "./message-container";
import ChatPlaceHolder from "@/components/home/chat-placeholder";
import GroupMembersDialog from "./group-members-dialog";
import { useConversationStore } from "@/store/chat-store";
import { useConvexAuth } from "convex/react";

const RightPanel = () => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();
  const { isLoading } = useConvexAuth();
  if (isLoading) return <SkeletonLoader/>;
  if (!selectedConversation) return <ChatPlaceHolder />;

  const conversationName =
    selectedConversation.groupName || selectedConversation.name;
  const conversationImage =
    selectedConversation.groupImage || selectedConversation.image;

  return (
    <div className="w-3/4 flex flex-col">
      <div className="w-full sticky top-0 z-50">
        {/* Header */}
        <div className="flex justify-between bg-white p-3">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage
                src={conversationImage || "/placeholder.png"}
                className="object-cover"
              />
              <AvatarFallback>
                <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>{conversationName}</p>
              {selectedConversation.isGroup && (
                <GroupMembersDialog
                  selectedConversation={selectedConversation}
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-7 mr-5">
            <a href="/video-call" target="_blank">
              <Video size={23} />
            </a>
            <X
              size={16}
              className="cursor-pointer"
              onClick={() => setSelectedConversation(null)}
            />
          </div>
        </div>
      </div>
      {/* CHAT MESSAGES */}
      <MessageContainer />

      {/* INPUT */}
      <MessageInput />
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="w-3/4 flex flex-col bg-white dark:bg-gray-800">
      <div className="w-full sticky top-0 z-50">
        {/* Skeleton Header */}
        <div className="flex justify-between bg-white dark:bg-gray-800 p-3">
          <div className="flex gap-3 items-center">
            {/* Skeleton Avatar */}
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
            <div className="flex flex-col gap-1">
              {/* Skeleton for conversation name */}
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
              {/* Skeleton for group members (if applicable) */}
              <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-7 mr-5">
            {/* Skeleton for Video call icon */}
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
            {/* Skeleton for close icon */}
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Skeleton Chat Messages */}
      <div className="flex-1 p-3 overflow-auto">
        {/* Placeholder messages */}
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="my-2 w-2/3 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
      </div>

      {/* Skeleton Input */}
      <div className="p-3">
        <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};
export default RightPanel;
