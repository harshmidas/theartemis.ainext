
// "use client";
// import { useState, useEffect, useRef } from "react";
// import { NextPage } from "next";
// import Head from "next/head";
// import * as THREE from "three";
// import emailjs from "@emailjs/browser";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './globals.css'; 
// interface FormData {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   company: string;
//   country: string;
//   state: string;
//   city: string;
//   source: string;
// }

// interface Country {
//   name: string;
//   iso2: string;
// }

// interface State {
//   name: string;
//   iso2: string;
// }

// interface City {
//   name: string;
// }

// const Home: NextPage = () => {
//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     company: "",
//     country: "",
//     state: "",
//     city: "",
//     source: "",
//   });
  
//   const [emailError, setEmailError] = useState<string>("");
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [states, setStates] = useState<State[]>([]);
//   const [cities, setCities] = useState<City[]>([]);
//   const [loadingStates, setLoadingStates] = useState(false);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   // Slider refs for manual control
//   const challengeSliderRef = useRef<HTMLDivElement>(null);
//   const successSliderRef = useRef<HTMLDivElement>(null);
//   const featureSliderRef = useRef<HTMLDivElement>(null);

//   const canvasRef = useRef<HTMLDivElement>(null);
//   const starsContainerRef = useRef<HTMLDivElement>(null);
//   const moonCanvasRef = useRef<HTMLCanvasElement>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const particlesMeshRef = useRef<THREE.Points | null>(null);

//   // Enhanced Toast Notifications
//   const showSuccessToast = (message: string) => {
//     toast.success(message, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       style: {
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         color: "white",
//         fontWeight: "500",
//         borderRadius: "12px",
//         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
//       },
//     });
//   };

//   const showErrorToast = (message: string) => {
//     toast.error(message, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       style: {
//         background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
//         color: "white",
//         fontWeight: "500",
//         borderRadius: "12px",
//         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
//       },
//     });
//   };

//   // Enhanced form validation
//   const validateForm = (): boolean => {
//     if (!form.firstName.trim() || form.firstName.length < 2) {
//       showErrorToast("Please enter a valid first name (at least 2 characters)");
//       return false;
//     }

//     if (!form.lastName.trim() || form.lastName.length < 2) {
//       showErrorToast("Please enter a valid last name (at least 2 characters)");
//       return false;
//     }

//     if (!validateEmail(form.email)) {
//       showErrorToast("Please enter a valid work email address");
//       return false;
//     }

//     const phoneRegex = /^[0-9+()\-\s]{7,20}$/;
//     if (!phoneRegex.test(form.phone)) {
//       showErrorToast("Please enter a valid phone number (7-20 characters)");
//       return false;
//     }

//     if (!form.company.trim() || form.company.length < 2) {
//       showErrorToast("Please enter a valid company name");
//       return false;
//     }

//     if (!form.country) {
//       showErrorToast("Please select a country");
//       return false;
//     }

//     if (!form.state) {
//       showErrorToast("Please select a state");
//       return false;
//     }

//     if (!form.city) {
//       showErrorToast("Please select a city");
//       return false;
//     }

//     if (!form.source) {
//       showErrorToast("Please tell us how you heard about us");
//       return false;
//     }

//     return true;
//   };

//   // Enhanced demo submission with better toast notifications
//   const submitDemo = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
    
//     // Show loading state
//     const toastId = toast.loading("Scheduling your demo...", {
//       position: "top-right",
//       theme: "light",
//     });

//     try {
//       const result = await emailjs.send(
//         "service_245y37w",
//         "template_bca0q3m",
//         {
//           firstName: form.firstName,
//           lastName: form.lastName,
//           email: form.email,
//           phone: form.phone,
//           company: form.company,
//           country: form.country,
//           state: form.state,
//           city: form.city,
//           source: form.source,
//           submittedAt: new Date().toISOString(),
//         },
//         "GqiI7hbjYCg0jB6-Z"
//       );

//       // Dismiss loading toast
//       toast.dismiss(toastId);

//       if (result.status === 200) {
//         showSuccessToast(
//           `🎉 Demo booked successfully, ${form.firstName}! We'll contact you within 24 hours to confirm your schedule.`
//         );

//         // Reset form
//         setForm({
//           firstName: "",
//           lastName: "",
//           phone: "",
//           email: "",
//           company: "",
//           country: "",
//           state: "",
//           city: "",
//           source: "",
//         });
//         setEmailError("");
//         setStates([]);
//         setCities([]);
//       }
//     } catch (error: any) {
//       // Dismiss loading toast
//       toast.dismiss(toastId);
      
//       console.error("Failed to send email:", error);
//       showErrorToast(
//         "😔 Something went wrong. Please try again or contact us directly at support@theartemis.ai"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Real-time email validation
//   const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//     return emailRegex.test(email);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const email = e.target.value;
//     setForm({ ...form, email });

//     if (email.length > 0 && !validateEmail(email)) {
//       setEmailError(
//         "Please enter email in correct format (example@domain.com)"
//       );
//     } else {
//       setEmailError("");
//     }
//   };

//   // Fetch countries on component mount
//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   const fetchCountries = async () => {
//     try {
//       const response = await fetch(
//         "https://api.countrystatecity.in/v1/countries",
//         {
//           headers: {
//             "X-CSCAPI-KEY":
//               "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
//           },
//         }
//       );
//       const data = await response.json();
//       setCountries(data);
//     } catch (error) {
//       console.error("Error fetching countries:", error);
//       showErrorToast("Failed to load countries. Please refresh the page.");
//     }
//   };

//   const fetchStates = async (countryCode: string) => {
//     setLoadingStates(true);
//     try {
//       const response = await fetch(
//         `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
//         {
//           headers: {
//             "X-CSCAPI-KEY":
//               "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
//           },
//         }
//       );
//       const data = await response.json();
//       setStates(data);
//     } catch (error) {
//       console.error("Error fetching states:", error);
//       showErrorToast("Failed to load states. Please try again.");
//     }
//     setLoadingStates(false);
//   };

//   const fetchCities = async (countryCode: string, stateCode: string) => {
//     setLoadingCities(true);
//     try {
//       const response = await fetch(
//         `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
//         {
//           headers: {
//             "X-CSCAPI-KEY":
//               "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
//           },
//         }
//       );
//       const data = await response.json();
//       setCities(data);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//       showErrorToast("Failed to load cities. Please try again.");
//     }
//     setLoadingCities(false);
//   };

//   const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const countryCode = e.target.value;
//     setForm({ ...form, country: countryCode, state: "", city: "" });
//     setStates([]);
//     setCities([]);
//     if (countryCode) {
//       fetchStates(countryCode);
//     }
//   };

//   const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const stateCode = e.target.value;
//     setForm({ ...form, state: stateCode, city: "" });
//     setCities([]);
//     if (stateCode && form.country) {
//       fetchCities(form.country, stateCode);
//     }
//   };

//   // Three.js effect - wrapped in useEffect and client-side check
//   useEffect(() => {
//     if (!canvasRef.current || typeof window === "undefined") return;

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//     });
//     rendererRef.current = renderer;

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     canvasRef.current.appendChild(renderer.domElement);

//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 3000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);
//     const sizesArray = new Float32Array(particlesCount);

//     for (let i = 0; i < particlesCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 50;

//       const colorChoice = Math.random();
//       if (colorChoice < 0.33) {
//         colorsArray[i] = 0.4 + Math.random() * 0.6;
//         if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
//         if (i % 3 === 2) colorsArray[i] = 0.8 + Math.random() * 0.2;
//       } else if (colorChoice < 0.66) {
//         colorsArray[i] = 0.7 + Math.random() * 0.3;
//         if (i % 3 === 0) colorsArray[i] = 0.4 + Math.random() * 0.3;
//         if (i % 3 === 2) colorsArray[i] = 0.6 + Math.random() * 0.4;
//       } else {
//         colorsArray[i] = 0.8 + Math.random() * 0.2;
//         if (i % 3 === 0) colorsArray[i] = 0.9 + Math.random() * 0.1;
//         if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
//       }
//     }

//     for (let i = 0; i < particlesCount; i++) {
//       sizesArray[i] = Math.random() * 0.05;
//     }

//     particlesGeometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(posArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "color",
//       new THREE.BufferAttribute(colorsArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "size",
//       new THREE.BufferAttribute(sizesArray, 1)
//     );

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true,
//     });

//     const particlesMesh = new THREE.Points(
//       particlesGeometry,
//       particlesMaterial
//     );
//     particlesMeshRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     const bluePlanetGroup = new THREE.Group();
//     const bluePlanetGeometry = new THREE.SphereGeometry(1.2, 32, 32);
//     const bluePlanetMaterial = new THREE.MeshStandardMaterial({
//       color: 0x6b9fff,
//       metalness: 0.3,
//       roughness: 0.5,
//       emissive: 0x4a7acc,
//       emissiveIntensity: 0.1,
//     });
//     const bluePlanet = new THREE.Mesh(bluePlanetGeometry, bluePlanetMaterial);
//     bluePlanetGroup.add(bluePlanet);
//     bluePlanetGroup.position.set(35, 15, -40);
//     scene.add(bluePlanetGroup);

//     const orangePlanetGroup = new THREE.Group();
//     const orangePlanetGeometry = new THREE.SphereGeometry(1.5, 32, 32);
//     const orangePlanetMaterial = new THREE.MeshStandardMaterial({
//       color: 0xffaa66,
//       metalness: 0.2,
//       roughness: 0.6,
//       emissive: 0xcc6633,
//       emissiveIntensity: 0.08,
//     });
//     const orangePlanet = new THREE.Mesh(
//       orangePlanetGeometry,
//       orangePlanetMaterial
//     );
//     orangePlanetGroup.add(orangePlanet);
//     orangePlanetGroup.position.set(-30, -12, -45);
//     scene.add(orangePlanetGroup);

//     const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(10, 10, 10);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0xffffff, 0.15, 50);
//     pointLight.position.set(0, 0, 5);
//     scene.add(pointLight);

//     const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
//     scene.add(hemisphereLight);

//     camera.position.set(0, 0, 20);

//     let scrollY = 0;
//     let mouseX = 0;
//     let mouseY = 0;
//     let time = 0;

//     const handleScroll = (): void => {
//       scrollY = window.scrollY || window.pageYOffset;
//     };

//     const handleMouseMove = (event: MouseEvent): void => {
//       mouseX = (event.clientX - window.innerWidth / 2) / 100;
//       mouseY = (event.clientY - window.innerHeight / 2) / 100;
//     };

//     window.addEventListener("scroll", handleScroll);
//     document.addEventListener("mousemove", handleMouseMove);

//     const animate = (): void => {
//       requestAnimationFrame(animate);
//       time += 0.01;

//       if (particlesMeshRef.current) {
//         particlesMeshRef.current.rotation.y += 0.0005;
//         particlesMeshRef.current.rotation.x += 0.0003;

//         const parallaxY = scrollY * 0.001;
//         particlesMeshRef.current.position.y = -parallaxY * 2;
//         particlesMeshRef.current.position.x = Math.sin(time * 0.5) * 0.5;
//       }

//       if (cameraRef.current) {
//         cameraRef.current.position.x +=
//           (mouseX - cameraRef.current.position.x) * 0.05;
//         cameraRef.current.position.y +=
//           (-mouseY - cameraRef.current.position.y) * 0.05;
//         cameraRef.current.lookAt(scene.position);

//         const baseZ = 20;
//         cameraRef.current.position.z = baseZ;

//         const scrollEffect = scrollY * 0.001;
//         cameraRef.current.rotation.z = scrollEffect * 0.05;
//       }

//       pointLight.position.x = Math.sin(time) * 2.5;
//       pointLight.position.y = Math.cos(time) * 2.5;

//       if (rendererRef.current && sceneRef.current && cameraRef.current) {
//         rendererRef.current.render(sceneRef.current, cameraRef.current);
//       }
//     };

//     animate();

//     const handleResize = (): void => {
//       if (cameraRef.current) {
//         cameraRef.current.aspect = window.innerWidth / window.innerHeight;
//         cameraRef.current.updateProjectionMatrix();
//       }
//       if (rendererRef.current) {
//         rendererRef.current.setSize(window.innerWidth, window.innerHeight);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);
//       if (canvasRef.current && rendererRef.current?.domElement) {
//         canvasRef.current.removeChild(rendererRef.current.domElement);
//       }
//     };
//   }, []);

