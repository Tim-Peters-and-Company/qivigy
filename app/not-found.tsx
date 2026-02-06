import { Button } from "@/components/ui/button";
import { RightAngleIcon } from "@/components/icons/rightAngle";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center bg-linear-to-b from-[#F6CCBE] from-[0.48%] to-white to-100%">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Page not found.</h1>
      <p className="text-base md:text-2xl">
        We can&apos;t find the page you&apos;re looking for.<br />
        You may have clicked a broken link or entered the wrong URL.
      </p>
      <Button href="/" variant="default" className="mt-8">
        Go to homepage
        <RightAngleIcon className="size-5" />
      </Button>
    </main>
  );
}
