import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative h-screen w-full flex items-center justify-center">
      <div className="absolute size-full">
        <Image
          src="/bgo.png"
          alt="background"
          fill
          className="size-full object-cover blur-[2px]"
        />
      </div>

      {children}
    </main>
  );
}
