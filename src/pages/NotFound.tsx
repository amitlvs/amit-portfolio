import { Link } from "react-router-dom";
import PageMeta from "@/components/common/PageMeta";

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page Not Found" description="" />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1 bg-background text-foreground font-mono">
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h1 className="mb-8 font-black text-primary text-6xl md:text-9xl tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">
            404
          </h1>

          <p className="mt-10 mb-6 text-base text-white/70 sm:text-lg">
            The page may have been deleted or does not exist. Please check the URL is correct.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center border border-white/20 bg-white/5 px-6 py-3 font-bold tracking-tight text-white hover:bg-white/10 hover:text-primary transition-all"
          >
            Back to home
          </Link>
        </div>
        {/* <!-- Footer --> */}
        <p className="absolute text-[10px] text-center text-white/30 bottom-6 left-1/2 -translate-x-1/2">
          &copy; {new Date().getFullYear()} AMIT KUMAR
        </p>
      </div>
    </>
  );
}
