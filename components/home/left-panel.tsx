"use client";
import { ListFilter, Search, User } from "lucide-react";
import { Input } from "../ui/input";
import ThemeSwitch from "./theme-switch";
import Conversation from "./conversation";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import UserListDialog from "./user-list-dialog";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useConversationStore } from "@/store/chat-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LeftPanel = () => {
  const router = useRouter(); // Initialize the router
  const { isAuthenticated, isLoading } = useConvexAuth();
  const conversations = useQuery(
    api.conversations.getMyConversations,
    isAuthenticated ? undefined : "skip"
  );

  // Redirect to sign-in if not authenticated and no conversations
  useEffect(() => {
    if (!isAuthenticated && conversations?.length === 0) {
      router.push("/sign-in"); // Redirect to sign-in page
    }
  }, [isAuthenticated, conversations, router]);

  // const conversations = [];
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();
  useEffect(() => {
    const conversationIds = conversations?.map(
      (conversation) => conversation._id
    );
    if (
      selectedConversation &&
      conversationIds &&
      !conversationIds.includes(selectedConversation._id)
    ) {
      setSelectedConversation(null);
    }
  }, [conversations, selectedConversation, setSelectedConversation]);

  if (isLoading) return <SkeletonLoader/>;
  return (
    <>
    
    <div className="md:w-1/4 w-full border-gray-600 border-r z-30 bg-white dark:bg-left-panel">
      <div className="sticky top-0 bg-left-panel z-30">
        {/* Header */}
        <div className="flex justify-between bg-gray-primary p-3 items-center">
          {/* <SignedOut>
            <Link href={"/sign-in"}>
              <User size={24} />
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          <UserButton />
          <div className="flex items-center gap-3">
            {isAuthenticated && <UserListDialog />}
            <ThemeSwitch />
            {/* <LogOut size={20} className="cursor-pointer" /> */}
          </div>
        </div>
        <div className="p-3 flex items-center">
          {/* Search */}
          <div className="relative h-10 mx-3 flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search or start a new chat"
              className="pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent"
            />
          </div>
          <ListFilter className="cursor-pointer" />
        </div>
      </div>

      {/* Chat List */}
      <div className="my-3 flex flex-col gap-0 max-h-[80%] overflow-auto">
        {/* Conversations will go here*/}
        {conversations?.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))}
        {conversations?.length === 0 && (
          <>
            <p className="text-center text-gray-500 text-sm mt-3">
              No conversations yet
            </p>
            <p className="text-center text-gray-500 text-sm mt-3 ">
              We understand {"you're"} an introvert, but {"you've"} got to start
              somewhere 😊
            </p>
          </>
        )}
      </div>
    </div>
   
    </>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="md:w-1/4 w-full border-gray-600 border-r z-30 bg-white dark:bg-left-panel">
      <div className="sticky top-0 bg-left-panel z-30">
        {/* Skeleton Header */}
        <div className="flex justify-between bg-gray-primary p-3 items-center">
          {/* Skeleton for User Icon */}
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />

          {/* Skeleton for User Buttons */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Skeleton Search */}
        <div className="p-3 flex items-center">
          <div className="relative h-10 mx-3 flex-1">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-300 rounded animate-pulse" />
            <div className="h-10 w-full rounded bg-gray-300 animate-pulse" />
          </div>
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Skeleton Chat List */}
      <div className="my-3 flex flex-col gap-3 max-h-[80%] overflow-auto">
        {/* Repeat these for loading skeletons */}
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse mx-3"></div>
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse mx-3"></div>
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse mx-3"></div>
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse mx-3"></div>
      </div>
    </div>
  );
};
export default LeftPanel;