//   const handleScrollTo =
//     (selector: string) =>
//     (e: React.MouseEvent<HTMLAnchorElement>): void => {
//       e.preventDefault();
//       const el = document.querySelector(selector);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth", block: "start" });
//         setMenuOpen(false);
//       }
//     };

//   return (
//     <div className="app">
//       <Head>
//         <title>Artemis - AI-powered ATS for Healthcare Staffing</title>
//         <meta name="description" content="Recruit faster with clarity, not clutter. Streamlined workflows, intelligent automation, and minimalist design for healthcare staffing teams." />
//         <link rel="icon" href="/favicon.ico" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
//           rel="stylesheet"
//         />
//       </Head>

//       {/* Toast Container */}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         style={{
//           zIndex: 9999,
//         }}
//       />

//       <div className="gradient-bg"></div>
//       <div className="stars-container" ref={starsContainerRef}></div>
//       <canvas
//         ref={moonCanvasRef}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: 2,
//           pointerEvents: "none",
//         }}
//       />
//       <div id="canvas-container" ref={canvasRef} />

//       {/* Enhanced Navigation Bar */}
//       <nav className="main-nav">
//         <div className="nav-container">
//           <div className="brand-section">
//             <div className="artemis-logo">
//               <svg
//                 className="logo-svg"
//                 viewBox="0 0 140 50"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <defs>
//                   <linearGradient
//                     id="logoGradient1"
//                     x1="0%"
//                     y1="0%"
//                     x2="100%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#667eea" />
//                     <stop offset="100%" stopColor="#764ba2" />
//                   </linearGradient>
//                   <linearGradient
//                     id="logoGradient2"
//                     x1="0%"
//                     y1="0%"
//                     x2="100%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#6ea8fe" />
//                     <stop offset="100%" stopColor="#667eea" />
//                   </linearGradient>
//                   <linearGradient
//                     id="logoGradient3"
//                     x1="0%"
//                     y1="0%"
//                     x2="100%"
//                     y2="0%"
//                   >
//                     <stop offset="0%" stopColor="#667eea" />
//                     <stop offset="50%" stopColor="#764ba2" />
//                     <stop offset="100%" stopColor="#6ea8fe" />
//                   </linearGradient>
//                 </defs>

//                 {/* Logo Text */}
//                 <g className="logo-text">
//                   <text
//                     x="45"
//                     y="32"
//                     fontFamily="'Poppins', sans-serif"
//                     fontWeight="700"
//                     fontSize="20"
//                     fill="url(#logoGradient3)"
//                     letterSpacing="1"
//                   >
//                     ARTEMIS
//                   </text>
//                 </g>
//               </svg>
//             </div>
//           </div>

//           <div
//             className={`menu-toggle ${menuOpen ? "active" : ""}`}
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>

//           <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
//             <div className="nav-links-group">
//               <a
//                 href="#home"
//                 onClick={handleScrollTo("#home")}
//                 className="nav-link"
//               >
//                 Home
//               </a>
//               <a
//                 href="#about"
//                 onClick={handleScrollTo("#about")}
//                 className="nav-link"
//               >
//                 About
//               </a>
//               <a
//                 href="#superpowers"
//                 onClick={handleScrollTo("#superpowers")}
//                 className="nav-link"
//               >
//                 Superpowers
//               </a>
//               <a
//                 href="#pricing"
//                 onClick={handleScrollTo("#pricing")}
//                 className="nav-link"
//               >
//                 Pricing
//               </a>
//               <a
//                 href="#integrations"
//                 onClick={handleScrollTo("#integrations")}
//                 className="nav-link"
//               >
//                 Integrations
//               </a>
//               <a
//                 href="#resources"
//                 onClick={handleScrollTo("#resources")}
//                 className="nav-link"
//               >
//                 Resources
//               </a>
//             </div>
//             <a
//               href="#demo"
//               className="nav-cta-button"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book a Demo
//             </a>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero-section" id="home">
//         <div className="hero-content-wrapper">
//           <div className="hero-badge">
//             AI-powered ATS for Healthcare Staffing
//           </div>
//           <h1 className="hero-title">
//             Recruit faster with clarity, not clutter.
//           </h1>
//           <p className="hero-description">
//             Streamlined workflows, intelligent automation, and minimalist design
//             that empowers healthcare staffing teams to focus on what matters
//             most: connecting great talent with exceptional opportunities.
//           </p>
//           <div className="hero-cta-group">
//             <a
//               href="#demo"
//               className="hero-primary-cta"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book a Demo
//             </a>
//             <a
//               href="#superpowers"
//               className="hero-secondary-cta"
//               onClick={handleScrollTo("#superpowers")}
//             >
//               Explore Features
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* The Challenge Section - INFINITE SLIDER */}
//       <section className="challenge-section" id="challenge">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">The Challenge We Solve</h2>
//             <p className="section-subtitle-main">
//               Healthcare staffing agencies face overwhelming complexity in their
//               daily operations
//             </p>
//           </div>

//           <div className="slider-container-infinite-wrapper">
//             <div className="slider-container-infinite" ref={challengeSliderRef}>
//               <div className="slider-track-infinite challenge-slider">
//                 {/* Original Set */}
//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <polyline points="12 6 12 12 16 14"></polyline>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">Time-Consuming Manual Work</h3>
//                   <p className="feature-description">
//                     Hours spent on resume parsing, data entry, and candidate
//                     tracking that could be automated, pulling recruiters away
//                     from relationship building.
//                   </p>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <circle cx="11" cy="11" r="8"></circle>
//                       <path d="m21 21-4.35-4.35"></path>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">
//                     Difficulty Finding Qualified Talent
//                   </h3>
//                   <p className="feature-description">
//                     Traditional search methods make it nearly impossible to
//                     quickly identify candidates with the right skills,
//                     certifications, and availability.
//                   </p>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">Disconnected Systems</h3>
//                   <p className="feature-description">
//                     VMS platforms, ATS software, and communication tools
//                     operating in silos, creating data gaps and workflow
//                     friction.
//                   </p>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M9 11H3v5a2 2 0 0 0 2 2h4"></path>
//                       <path d="M9 7V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"></path>
//                       <path d="M15 11h6v5a2 2 0 0 1-2 2h-4"></path>
//                       <path d="M15 7V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">
//                     Compliance & Credentialing Complexity
//                   </h3>
//                   <p className="feature-description">
//                     Tracking licenses, certifications, and compliance
//                     documentation across dozens or hundreds of healthcare
//                     professionals is error-prone and stressful.
//                   </p>
//                 </div>

//                 {/* Duplicate Set for Infinite Loop */}
//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <polyline points="12 6 12 12 16 14"></polyline>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">Time-Consuming Manual Work</h3>
//                   <p className="feature-description">
//                     Hours spent on resume parsing, data entry, and candidate
//                     tracking that could be automated, pulling recruiters away
//                     from relationship building.
//                   </p>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <circle cx="11" cy="11" r="8"></circle>
//                       <path d="m21 21-4.35-4.35"></path>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">
//                     Difficulty Finding Qualified Talent
//                   </h3>
//                   <p className="feature-description">
//                     Traditional search methods make it nearly impossible to
//                     quickly identify candidates with the right skills,
//                     certifications, and availability.
//                   </p>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">Disconnected Systems</h3>
//                   <p className="feature-description">
//                     VMS platforms, ATS software, and communication tools
//                     operating in silos, creating data gaps and workflow
//                     friction.
//                   </p>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M9 11H3v5a2 2 0 0 0 2 2h4"></path>
//                       <path d="M9 7V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"></path>
//                       <path d="M15 11h6v5a2 2 0 0 1-2 2h-4"></path>
//                       <path d="M15 7V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">
//                     Compliance & Credentialing Complexity
//                   </h3>
//                   <p className="feature-description">
//                     Tracking licenses, certifications, and compliance
//                     documentation across dozens or hundreds of healthcare
//                     professionals is error-prone and stressful.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Success Stories Slider - INFINITE SCROLL */}
//       <section className="success-slider-section">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">
//               Trusted by Leading Healthcare Staffing Agencies
//             </h2>
//             <p className="section-subtitle-main">
//               Join hundreds of agencies achieving remarkable results with
//               Artemis
//             </p>
//           </div>

//           <div className="slider-container-infinite-wrapper">
//             <div className="slider-container-infinite" ref={successSliderRef}>
//               <div className="slider-track-infinite success-slider">
//                 {/* Success slides - Original Set */}
//                 <div className="success-slide">
//                   <div className="success-slide-content">
//                     <div className="success-metric">
//                       <div className="metric-value">67%</div>
//                       <div className="metric-label">Faster Time-to-Submit</div>
//                     </div>
//                     <div className="success-company">
//                       <div className="company-logo-placeholder">
//                         <svg viewBox="0 0 40 40" fill="none">
//                           <rect
//                             width="40"
//                             height="40"
//                             rx="8"
//                             fill="url(#companyGrad1)"
//                           />
//                           <path
//                             d="M20 10 L30 20 L20 30 L10 20 Z"
//                             fill="white"
//                             opacity="0.9"
//                           />
//                           <defs>
//                             <linearGradient
//                               id="companyGrad1"
//                               x1="0%"
//                               y1="0%"
//                               x2="100%"
//                               y2="100%"
//                             >
//                               <stop offset="0%" stopColor="#667eea" />
//                               <stop offset="100%" stopColor="#764ba2" />
//                             </linearGradient>
//                           </defs>
//                         </svg>
//                       </div>
//                       <div className="company-info">
//                         <div className="company-name">HealthStaff Pro</div>
//                         <div className="company-type">
//                           Travel Nursing Agency
//                         </div>
//                       </div>
//                     </div>
//                     <p className="success-quote">
//                       "Artemis transformed our candidate submission process.
//                       What used to take hours now takes minutes."
//                     </p>
//                   </div>
//                 </div>

//                 <div className="success-slide">
//                   <div className="success-slide-content">
//                     <div className="success-metric">
//                       <div className="metric-value">3.2x</div>
//                       <div className="metric-label">
//                         More Placements Per Month
//                       </div>
//                     </div>
//                     <div className="success-company">
//                       <div className="company-logo-placeholder">
//                         <svg viewBox="0 0 40 40" fill="none">
//                           <rect
//                             width="40"
//                             height="40"
//                             rx="8"
//                             fill="url(#companyGrad2)"
//                           />
//                           <circle
//                             cx="20"
//                             cy="20"
//                             r="12"
//                             stroke="white"
//                             strokeWidth="2"
//                             fill="none"
//                           />
//                           <path
//                             d="M20 14 L20 26 M14 20 L26 20"
//                             stroke="white"
//                             strokeWidth="2"
//                           />
//                           <defs>
//                             <linearGradient
//                               id="companyGrad2"
//                               x1="0%"
//                               y1="0%"
//                               x2="100%"
//                               y2="100%"
//                             >
//                               <stop offset="0%" stopColor="#6ea8fe" />
//                               <stop offset="100%" stopColor="#667eea" />
//                             </linearGradient>
//                           </defs>
//                         </svg>
//                       </div>
//                       <div className="company-info">
//                         <div className="company-name">MedTalent Solutions</div>
//                         <div className="company-type">
//                           Allied Health Staffing
//                         </div>
//                       </div>
//                     </div>
//                     <p className="success-quote">
//                       "The AI-powered matching helped us scale our placement
//                       volume without adding headcount."
//                     </p>
//                   </div>
//                 </div>

//                 <div className="success-slide">
//                   <div className="success-slide-content">
//                     <div className="success-metric">
//                       <div className="metric-value">$420K</div>
//                       <div className="metric-label">Annual Cost Savings</div>
//                     </div>
//                     <div className="success-company">
//                       <div className="company-logo-placeholder">
//                         <svg viewBox="0 0 40 40" fill="none">
//                           <rect
//                             width="40"
//                             height="40"
//                             rx="8"
//                             fill="url(#companyGrad3)"
//                           />
//                           <path
//                             d="M20 8 L32 20 L20 32 L8 20 Z"
//                             stroke="white"
//                             strokeWidth="2"
//                             fill="none"
//                           />
//                           <circle cx="20" cy="20" r="4" fill="white" />
//                           <defs>
//                             <linearGradient
//                               id="companyGrad3"
//                               x1="0%"
//                               y1="0%"
//                               x2="100%"
//                               y2="100%"
//                             >
//                               <stop offset="0%" stopColor="#764ba2" />
//                               <stop offset="100%" stopColor="#667eea" />
//                             </linearGradient>
//                           </defs>
//                         </svg>
//                       </div>
//                       <div className="company-info">
//                         <div className="company-name">
//                           Apex Healthcare Staffing
//                         </div>
//                         <div className="company-type">
//                           Multi-Specialty Agency
//                         </div>
//                       </div>
//                     </div>
//                     <p className="success-quote">
//                       "ROI was immediate. Artemis paid for itself in the first
//                       quarter through efficiency gains alone."
//                     </p>
//                   </div>
//                 </div>

