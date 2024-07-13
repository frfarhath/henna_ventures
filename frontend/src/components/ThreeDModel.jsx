import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { saveAs } from 'file-saver';
import NewNav from '../components/NewNav'
import Footer from '../components/Footer'
const ThreeDModel = () => {
  const containerRef = useRef(null);
  const objectsRef = useRef({});
  const handModelRef = useRef(null);
  const maxScaleFactor = 75;
  const currentScaleFactorRef = useRef(1.0);

  const designImages = {
    Hand006: ["a.png", "b.png", "i.png", "e.png", "h.png", "c.png", "w.png", "j.png", "l.png"],
    Hand002: ["n.png", "w.png", "d.png"],
    Hand003: ["a.png", "b.png", "c.png", "d.png", "e.png", "z.png"],
    Hand004: ["a.png", "b.png", "c.png", "d.png", "e.png", "z.png"],
    Hand005: ["a.png", "b.png", "c.png", "d.png", "e.png", "z.png"],
    Hand001: ["a.png", "b.png", "c.png", "d.png", "z.png","e.png"],
    Hand012: ["a.png", "b.png", "i.png", "e.png", "h.png", "c.png", "w.png", "j.png", "l.png"],
    Hand007: ["a.png", "b.png", "c.png", "d.png", "e.png", "z.png"],
    Hand008: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand009: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand010: ["a.png", "b.png", "c.png", "d.png", "e.png"],
    Hand011: ["a.png", "b.png", "c.png", "d.png", "e.png"],
   
  };

  const displayNames = {
    Hand001: "Thumb",
    Hand002: "Index Finger",
    Hand003: "Middle Finger",
    Hand004: "Ring Finger",
    Hand005: "Little Finger",
    Hand006: "Palm Top",
    Hand007: "Back of Little Finger",
    Hand008: "Back of Ring Finger",
    Hand009: "Back of Middle Finger",
    Hand010: "Back of Index Finger",
    Hand011: "Back of Thumb",
    Hand012: "Palm Bottom",
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
      // controls should be defined here to avoid eslint no-undef error
      // define lights and other setup elements
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

  const saveDesignState = () => {
    const objects = objectsRef.current;
    const designState = {
      textures: {},
      scaleFactor: currentScaleFactorRef.current,
    };

    Object.keys(objects).forEach(part => {
      const material = objects[part].material;
      designState.textures[part] = {
        color: material.color.getHex(),
        emissive: material.emissive.getHex(),
        textureUrl: material.map ? material.map.image.src : null,
      };
    });

    localStorage.setItem('handDesignState', JSON.stringify(designState));
    alert('Design state saved!');
  };

  const loadDesignState = () => {
    const savedState = localStorage.getItem('handDesignState');
    if (savedState) {
      const designState = JSON.parse(savedState);
      const objects = objectsRef.current;

      Object.keys(designState.textures).forEach(part => {
        const textureInfo = designState.textures[part];
        const material = new THREE.MeshStandardMaterial({
          color: textureInfo.color,
          emissive: textureInfo.emissive,
          side: THREE.DoubleSide,
          emissiveIntensity: 0.3,
        });

        if (textureInfo.textureUrl) {
          const textureLoader = new THREE.TextureLoader();
          textureLoader.load(textureInfo.textureUrl, (texture) => {
            material.map = texture;
            material.needsUpdate = true;
          });
        }

        if (objects[part]) {
          objects[part].material = material
          objects[part].material.needsUpdate = true;
        }
      });

      currentScaleFactorRef.current = designState.scaleFactor;
      const handModel = handModelRef.current;
      if (handModel) {
        handModel.scale.set(
          maxScaleFactor * currentScaleFactorRef.current,
          maxScaleFactor * currentScaleFactorRef.current,
          maxScaleFactor * currentScaleFactorRef.current
        );
      }
    } else {
      alert('No saved design state found.');
    }
  };

  return (
    <div>
    <NewNav />
    <div className="flex flex-col lg:flex-row h-screen overflow-x-hidden">
      
      <div className="w-full lg:w-1/4 bg-[#543310] p-4 overflow-y-auto">
        <h2 className="text-2xl text-white mb-4">Select Design</h2>
        {Object.keys(designImages).map((part) => (
          <div key={part}>
            <h3 className="text-lg text-white mt-4 mb-2">{displayNames[part]}</h3>
            <div className="grid grid-cols-3 gap-2">
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
       
      </div>
      <div className="w-full lg:w-3/4 h-full" ref={containerRef}></div>
      <div style={{ position: "absolute", top: "270px", left: "350px", display: "flex", flexDirection: "column", gap: "10px" }}>
  <button
    onClick={takePhoto}
    className="px-4 py-2 bg-blue-500 text-white rounded"
  >
    Take Photo
  </button>
  <button
    onClick={saveDesignState}
    className="px-4 py-2 bg-green-500 text-white rounded"
  >
    Save Design
  </button>
  <button
    onClick={loadDesignState}
    className="px-4 py-2 bg-yellow-500 text-white rounded"
  >
    Load Design
  </button>
</div>
</div>
<Footer />
</div>
  );
};

export default ThreeDModel;
