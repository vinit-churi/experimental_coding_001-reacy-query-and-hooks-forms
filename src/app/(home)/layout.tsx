import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[300px_auto]  grid-rows-1 h-screen fixed w-full max-h-screen">
      <nav className="flex py-10  flex-col bg-blue-100 gap-4 px-5 overflow-y-auto min-h-0 max-h-full">
        <h2>React hooks form</h2>
        <Link
          className="w-full rounded-lg h-max py-2 flex items-center justify-center bg-slate-400"
          href="/experimental-form-01"
        >
          experimental-form-01
        </Link>
        <Link
          className="w-full rounded-lg h-max py-2 flex items-center justify-center bg-slate-400"
          href="/experimental-form-02"
        >
          experimental-form-02
        </Link>
        <Link
          className="w-full rounded-lg h-max py-2 flex items-center justify-center bg-slate-400"
          href="/experimental-form-03"
        >
          experimental-form-03
        </Link>
        <Link
          className="w-full rounded-lg h-max py-2 flex items-center justify-center bg-slate-400"
          href="/experimental-form-04"
        >
          experimental-form-04
        </Link>
        <Link
          className="w-full rounded-lg h-max py-2 flex items-center justify-center bg-slate-400"
          href="/experimental-form-05"
        >
          experimental-form-05
        </Link>
        <h2>React query</h2>

        <Link
          className="w-full rounded-lg h-max py-2 flex items-center justify-center bg-slate-400"
          href="/experimental-query-01"
        >
          experimental-query-01
        </Link>
        <Link
          className="w-full rounded-lg h-max py-2 flex items-center justify-center bg-slate-400"
          href="/experimental-query-02"
        >
          experimental-query-02
        </Link>
        <Link
          className="w-full rounded-lg h-max py-2 flex items-center justify-center bg-slate-400"
          href="/experimental-query-03"
        >
          experimental-query-03
        </Link>
        <h2>Dynamic form</h2>
        <Link
          className="w-full rounded-lg h-max py-2 flex items-center justify-center bg-slate-400"
          href="/experimental-dynamic-form-01"
        >
          experimental-dynamic-form-01
        </Link>
        <Link
          className="w-full rounded-lg h-max py-2 flex items-center justify-center bg-slate-400"
          href="/experimental-dynamic-form-02"
        >
          experimental-dynamic-form-02
        </Link>
      </nav>
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
}
