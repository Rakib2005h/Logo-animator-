// DOM এলিমেন্ট
const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const animationType = document.getElementById('animation-type');
const canvas = document.getElementById('logo-canvas');
const ctx = canvas.getContext('2d');

// Three.js সেটআপ (3D অ্যানিমেশনের জন্য)
let scene, camera, renderer, logoMesh;

function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(500, 500);
    document.querySelector('.preview-container').appendChild(renderer.domElement);
    
    // বেসিক লাইটিং
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 5;
}

// AI লোগো জেনারেশন (ডেমো ফাংশন)
async function generateLogo() {
    const prompt = promptInput.value;
    if (!prompt) return alert("বর্ণনা লিখুন");
    
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> তৈরি হচ্ছে...';
    
    try {
        // এখানে OpenAI API কল করা যাবে
        // ডেমো হিসেবে আমরা একটি ক্যানভাস ড্রয়িং করব
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 80px Arial";
        ctx.textAlign = "center";
        ctx.fillText("LOGO", 250, 250);
        
        // অ্যানিমেশন শুরু করুন
        applyAnimation();
    } catch (error) {
        console.error("AI জেনারেশন ত্রুটি:", error);
        alert("ত্রুটি হয়েছে! আবার চেষ্টা করুন");
    } finally {
        generateBtn.innerHTML = '<i class="fas fa-robot"></i> জেনারেট করুন';
    }
}

// অ্যানিমেশন অ্যাপ্লাই
function applyAnimation() {
    const type = animationType.value;
    
    if (type === '3d') {
        initThreeJS();
        create3DLogo();
        animate3D();
    } else {
        // 2D অ্যানিমেশন
        canvas.style.animation = `${type} 2s infinite`;
        
        // CSS কীফ্রেম ডাইনামিকভাবে যোগ করা
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 3D লোগো তৈরি
function create3DLogo() {
    const geometry = new THREE.TextGeometry("LOGO", {
        size: 1,
        height: 0.3,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05
    });
    
    const material = new THREE.MeshPhongMaterial({ 
        color: 0xffd700,
        specular: 0x111111,
        shininess: 30
    });
    
    logoMesh = new THREE.Mesh(geometry, material);
    scene.add(logoMesh);
}

// 3D অ্যানিমেশন লুপ
function animate3D() {
    requestAnimationFrame(animate3D);
    logoMesh.rotation.x += 0.01;
    logoMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// ডাউনলোড ফাংশন
function downloadAsset() {
    // CCapture.js দিয়ে GIF/MP4 বানানো যাবে
    alert("ডাউনলোড ফিচারটি সক্রিয় করা হবে!");
}

// ইভেন্ট লিসেনার
generateBtn.addEventListener('click', generateLogo);
downloadBtn.addEventListener('click', downloadAsset);

// ক্যানভাস সাইজ সেট করা
function setupCanvas() {
    canvas.width = 500;
    canvas.height = 500;
}

// ইনিশিয়ালাইজেশন
setupCanvas();
