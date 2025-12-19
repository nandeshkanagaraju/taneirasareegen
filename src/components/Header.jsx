const Header = () => (
    <header className="h-20 px-8 flex items-center justify-between border-b border-zinc-900 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-xs font-medium tracking-widest text-zinc-400">SYSTEM READY: RUNWAY GEN-3 TURBO</span>
        </div>
        <div className="flex gap-6 items-center">
            <button className="text-[11px] font-bold text-zinc-500 hover:text-zinc-100 transition-colors uppercase tracking-widest">Documentation</button>
            <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center text-[10px] font-bold text-black">T</div>
        </div>
    </header>
);

export default Header;