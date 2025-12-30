import React, { useState } from 'react';
// Added Zap and Loader2 to the imports
import { Upload, Sparkles, ChevronDown, Maximize2, CheckCircle2, Zap, Loader2 } from 'lucide-react';

const Sidebar = ({ onUpload, onGenerate, onUpscale, hasImage, hasOutput, isUpscaled, loading, hasBlouse, hasPallu }) => {
    // Initial state changed to 'saree_regional' to match the first category ID
    const [selectedType, setSelectedType] = useState('saree_gen');

    const categories = [
        { id: 'saree_gen', name: 'Saree' },
        { id: 'kurta_set', name: 'Kurta Set with Dupatta' },
        { id: 'kurta_set_no_dupatta', name: 'Kurta Set without Dupatta' },
        { id: 'short_top', name: 'Short Top / Tunic' },
        { id: 'lehenga', name: 'Lehenga Choli' },
        { id: 'unstitched_suit', name: 'Unstitched Suit Material' },
        { id: 'blouse', name: 'Handcrafted Blouse' }
    ];

    return (
        <aside className="w-72 bg-[#050505] border-r border-zinc-900 flex flex-col p-6 shadow-2xl">
            <div className="mb-12">
                <h1 className="text-2xl font-serif tracking-tighter text-amber-500">TANEIRA</h1>
                <p className="text-[9px] tracking-[0.4em] text-zinc-600 mt-1 uppercase font-bold">Visual Merchandising</p>
            </div>

            <div className="space-y-8 flex-1">
                {/* Step 1: Dress Type */}
                <div className="space-y-2">
                    <label className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase">Step 1: Dress Type</label>
                    <div className="relative">
                        <select
                            value={selectedType}
                            className="w-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 rounded-lg p-3 outline-none appearance-none cursor-pointer focus:border-amber-500/40"
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 text-zinc-600 pointer-events-none" size={14} />
                    </div>
                </div>

                {/* Step 2: Upload */}
                {/* Step 2: Upload */}
                <div className="space-y-2">
                    <label className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase">Step 2: Upload Source</label>

                    {selectedType === 'saree_gen' ? (
                        <div className="space-y-2">
                            {/* 1. Body Upload */}
                            <label className="flex flex-col items-center justify-center w-full h-20 rounded-lg border border-zinc-800 bg-zinc-900/20 hover:border-amber-500/40 cursor-pointer transition-all group">
                                <Upload className="text-zinc-600 group-hover:text-amber-500 mb-1" size={16} />
                                <span className="text-[9px] font-bold text-zinc-500 uppercase">
                                    {hasImage ? 'Change Saree Body' : '1. Upload Body'}
                                </span>
                                <input type="file" className="hidden" onChange={(e) => onUpload(e, 'primary')} />
                            </label>

                            {/* 2. Pallu Upload */}
                            <label className="flex flex-col items-center justify-center w-full h-20 rounded-lg border border-zinc-800 bg-zinc-900/20 hover:border-amber-500/40 cursor-pointer transition-all group">
                                <Upload className="text-zinc-600 group-hover:text-amber-500 mb-1" size={16} />
                                <span className="text-[9px] font-bold text-zinc-500 uppercase">
                                    {hasPallu ? 'Change Pallu' : '2. Upload Pallu'}
                                </span>
                                <input type="file" className="hidden" onChange={(e) => onUpload(e, 'secondary')} />
                            </label>

                            {/* 3. Blouse Upload */}
                            <label className="flex flex-col items-center justify-center w-full h-20 rounded-lg border border-zinc-800 bg-zinc-900/20 hover:border-amber-500/40 cursor-pointer transition-all group">
                                <Upload className="text-zinc-600 group-hover:text-amber-500 mb-1" size={16} />
                                <span className="text-[9px] font-bold text-zinc-500 uppercase">
                                    {hasBlouse ? 'Change Blouse' : '3. Upload Blouse'}
                                </span>
                                <input type="file" className="hidden" onChange={(e) => onUpload(e, 'tertiary')} />
                            </label>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-28 rounded-lg border border-zinc-800 bg-zinc-900/20 hover:border-amber-500/40 cursor-pointer transition-all group">
                            <Upload className="text-zinc-600 group-hover:text-amber-500 mb-2" size={18} />
                            <span className="text-[9px] font-bold text-zinc-500 uppercase">
                                {hasImage ? 'Change Image' : 'Choose File'}
                            </span>
                            <input type="file" className="hidden" onChange={(e) => onUpload(e, 'primary')} />
                        </label>
                    )}
                </div>

                {/* Step 3: Actions */}
                <div className="space-y-3 pt-6 border-t border-zinc-900">
                    <button
                        onClick={() => onGenerate(selectedType)}
                        disabled={!hasImage ||
                            (selectedType === 'saree_gen' && (!hasPallu || !hasBlouse)) ||
                            loading}
                        className={`w-full py-3.5 rounded-lg font-bold text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all
                        ${(!hasImage ||
                                (selectedType === 'saree_gen' && (!hasPallu || !hasBlouse)) ||
                                loading)
                                ? 'bg-zinc-900 text-zinc-700' : 'bg-amber-600 text-black hover:bg-amber-500 shadow-xl'}`}
                    >
                        {loading && !isUpscaled ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                        Generate Replica
                    </button>

                    {/* Logic updated to use 'isUpscaled' prop correctly */}
                    {hasOutput && (
                        <button
                            onClick={onUpscale}
                            disabled={loading || isUpscaled}
                            className={`w-full py-3.5 rounded-lg font-bold text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 border transition-all
                            ${isUpscaled
                                    ? 'border-blue-900 bg-blue-900/20 text-blue-400'
                                    : 'border-blue-600/30 text-blue-500 hover:bg-blue-600/10 active:scale-95'}`}
                        >
                            {loading && isUpscaled ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : isUpscaled ? (
                                <CheckCircle2 size={14} />
                            ) : (
                                <Sparkles size={14} />
                            )}
                            {isUpscaled ? 'Upscale Complete' : 'Upscale to 4K'}
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-auto text-[8px] text-zinc-700 tracking-[0.3em] uppercase font-bold text-center">
                Proprietary Saree-Match Engine
            </div>
        </aside>
    );
};

export default Sidebar;