//                 <div className="success-slide">
//                   <div className="success-slide-content">
//                     <div className="success-metric">
//                       <div className="metric-value">94%</div>
//                       <div className="metric-label">Candidate Satisfaction</div>
//                     </div>
//                     <div className="success-company">
//                       <div className="company-logo-placeholder">
//                         <svg viewBox="0 0 40 40" fill="none">
//                           <rect
//                             width="40"
//                             height="40"
//                             rx="8"
//                             fill="url(#companyGrad4)"
//                           />
//                           <path
//                             d="M10 20 Q20 10 30 20 Q20 30 10 20"
//                             fill="white"
//                             opacity="0.9"
//                           />
//                           <defs>
//                             <linearGradient
//                               id="companyGrad4"
//                               x1="0%"
//                               y1="0%"
//                               x2="100%"
//                               y2="100%"
//                             >
//                               <stop offset="0%" stopColor="#667eea" />
//                               <stop offset="100%" stopColor="#6ea8fe" />
//                             </linearGradient>
//                           </defs>
//                         </svg>
//                       </div>
//                       <div className="company-info">
//                         <div className="company-name">
//                           CareLink Professionals
//                         </div>
//                         <div className="company-type">
//                           Locum Tenens Placement
//                         </div>
//                       </div>
//                     </div>
//                     <p className="success-quote">
//                       "Our candidates love the smooth onboarding experience.
//                       It's a competitive advantage for us."
//                     </p>
//                   </div>
//                 </div>

//                 {/* Duplicate Set for Infinite Loop */}
//                 <div className="success-slide">
//                   <div className="success-slide-content">
//                     <div className="success-metric">
//                       <div className="metric-value">67%</div>
//                       <div className="metric-label">Faster Time-to-Submit</div>
//                     </div>
//                     <div className="success-company">
//                       <div className="company-logo-placeholder">
//                         <svg viewBox="0 0 40 40" fill="none">
//                           <rect
//                             width="40"
//                             height="40"
//                             rx="8"
//                             fill="url(#companyGrad1a)"
//                           />
//                           <path
//                             d="M20 10 L30 20 L20 30 L10 20 Z"
//                             fill="white"
//                             opacity="0.9"
//                           />
//                           <defs>
//                             <linearGradient
//                               id="companyGrad1a"
//                               x1="0%"
//                               y1="0%"
//                               x2="100%"
//                               y2="100%"
//                             >
//                               <stop offset="0%" stopColor="#667eea" />
//                               <stop offset="100%" stopColor="#764ba2" />
//                             </linearGradient>
//                           </defs>
//                         </svg>
//                       </div>
//                       <div className="company-info">
//                         <div className="company-name">HealthStaff Pro</div>
//                         <div className="company-type">
//                           Travel Nursing Agency
//                         </div>
//                       </div>
//                     </div>
//                     <p className="success-quote">
//                       "Artemis transformed our candidate submission process.
//                       What used to take hours now takes minutes."
//                     </p>
//                   </div>
//                 </div>

//                 <div className="success-slide">
//                   <div className="success-slide-content">
//                     <div className="success-metric">
//                       <div className="metric-value">3.2x</div>
//                       <div className="metric-label">
//                         More Placements Per Month
//                       </div>
//                     </div>
//                     <div className="success-company">
//                       <div className="company-logo-placeholder">
//                         <svg viewBox="0 0 40 40" fill="none">
//                           <rect
//                             width="40"
//                             height="40"
//                             rx="8"
//                             fill="url(#companyGrad2a)"
//                           />
//                           <circle
//                             cx="20"
//                             cy="20"
//                             r="12"
//                             stroke="white"
//                             strokeWidth="2"
//                             fill="none"
//                           />
//                           <path
//                             d="M20 14 L20 26 M14 20 L26 20"
//                             stroke="white"
//                             strokeWidth="2"
//                           />
//                           <defs>
//                             <linearGradient
//                               id="companyGrad2a"
//                               x1="0%"
//                               y1="0%"
//                               x2="100%"
//                               y2="100%"
//                             >
//                               <stop offset="0%" stopColor="#6ea8fe" />
//                               <stop offset="100%" stopColor="#667eea" />
//                             </linearGradient>
//                           </defs>
//                         </svg>
//                       </div>
//                       <div className="company-info">
//                         <div className="company-name">MedTalent Solutions</div>
//                         <div className="company-type">
//                           Allied Health Staffing
//                         </div>
//                       </div>
//                     </div>
//                     <p className="success-quote">
//                       "The AI-powered matching helped us scale our placement
//                       volume without adding headcount."
//                     </p>
//                   </div>
//                 </div>

//                 <div className="success-slide">
//                   <div className="success-slide-content">
//                     <div className="success-metric">
//                       <div className="metric-value">$420K</div>
//                       <div className="metric-label">Annual Cost Savings</div>
//                     </div>
//                     <div className="success-company">
//                       <div className="company-logo-placeholder">
//                         <svg viewBox="0 0 40 40" fill="none">
//                           <rect
//                             width="40"
//                             height="40"
//                             rx="8"
//                             fill="url(#companyGrad3a)"
//                           />
//                           <path
//                             d="M20 8 L32 20 L20 32 L8 20 Z"
//                             stroke="white"
//                             strokeWidth="2"
//                             fill="none"
//                           />
//                           <circle cx="20" cy="20" r="4" fill="white" />
//                           <defs>
//                             <linearGradient
//                               id="companyGrad3a"
//                               x1="0%"
//                               y1="0%"
//                               x2="100%"
//                               y2="100%"
//                             >
//                               <stop offset="0%" stopColor="#764ba2" />
//                               <stop offset="100%" stopColor="#667eea" />
//                             </linearGradient>
//                           </defs>
//                         </svg>
//                       </div>
//                       <div className="company-info">
//                         <div className="company-name">
//                           Apex Healthcare Staffing
//                         </div>
//                         <div className="company-type">
//                           Multi-Specialty Agency
//                         </div>
//                       </div>
//                     </div>
//                     <p className="success-quote">
//                       "ROI was immediate. Artemis paid for itself in the first
//                       quarter through efficiency gains alone."
//                     </p>
//                   </div>
//                 </div>

//                 <div className="success-slide">
//                   <div className="success-slide-content">
//                     <div className="success-metric">
//                       <div className="metric-value">94%</div>
//                       <div className="metric-label">Candidate Satisfaction</div>
//                     </div>
//                     <div className="success-company">
//                       <div className="company-logo-placeholder">
//                         <svg viewBox="0 0 40 40" fill="none">
//                           <rect
//                             width="40"
//                             height="40"
//                             rx="8"
//                             fill="url(#companyGrad4a)"
//                           />
//                           <path
//                             d="M10 20 Q20 10 30 20 Q20 30 10 20"
//                             fill="white"
//                             opacity="0.9"
//                           />
//                           <defs>
//                             <linearGradient
//                               id="companyGrad4a"
//                               x1="0%"
//                               y1="0%"
//                               x2="100%"
//                               y2="100%"
//                             >
//                               <stop offset="0%" stopColor="#667eea" />
//                               <stop offset="100%" stopColor="#6ea8fe" />
//                             </linearGradient>
//                           </defs>
//                         </svg>
//                       </div>
//                       <div className="company-info">
//                         <div className="company-name">
//                           CareLink Professionals
//                         </div>
//                         <div className="company-type">
//                           Locum Tenens Placement
//                         </div>
//                       </div>
//                     </div>
//                     <p className="success-quote">
//                       "Our candidates love the smooth onboarding experience.
//                       It's a competitive advantage for us."
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Highlights - INFINITE SLIDER */}
//       <section className="highlights-section" id="superpowers">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Talent Superpowers</h2>
//             <p className="section-subtitle-main">
//               Designed for recruiters. Powered by AI. Built for speed and
//               simplicity.
//             </p>
//           </div>

//           <div className="slider-container-infinite-wrapper">
//             <div className="slider-container-infinite" ref={featureSliderRef}>
//               <div className="slider-track-infinite features-slider">
//                 {/* Original Set */}
//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <circle cx="11" cy="11" r="8"></circle>
//                       <path d="m21 21-4.35-4.35"></path>
//                       <circle cx="11" cy="11" r="3"></circle>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">AI-Powered Candidate Search</h3>
//                   <p className="feature-description">
//                     Find the perfect match instantly with intelligent search
//                     that understands skills, experience, certifications, and
//                     availability patterns.
//                   </p>
//                   <ul className="feature-list">
//                     <li>Natural language search queries</li>
//                     <li>Smart skill matching algorithms</li>
//                     <li>Real-time availability tracking</li>
//                   </ul>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">Lightning-Fast VMS Job Sync</h3>
//                   <p className="feature-description">
//                     Seamlessly integrate with major VMS platforms. Jobs flow
//                     automatically into Artemis, eliminating manual data entry.
//                   </p>
//                   <ul className="feature-list">
//                     <li>Automatic job ingestion</li>
//                     <li>Real-time updates</li>
//                     <li>Multi-VMS support</li>
//                   </ul>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                       <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">Built-In Skills Checklists</h3>
//                   <p className="feature-description">
//                     Interactive checklists that capture candidate qualifications
//                     with precision, convert to PDFs, and distribute to
//                     stakeholders instantly.
//                   </p>
//                   <ul className="feature-list">
//                     <li>Customizable checklist templates</li>
//                     <li>Digital signature collection</li>
//                     <li>Automated distribution</li>
//                   </ul>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <rect
//                         x="3"
//                         y="3"
//                         width="18"
//                         height="18"
//                         rx="2"
//                         ry="2"
//                       ></rect>
//                       <line x1="3" y1="9" x2="21" y2="9"></line>
//                       <line x1="9" y1="21" x2="9" y2="9"></line>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">Smart Onboarding Dashboards</h3>
//                   <p className="feature-description">
//                     Visual pipelines that show exactly where every candidate
//                     stands, with automated reminders and next-step
//                     recommendations.
//                   </p>
//                   <ul className="feature-list">
//                     <li>Drag-and-drop pipeline management</li>
//                     <li>Automated workflow triggers</li>
//                     <li>Real-time status updates</li>
//                   </ul>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
//                       <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
//                       <line x1="12" y1="22.08" x2="12" y2="12"></line>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">
//                     Candidate Pipeline Management
//                   </h3>
//                   <p className="feature-description">
//                     Design dynamic, stage-based workflows that adapt to your
//                     process. Never lose track of a candidate again.
//                   </p>
//                   <ul className="feature-list">
//                     <li>Customizable pipeline stages</li>
//                     <li>Bulk candidate actions</li>
//                     <li>Advanced filtering</li>
//                   </ul>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                       <polyline points="14 2 14 8 20 8"></polyline>
//                       <line x1="9" y1="15" x2="15" y2="15"></line>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">
//                     Right-to-Represent Automation
//                   </h3>
//                   <p className="feature-description">
//                     Send RTR forms instantly, track signatures, and maintain
//                     compliance documentation—all within a single, streamlined
//                     workflow.
//                   </p>
//                   <ul className="feature-list">
//                     <li>One-click RTR distribution</li>
//                     <li>E-signature integration</li>
//                     <li>Automatic record keeping</li>
//                   </ul>
//                 </div>

//                 {/* Duplicate Set for Infinite Loop */}
//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <circle cx="11" cy="11" r="8"></circle>
//                       <path d="m21 21-4.35-4.35"></path>
//                       <circle cx="11" cy="11" r="3"></circle>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">AI-Powered Candidate Search</h3>
//                   <p className="feature-description">
//                     Find the perfect match instantly with intelligent search
//                     that understands skills, experience, certifications, and
//                     availability patterns.
//                   </p>
//                   <ul className="feature-list">
//                     <li>Natural language search queries</li>
//                     <li>Smart skill matching algorithms</li>
//                     <li>Real-time availability tracking</li>
//                   </ul>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">Lightning-Fast VMS Job Sync</h3>
//                   <p className="feature-description">
//                     Seamlessly integrate with major VMS platforms. Jobs flow
//                     automatically into Artemis, eliminating manual data entry.
//                   </p>
//                   <ul className="feature-list">
//                     <li>Automatic job ingestion</li>
//                     <li>Real-time updates</li>
//                     <li>Multi-VMS support</li>
//                   </ul>
//                 </div>

