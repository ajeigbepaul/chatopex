import { Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Opexalogo from "@/public/favicon.png"
const ChatPlaceHolder = () => {
	return (
		<div className='w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10'>
			<div className='flex flex-col items-center w-full justify-center py-10 gap-4'>
				<Image src={"/opexlogo.png"} alt='Hero' width={100} height={60}  />
				{/* <p className='text-3xl font-extralight mt-5 mb-2'>Download WhatsApp for Windows</p> */}
				{/* <p className='w-1/2 text-center text-gray-primary text-sm text-muted-foreground'>
					Make calls, share your screen and get a faster experience when you download the Windows app.
				</p> */}
				<p className='w-1/2 text-center text-gray-primary text-sm text-muted-foreground'>
					Make calls, share your screen and experience a seemless communication at the work place.
				</p>
                {/* <div>
					<h2 className="font-medium text-gray-primary text-muted-foreground">Connect to all our platforms</h2>
					<div className="flex items-center space-x-2">
						<Image src={Opexalogo} alt="opexprod" width={50} height={50}/>
					</div>
				</div> */}
				{/* <Button className='rounded-full my-5 bg-green-primary hover:bg-green-secondary'>
					Get from Microsoft Store
				</Button> */}
			</div>
			<p className='w-1/2 mt-auto text-center text-gray-primary text-xs text-muted-foreground flex items-center justify-center gap-1'>
				<Lock size={10} /> Your personal messages are end-to-end encrypted
			</p>
		</div>
	);
};
export default ChatPlaceHolder;