import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { saveAs } from 'file-saver';

const HandModelViewer = () => {
  const containerRef = useRef(null);
  const objectsRef = useRef({});
  const handModelRef = useRef(null);
  const maxScaleFactor = 75;
  const currentScaleFactorRef = useRef(1.0);

  const designImages = {
    Hand001: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand002: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand003: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand004: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand005: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand006: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand007: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand008: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand009: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand010: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand011: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand012: ["a.png", "b.png", "c.png", "d.png", "e.png"],
  };

  const displayNames = {
    Hand001: "Thumb",
    Hand002: "Index Finger",
    Hand003: "Middle Finger",
    Hand004: "Ring Finger",
    Hand005: "Little Finger",
    Hand006: "Palm Top",
    Hand007: "Palm Bottom",
    Hand008: "Back of Thumb",
    Hand009: "Back of Index Finger",
    Hand010: "Back of Middle Finger",
    Hand011: "Back of Ring Finger",
    Hand012: "Back of Little Finger",
  };

  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, controls;
    const objects = objectsRef.current;

    const init = () => {
      scene = new THREE.Scene();
      sceneRef.current = scene;

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 40);
      cameraRef.current = camera;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      controls = new OrbitControls(camera, renderer.domElement);

      const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
      frontLight.position.set(0, 0, 10).normalize();
      scene.add(frontLight);

      const backLight1 = new THREE.DirectionalLight(0xffffff, 1);
      backLight1.position.set(5, 5, -5).normalize();
      scene.add(backLight1);

      const backLight2 = new THREE.DirectionalLight(0xffffff, 1);
      backLight2.position.set(-5, 5, -5).normalize();
      scene.add(backLight2);

      const ambientLight = new THREE.AmbientLight(0x404040, 1);
      scene.add(ambientLight);

      loadHandModel("/models/handModel4.glb");

      window.addEventListener("resize", onWindowResize, false);
    };

    const loadHandModel = (url) => {
      const loader = new GLTFLoader();
      loader.load(
        url,
        (gltf) => {
          if (handModelRef.current) {
            scene.remove(handModelRef.current);
          }
          const handModel = gltf.scene;
          handModel.scale.set(
            maxScaleFactor * currentScaleFactorRef.current,
            maxScaleFactor * currentScaleFactorRef.current,
            maxScaleFactor * currentScaleFactorRef.current
          );

          const material = new THREE.MeshStandardMaterial({
            color: 0xFF8C00, // Orange color
            emissive: 0xFF4000,
            side: THREE.DoubleSide,
            emissiveIntensity: 0.3,
          });
          handModel.traverse((child) => {
            if (child.isMesh) {
              child.material = material;
              objects[child.name] = child;
              console.log(`Stored reference to ${child.name}`);
            }
          });

          scene.add(handModel);
          handModel.position.y = -20;
          handModelRef.current = handModel;
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.error("Error loading the model:", error);
          alert("Failed to load the model. Please check the console for details.");
        }
      );
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (handModelRef.current) {
        scene.remove(handModelRef.current);
      }
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const onImageClick = (part, designUrl) => {
    const objects = objectsRef.current;

    if (objects[part]) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(designUrl, (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1); // Adjust the repeating values as necessary

        const selectedMesh = objects[part];

        const material = new THREE.MeshStandardMaterial({
          map: texture,
          color: selectedMesh.material.color, // Preserve original color
          emissive: selectedMesh.material.emissive, // Preserve original emissive color
          side: selectedMesh.material.side,
          emissiveIntensity: selectedMesh.material.emissiveIntensity,
        });

        selectedMesh.material = material;
        selectedMesh.material.needsUpdate = true;
      });
    }
  };

  const onSizeChange = (event) => {
    currentScaleFactorRef.current = parseFloat(event.target.value);
    const handModel = handModelRef.current;
    if (handModel) {
      handModel.scale.set(
        maxScaleFactor * currentScaleFactorRef.current,
        maxScaleFactor * currentScaleFactorRef.current,
        maxScaleFactor * currentScaleFactorRef.current
      );
    }
  };

  const takePhoto = () => {
    const canvas = containerRef.current.querySelector("canvas");
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;

    renderer.render(scene, camera); // Ensure the renderer is called before capturing the image
    canvas.toBlob((blob) => {
      saveAs(blob, 'hand_model.png');
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/4 bg-[#543310] p-4 overflow-y-auto">
        <h2 className="text-xl text-white mb-4">Select Design</h2>
        {Object.keys(designImages).map((part) => (
          <div key={part}>
            <h3 className="text-md text-white mt-4 mb-2">{displayNames[part]}</h3>
            <div className="grid grid-cols-2 gap-2">
              {designImages[part].map((design, index) => (
                <img
                  key={index}
                  src={`/images/${design}`}
                  alt={`Design ${index + 1}`}
                  className="cursor-pointer border border-gray-300 p-1 w-9 h-9" // Adjust size here
                  onClick={() => onImageClick(part, `/images/${design}`)}
                />
              ))}
            </div>
          </div>
        ))}
        <label htmlFor="sizeSlider" className="block text-white mt-4 mb-2">Size:</label>
        <input
          type="range"
          id="sizeSlider"
          min="0.1"
          max="2.0"
          step="0.1"
          defaultValue="1.0"
          onChange={onSizeChange}
          className="w-full"
        />
        <button
          onClick={takePhoto}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Take Photo
        </button>
      </div>
      <div className="w-full lg:w-3/4 h-full" ref={containerRef}></div>
    </div>
  );
};

export default HandModelViewer;
