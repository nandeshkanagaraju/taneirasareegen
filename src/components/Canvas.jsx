import React from 'react';
import { Loader2, Sparkles, Box, CheckCircle } from 'lucide-react';

const Canvas = ({ inputImage, outputImage, upscaledImage, loading, isUpscaling }) => {
    return (
        <div className="flex h-full w-full gap-4 items-stretch">

            {/* 1. INPUT SECTION */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/20 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
                <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">Input Source</span>
                </div>
                <div className="flex-1 relative flex items-center justify-center p-2 bg-[#050505]">
                    {inputImage ? (
                        <img src={inputImage} className="max-w-full max-h-full object-contain" alt="Input" />
                    ) : (
                        <p className="text-[8px] text-zinc-700 tracking-[0.4em] uppercase font-serif italic">No Source</p>
                    )}
                </div>
            </div>

            {/* 2. AI GENERATION SECTION */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/20 border border-amber-900/20 rounded-xl overflow-hidden shadow-lg">
                <div className="px-4 py-2 border-b border-amber-900/10 bg-amber-900/5 flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest text-amber-500 uppercase italic">AI Generated</span>
                    {outputImage && <CheckCircle size={10} className="text-amber-500" />}
                </div>
                <div className="flex-1 relative flex items-center justify-center p-2 bg-[#050505]">
                    {loading && !isUpscaling ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="animate-spin text-amber-500" size={24} />
                            <p className="text-[8px] font-bold text-amber-500 tracking-widest uppercase">Synthesizing...</p>
                        </div>
                    ) : outputImage ? (
                        <img src={outputImage} className="max-w-full max-h-full object-contain animate-in fade-in" alt="AI Gen" />
                    ) : (
                        <p className="text-[8px] text-zinc-800 tracking-widest uppercase italic font-bold">Ready</p>
                    )}
                </div>
            </div>

            {/* 3. UPSCALE SECTION (THE NEW SECTION) */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/20 border border-blue-900/20 rounded-xl overflow-hidden shadow-xl border-dashed">
                <div className="px-4 py-2 border-b border-blue-900/10 bg-blue-900/5 flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest text-blue-400 uppercase italic">4K Upscaled</span>
                    <Sparkles size={10} className="text-blue-400" />
                </div>
                <div className="flex-1 relative flex items-center justify-center p-2 bg-[#050505]">
                    {isUpscaling ? (
                        <div className="flex flex-col items-center gap-2">
                            <Sparkles className="animate-pulse text-blue-400" size={24} />
                            <p className="text-[8px] font-bold text-blue-400 tracking-widest uppercase">Enhancing 4K...</p>
                        </div>
                    ) : upscaledImage ? (
                        <img src={upscaledImage} className="max-w-full max-h-full object-contain animate-in zoom-in-95" alt="Upscaled" />
                    ) : (
                        <div className="text-center opacity-10">
                            <Box size={24} className="mx-auto mb-2 text-zinc-500" />
                            <p className="text-[8px] uppercase tracking-widest font-bold">Awaiting Enhancement</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Canvas;