//                 <div className="feature-slide-card">
//                   <div className="feature-icon-box-pro">
//                     <svg
//                       className="feature-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                       <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                     </svg>
//                   </div>
//                   <h3 className="feature-title">Built-In Skills Checklists</h3>
//                   <p className="feature-description">
//                     Interactive checklists that capture candidate qualifications
//                     with precision, convert to PDFs, and distribute to
//                     stakeholders instantly.
//                   </p>
//                   <ul className="feature-list">
//                     <li>Customizable checklist templates</li>
//                     <li>Digital signature collection</li>
//                     <li>Automated distribution</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* About Artemis Section */}
//       <section className="about-section" id="about">
//         <div className="content-container">
//           <div className="about-hero">
//             <h2 className="about-hero-title">
//               Built to bring clarity back to recruiting
//             </h2>
//             <p className="about-hero-subtitle">
//               Artemis combines cutting-edge AI technology with intuitive design
//               to deliver the most powerful yet simple ATS for healthcare
//               staffing agencies.
//             </p>
//           </div>

//           <div className="about-story-grid">
//             <div className="about-story-content">
//               <h3>Our Approach</h3>
//               <p>
//                 Born from real-world staffing challenges, Artemis was designed
//                 by industry veterans who understand the unique pressures of
//                 healthcare recruitment. We've eliminated the bloat and
//                 complexity that plague traditional ATS platforms, focusing
//                 instead on the features that actually drive placements.
//               </p>
//               <p>
//                 Every workflow, every interface element, and every automation
//                 has been carefully crafted to save you time while improving
//                 accuracy. Whether you're placing travel nurses, allied health
//                 professionals, or locum tenens physicians, Artemis adapts to
//                 your process—not the other way around.
//               </p>

//               <div className="about-stats-inline">
//                 <div className="stat-inline-item">
//                   <svg
//                     className="stat-icon"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="9" cy="7" r="4"></circle>
//                     <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                   </svg>
//                   <div>
//                     <div className="stat-inline-numbe">500+</div>
//                     <div className="stat-inline-label">Active Agencies</div>
//                   </div>
//                 </div>

//                 <div className="stat-inline-item">
//                   <svg
//                     className="stat-icon"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="8.5" cy="7" r="4"></circle>
//                     <polyline points="17 11 19 13 23 9"></polyline>
//                   </svg>
//                   <div>
//                     <div className="stat-inline-numbe">10K+</div>
//                     <div className="stat-inline-label">Candidates Placed</div>
//                   </div>
//                 </div>

//                 <div className="stat-inline-item">
//                   <svg
//                     className="stat-icon"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                   </svg>
//                   <div>
//                     <div className="stat-inline-numbe">99.9%</div>
//                     <div className="stat-inline-label">Platform Uptime</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="about-illustration">
//               <div className="illustration-card">
//                 <svg
//                   className="illustration-icon"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                 >
//                   <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
//                   <line x1="8" y1="21" x2="16" y2="21"></line>
//                   <line x1="12" y1="17" x2="12" y2="21"></line>
//                   <path d="M7 8h10M7 12h6"></path>
//                 </svg>
//                 <h4>Modern Platform</h4>
//                 <p>Cloud-based architecture built for speed and reliability</p>
//               </div>
//             </div>
//           </div>

//           <div className="about-mvv-grid">
//             <div className="mvv-card">
//               <div className="mvv-icon-wrapper">
//                 <svg
//                   className="mvv-icon"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <circle cx="12" cy="12" r="10"></circle>
//                   <polyline points="12 6 12 12 16 14"></polyline>
//                 </svg>
//               </div>
//               <h3>Our Mission</h3>
//               <p>
//                 To democratize enterprise-grade recruitment technology, making
//                 sophisticated ATS capabilities accessible to staffing agencies
//                 of all sizes. We believe powerful tools shouldn't come with
//                 complexity or prohibitive costs.
//               </p>
//             </div>

//             <div className="mvv-card">
//               <div className="mvv-icon-wrapper">
//                 <svg
//                   className="mvv-icon"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                   <circle cx="12" cy="12" r="3"></circle>
//                 </svg>
//               </div>
//               <h3>Our Vision</h3>
//               <p>
//                 To become the global standard for intelligent staffing
//                 solutions, where every recruiter has access to AI-powered tools
//                 that eliminate repetitive tasks and provide actionable insights
//                 that drive better hiring decisions.
//               </p>
//             </div>

//             <div className="mvv-card">
//               <div className="mvv-icon-wrapper">
//                 <svg
//                   className="mvv-icon"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
//                 </svg>
//               </div>
//               <h3>Core Values</h3>
//               <ul className="values-list">
//                 <li>
//                   <svg
//                     className="check-icon"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   <span>
//                     <strong>Simplicity First:</strong> Elegant interfaces that
//                     reduce training time
//                   </span>
//                 </li>
//                 <li>
//                   <svg
//                     className="check-icon"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   <span>
//                     <strong>Security by Design:</strong> Enterprise-grade
//                     protection for sensitive data
//                   </span>
//                 </li>
//                 <li>
//                   <svg
//                     className="check-icon"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   <span>
//                     <strong>Continuous Innovation:</strong> Regular updates
//                     driven by user feedback
//                   </span>
//                 </li>
//                 <li>
//                   <svg
//                     className="check-icon"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   <span>
//                     <strong>Customer Success:</strong> Your growth is our
//                     success
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="about-cta-banner">
//             <h3>Ready to Transform Your Staffing Operations?</h3>
//             <p>
//               Join hundreds of agencies already using Artemis to streamline
//               their recruitment process.
//             </p>
//             <a
//               href="#demo"
//               className="about-cta-button"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book a Demo
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section className="pricing-section" id="pricing">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">
//               Flexible Pricing for Every Stage of Growth
//             </h2>
//             <p className="section-subtitle-main">
//               Custom plans designed around your agency's unique needs
//             </p>
//           </div>

//           <div className="pricing-content">
//             <div className="pricing-card">
//               <h3>What's Included</h3>
//               <ul className="pricing-features-list">
//                 <li>✓ Unlimited users and candidates</li>
//                 <li>✓ AI-powered search and matching</li>
//                 <li>✓ VMS integration (Bullhorn, others)</li>
//                 <li>✓ Skills checklists with PDF generation</li>
//                 <li>✓ Right-to-Represent automation</li>
//                 <li>✓ Pipeline management tools</li>
//                 <li>✓ Credentials tracking</li>
//                 <li>✓ 24/7 customer support</li>
//                 <li>✓ Regular feature updates</li>
//                 <li>✓ Enterprise-grade security</li>
//               </ul>
//             </div>

//             <div className="pricing-card highlighted">
//               <h3>Why Custom Pricing?</h3>
//               <p>
//                 Every staffing agency operates differently. Your pricing should
//                 reflect your agency's size, placement volume, integration needs,
//                 and growth trajectory.
//               </p>
//               <p>
//                 We work with you to create a plan that makes sense for your
//                 business—no hidden fees, no surprise charges, no complicated
//                 tier systems.
//               </p>
//               <a
//                 href="#demo"
//                 className="pricing-cta"
//                 onClick={handleScrollTo("#demo")}
//               >
//                 Contact Us for Pricing
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Integrations Section */}
//       <section className="integrations-section" id="integrations">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">
//               Stay in Sync with Your Workflow
//             </h2>
//             <p className="section-subtitle-main">
//               Seamless connections to the tools you already use
//             </p>
//           </div>

//           <div className="integrations-content">
//             <div className="integration-card primary">
//               <div className="integration-icon-wrapper">
//                 <svg
//                   className="integration-icon-svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <circle cx="18" cy="5" r="3"></circle>
//                   <circle cx="6" cy="12" r="3"></circle>
//                   <circle cx="18" cy="19" r="3"></circle>
//                   <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
//                   <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
//                 </svg>
//               </div>
//               <h3>VMS Integrations</h3>
//               <p>
//   Connect Artemis to your Vendor Management Systems for automatic job feed
//   synchronization. New opportunities appear in Artemis instantly, ready for
//   candidate matching. Streamline your hiring process with real-time updates,
//   eliminating manual uploads and delays. Gain visibility across all job
//   channels from one centralized dashboard. Ensure every open role reaches the
//   right recruiters faster, improving response times and placement efficiency.
//   With Artemis, integrations work quietly in the background so your team can
//   focus on talent, not tedious data entry.
// </p>
//             </div>

//             <div className="integration-card">
//               <div className="integration-icon-wrapper">
//                 <svg
//                   className="integration-icon-svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
//                   <path d="M2 17l10 5 10-5"></path>
//                   <path d="M2 12l10 5 10-5"></path>
//                 </svg>
//               </div>
//               <h3>Coming Soon</h3>
//               <p>
//                 We're continuously expanding our integration ecosystem based on
//                 customer feedback.
//               </p>
//               <ul className="roadmap-list">
//                 <li>• Calendar sync (Google, Outlook)</li>
//                 <li>• Email integration</li>
//                 <li>• Background check providers</li>
//                 <li>• Payroll systems</li>
//                 <li>• Communication platforms</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Resources Section */}
//       <section className="resources-section" id="resources">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Resources & Insights</h2>
//             <p className="section-subtitle-main">
//               Expert guidance to transform your healthcare staffing operations
//             </p>
//           </div>

//           <div className="resources-grid">
//             <div className="resource-category-card">
//               <div className="category-icon-wrapper">
//                 <svg
//                   className="category-icon-svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
//                   <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
//                 </svg>
//               </div>
//               <h3>Practical Tips for Recruiters</h3>
//               <p>
//                 Time-saving strategies, workflow optimizations, and proven
//                 techniques to increase placement velocity and candidate
//                 satisfaction.
//               </p>
//             </div>

//             <div className="resource-category-card">
//               <div className="category-icon-wrapper">
//                 <svg
//                   className="category-icon-svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
//                   <line x1="8" y1="21" x2="16" y2="21"></line>
//                   <line x1="12" y1="17" x2="12" y2="21"></line>
//                 </svg>
//               </div>
//               <h3>Technology in Healthcare Staffing</h3>
//               <p>
//                 Explore how AI, automation, and modern ATS platforms are
//                 reshaping the healthcare staffing landscape.
//               </p>
//             </div>

//             <div className="resource-category-card">
//               <div className="category-icon-wrapper">
//                 <svg
//                   className="category-icon-svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <line x1="12" y1="1" x2="12" y2="23"></line>
//                   <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//                 </svg>
//               </div>
//               <h3>Industry Trends & Market Insights</h3>
//               <p>
//                 Stay ahead with analysis of healthcare labor markets, regulatory
//                 changes, and emerging opportunities.
//               </p>
//             </div>
//           </div>

//           <div className="newsletter-section">
//             <h3>Stay Updated</h3>
//             <p>Get the latest insights delivered to your inbox</p>
//             <div className="newsletter-form">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="newsletter-input"
//               />
//               <button className="newsletter-button">Subscribe</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Vision Teaser + CTA */}
//       <section className="vision-section">
//         <div className="content-container">
//           <div className="vision-content">
//             <h2>Experience Clarity in Every Click</h2>
//             <p>
//               Join hundreds of healthcare staffing agencies who have transformed
//               their recruitment process with Artemis. Faster placements, happier
//               teams, better outcomes.
//             </p>
//             <a
//               href="#demo"
//               className="vision-cta-button"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book Your Demo Today
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Book a Demo Section with REAL-TIME EMAIL VALIDATION */}
//       <section className="demo-section" id="demo">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Book a Demo</h2>
//             <p className="section-subtitle-main">
//               See Artemis in action and discover how we can transform your
//               staffing operations
//             </p>
//           </div>

