"use client";
import { Laugh, Mic, Send } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import { useConversationStore } from "@/store/chat-store";
import EmojiPicker, { Theme } from "emoji-picker-react";
import useComponentVisible from "@/hook/useComponentVisible";
import MediaDropdown from "./media-dropdown";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
const MessageInput = () => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getImageUrl = useMutation(api.messages.getUrl);
  const sendTextMsg = useMutation(api.messages.sendTextMessage);
  const sendAIMsg = useMutation(api.messages.sendChatGPTMessage);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const [imageURL, setImageUrl] = useState("");
  const [imageLoader, setImageLoader] = useState(false);
  const [imagestorageId, setImageStorageId] = useState("");

  const [msgText, setMsgText] = useState("");
  const { selectedConversation } = useConversationStore();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const me = useQuery(api.users.getMe);

  const handleImage = async (blob: Blob, fileName: string) => {
    setImageLoader(true);
    setImageUrl("");

    try {
      const file = new File([blob], fileName, { type: "image/png" });
      console.log("FILE:", file);
      const uploaded = await startUpload([file]);
      console.log("UPLOADEDFILE:", uploaded);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImageUrl(imageUrl!);
      setImageLoader(false);
      console.log("imageUrl:", imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendTextMsg = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendTextMsg({
        content: msgText,
        conversation: selectedConversation!._id,
        sender: me!._id,
      });

      if (msgText.startsWith("@dall_e")) {
        const prompt = msgText.slice(8).trim(); // Extract the prompt
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }), // Send the message after @dall_e
        });
        if (response.ok) {
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.startsWith("image/")) {
            // Check if the response is an image
            const blob = await response.blob();
            handleImage(blob, `chatopexdalle-${uuidv4()}`);
          } else {
            console.error("Response is not an image");
          }
          await sendAIMsg({
            content: imageURL ?? "/poopenai.png",
            conversation: selectedConversation!._id,
            messageType: "image",
          });
        } else {
          console.error("Failed to generate image");
        }
      } else {
        console.error("Failed to generate image");
      }

      setMsgText("");
    } catch (err: any) {
      toast.error(err.message);
      console.error(err);
    }
  };
  return (
    <div className="bg-gray-primary p-2 flex gap-4 items-center">
      <div className="relative flex gap-2 ml-2">
        {/* EMOJI PICKER WILL GO HERE */}
        <div ref={ref} onClick={() => setIsComponentVisible(true)}>
          {isComponentVisible && (
            <EmojiPicker
              theme={Theme.DARK}
              onEmojiClick={(emojiObject) => {
                setMsgText((prev) => prev + emojiObject.emoji);
              }}
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1rem",
                zIndex: 50,
              }}
            />
          )}
          <Laugh className="text-gray-600 dark:text-gray-400" />
        </div>
        <MediaDropdown />
        {/* <Plus className="text-gray-600 dark:text-gray-400" /> */}
      </div>
      <form className="w-full flex gap-3" onSubmit={handleSendTextMsg}>
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Type a message"
            className="py-2 text-sm w-full rounded-lg shadow-sm bg-gray-tertiary focus-visible:ring-transparent"
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
          />
        </div>
        <div className="mr-4 flex items-center gap-3">
          {msgText.length > 0 ? (
            <Button
              type="submit"
              size={"sm"}
              className="bg-transparent text-foreground hover:bg-transparent"
            >
              <Send />
            </Button>
          ) : (
            <Button
              type="submit"
              size={"sm"}
              className="bg-transparent text-foreground hover:bg-transparent"
            >
              <Mic />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
export default MessageInput;
