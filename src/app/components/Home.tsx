import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Heart, LogOut, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

export function Home() {
  const [user, setUser] = useState<any>(null);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [questionRevealed, setQuestionRevealed] = useState(false);
  const [answer, setAnswer] = useState<"granted" | "denied" | null>(null);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showTulips, setShowTulips] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleEnvelopeClick = () => {
    setEnvelopeOpened(true);

    // Balloons when opening envelope
    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ["#ff69b4", "#ff1493", "#ff85c1", "#ffb6c1", "#ffd700"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ["circle"],
        scalar: 2,
        gravity: 0.5,
        drift: 0.2,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ["circle"],
        scalar: 2,
        gravity: 0.5,
        drift: -0.2,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Balloon burst
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ["circle"],
        scalar: 2.5,
        gravity: 0.6,
      });
    }, 200);

    setTimeout(() => {
      setQuestionRevealed(true);
    }, 800);
  };

  const handleGranted = () => {
    setShowTulips(true);
    setTimeout(() => {
      setShowTulips(false);
      setAnswer("granted");
      setShowBackButton(true);
    }, 3000);

    // Balloons effect
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#ff69b4", "#ff1493", "#ff85c1", "#ffb6c1"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ["circle"],
        scalar: 2.2,
        gravity: 0.5,
        drift: 0.3,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ["circle"],
        scalar: 2.2,
        gravity: 0.5,
        drift: -0.3,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Floating balloons effect
    const balloonColors = ["#ff69b4", "#ff1493", "#ff85c1", "#ffb6c1", "#ff6ec7"];
    balloonColors.forEach((color, i) => {
      setTimeout(() => {
        confetti({
          particleCount: 2,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.5 + 0.5,
          },
          colors: [color],
          shapes: ["circle"],
          scalar: 3.5,
          gravity: 0.4,
        });
      }, i * 100);
    });

  };

  const handleDenied = () => {
    setAnswer("denied");
    setShowBackButton(true);
    
    // Sad reactions effect
    const emoji = ["😢", "💔", "😭", "🥺", "😞"];
    const count = 20;
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const div = document.createElement("div");
        div.innerHTML = emoji[Math.floor(Math.random() * emoji.length)];
        div.style.position = "fixed";
        div.style.left = Math.random() * 100 + "%";
        div.style.top = "0";
        div.style.fontSize = "30px";
        div.style.zIndex = "9999";
        div.style.pointerEvents = "none";
        document.body.appendChild(div);
        
        let pos = 0;
        const fallInterval = setInterval(() => {
          if (pos >= window.innerHeight) {
            clearInterval(fallInterval);
            div.remove();
          } else {
            pos += 5;
            div.style.top = pos + "px";
          }
        }, 20);
      }, i * 100);
    }
  };


  const handleBack = () => {
    setEnvelopeOpened(false);
    setQuestionRevealed(false);
    setAnswer(null);
    setShowBackButton(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-red-200 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto pt-6 pb-4 flex justify-between items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <Heart size={32} className="text-pink-600" fill="currentColor" />
          <div>
            <h2 className="font-semibold text-gray-800">Welcome, {user.name}!</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </motion.div>
        <div className="flex items-center gap-2">
          {showBackButton && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-sm font-medium text-pink-700">Back</span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <LogOut size={18} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto min-h-[calc(100vh-120px)] flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          {!envelopeOpened && (
            <motion.div
              key="envelope"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnvelopeClick}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-pink-400 to-red-400 w-64 h-40 rounded-lg shadow-2xl flex items-center justify-center transform transition-transform">
                  <Mail size={80} className="text-white" />
                </div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-yellow-300 rounded-full p-2 shadow-lg"
                >
                  <Heart size={24} className="text-red-500" fill="currentColor" />
                </motion.div>
              </motion.button>
              <p className="mt-6 text-lg font-semibold text-gray-700">
                Reveal the Secret with a click!
              </p>
            </motion.div>
          )}

          {envelopeOpened && !questionRevealed && (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Heart size={80} className="text-pink-500" fill="currentColor" />
              </motion.div>
              <p className="mt-4 text-xl font-semibold text-gray-700">Opening...</p>
            </motion.div>
          )}

          {questionRevealed && !answer && (
            <motion.div
              key="question"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full mx-4"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block mb-6"
                >
                  <Heart size={80} className="text-red-500" fill="currentColor" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Would you mind unlocking the <span className="text-pink-600">"OFFICIAL PHASE?"</span>
                </h2>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGranted}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-3"
                >
                  <span>☐ YES</span>
                  <span className="text-2xl">💚</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDenied}
                  className="w-full bg-gray-300 text-gray-700 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-3"
                >
                  <span>☐ NO</span>
                  <span className="text-2xl">💔</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {answer === "granted" && (
            <motion.div
              key="granted"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="rounded-3xl shadow-2xl p-6 md:p-10 max-w-3xl w-full mx-4 relative overflow-hidden"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(221, 160, 221, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 40% 20%, rgba(255, 240, 245, 0.4) 0%, transparent 50%),
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 35px,
                    rgba(255, 192, 203, 0.15) 35px,
                    rgba(255, 192, 203, 0.15) 36px
                  ),
                  linear-gradient(135deg,
                    #ffd6e8 0%,
                    #ffe4f1 15%,
                    #fff0f8 30%,
                    #ffeef7 45%,
                    #ffe8f5 60%,
                    #ffd9ed 75%,
                    #ffcce5 90%,
                    #ffd6e8 100%
                  )
                `,
              }}
            >
              {/* Letter Design */}
              <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-t-3xl shadow-md"></div>
              <div className="absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"></div>

              {/* Decorative corners and borders */}
              <div className="absolute top-4 left-4 text-pink-300 text-2xl">🌸</div>
              <div className="absolute top-4 right-4 text-pink-300 text-2xl">🌸</div>

              {/* Corner decorations */}
              <div className="absolute top-12 left-2 text-pink-200 text-xl">✨</div>
              <div className="absolute top-12 right-2 text-pink-200 text-xl">✨</div>
              <div className="absolute top-20 left-4 text-purple-200 text-sm">💝</div>
              <div className="absolute top-20 right-4 text-purple-200 text-sm">💝</div>

              {/* Floating hearts decoration */}
              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-32 left-8 text-pink-200 text-2xl"
              >
                💕
              </motion.div>
              <motion.div
                animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute top-48 right-6 text-purple-200 text-2xl"
              >
                💗
              </motion.div>
              <motion.div
                animate={{ y: [0, -12, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute top-64 left-6 text-pink-200 text-xl"
              >
                💖
              </motion.div>
              
              <div className="pt-8 text-center mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block mb-4"
                >
                  <Heart size={60} className="text-red-500" fill="currentColor" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent mb-2">
                  Let my heart tell you something🤗🫶
                </h2>
              </div>

              <div className="px-4 md:px-8 mb-6 space-y-4 text-gray-700 leading-relaxed">
                <p className="font-semibold text-lg text-pink-700">Hello Bubby,</p>

                <p className="text-base text-justify indent-8">
                  It all began with just a simple "Hi". Casual conversations turned into discussions that brought more and more comfort to both of us until eventually they became something that neither of us anticipated. Through simple conversations, we discovered mutual understanding, inner peace, and harmony that we needed so much. Despite the possible misunderstandings, differences in personality, and distance between us, we managed to learn how to support one another. Our conflicts taught us to be patient, to understand each other, and to talk about our problems. Love is not about perfection; it is about making a choice and trying to understand and communicate. Sometimes, you may think that I only do it out of obligations, but that is far from reality. Whatever actions I take towards you come straight from my heart. You deserve so much and it is my goal to make sure that you feel valued and cherished for whom you are. In a world full of "It is what it is," always remember that you are someone worth choosing and worth the risk.
                </p>

                <p className="text-base text-justify indent-8">
                  Sometimes, distance can become a burden, but I know that there is no need to lose hope and faith.
                </p>

                <div className="border-l-4 border-pink-400 pl-4 py-2 bg-pink-50 rounded-r-lg">
                  <p className="italic text-pink-700 text-sm md:text-base">
                    "God knows the right time, the right place, the right person, and the right answer to your prayers."
                  </p>
                </div>

                <p className="text-base text-justify indent-8">
                  And even when I find myself wondering why certain things haven't happened yet, I trust that everything unfolds in its right time. What feels delayed is never denied, but carefully placed for a reason. <span className="italic">(Ecclesiastes 3:11)</span>
                </p>

                <div className="border-l-4 border-purple-400 pl-4 py-2 bg-purple-50 rounded-r-lg">
                  <p className="italic text-purple-700 text-sm md:text-base">
                    "May the Lord keep watch between you and me, when we are away from each other."
                  </p>
                  <p className="text-xs text-purple-600 mt-1">(Genesis 31:49)</p>
                </div>

                <p className="text-base text-justify indent-8">
                  Distance will never be an easy thing—missing out on being able to see and feel close to the one we love can be difficult. However, in this verse, it seems to me that even when I am unable to be at your side, God will forever be around both of our lives, protecting your heart, guiding your steps, and bridging the gap distance causes between us.
                </p>

                <p className="text-base text-justify indent-8">
                  And just like in 1 Peter 4:8 where it says, "Love each other deeply," I think that true love is unconditional. It does not say, "I will love you if..." but rather decides to stick around despite misunderstandings, tiredness, and faults.
                </p>

                <p className="text-base text-justify indent-8">
                  In all of the thoughts that I've had lately, there is one particular thought that stands out above the rest; that I'm grateful for you. Not only that I'm grateful for your presence in my life, your kind nature, and all of the memories that we've made together. From the lengthy talks that we've had and the short phone calls where they seemed like they went by too quickly because I was having so much fun. I'll never forget the way that you bring joy, warmth, and peace to my life, and all of the little things that make me feel that way. The way that you speak, the way that you care, and even the way that you know what I want without asking.
                </p>

                <p className="text-base text-justify indent-8">
                  Thank you for your patience, your understanding, and even for the effort that you put in. Thank you for always being there and being someone that I can always be grateful for. Thank you for the way that you make me feel safe and happy. No matter what happens, it will always be you my Purple💜
                </p>

                <p className="text-center font-semibold text-lg text-pink-600 mt-6 pt-4 border-t-2 border-pink-200">
                  From My Heart With Love🌹💞
                </p>
              </div>

              {/* Decorative bottom corners */}
              <div className="absolute bottom-4 left-4 text-pink-300 text-2xl">💕</div>
              <div className="absolute bottom-4 right-4 text-pink-300 text-2xl">💕</div>
              <div className="absolute bottom-12 left-2 text-pink-200 text-xl">🎀</div>
              <div className="absolute bottom-12 right-2 text-pink-200 text-xl">🎀</div>
              <div className="absolute bottom-20 left-6 text-purple-200 text-sm">🌺</div>
              <div className="absolute bottom-20 right-6 text-purple-200 text-sm">🌺</div>

              {/* Decorative side elements */}
              <motion.div
                animate={{ rotate: [0, 10, 0], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-40 left-2 text-pink-200 text-lg"
              >
                🦋
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -10, 0], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-56 right-2 text-purple-200 text-lg"
              >
                🦋
              </motion.div>
            </motion.div>
          )}

          <AnimatePresence>
            {showTulips && (
              <motion.div
                key="tulip-bouquet"
                initial={{ opacity: 0, scale: 0.5, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -40 }}
                transition={{ type: "spring", duration: 0.7 }}
                className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-pink-50/80 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-center"
                >
                  <div className="text-[120px] leading-none select-none">💐</div>
                  <div className="flex justify-center gap-2 mt-2 text-5xl">
                    <motion.span animate={{ rotate: [-8, 8, -8] }} transition={{ duration: 2, repeat: Infinity }}>🌷</motion.span>
                    <motion.span animate={{ rotate: [8, -8, 8] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>🌷</motion.span>
                    <motion.span animate={{ rotate: [-8, 8, -8] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>🌷</motion.span>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-2xl font-semibold text-pink-600"
                  >
                    For you 💜
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


          {answer === "denied" && (
            <motion.div
              key="denied"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full mx-4 text-center"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-8xl mb-6"
              >
                🥺
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                I am very sorry.....
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                I know this will be difficult, and this is the last thing that I ever want to do. I appreciate the courage it took for you to be able to share this with me and I truly cannot thank you enough. You are an amazing individual, and it was not an easy decision to make.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                In all honesty, my feelings have changed. I thank you for your compassion and for being so sincere when talking with me. I sincerely hope you find true happiness. 🤍
              </p>
              <motion.div
                className="mt-6 text-5xl"
                animate={{
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                💔
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}