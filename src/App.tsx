import YouTubePlayer from "./Components/YouTubePlayer";
function App() {
  return (
    <main className="relative min-h-screen overflow-hidden  text-white">
      <header className="absolute left-4 top-4 z-30 flex items-center gap-2 sm:left-6 sm:top-6 lg:left-10 lg:top-8">
        <img
          src="/assets/retromm-logo.png"
          alt="retroMM logo"
          className="h-12 w-12 object-cover shadow-lg shadow-cyan-950/50 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
        />
        <p className="font-mono text-base font-bold tracking-wider text-cyan-50 drop-shadow sm:text-lg lg:text-2xl">
          retroMM
        </p>
      </header>
      <section className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 to-transparent">
        <img
          src="/assets/retro-tv.png"
          alt="retro TV"
          className="relative z-10 h-auto w-full object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.45)] md:w-[40%] "
        />
        <YouTubePlayer videoId={"83C3TZ4Zm_o"} />
        <div className="relative w-[70%] h-[8%] rounded-3xl bg-gray-800/50 p-4 text-center text-sm text-gray-300 backdrop-blur-sm md:w-[30%] md:h-[8%] md:bottom-3">
          remote
        </div>
      </section>
    </main>
  );
}

export default App;
