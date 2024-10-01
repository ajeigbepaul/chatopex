// import { randomID } from "@/lib/utils";
// import { useClerk } from "@clerk/nextjs";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// export function getUrlParams(url = window.location.href) {
// 	let urlStr = url.split("?")[1];
// 	return new URLSearchParams(urlStr);
// }

// export default function VideoUIKit() {
// 	const roomID = getUrlParams().get("roomID") || randomID(5);
// 	const { user } = useClerk();

// 	let myMeeting = (element: HTMLDivElement) => {
// 		const initMeeting = async () => {
// 			const res = await fetch(`/api/zegocloud?userID=${user?.id}`);
// 			if (!res.ok) {
//                 console.error("Failed to fetch:", res.statusText);
//                 return; // Exit if the response is not okay
//             }
//             // const { token, appID } = await res.json();
//             const { token, appID } = await res.json().catch(err => {
//                 console.error("Failed to parse JSON:", err);
//                 return {}; // Return an empty object or handle as needed
//             });
// 			const username = user?.fullName || user?.emailAddresses[0].emailAddress.split("@")[0];

// 			const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, token, roomID, user?.id!, username);

// 			const zp = ZegoUIKitPrebuilt.create(kitToken);
// 			zp.joinRoom({
// 				container: element,
// 				sharedLinks: [
// 					{
// 						name: "Personal link",
// 						url:
// 							window.location.protocol +
// 							"//" +
// 							window.location.host +
// 							window.location.pathname +
// 							"?roomID=" +
// 							roomID,
// 					},
// 				],
// 				scenario: {
// 					mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
// 				},
// 			});
// 		};
// 		initMeeting();
// 	};

// 	return <div className='myCallContainer' ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>;
// }
import { randomID } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";



export function getUrlParams(url = window.location.href) {
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

// const appID = +process.env.NEXT_PUBLIC_ZEGO_APP_ID!;
// const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;

export default function VideoUIKit() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const { user } = useClerk();
  const myMeeting = (element: HTMLDivElement) => {
    // generate Kit Token
    // const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
    //   appID,
    //   token,
    //   roomID,
    //   user?.id!,
    //   username
    // );
    // const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    // 	appID,
    // 	serverSecret,
    // 	roomID,
    // 	randomID(5),
    // 	randomID(5)
    // );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp.joinRoom({
//       container: element,
//       sharedLinks: [
//         {
//           name: "Personal link",
//           url:
//             window.location.protocol +
//             "//" +
//             window.location.host +
//             window.location.pathname +
//             "?roomID=" +
//             roomID,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
//       },
//     });
//   };
const initMeeting = async () => {
    const res = await fetch(`/api/zegocloud?userID=${user?.id}`);
    const { token, appID } = await res.json();
    console.log(res)

    const username = user?.fullName || user?.emailAddresses[0].emailAddress.split("@")[0];

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, token, roomID, user?.id!, username);

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
        container: element,
        sharedLinks: [
            {
                name: "Personal link",
                url:
                    window.location.protocol +
                    "//" +
                    window.location.host +
                    window.location.pathname +
                    "?roomID=" +
                    roomID,
            },
        ],
        scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
    });
};
initMeeting();
};

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
