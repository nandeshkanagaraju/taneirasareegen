import React from 'react';
import { Loader2, Sparkles, Box, CheckCircle } from 'lucide-react';

const Canvas = ({ inputImage, palluImage, blouseImage, outputImage, upscaledImage, loading, isUpscaling }) => {
    return (
        <div className="flex h-full w-full gap-4 items-stretch">

            {/* 1. INPUT SECTION */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/20 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
                <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">Input Source</span>
                    <span className="text-[9px] font-bold tracking-widest text-zinc-600 uppercase">{[inputImage, palluImage, blouseImage].filter(Boolean).length} / 3</span>
                </div>
                <div className="flex-1 relative p-2 bg-[#050505] overflow-auto">
                    {/* Grid Layout for Multiple Inputs */}
                    <div className="grid grid-rows-3 gap-2 h-full">
                        {/* Row 1: Body */}
                        <div className="relative border border-zinc-800/50 rounded-lg overflow-hidden bg-zinc-900/30">
                            {inputImage ? (
                                <img src={inputImage} className="w-full h-full object-contain" alt="Body" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-[8px] text-zinc-700 uppercase tracking-widest">No Body</div>
                            )}
                            <div className="absolute bottom-1 right-2 text-[8px] font-bold bg-black/50 px-1 rounded text-white/50">BODY</div>
                        </div>

                        {/* Row 2: Pallu */}
                        <div className="relative border border-zinc-800/50 rounded-lg overflow-hidden bg-zinc-900/30">
                            {palluImage ? (
                                <img src={palluImage} className="w-full h-full object-contain" alt="Pallu" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-[8px] text-zinc-700 uppercase tracking-widest">No Pallu</div>
                            )}
                            <div className="absolute bottom-1 right-2 text-[8px] font-bold bg-black/50 px-1 rounded text-white/50">PALLU</div>
                        </div>

                        {/* Row 3: Blouse */}
                        <div className="relative border border-zinc-800/50 rounded-lg overflow-hidden bg-zinc-900/30">
                            {blouseImage ? (
                                <img src={blouseImage} className="w-full h-full object-contain" alt="Blouse" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-[8px] text-zinc-700 uppercase tracking-widest">No Blouse</div>
                            )}
                            <div className="absolute bottom-1 right-2 text-[8px] font-bold bg-black/50 px-1 rounded text-white/50">BLOUSE</div>
                        </div>
                    </div>
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