
export default function Home() {
  return (
    <main className="flex flex-col p-6">
      <div className="text-xl">Hello</div>
      <div>{process.env.TEST_ENV}</div>
    </main>
  );
}
