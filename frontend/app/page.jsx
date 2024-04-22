import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-36">
      <div className="w-full flex justify-between bg-slate-200 p-6">
        <h1 className="text-4xl content-center">Product List</h1>
        <div className="flex gap-6">
          <button className="flex w-60 h-16 items-center justify-center rounded-xl bg-green-400 text-xl font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">Add</button>
          <button className="flex w-60 h-16 items-center justify-center rounded-xl bg-red-400 text-xl font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">Mass Delete</button>
        </div>
      </div>
    </main>
  );
}