//           <div className="demo-layout">
//             <div className="demo-form-container">
//               <form onSubmit={submitDemo} className="demo-form">
//                 <div className="form-row">
//                   <div className="form-field">
//                     <label htmlFor="firstName">First Name *</label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       required
//                       value={form.firstName}
//                       onChange={(e) =>
//                         setForm({ ...form, firstName: e.target.value })
//                       }
//                       placeholder="John"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                   <div className="form-field">
//                     <label htmlFor="lastName">Last Name *</label>
//                     <input
//                       type="text"
//                       id="lastName"
//                       required
//                       value={form.lastName}
//                       onChange={(e) =>
//                         setForm({ ...form, lastName: e.target.value })
//                       }
//                       placeholder="Doe"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-field">
//                     <label htmlFor="email">Work Email *</label>
//                     <input
//                       type="email"
//                       id="email"
//                       required
//                       value={form.email}
//                       onChange={handleEmailChange}
//                       placeholder="john.doe@company.com"
//                       className={emailError ? "input-error" : ""}
//                       disabled={isSubmitting}
//                     />
//                     {emailError && (
//                       <span className="error-label">{emailError}</span>
//                     )}
//                   </div>
//                   <div className="form-field">
//                     <label htmlFor="phone">Phone *</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       required
//                       value={form.phone}
//                       onChange={(e) =>
//                         setForm({ ...form, phone: e.target.value })
//                       }
//                       placeholder="Please enter the phone number"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-field full-width">
//                   <label htmlFor="company">Company *</label>
//                   <input
//                     type="text"
//                     id="company"
//                     required
//                     value={form.company}
//                     onChange={(e) =>
//                       setForm({ ...form, company: e.target.value })
//                     }
//                     placeholder="Your Company Name"
//                     disabled={isSubmitting}
//                   />
//                 </div>

//                 <div className="form-row">
//                   <div className="form-field">
//                     <label htmlFor="country">Country *</label>
//                     <select
//                       id="country"
//                       required
//                       value={form.country}
//                       onChange={handleCountryChange}
//                       disabled={isSubmitting}
//                     >
//                       <option value="">Select Country</option>
//                       {countries.map((country) => (
//                         <option key={country.iso2} value={country.iso2}>
//                           {country.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="form-field">
//                     <label htmlFor="state">State/Province *</label>
//                     <select
//                       id="state"
//                       required
//                       value={form.state}
//                       onChange={handleStateChange}
//                       disabled={!form.country || loadingStates || isSubmitting}
//                     >
//                       <option value="">
//                         {loadingStates ? "Loading..." : "Select State"}
//                       </option>
//                       {states.map((state) => (
//                         <option key={state.iso2} value={state.iso2}>
//                           {state.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="form-field full-width">
//                   <label htmlFor="city">City *</label>
//                   <select
//                     id="city"
//                     required
//                     value={form.city}
//                     onChange={(e) => setForm({ ...form, city: e.target.value })}
//                     disabled={!form.state || loadingCities || isSubmitting}
//                   >
//                     <option value="">
//                       {loadingCities ? "Loading..." : "Select City"}
//                     </option>
//                     {cities.map((city, index) => (
//                       <option key={index} value={city.name}>
//                         {city.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-field full-width">
//                   <label htmlFor="source">How did you hear about us? *</label>
//                   <select
//                     id="source"
//                     required
//                     value={form.source}
//                     onChange={(e) =>
//                       setForm({ ...form, source: e.target.value })
//                     }
//                     disabled={isSubmitting}
//                   >
//                     <option value="">Select one</option>
//                     <option value="google">Google Search</option>
//                     <option value="linkedin">LinkedIn</option>
//                     <option value="referral">Referral / Word of Mouth</option>
//                     <option value="conference">Conference / Event</option>
//                     <option value="email">Email Outreach</option>
//                     <option value="customer">Existing Customer</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 <button 
//                   type="submit" 
//                   className={`demo-submit-button ${isSubmitting ? 'submitting' : ''}`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="button-spinner"></div>
//                       Scheduling...
//                     </>
//                   ) : (
//                     'Request Demo'
//                   )}
//                 </button>
//               </form>
//             </div>

//             <div className="demo-info-container">
//               <h3>What to Expect</h3>
//               <ul className="expectations-list">
//                 <li>
//                   <div className="expectation-icon-wrapper">
//                     <svg
//                       className="expectation-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <path d="M12 6v6l4 2"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <strong>Personalized Walkthrough</strong>
//                     <p>
//                       See Artemis configured for your agency's specific
//                       workflows
//                     </p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="expectation-icon-wrapper">
//                     <svg
//                       className="expectation-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <polyline points="12 6 12 12 16 14"></polyline>
//                     </svg>
//                   </div>
//                   <div>
//                     <strong>30-Minute Session</strong>
//                     <p>Quick, focused demo that respects your time</p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="expectation-icon-wrapper">
//                     <svg
//                       className="expectation-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <strong>Q&A Included</strong>
//                     <p>
//                       Ask anything about features, pricing, or implementation
//                     </p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="expectation-icon-wrapper">
//                     <svg
//                       className="expectation-icon-svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <line x1="18" y1="20" x2="18" y2="10"></line>
//                       <line x1="12" y1="20" x2="12" y2="4"></line>
//                       <line x1="6" y1="20" x2="6" y2="14"></line>
//                     </svg>
//                   </div>
//                   <div>
//                     <strong>Live Platform Access</strong>
//                     <p>Hands-on experience with real candidate and job data</p>
//                   </div>
//                 </li>
//               </ul>

//               <div className="social-proof">
//                 <p className="proof-label">Trusted by leading agencies</p>
//                 <div className="proof-stats">
//                   <span>⭐⭐⭐⭐⭐ 4.9/5 Rating</span>
//                   <span>500+ Active Users</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="site-footer" id="contact">
//         <div className="footer-content">
//           <div className="footer-column">
//             <h4>Artemis ATS</h4>
//             <p>
//               AI-powered recruitment technology for healthcare staffing
//               excellence.
//             </p>
//             <div className="social-link">
//               <a href="#" aria-label="LinkedIn">
//                 LinkedIn
//               </a>
//               <a href="#" aria-label="Facebook">
//                 Facebook
//               </a>
//               <a href="#" aria-label="Twitter">
//                 Twitter
//               </a>
//             </div>
//           </div>

//           <div className="footer-column">
//             <h4>Quick Links</h4>
//             <a href="#home" onClick={handleScrollTo("#home")}>
//               Home
//             </a>
//             <a href="#about" onClick={handleScrollTo("#about")}>
//               About
//             </a>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>
//               Superpowers
//             </a>
//             <a href="#pricing" onClick={handleScrollTo("#pricing")}>
//               Pricing
//             </a>
//             <a href="#integrations" onClick={handleScrollTo("#integrations")}>
//               Integrations
//             </a>
//             <a href="#resources" onClick={handleScrollTo("#resources")}>
//               Resources
//             </a>
//           </div>

//           <div className="footer-column">
//             <h4>Contact</h4>
//             <p>📧 support@theartemis.ai</p>
//           </div>
//         </div>

//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Theartemis. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;























































"use client";
import { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Head from "next/head";
import * as THREE from "three";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './globals.css'; 

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  country: string;
  state: string;
  city: string;
  source: string;
}

interface Country {
  name: string;
  iso2: string;
}

interface State {
  name: string;
  iso2: string;
}

interface City {
  name: string;
}

