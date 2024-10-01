import { Lock } from "lucide-react";
import Image from "next/image";;
const ChatPlaceHolder = () => {
  return (
    <div className="md:w-3/4 w-full bg-gray-secondary flex flex-col items-center justify-center py-10">
      <div className="flex flex-col items-center w-full justify-center py-10 gap-4">
        <Image src={"/opexlogo.png"} alt="Hero" width={100} height={60} />
        {/* <p className='text-3xl font-extralight mt-5 mb-2'>Download WhatsApp for Windows</p> */}
        {/* <p className='w-1/2 text-center text-gray-primary text-sm text-muted-foreground'>
					Make calls, share your screen and get a faster experience when you download the Windows app.
				</p> */}
        <p className="w-1/2 text-center text-gray-primary text-sm text-muted-foreground">
          Make calls, share your screen and experience a seemless communication
          at the work place.
        </p>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-gray-primary text-center text-sm font-bold text-muted-foreground">integrated with AI.</h2>
          <span className="text-gray-primary text-center text-sm text-muted-foreground">Prefix @gpt to your prompt for Ai assistance</span>
		  <span className="text-gray-primary text-center text-sm text-muted-foreground">Prefix @dall_e to your prompt for image generation assistance</span>
        </div>
        {/* <Button className='rounded-full my-5 bg-green-primary hover:bg-green-secondary'>
					Get from Microsoft Store
				</Button> */}
      </div>
      <p className="w-1/2 mt-auto text-center text-gray-primary text-xs text-muted-foreground flex items-center justify-center gap-1">
        <Lock size={10} /> Your personal messages are end-to-end encrypted
      </p>
    </div>
  );
};
export default ChatPlaceHolder;
