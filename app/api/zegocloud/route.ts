import { generateToken04 } from "./zegoServerAssistant";

export async function GET(req: Request) {
	const url = new URL(req.url);
	const userID = url.searchParams.get("userID")!;
	const appID = Number(process.env.ZEGO_APP_ID); // Use the appID from .env
	const serverSecret = process.env.ZEGO_SERVER_SECRET!; // Use the serverSecret from .env


	const effectiveTimeInSeconds = 3600;

	const payload = "";

	const token = generateToken04(appID, userID, serverSecret, effectiveTimeInSeconds, payload);

	return Response.json({ token, appID });}
