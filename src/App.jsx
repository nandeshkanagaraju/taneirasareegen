import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import { generateSareeModel, upscaleImage } from './services/runwayService';

function App() {
    const [inputImage, setInputImage] = useState(null);
    const [blouseImage, setBlouseImage] = useState(null); // New State for Blouse
    const [outputImage, setOutputImage] = useState(null);
    const [upscaledImage, setUpscaledImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isUpscaling, setIsUpscaling] = useState(false);

    const handleFileUpload = (e, type = 'primary') => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'primary') {
                    setInputImage(reader.result);
                } else if (type === 'secondary') {
                    setBlouseImage(reader.result);
                }

                // Only reset output if primary image changes? Or both?
                // Probably safety to reset if either changes to avoid stale output
                setOutputImage(null);
                setUpscaledImage(null);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = ''; // Reset input
    };

    const handleGenerate = async (dressType) => {
        if (!inputImage) return;

        // Validation for dual upload types
        if ((dressType.startsWith('saree') || dressType === 'draped_saree') && !blouseImage) {
            alert("Please upload both Saree and Blouse images.");
            return;
        }

        setLoading(true);
        setUpscaledImage(null);
        try {
            // Pass blouseImage as secondary if available
            const result = await generateSareeModel(inputImage, dressType, blouseImage);
            setOutputImage(result);
        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpscale = async () => {
        if (!outputImage) return;
        setIsUpscaling(true);
        try {
            const result = await upscaleImage(outputImage);
            setUpscaledImage(result);
        } catch (err) {
            alert("Upscale Error: " + err.message);
        } finally {
            setIsUpscaling(false);
        }
    };

    return (
        <div className="flex h-screen bg-black text-zinc-100 font-sans antialiased overflow-hidden">
            <Sidebar
                onUpload={handleFileUpload}
                onGenerate={handleGenerate}
                onUpscale={handleUpscale}
                hasImage={!!inputImage}
                hasBlouse={!!blouseImage}
                hasOutput={!!outputImage}
                hasUpscale={!!upscaledImage}
                loading={loading || isUpscaling}
            />

            <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
                <Header />
                <main className="flex-1 p-4 bg-[#080808] overflow-hidden">
                    <Canvas
                        inputImage={inputImage}
                        outputImage={outputImage}
                        upscaledImage={upscaledImage}
                        loading={loading}
                        isUpscaling={isUpscaling}
                    />
                </main>
            </div>
        </div>
    );
}

export default App;