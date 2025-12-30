// src/services/runwayService_enhanced.js

const API_BASE = "/runway-api";
const RUNWAY_VERSION = "2024-11-06";
const API_KEY = import.meta.env.VITE_RUNWAY_API_KEY;

const PROMPT_MAP = {
    'saree_gen': `
    GOAL: Photorealistic saree generation with ZERO hallucination using exact texture transfer.

INPUT TEXTURES:
1) Saree Body texture (main fabric + pleats)
2) Pallu texture (shoulder drape only)
3) Blouse texture (fitted blouse)

STRICT RULES:
• Pixel-accurate texture transfer only. NO invention, blending, recoloring, pattern change, or enhancement.
• Preserve original weave, borders, motifs, sheen, folds, and fabric physics exactly as provided.
• This is texture inpainting, NOT creative generation.

MAPPING:
• Saree body → Texture 1
• Pallu → Texture 2 (seamless transition, same fabric continuity)
• Blouse → Texture 3

STYLE:
Traditional Indian Nivi drape on a professional Indian female model.
Studio setup, clean editorial look.
Plain white background, neutral high-key lighting.
Ultra-realistic, fashion photography quality.
`,
    'kurta_set': `
        TASK: High-Fidelity Kurta Set Virtual Try-On.
        INPUT: Reference image contains a Kurta, Bottom (Pants/Palazzo), and Dupatta on a mannequin.
        OUTPUT: Professional Indian Woman model wearing the EXACT SAME garment set.

        STRICT REPLICATION RULES:
        1. TEXTURE MAPPING: Transfer the identical fabric texture, print, and embroidery patterns (e.g., yoke, sleeves, hem) across all three components (Kurta, Bottom, Dupatta).
        2. FIT & SILHOUETTE: Replicate the exact length, cut (e.g., A-line, straight, Anarkali), and fit of the Kurta and Bottom.
        3. DUPATTA PLACEMENT: The Dupatta's fabric, border, and design must be 100% identical and styled in a graceful, natural drape over the model's shoulder.
        4. MODEL: Replace mannequin with a high-fashion Indian model. Ensure the model's posture showcases the garment's fall and movement.
        5. QUALITY: Studio lighting, 8k, photorealistic, sharp details on thread work and garment structure.
    `,
    'kurta_set_no_dupatta': `
        TASK: High-Fidelity Kurta and Bottom Set Virtual Try-On (No Dupatta).
        INPUT: Reference image contains a Kurta and Bottom (Pants/Palazzo) on a mannequin.
        OUTPUT: Professional Indian Woman model wearing the EXACT SAME garment set.

        STRICT REPLICATION RULES:
        1. TEXTURE MAPPING: Transfer the identical fabric texture, print, and embroidery patterns (e.g., yoke, sleeves, hem) across both components (Kurta and Bottom).
        2. FIT & SILHOUETTE: Replicate the exact length, cut (e.g., A-line, straight, Anarkali), and fit of the Kurta and Bottom.
        3. ACCESSORIES: DO NOT generate a dupatta or any other large accessory. The focus is solely on the Kurta and Bottom.
        4. MODEL: Replace mannequin with a high-fashion Indian model. Ensure the model's posture showcases the garment's fall and movement.
        5. QUALITY: Studio lighting, 8k, photorealistic, sharp details on thread work and garment structure.
    `,
    'short_top': `
        TASK: High-Fidelity Short Top/Tunic Virtual Try-On.
        INPUT: Reference image contains a Short Top or Tunic on a mannequin.
        OUTPUT: Professional Indian Woman model wearing the EXACT SAME garment.

        STRICT REPLICATION RULES:
        1. TEXTURE MAPPING: Transfer the identical fabric texture, print, and any surface embellishments (e.g., sequins, beads) from the reference.
        2. FIT & LENGTH: Replicate the exact fit (e.g., loose, fitted, cropped) and length of the top. Ensure the hemline is identical.
        3. STYLING: The top must be paired with simple, complementary bottoms (e.g., jeans, leggings) that do not distract from the main garment.
        4. MODEL: Replace mannequin with a contemporary Indian model. Focus on a casual, stylish pose.
        5. QUALITY: Modern, bright lighting, 8k, photorealistic, emphasizing the garment's drape and contemporary appeal.
    `,
    'lehenga': `
        TASK: High-Fidelity Lehenga Set Virtual Try-On.
        INPUT: Reference image contains a Lehenga Skirt, Choli (Blouse), and Dupatta on a mannequin.
        OUTPUT: Professional Indian Woman model wearing the EXACT SAME garment set.

        STRICT REPLICATION RULES:
        1. TEXTURE MAPPING: Transfer the identical heavy fabric texture, intricate embroidery (e.g., Zari, Gota Patti), and embellishments across all three components.
        2. CHOLI & SKIRT LOCK: The Choli design, fit, and the volume/flare of the Lehenga skirt must be 100% identical to the reference.
        3. DUPATTA DRAPE: The Dupatta's fabric, border, and design must be 100% identical and styled in a grand, traditional drape (e.g., over the head or across the body).
        4. MODEL: Replace mannequin with a high-fashion Indian model with an elegant, festive pose.
        5. QUALITY: Rich, warm studio lighting, 8k, photorealistic, sharp details on every sequin and thread of the heavy bridal/festive wear.
    `,
    'unstitched_suit': `
        TASK: High-Fidelity Unstitched Suit Material Visualization.
        INPUT: Reference image contains the unstitched fabric pieces (Kurta, Bottom, Dupatta material) laid out.
        OUTPUT: Professional Indian Woman model wearing the garment *as if it were stitched* from the EXACT SAME material.

        STRICT REPLICATION RULES:
        1. TEXTURE MAPPING: Transfer the identical fabric texture, print, and embroidery placement from the unstitched material onto the *stitched* garment.
        2. STITCHING STYLE: The final stitched garment should be a classic Salwar Kameez or Churidar set, ensuring the material's design elements are correctly positioned (e.g., neck patch, border on hem).
        3. DUPATTA: The Dupatta must be draped naturally, showcasing its full design and border.
        4. MODEL: Replace mannequin/lay-flat with a professional Indian model.
        5. QUALITY: Clean, well-lit studio environment, 8k, photorealistic, emphasizing the potential of the fabric when stitched.
    `,
    'blouse': `
        TASK: High-Fidelity Handcrafted Blouse Virtual Try-On.
        INPUT: Reference image contains a Handcrafted Blouse on a mannequin or stand.
        OUTPUT: Professional Indian Woman model wearing the EXACT SAME blouse, paired with a simple, complementary plain saree.

        STRICT REPLICATION RULES:
        1. TEXTURE MAPPING: Transfer the identical fabric texture, intricate hand-embroidery (e.g., Zardozi, Aari), and unique detailing from the reference.
        2. FIT & CUT LOCK: The blouse's exact cut, neck design (front and back), sleeve length, and fit must be 100% identical. Focus on the tailoring precision.
        3. CONTEXT: The blouse must be the central focus. Pair it with a simple, solid-color saree or skirt to highlight the craftsmanship.
        4. MODEL: Replace mannequin with a high-fashion Indian model. Pose should emphasize the back and sleeve detailing.
        5. QUALITY: Macro-level detail, professional studio lighting, 8k, photorealistic, sharp focus on the handcrafted elements and stitching.
    `,
    'default': `
        TASK: Virtual Try-On for Apparel.
        INPUT: Dress/Outfit on a mannequin.
        OUTPUT: Professional fashion model wearing the exact same outfit.
        
        STRICT REPLICATION RULES:
        1. SILHOUETTE: Maintain the exact cut, fit, and length of the garment.
        2. FABRIC: Preserve print patterns, button details, and stitching precisely.
        3. MODEL: Replace mannequin with a human fashion model.
        4. QUALITY: Ultra-realistic textures, studio photography, high resolution.
    `
};

const resizeAndConvertImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            const MAX_SIZE = 1536;
            if (width > height) {
                if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
            } else {
                if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.95));
        };
        img.onerror = () => reject("Could not load image");
        img.src = url;
    });
};

/**
 * @param {string} inputImageBase64
 * @param {string} garmentType
 * @param {string} palluImageBase64 - Optional Pallu (Image 2)
 * @param {string} blouseImageBase64 - Optional Blouse (Image 3)
 */
export async function generateSareeModel(inputImageBase64, garmentType = 'saree_gen', palluImageBase64 = null, blouseImageBase64 = null) {
    if (!API_KEY) throw new Error("API Key missing. Check .env");

    try {
        const processedImage = await resizeAndConvertImage(inputImageBase64);

        let referenceImages = [{ uri: processedImage }];

        // Process Pallu (Image 2)
        if (palluImageBase64) {
            const processedPallu = await resizeAndConvertImage(palluImageBase64);
            referenceImages.push({ uri: processedPallu });
        }

        // Process Blouse (Image 3)
        if (blouseImageBase64) {
            const processedBlouse = await resizeAndConvertImage(blouseImageBase64);
            referenceImages.push({ uri: processedBlouse });
        }

        // --- PRECISE PROMPT LOGIC ---
        // Selects the specific prompt based on garmentType, falling back to 'default' if not found.
        const prompt = PROMPT_MAP[garmentType] || PROMPT_MAP['default'];

        console.log(`Starting ${garmentType} generation task...`);

        const response = await fetch(`${API_BASE}/v1/text_to_image`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "X-Runway-Version": RUNWAY_VERSION,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gemini_2.5_flash",
                promptText: prompt,
                referenceImages: referenceImages,
                ratio: "768:1344",
                seed: Math.floor(Math.random() * 1000000)
            })
        });

        if (!response.ok) {
            const err = await response.json();
            console.error("Runway API Error Details:", JSON.stringify(err, null, 2));
            throw new Error(`API Error: ${err.message || JSON.stringify(err) || 'Validation Failed'}`);
        }

        const data = await response.json();
        return await pollTask(data.id);

    } catch (error) {
        console.error("Service Error:", error);
        throw error;
    }
}

export async function upscaleImage(imageUrl) {
    if (!API_KEY) throw new Error("API Key missing");

    try {
        console.log("Initiating 4K Image Upscale...");

        // Use the official v1 image_upscale endpoint
        const response = await fetch(`${API_BASE}/v1/image_upscale`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "X-Runway-Version": RUNWAY_VERSION,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // The task requires the source image
                image: imageUrl,
                // Some versions of the API use 'upscaleFactor', others 'model'
                model: "upscale_v1",
                upscaleFactor: 4
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Runway Upscale Rejection:", errorData);
            throw new Error(`Upscale Rejected: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        return await pollTask(data.id);
    } catch (error) {
        console.error("Upscale Service Error:", error);
        throw error;
    }
}

async function pollTask(taskId) {
    const pollInterval = 3000;
    while (true) {
        const response = await fetch(`${API_BASE}/v1/tasks/${taskId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "X-Runway-Version": RUNWAY_VERSION,
            },
        });
        const data = await response.json();
        console.log(`Status: ${data.status}`);

        if (data.status === "SUCCEEDED") return data.output[0];
        if (data.status === "FAILED") throw new Error("AI Generation failed.");

        await new Promise(r => setTimeout(r, pollInterval));
    }
}