const Home: NextPage = () => {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    country: "",
    state: "",
    city: "",
    source: "",
  });
  
  const [emailError, setEmailError] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Slider refs for manual control
  const challengeSliderRef = useRef<HTMLDivElement>(null);
  const successSliderRef = useRef<HTMLDivElement>(null);
  const featureSliderRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const moonCanvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);

  // Enhanced Toast Notifications
  const showSuccessToast = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        fontWeight: "500",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
      },
    });
  };

  const showErrorToast = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
        color: "white",
        fontWeight: "500",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
      },
    });
  };

  // Enhanced form validation
  const validateForm = (): boolean => {
    if (!form.firstName.trim() || form.firstName.length < 2) {
      showErrorToast("Please enter a valid first name (at least 2 characters)");
      return false;
    }

    if (!form.lastName.trim() || form.lastName.length < 2) {
      showErrorToast("Please enter a valid last name (at least 2 characters)");
      return false;
    }

    if (!validateEmail(form.email)) {
      showErrorToast("Please enter a valid work email address");
      return false;
    }

    const phoneRegex = /^[0-9+()\-\s]{7,20}$/;
    if (!phoneRegex.test(form.phone)) {
      showErrorToast("Please enter a valid phone number (7-20 characters)");
      return false;
    }

    if (!form.company.trim() || form.company.length < 2) {
      showErrorToast("Please enter a valid company name");
      return false;
    }

    if (!form.country) {
      showErrorToast("Please select a country");
      return false;
    }

    if (!form.state) {
      showErrorToast("Please select a state");
      return false;
    }

    if (!form.city) {
      showErrorToast("Please select a city");
      return false;
    }

    if (!form.source) {
      showErrorToast("Please tell us how you heard about us");
      return false;
    }

    return true;
  };

  // Enhanced demo submission with better toast notifications
  const submitDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Show loading state
    const toastId = toast.loading("Scheduling your demo...", {
      position: "top-right",
      theme: "light",
    });

    try {
      const result = await emailjs.send(
        "service_245y37w",
        "template_bca0q3m",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          company: form.company,
          country: form.country,
          state: form.state,
          city: form.city,
          source: form.source,
          submittedAt: new Date().toISOString(),
        },
        "GqiI7hbjYCg0jB6-Z"
      );

      // Dismiss loading toast
      toast.dismiss(toastId);

      if (result.status === 200) {
        showSuccessToast(
          `🎉 Demo booked successfully, ${form.firstName}! We'll contact you within 24 hours to confirm your schedule.`
        );

        // Reset form
        setForm({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          company: "",
          country: "",
          state: "",
          city: "",
          source: "",
        });
        setEmailError("");
        setStates([]);
        setCities([]);
      }
    } catch (error: any) {
      // Dismiss loading toast
      toast.dismiss(toastId);
      
      console.error("Failed to send email:", error);
      showErrorToast(
        "😔 Something went wrong. Please try again or contact us directly at support@theartemis.ai"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Real-time email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setForm({ ...form, email });

    if (email.length > 0 && !validateEmail(email)) {
      setEmailError(
        "Please enter email in correct format (example@domain.com)"
      );
    } else {
      setEmailError("");
    }
  };

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://api.countrystatecity.in/v1/countries",
        {
          headers: {
            "X-CSCAPI-KEY":
              "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
          },
        }
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      showErrorToast("Failed to load countries. Please refresh the page.");
    }
  };

  const fetchStates = async (countryCode: string) => {
    setLoadingStates(true);
    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
          },
        }
      );
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
      showErrorToast("Failed to load states. Please try again.");
    }
    setLoadingStates(false);
  };

  const fetchCities = async (countryCode: string, stateCode: string) => {
    setLoadingCities(true);
    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
          },
        }
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      showErrorToast("Failed to load cities. Please try again.");
    }
    setLoadingCities(false);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    setForm({ ...form, country: countryCode, state: "", city: "" });
    setStates([]);
    setCities([]);
    if (countryCode) {
      fetchStates(countryCode);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = e.target.value;
    setForm({ ...form, state: stateCode, city: "" });
    setCities([]);
    if (stateCode && form.country) {
      fetchCities(form.country, stateCode);
    }
  };

  // Three.js effect - wrapped in useEffect and client-side check
  useEffect(() => {
    if (!canvasRef.current || typeof window === "undefined") return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    const sizesArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colorsArray[i] = 0.4 + Math.random() * 0.6;
        if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
        if (i % 3 === 2) colorsArray[i] = 0.8 + Math.random() * 0.2;
      } else if (colorChoice < 0.66) {
        colorsArray[i] = 0.7 + Math.random() * 0.3;
        if (i % 3 === 0) colorsArray[i] = 0.4 + Math.random() * 0.3;
        if (i % 3 === 2) colorsArray[i] = 0.6 + Math.random() * 0.4;
      } else {
        colorsArray[i] = 0.8 + Math.random() * 0.2;
        if (i % 3 === 0) colorsArray[i] = 0.9 + Math.random() * 0.1;
        if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
      }
    }

    for (let i = 0; i < particlesCount; i++) {
      sizesArray[i] = Math.random() * 0.05;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsArray, 3)
    );
    particlesGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(sizesArray, 1)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    particlesMeshRef.current = particlesMesh;
    scene.add(particlesMesh);

    const bluePlanetGroup = new THREE.Group();
    const bluePlanetGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const bluePlanetMaterial = new THREE.MeshStandardMaterial({
      color: 0x6b9fff,
      metalness: 0.3,
      roughness: 0.5,
      emissive: 0x4a7acc,
      emissiveIntensity: 0.1,
    });
    const bluePlanet = new THREE.Mesh(bluePlanetGeometry, bluePlanetMaterial);
    bluePlanetGroup.add(bluePlanet);
    bluePlanetGroup.position.set(35, 15, -40);
    scene.add(bluePlanetGroup);

    const orangePlanetGroup = new THREE.Group();
    const orangePlanetGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const orangePlanetMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaa66,
      metalness: 0.2,
      roughness: 0.6,
      emissive: 0xcc6633,
      emissiveIntensity: 0.08,
    });
    const orangePlanet = new THREE.Mesh(
      orangePlanetGeometry,
      orangePlanetMaterial
    );
    orangePlanetGroup.add(orangePlanet);
    orangePlanetGroup.position.set(-30, -12, -45);
    scene.add(orangePlanetGroup);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.15, 50);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
    scene.add(hemisphereLight);

    camera.position.set(0, 0, 20);

    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const handleScroll = (): void => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    const handleMouseMove = (event: MouseEvent): void => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousemove", handleMouseMove);

    const animate = (): void => {
      requestAnimationFrame(animate);
      time += 0.01;

      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.y += 0.0005;
        particlesMeshRef.current.rotation.x += 0.0003;

        const parallaxY = scrollY * 0.001;
        particlesMeshRef.current.position.y = -parallaxY * 2;
        particlesMeshRef.current.position.x = Math.sin(time * 0.5) * 0.5;
      }

      if (cameraRef.current) {
        cameraRef.current.position.x +=
          (mouseX - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y +=
          (-mouseY - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(scene.position);

        const baseZ = 20;
        cameraRef.current.position.z = baseZ;

        const scrollEffect = scrollY * 0.001;
        cameraRef.current.rotation.z = scrollEffect * 0.05;
      }

      pointLight.position.x = Math.sin(time) * 2.5;
      pointLight.position.y = Math.cos(time) * 2.5;

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    const handleResize = (): void => {
      if (cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (canvasRef.current && rendererRef.current?.domElement) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Enhanced handleScrollTo function to prevent default behavior
  const handleScrollTo = (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  // Navigation functions for sliders
  const scrollSlider = (
  sliderRef: React.RefObject<HTMLDivElement | null>,
  direction: 'left' | 'right'
) => {
    if (!sliderRef.current) return;
    
    const slider = sliderRef.current;
    const scrollAmount = 400; // Adjust based on your card width + gap
    
    if (direction === 'left') {
      slider.scrollLeft -= scrollAmount;
    } else {
      slider.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="app">
      <Head>
        <title>Artemis - AI-powered ATS for Healthcare Staffing</title>
        <meta name="description" content="Recruit faster with clarity, not clutter. Streamlined workflows, intelligent automation, and minimalist design for healthcare staffing teams." />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          zIndex: 9999,
        }}
      />

      <div className="gradient-bg"></div>
      <div className="stars-container" ref={starsContainerRef}></div>
      <canvas
        ref={moonCanvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div id="canvas-container" ref={canvasRef} />

      {/* Enhanced Navigation Bar */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="brand-section">
            <div className="artemis-logo">
              <svg
                className="logo-svg"
                viewBox="0 0 140 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="logoGradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                  <linearGradient
                    id="logoGradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6ea8fe" />
                    <stop offset="100%" stopColor="#667eea" />
                  </linearGradient>
                  <linearGradient
                    id="logoGradient3"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="50%" stopColor="#764ba2" />
                    <stop offset="100%" stopColor="#6ea8fe" />
                  </linearGradient>
                </defs>

                {/* Logo Text */}
                <g className="logo-text">
                  <text
                    x="45"
                    y="32"
                    fontFamily="'Poppins', sans-serif"
                    fontWeight="700"
                    fontSize="20"
                    fill="url(#logoGradient3)"
                    letterSpacing="1"
                  >
                    ARTEMIS
                  </text>
                </g>
              </svg>
            </div>
          </div>

          <div
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
            <div className="nav-links-group">
              <a
                href="#home"
                onClick={handleScrollTo("#home")}
                className="nav-link"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={handleScrollTo("#about")}
                className="nav-link"
              >
                About
              </a>
              <a
                href="#superpowers"
                onClick={handleScrollTo("#superpowers")}
                className="nav-link"
              >
                Superpowers
              </a>
              <a
                href="/News"
                // onClick={handleScrollTo("#superpowers")}
                className="nav-link"
              >
                News
              </a>
              <a
                href="/Blog"
                // onClick={handleScrollTo("#pricing")}
                className="nav-link"
              >
                Blog
              </a>
              <a
                href="/Press"
                // onClick={handleScrollTo("#integrations")}
                className="nav-link"
              >
                Press
              </a>
              <a
                href="/Article"
                // onClick={handleScrollTo("#resources")}
                className="nav-link"
              >
                Article
              </a>
            </div>
            <a
              href="#demo"
              className="nav-cta-button"
              onClick={handleScrollTo("#demo")}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            AI-powered ATS for Healthcare Staffing
          </div>
          <h1 className="hero-title">
            Recruit faster with clarity, not clutter.
          </h1>
          <p className="hero-description">
            Streamlined workflows, intelligent automation, and minimalist design
            that empowers healthcare staffing teams to focus on what matters
            most: connecting great talent with exceptional opportunities.
          </p>
          <div className="hero-cta-group">
            <a
              href="#demo"
              className="hero-primary-cta"
              onClick={handleScrollTo("#demo")}
            >
              Book a Demo
            </a>
            <a
              href="#superpowers"
              className="hero-secondary-cta"
              onClick={handleScrollTo("#superpowers")}
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* The Challenge Section with Navigation Buttons */}
      <section className="challenge-section" id="challenge">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">The Challenge We Solve</h2>
            <p className="section-subtitle-main">
              Healthcare staffing agencies face overwhelming complexity in their
              daily operations
            </p>
          </div>
          <div className="slider-wrapper-with-nav">
            <button 
              className="slider-nav-btn-absolute slider-nav-left"
              onClick={() => scrollSlider(challengeSliderRef, 'left')}
              aria-label="Previous challenges"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="slider-container-infinite-wrapper">
              <div className="slider-container-infinite" ref={challengeSliderRef}>
                <div className="slider-track-infinite challenge-slider">
                  {/* Original Set */}
                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <h3 className="feature-title">Time-Consuming Manual Work</h3>
                    <p className="feature-description">
                      Hours spent on resume parsing, data entry, and candidate
                      tracking that could be automated, pulling recruiters away
                      from relationship building.
                    </p>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                    </div>
                    <h3 className="feature-title">
                      Difficulty Finding Qualified Talent
                    </h3>
                    <p className="feature-description">
                      Traditional search methods make it nearly impossible to
                      quickly identify candidates with the right skills,
                      certifications, and availability.
                    </p>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    </div>
                    <h3 className="feature-title">Disconnected Systems</h3>
                    <p className="feature-description">
                      VMS platforms, ATS software, and communication tools
                      operating in silos, creating data gaps and workflow
                      friction.
                    </p>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 11H3v5a2 2 0 0 0 2 2h4"></path>
                        <path d="M9 7V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"></path>
                        <path d="M15 11h6v5a2 2 0 0 1-2 2h-4"></path>
                        <path d="M15 7V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
                      </svg>
                    </div>
                    <h3 className="feature-title">
                      Compliance & Credentialing Complexity
                    </h3>
                    <p className="feature-description">
                      Tracking licenses, certifications, and compliance
                      documentation across dozens or hundreds of healthcare
                      professionals is error-prone and stressful.
                    </p>
                  </div>

                  {/* Duplicate Set for Infinite Loop */}
                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <h3 className="feature-title">Time-Consuming Manual Work</h3>
                    <p className="feature-description">
                      Hours spent on resume parsing, data entry, and candidate
                      tracking that could be automated, pulling recruiters away
                      from relationship building.
                    </p>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                    </div>
                    <h3 className="feature-title">
                      Difficulty Finding Qualified Talent
                    </h3>
                    <p className="feature-description">
                      Traditional search methods make it nearly impossible to
                      quickly identify candidates with the right skills,
                      certifications, and availability.
                    </p>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    </div>
                    <h3 className="feature-title">Disconnected Systems</h3>
                    <p className="feature-description">
                      VMS platforms, ATS software, and communication tools
                      operating in silos, creating data gaps and workflow
                      friction.
                    </p>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 11H3v5a2 2 0 0 0 2 2h4"></path>
                        <path d="M9 7V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"></path>
                        <path d="M15 11h6v5a2 2 0 0 1-2 2h-4"></path>
                        <path d="M15 7V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
                      </svg>
                    </div>
                    <h3 className="feature-title">
                      Compliance & Credentialing Complexity
                    </h3>
                    <p className="feature-description">
                      Tracking licenses, certifications, and compliance
                      documentation across dozens or hundreds of healthcare
                      professionals is error-prone and stressful.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="slider-nav-btn-absolute slider-nav-right"
              onClick={() => scrollSlider(challengeSliderRef, 'right')}
              aria-label="Next challenges"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Success Stories Slider with Navigation Buttons */}
      <section className="success-slider-section">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">
              Trusted by Leading Healthcare Staffing Agencies
            </h2>
            <p className="section-subtitle-main">
              Join hundreds of agencies achieving remarkable results with
              Artemis
            </p>
          </div>

          <div className="slider-wrapper-with-nav">
            <button 
              className="slider-nav-btn-absolute slider-nav-left"
              onClick={() => scrollSlider(successSliderRef, 'left')}
              aria-label="Previous success stories"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="slider-container-infinite-wrapper">
              <div className="slider-container-infinite" ref={successSliderRef}>
                <div className="slider-track-infinite success-slider">
                  {/* Success slides - Original Set */}
                  <div className="success-slide">
                    <div className="success-slide-content">
                      <div className="success-metric">
                        <div className="metric-value">67%</div>
                        <div className="metric-label">Faster Time-to-Submit</div>
                      </div>
                      <div className="success-company">
                        <div className="company-logo-placeholder">
                          <svg viewBox="0 0 40 40" fill="none">
                            <rect
                              width="40"
                              height="40"
                              rx="8"
                              fill="url(#companyGrad1)"
                            />
                            <path
                              d="M20 10 L30 20 L20 30 L10 20 Z"
                              fill="white"
                              opacity="0.9"
                            />
                            <defs>
                              <linearGradient
                                id="companyGrad1"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#667eea" />
                                <stop offset="100%" stopColor="#764ba2" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className="company-info">
                          <div className="company-name">HealthStaff Pro</div>
                          <div className="company-type">
                            Travel Nursing Agency
                          </div>
                        </div>
                      </div>
                      <p className="success-quote">
                        "Artemis transformed our candidate submission process.
                        What used to take hours now takes minutes."
                      </p>
                    </div>
                  </div>

                  <div className="success-slide">
                    <div className="success-slide-content">
                      <div className="success-metric">
                        <div className="metric-value">3.2x</div>
                        <div className="metric-label">
                          More Placements Per Month
                        </div>
                      </div>
                      <div className="success-company">
                        <div className="company-logo-placeholder">
                          <svg viewBox="0 0 40 40" fill="none">
                            <rect
                              width="40"
                              height="40"
                              rx="8"
                              fill="url(#companyGrad2)"
                            />
                            <circle
                              cx="20"
                              cy="20"
                              r="12"
                              stroke="white"
                              strokeWidth="2"
                              fill="none"
                            />
                            <path
                              d="M20 14 L20 26 M14 20 L26 20"
                              stroke="white"
                              strokeWidth="2"
                            />
                            <defs>
                              <linearGradient
                                id="companyGrad2"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#6ea8fe" />
                                <stop offset="100%" stopColor="#667eea" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className="company-info">
                          <div className="company-name">MedTalent Solutions</div>
                          <div className="company-type">
                            Allied Health Staffing
                          </div>
                        </div>
                      </div>
                      <p className="success-quote">
                        "The AI-powered matching helped us scale our placement
                        volume without adding headcount."
                      </p>
                    </div>
                  </div>

                  <div className="success-slide">
                    <div className="success-slide-content">
                      <div className="success-metric">
                        <div className="metric-value">$420K</div>
                        <div className="metric-label">Annual Cost Savings</div>
                      </div>
                      <div className="success-company">
                        <div className="company-logo-placeholder">
                          <svg viewBox="0 0 40 40" fill="none">
                            <rect
                              width="40"
                              height="40"
                              rx="8"
                              fill="url(#companyGrad3)"
                            />
                            <path
                              d="M20 8 L32 20 L20 32 L8 20 Z"
                              stroke="white"
                              strokeWidth="2"
                              fill="none"
                            />
                            <circle cx="20" cy="20" r="4" fill="white" />
                            <defs>
                              <linearGradient
                                id="companyGrad3"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#764ba2" />
                                <stop offset="100%" stopColor="#667eea" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className="company-info">
                          <div className="company-name">
                            Apex Healthcare Staffing
                          </div>
                          <div className="company-type">
                            Multi-Specialty Agency
                          </div>
                        </div>
                      </div>
                      <p className="success-quote">
                        "ROI was immediate. Artemis paid for itself in the first
                        quarter through efficiency gains alone."
                      </p>
                    </div>
                  </div>

                  <div className="success-slide">
                    <div className="success-slide-content">
                      <div className="success-metric">
                        <div className="metric-value">94%</div>
                        <div className="metric-label">Candidate Satisfaction</div>
                      </div>
                      <div className="success-company">
                        <div className="company-logo-placeholder">
                          <svg viewBox="0 0 40 40" fill="none">
                            <rect
                              width="40"
                              height="40"
                              rx="8"
                              fill="url(#companyGrad4)"
                            />
                            <path
                              d="M10 20 Q20 10 30 20 Q20 30 10 20"
                              fill="white"
                              opacity="0.9"
                            />
                            <defs>
                              <linearGradient
                                id="companyGrad4"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#667eea" />
                                <stop offset="100%" stopColor="#6ea8fe" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className="company-info">
                          <div className="company-name">
                            CareLink Professionals
                          </div>
                          <div className="company-type">
                            Locum Tenens Placement
                          </div>
                        </div>
                      </div>
                      <p className="success-quote">
                        "Our candidates love the smooth onboarding experience.
                        It's a competitive advantage for us."
                      </p>
                    </div>
                  </div>

                  {/* Duplicate Set for Infinite Loop */}
                  <div className="success-slide">
                    <div className="success-slide-content">
                      <div className="success-metric">
                        <div className="metric-value">67%</div>
                        <div className="metric-label">Faster Time-to-Submit</div>
                      </div>
                      <div className="success-company">
                        <div className="company-logo-placeholder">
                          <svg viewBox="0 0 40 40" fill="none">
                            <rect
                              width="40"
                              height="40"
                              rx="8"
                              fill="url(#companyGrad1a)"
                            />
                            <path
                              d="M20 10 L30 20 L20 30 L10 20 Z"
                              fill="white"
                              opacity="0.9"
                            />
                            <defs>
                              <linearGradient
                                id="companyGrad1a"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#667eea" />
                                <stop offset="100%" stopColor="#764ba2" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className="company-info">
                          <div className="company-name">HealthStaff Pro</div>
                          <div className="company-type">
                            Travel Nursing Agency
                          </div>
                        </div>
                      </div>
                      <p className="success-quote">
                        "Artemis transformed our candidate submission process.
                        What used to take hours now takes minutes."
                      </p>
                    </div>
                  </div>

                  <div className="success-slide">
                    <div className="success-slide-content">
                      <div className="success-metric">
                        <div className="metric-value">3.2x</div>
                        <div className="metric-label">
                          More Placements Per Month
                        </div>
                      </div>
                      <div className="success-company">
                        <div className="company-logo-placeholder">
                          <svg viewBox="0 0 40 40" fill="none">
                            <rect
                              width="40"
                              height="40"
                              rx="8"
                              fill="url(#companyGrad2a)"
                            />
                            <circle
                              cx="20"
                              cy="20"
                              r="12"
                              stroke="white"
                              strokeWidth="2"
                              fill="none"
                            />
                            <path
                              d="M20 14 L20 26 M14 20 L26 20"
                              stroke="white"
                              strokeWidth="2"
                            />
                            <defs>
                              <linearGradient
                                id="companyGrad2a"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#6ea8fe" />
                                <stop offset="100%" stopColor="#667eea" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className="company-info">
                          <div className="company-name">MedTalent Solutions</div>
                          <div className="company-type">
                            Allied Health Staffing
                          </div>
                        </div>
                      </div>
                      <p className="success-quote">
                        "The AI-powered matching helped us scale our placement
                        volume without adding headcount."
                      </p>
                    </div>
                  </div>

                  <div className="success-slide">
                    <div className="success-slide-content">
                      <div className="success-metric">
                        <div className="metric-value">$420K</div>
                        <div className="metric-label">Annual Cost Savings</div>
                      </div>
                      <div className="success-company">
                        <div className="company-logo-placeholder">
                          <svg viewBox="0 0 40 40" fill="none">
                            <rect
                              width="40"
                              height="40"
                              rx="8"
                              fill="url(#companyGrad3a)"
                            />
                            <path
                              d="M20 8 L32 20 L20 32 L8 20 Z"
                              stroke="white"
                              strokeWidth="2"
                              fill="none"
                            />
                            <circle cx="20" cy="20" r="4" fill="white" />
                            <defs>
                              <linearGradient
                                id="companyGrad3a"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#764ba2" />
                                <stop offset="100%" stopColor="#667eea" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className="company-info">
                          <div className="company-name">
                            Apex Healthcare Staffing
                          </div>
                          <div className="company-type">
                            Multi-Specialty Agency
                          </div>
                        </div>
                      </div>
                      <p className="success-quote">
                        "ROI was immediate. Artemis paid for itself in the first
                        quarter through efficiency gains alone."
                      </p>
                    </div>
                  </div>

                  <div className="success-slide">
                    <div className="success-slide-content">
                      <div className="success-metric">
                        <div className="metric-value">94%</div>
                        <div className="metric-label">Candidate Satisfaction</div>
                      </div>
                      <div className="success-company">
                        <div className="company-logo-placeholder">
                          <svg viewBox="0 0 40 40" fill="none">
                            <rect
                              width="40"
                              height="40"
                              rx="8"
                              fill="url(#companyGrad4a)"
                            />
                            <path
                              d="M10 20 Q20 10 30 20 Q20 30 10 20"
                              fill="white"
                              opacity="0.9"
                            />
                            <defs>
                              <linearGradient
                                id="companyGrad4a"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#667eea" />
                                <stop offset="100%" stopColor="#6ea8fe" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className="company-info">
                          <div className="company-name">
                            CareLink Professionals
                          </div>
                          <div className="company-type">
                            Locum Tenens Placement
                          </div>
                        </div>
                      </div>
                      <p className="success-quote">
                        "Our candidates love the smooth onboarding experience.
                        It's a competitive advantage for us."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="slider-nav-btn-absolute slider-nav-right"
              onClick={() => scrollSlider(successSliderRef, 'right')}
              aria-label="Next success stories"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights with Navigation Buttons */}
      <section className="highlights-section" id="superpowers">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">Talent Superpowers</h2>
            <p className="section-subtitle-main">
              Designed for recruiters. Powered by AI. Built for speed and
              simplicity.
            </p>
          </div>

          <div className="slider-wrapper-with-nav">
            <button 
              className="slider-nav-btn-absolute slider-nav-left"
              onClick={() => scrollSlider(featureSliderRef, 'left')}
              aria-label="Previous features"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="slider-container-infinite-wrapper">
              <div className="slider-container-infinite" ref={featureSliderRef}>
                <div className="slider-track-infinite features-slider">
                  {/* Original Set */}
                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                        <circle cx="11" cy="11" r="3"></circle>
                      </svg>
                    </div>
                    <h3 className="feature-title">AI-Powered Candidate Search</h3>
                    <p className="feature-description">
                      Find the perfect match instantly with intelligent search
                      that understands skills, experience, certifications, and
                      availability patterns.
                    </p>
                    <ul className="feature-list">
                      <li>Natural language search queries</li>
                      <li>Smart skill matching algorithms</li>
                      <li>Real-time availability tracking</li>
                    </ul>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
                      </svg>
                    </div>
                    <h3 className="feature-title">Lightning-Fast VMS Job Sync</h3>
                    <p className="feature-description">
                      Seamlessly integrate with major VMS platforms. Jobs flow
                      automatically into Artemis, eliminating manual data entry.
                    </p>
                    <ul className="feature-list">
                      <li>Automatic job ingestion</li>
                      <li>Real-time updates</li>
                      <li>Multi-VMS support</li>
                    </ul>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h3 className="feature-title">Built-In Skills Checklists</h3>
                    <p className="feature-description">
                      Interactive checklists that capture candidate qualifications
                      with precision, convert to PDFs, and distribute to
                      stakeholders instantly.
                    </p>
                    <ul className="feature-list">
                      <li>Customizable checklist templates</li>
                      <li>Digital signature collection</li>
                      <li>Automated distribution</li>
                    </ul>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </div>
                    <h3 className="feature-title">Smart Onboarding Dashboards</h3>
                    <p className="feature-description">
                      Visual pipelines that show exactly where every candidate
                      stands, with automated reminders and next-step
                      recommendations.
                    </p>
                    <ul className="feature-list">
                      <li>Drag-and-drop pipeline management</li>
                      <li>Automated workflow triggers</li>
                      <li>Real-time status updates</li>
                    </ul>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <h3 className="feature-title">
                      Candidate Pipeline Management
                    </h3>
                    <p className="feature-description">
                      Design dynamic, stage-based workflows that adapt to your
                      process. Never lose track of a candidate again.
                    </p>
                    <ul className="feature-list">
                      <li>Customizable pipeline stages</li>
                      <li>Bulk candidate actions</li>
                      <li>Advanced filtering</li>
                    </ul>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                      </svg>
                    </div>
                    <h3 className="feature-title">
                      Right-to-Represent Automation
                    </h3>
                    <p className="feature-description">
                      Send RTR forms instantly, track signatures, and maintain
                      compliance documentation—all within a single, streamlined
                      workflow.
                    </p>
                    <ul className="feature-list">
                      <li>One-click RTR distribution</li>
                      <li>E-signature integration</li>
                      <li>Automatic record keeping</li>
                    </ul>
                  </div>

                  {/* Duplicate Set for Infinite Loop */}
                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                        <circle cx="11" cy="11" r="3"></circle>
                      </svg>
                    </div>
                    <h3 className="feature-title">AI-Powered Candidate Search</h3>
                    <p className="feature-description">
                      Find the perfect match instantly with intelligent search
                      that understands skills, experience, certifications, and
                      availability patterns.
                    </p>
                    <ul className="feature-list">
                      <li>Natural language search queries</li>
                      <li>Smart skill matching algorithms</li>
                      <li>Real-time availability tracking</li>
                    </ul>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
                      </svg>
                    </div>
                    <h3 className="feature-title">Lightning-Fast VMS Job Sync</h3>
                    <p className="feature-description">
                      Seamlessly integrate with major VMS platforms. Jobs flow
                      automatically into Artemis, eliminating manual data entry.
                    </p>
                    <ul className="feature-list">
                      <li>Automatic job ingestion</li>
                      <li>Real-time updates</li>
                      <li>Multi-VMS support</li>
                    </ul>
                  </div>

                  <div className="feature-slide-card">
                    <div className="feature-icon-box-pro">
                      <svg
                        className="feature-icon-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h3 className="feature-title">Built-In Skills Checklists</h3>
                    <p className="feature-description">
                      Interactive checklists that capture candidate qualifications
                      with precision, convert to PDFs, and distribute to
                      stakeholders instantly.
                    </p>
                    <ul className="feature-list">
                      <li>Customizable checklist templates</li>
                      <li>Digital signature collection</li>
                      <li>Automated distribution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="slider-nav-btn-absolute slider-nav-right"
              onClick={() => scrollSlider(featureSliderRef, 'right')}
              aria-label="Next features"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* About Artemis Section */}
      <section className="about-section" id="about">
        <div className="content-container">
          <div className="about-hero">
            <h2 className="about-hero-title">
              Built to bring clarity back to recruiting
            </h2>
            <p className="about-hero-subtitle">
              Artemis combines cutting-edge AI technology with intuitive design
              to deliver the most powerful yet simple ATS for healthcare
              staffing agencies.
            </p>
          </div>

          <div className="about-story-grid">
            <div className="about-story-content">
              <h3>Our Approach</h3>
              <p>
                Born from real-world staffing challenges, Artemis was designed
                by industry veterans who understand the unique pressures of
                healthcare recruitment. We've eliminated the bloat and
                complexity that plague traditional ATS platforms, focusing
                instead on the features that actually drive placements.
              </p>
              <p>
                Every workflow, every interface element, and every automation
                has been carefully crafted to save you time while improving
                accuracy. Whether you're placing travel nurses, allied health
                professionals, or locum tenens physicians, Artemis adapts to
                your process—not the other way around.
              </p>

              <div className="about-stats-inline">
                <div className="stat-inline-item">
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <div>
                    <div className="stat-inline-numbe">500+</div>
                    <div className="stat-inline-labe">Active Agencies</div>
                  </div>
                </div>

                <div className="stat-inline-item">
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <polyline points="17 11 19 13 23 9"></polyline>
                  </svg>
                  <div>
                    <div className="stat-inline-numbe">10K+</div>
                    <div className="stat-inline-label">Candidates Placed</div>
                  </div>
                </div>

                <div className="stat-inline-item">
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  <div>
                    <div className="stat-inline-numbe">99.9%</div>
                    <div className="stat-inline-label">Platform Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-illustration">
              <div className="illustration-card">
                <svg
                  className="illustration-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                  <path d="M7 8h10M7 12h6"></path>
                </svg>
                <h4>Modern Platform</h4>
                <p>Cloud-based architecture built for speed and reliability</p>
              </div>
            </div>
          </div>

          <div className="about-mvv-grid">
            <div className="mvv-card">
              <div className="mvv-icon-wrapper">
                <svg
                  className="mvv-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To democratize enterprise-grade recruitment technology, making
                sophisticated ATS capabilities accessible to staffing agencies
                of all sizes. We believe powerful tools shouldn't come with
                complexity or prohibitive costs.
              </p>
            </div>

            <div className="mvv-card">
              <div className="mvv-icon-wrapper">
                <svg
                  className="mvv-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To become the global standard for intelligent staffing
                solutions, where every recruiter has access to AI-powered tools
                that eliminate repetitive tasks and provide actionable insights
                that drive better hiring decisions.
              </p>
            </div>

            <div className="mvv-card">
              <div className="mvv-icon-wrapper">
                <svg
                  className="mvv-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3>Core Values</h3>
              <ul className="values-list">
                <li>
                  <svg
                    className="check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>
                    <strong>Simplicity First:</strong> Elegant interfaces that
                    reduce training time
                  </span>
                </li>
                <li>
                  <svg
                    className="check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>
                    <strong>Security by Design:</strong> Enterprise-grade
                    protection for sensitive data
                  </span>
                </li>
                <li>
                  <svg
                    className="check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>
                    <strong>Continuous Innovation:</strong> Regular updates
                    driven by user feedback
                  </span>
                </li>
                <li>
                  <svg
                    className="check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>
                    <strong>Customer Success:</strong> Your growth is our
                    success
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="about-cta-banner">
            <h3>Ready to Transform Your Staffing Operations?</h3>
            <p>
              Join hundreds of agencies already using Artemis to streamline
              their recruitment process.
            </p>
            <a
              href="#demo"
              className="about-cta-button"
              onClick={handleScrollTo("#demo")}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">
              Flexible Pricing for Every Stage of Growth
            </h2>
            <p className="section-subtitle-main">
              Custom plans designed around your agency's unique needs
            </p>
          </div>

          <div className="pricing-content">
            <div className="pricing-card">
              <h3>What's Included</h3>
              <ul className="pricing-features-list">
                <li>✓ Unlimited users and candidates</li>
                <li>✓ AI-powered search and matching</li>
                <li>✓ VMS integration (Bullhorn, others)</li>
                <li>✓ Skills checklists with PDF generation</li>
                <li>✓ Right-to-Represent automation</li>
                <li>✓ Pipeline management tools</li>
                <li>✓ Credentials tracking</li>
                <li>✓ 24/7 customer support</li>
                <li>✓ Regular feature updates</li>
                <li>✓ Enterprise-grade security</li>
              </ul>
            </div>

            <div className="pricing-card highlighted">
              <h3>Why Custom Pricing?</h3>
              <p>
                Every staffing agency operates differently. Your pricing should
                reflect your agency's size, placement volume, integration needs,
                and growth trajectory.
              </p>
              <p>
                We work with you to create a plan that makes sense for your
                business—no hidden fees, no surprise charges, no complicated
                tier systems.
              </p>
              <a
                href="#demo"
                className="pricing-cta"
                onClick={handleScrollTo("#demo")}
              >
                Contact Us for Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="integrations-section" id="integrations">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">
              Stay in Sync with Your Workflow
            </h2>
            <p className="section-subtitle-main">
              Seamless connections to the tools you already use
            </p>
          </div>

          <div className="integrations-content">
            <div className="integration-card primary">
              <div className="integration-icon-wrapper">
                <svg
                  className="integration-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </div>
              <h3>VMS Integrations</h3>
              <p>
  Connect Artemis to your Vendor Management Systems for automatic job feed
  synchronization. New opportunities appear in Artemis instantly, ready for
  candidate matching. Streamline your hiring process with real-time updates,
  eliminating manual uploads and delays. Gain visibility across all job
  channels from one centralized dashboard. Ensure every open role reaches the
  right recruiters faster, improving response times and placement efficiency.
  With Artemis, integrations work quietly in the background so your team can
  focus on talent, not tedious data entry.
</p>
            </div>

            <div className="integration-card">
              <div className="integration-icon-wrapper">
                <svg
                  className="integration-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>Coming Soon</h3>
              <p>
                We're continuously expanding our integration ecosystem based on
                customer feedback.
              </p>
              <ul className="roadmap-list">
                <li>• Calendar sync (Google, Outlook)</li>
                <li>• Email integration</li>
                <li>• Background check providers</li>
                <li>• Payroll systems</li>
                <li>• Communication platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-section" id="resources">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">Resources & Insights</h2>
            <p className="section-subtitle-main">
              Expert guidance to transform your healthcare staffing operations
            </p>
          </div>

          <div className="resources-grid">
            <div className="resource-category-card">
              <div className="category-icon-wrapper">
                <svg
                  className="category-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3>Practical Tips for Recruiters</h3>
              <p>
                Time-saving strategies, workflow optimizations, and proven
                techniques to increase placement velocity and candidate
                satisfaction.
              </p>
            </div>

            <div className="resource-category-card">
              <div className="category-icon-wrapper">
                <svg
                  className="category-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3>Technology in Healthcare Staffing</h3>
              <p>
                Explore how AI, automation, and modern ATS platforms are
                reshaping the healthcare staffing landscape.
              </p>
            </div>

            <div className="resource-category-card">
              <div className="category-icon-wrapper">
                <svg
                  className="category-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3>Industry Trends & Market Insights</h3>
              <p>
                Stay ahead with analysis of healthcare labor markets, regulatory
                changes, and emerging opportunities.
              </p>
            </div>
          </div>

          <div className="newsletter-section">
            <h3>Stay Updated</h3>
            <p>Get the latest insights delivered to your inbox</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Teaser + CTA */}
      <section className="vision-section">
        <div className="content-container">
          <div className="vision-content">
            <h2>Experience Clarity in Every Click</h2>
            <p>
              Join hundreds of healthcare staffing agencies who have transformed
              their recruitment process with Artemis. Faster placements, happier
              teams, better outcomes.
            </p>
            <a
              href="#demo"
              className="vision-cta-button"
              onClick={handleScrollTo("#demo")}
            >
              Book Your Demo Today
            </a>
          </div>
        </div>
      </section>

      {/* Book a Demo Section with REAL-TIME EMAIL VALIDATION */}
      <section className="demo-section" id="demo">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">Book a Demo</h2>
            <p className="section-subtitle-main">
              See Artemis in action and discover how we can transform your
              staffing operations
            </p>
          </div>

          <div className="demo-layout">
            <div className="demo-form-container">
              <form onSubmit={submitDemo} className="demo-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                      placeholder="John"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      placeholder="Doe"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="email">Work Email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={handleEmailChange}
                      placeholder="john.doe@company.com"
                      className={emailError ? "input-error" : ""}
                      disabled={isSubmitting}
                    />
                    {emailError && (
                      <span className="error-label">{emailError}</span>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="Please enter the phone number"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-field full-width">
                  <label htmlFor="company">Company *</label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    placeholder="Your Company Name"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="country">Country *</label>
                    <select
                      id="country"
                      required
                      value={form.country}
                      onChange={handleCountryChange}
                      disabled={isSubmitting}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.iso2} value={country.iso2}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="state">State/Province *</label>
                    <select
                      id="state"
                      required
                      value={form.state}
                      onChange={handleStateChange}
                      disabled={!form.country || loadingStates || isSubmitting}
                    >
                      <option value="">
                        {loadingStates ? "Loading..." : "Select State"}
                      </option>
                      {states.map((state) => (
                        <option key={state.iso2} value={state.iso2}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field full-width">
                  <label htmlFor="city">City *</label>
                  <select
                    id="city"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    disabled={!form.state || loadingCities || isSubmitting}
                  >
                    <option value="">
                      {loadingCities ? "Loading..." : "Select City"}
                    </option>
                    {cities.map((city, index) => (
                      <option key={index} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field full-width">
                  <label htmlFor="source">How did you hear about us? *</label>
                  <select
                    id="source"
                    required
                    value={form.source}
                    onChange={(e) =>
                      setForm({ ...form, source: e.target.value })
                    }
                    disabled={isSubmitting}
                  >
                    <option value="">Select one</option>
                    <option value="google">Google Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral">Referral / Word of Mouth</option>
                    <option value="conference">Conference / Event</option>
                    <option value="email">Email Outreach</option>
                    <option value="customer">Existing Customer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className={`demo-submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="button-spinner"></div>
                      Scheduling...
                    </>
                  ) : (
                    'Request Demo'
                  )}
                </button>
              </form>
            </div>

            <div className="demo-info-container">
              <h3>What to Expect</h3>
              <ul className="expectations-list">
                <li>
                  <div className="expectation-icon-wrapper">
                    <svg
                      className="expectation-icon-svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <div>
                    <strong>Personalized Walkthrough</strong>
                    <p>
                      See Artemis configured for your agency's specific
                      workflows
                    </p>
                  </div>
                </li>
                <li>
                  <div className="expectation-icon-wrapper">
                    <svg
                      className="expectation-icon-svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong>30-Minute Session</strong>
                    <p>Quick, focused demo that respects your time</p>
                  </div>
                </li>
                <li>
                  <div className="expectation-icon-wrapper">
                    <svg
                      className="expectation-icon-svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <strong>Q&A Included</strong>
                    <p>
                      Ask anything about features, pricing, or implementation
                    </p>
                  </div>
                </li>
                <li>
                  <div className="expectation-icon-wrapper">
                    <svg
                      className="expectation-icon-svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                  <div>
                    <strong>Live Platform Access</strong>
                    <p>Hands-on experience with real candidate and job data</p>
                  </div>
                </li>
              </ul>

              <div className="social-proof">
                <p className="proof-label">Trusted by leading agencies</p>
                <div className="proof-stats">
                  <span>⭐⭐⭐⭐⭐ 4.9/5 Rating</span>
                  <span>500+ Active Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer" id="contact">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Artemis ATS</h4>
            <p>
              AI-powered recruitment technology for healthcare staffing
              excellence.
            </p>
            <div className="social-link">
              <a href="#" aria-label="LinkedIn">
                LinkedIn
              </a>
              <a href="#" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" aria-label="Twitter">
                Twitter
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <a href="#home" onClick={handleScrollTo("#home")}>
              Home
            </a>
            <a href="#about" onClick={handleScrollTo("#about")}>
              About
            </a>
            <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>
              Superpowers
            </a>
            <a href="#pricing" onClick={handleScrollTo("#pricing")}>
              Pricing
            </a>
            <a href="#integrations" onClick={handleScrollTo("#integrations")}>
              Integrations
            </a>
            <a href="#resources" onClick={handleScrollTo("#resources")}>
              Resources
            </a>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <p>📧 support@theartemis.ai</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Theartemis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;