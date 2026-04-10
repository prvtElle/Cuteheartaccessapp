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
  const [showReplyButton, setShowReplyButton] = useState(false);
  const [secondEnvelopeOpened, setSecondEnvelopeOpened] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState<"yes" | "no" | null>(null);
  const [showBackButton, setShowBackButton] = useState(false);
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
    
    // Confetti and balloons when opening envelope
    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ["#ff69b4", "#ff1493", "#ff85c1", "#ffb6c1", "#ffd700"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Balloons
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
      });
    }, 200);

    setTimeout(() => {
      setQuestionRevealed(true);
    }, 800);
  };

  const handleGranted = () => {
    setAnswer("granted");
    
    // Confetti effect
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#ff69b4", "#ff1493", "#ff85c1", "#ffb6c1"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Balloons effect
    const balloonColors = ["#ff69b4", "#ff1493", "#ff85c1", "#ffb6c1", "#ff6ec7"];
    balloonColors.forEach((color, i) => {
      setTimeout(() => {
        confetti({
          particleCount: 1,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.5 + 0.5,
          },
          colors: [color],
          shapes: ["circle"],
          scalar: 3,
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

  const handleShowReply = () => {
    setShowReplyButton(true);
  };

  const handleSecondEnvelopeClick = () => {
    setSecondEnvelopeOpened(true);
    
    // Confetti for second envelope
    const duration = 1500;
    const end = Date.now() + duration;
    const colors = ["#ff69b4", "#ff1493", "#ff85c1", "#ffb6c1", "#ffd700"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleYes = () => {
    setFinalAnswer("yes");
    
    // More intense confetti for YES
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ["#ffd700", "#ff69b4", "#ff1493", "#ff85c1", "#ffb6c1"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Heart explosion
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 360,
        origin: { y: 0.5 },
        colors: colors,
        shapes: ["circle", "square"],
        scalar: 1.2,
      });
    }, 300);
  };

  const handleNo = () => {
    setFinalAnswer("no");
  };

  const handleBack = () => {
    setEnvelopeOpened(false);
    setQuestionRevealed(false);
    setAnswer(null);
    setShowReplyButton(false);
    setSecondEnvelopeOpened(false);
    setFinalAnswer(null);
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
                Uncover the message and Reveal the Secret with a click!
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
                  Access Request
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Can I have a Special Access to your <span className="text-red-500 font-bold">HEART?</span>
                </p>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGranted}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-3"
                >
                  <span>☐ REQUEST GRANTED</span>
                  <span className="text-2xl">💖</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDenied}
                  className="w-full bg-gray-300 text-gray-700 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-3"
                >
                  <span>☐ REQUEST DENIED</span>
                  <span className="text-2xl">🥺</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {answer === "granted" && !finalAnswer && (
            <motion.div
              key="granted"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-3xl w-full mx-4 relative"
              style={{
                backgroundImage: "linear-gradient(to bottom, #fff5f7 0%, #ffffff 100%)",
              }}
            >
              {/* Letter Design */}
              <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 rounded-t-3xl"></div>
              <div className="absolute top-8 left-0 w-full h-1 bg-pink-300"></div>
              
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 text-pink-300 text-2xl">🌸</div>
              <div className="absolute top-4 right-4 text-pink-300 text-2xl">🌸</div>
              
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
                <p className="font-semibold text-lg text-pink-700">Hello Bubby/Biiiii,</p>
                
                <p className="text-base">
                  The amount of thoughts that have been going through my mind lately includes a lot of things, but one thought that has been constantly occupying the space in my heart is my gratitude towards you. It is something that I may not tell you often, but you mean a lot to me and your presence in my life means a lot. There is so much about you that I love, from the simple things to the big things. You've made my life so warm and joyful that I feel very blessed that I've met you not by choice, instead by chance. You have given me so many reasons to keep going forward that I feel lucky just to have you around. All you have done for me reminds me a lot and surely to be cherished.
                </p>

                <div className="border-l-4 border-pink-400 pl-4 py-2 bg-pink-50 rounded-r-lg">
                  <p className="italic text-pink-700 text-sm md:text-base">
                    "Love bears all things, believes all things, hopes all things, endures all things." <br/>
                    <span className="text-xs">(1 Corinthians 13:6–7 ESV)</span>
                  </p>
                </div>

                <p className="text-base">
                  Simply means that love will always be resilient and never stop working even when conditions get tough, love will not question itself; instead, it is all about remaining faithful, hopeful, and committed.
                </p>

                <p className="text-base">
                  A love that is patient, compassionate, and able to hold on even when the going gets tough that's how important it is to me. And yes, I do feel like having you in my life is a blessing, since sharing my life with you has made it that much easier to live and enjoy. It is much easier for people to live their lives when they have someone else supporting them. This means that two individuals together will do things faster, motivate each other, and deal with difficulties that might seem insurmountable on their own.
                </p>

                <div className="border-l-4 border-purple-400 pl-4 py-2 bg-purple-50 rounded-r-lg">
                  <p className="italic text-purple-700 text-sm md:text-base">
                    "Two are better than one, because they have a good reward for their toil." <br/>
                    <span className="text-xs">(Ecclesiastes 4:9)</span>
                  </p>
                </div>

                <p className="text-base">
                  Being with you allows me to be myself without worrying about whether I'm good enough. It is rare that you provide me with the kind of serenity that allows me to be who I am. Love from God or love that mirrors God does away with fear. This fear is usually due to insecurity or a lack of confidence. In the absence of any fear, one can have a lot of self-confidence and courage.
                </p>

                <div className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50 rounded-r-lg">
                  <p className="italic text-blue-700 text-sm md:text-base">
                    "Such love has no fear, because perfect love expels all fear" <br/>
                    <span className="text-xs">(1 John 4:18 NLT)</span>
                  </p>
                </div>

                <p className="text-base">
                  Thank you for your patience, compassion, understanding, and decision to show up in my life. Thank you for making me feel safe, for putting a smile on my face, and for simply brightening my life just by being around. I can't thank you enough for the blessing you've been in my life. I'm extremely thankful that it is YOU 💛
                </p>

                <p className="text-center font-semibold text-lg text-pink-600 mt-6 pt-4 border-t-2 border-pink-200">
                  From My Heart With Love🌹💞
                </p>
              </div>

              {/* Second envelope appears after delay */}
              {showReplyButton && !secondEnvelopeOpened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="text-center mt-8"
                >
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSecondEnvelopeClick}
                      className="relative group inline-block"
                    >
                      <div className="bg-gradient-to-br from-purple-400 to-pink-400 w-48 h-28 rounded-lg shadow-2xl flex items-center justify-center transform transition-transform">
                        <Mail size={60} className="text-white" />
                      </div>
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-3 -right-3 bg-yellow-300 rounded-full p-2 shadow-lg"
                      >
                        <Heart size={20} className="text-red-500" fill="currentColor" />
                      </motion.div>
                    </motion.button>
                    <p className="mt-4 text-md font-semibold text-gray-700">
                      There's something important I'd like to ask you...
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Question revealed after second envelope is opened */}
              {secondEnvelopeOpened && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="space-y-4 mt-8"
                >
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl text-center border-2 border-pink-200">
                    <p className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      Will you let me unlock the <span className="text-pink-600">"OFFICIAL PHASE"</span>
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-gray-800">
                      and officially call you mine?
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-3"
                  >
                    <span>☐ YES</span>
                    <span className="text-2xl">💚</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNo}
                    className="w-full bg-gray-300 text-gray-700 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-3"
                  >
                    <span>☐ NO</span>
                    <span className="text-2xl">💔</span>
                  </motion.button>
                </motion.div>
              )}

              {/* Decorative bottom corners */}
              <div className="absolute bottom-4 left-4 text-pink-300 text-2xl">💕</div>
              <div className="absolute bottom-4 right-4 text-pink-300 text-2xl">💕</div>
            </motion.div>
          )}

          {finalAnswer === "yes" && (
            <motion.div
              key="final-yes"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full mx-4 text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block mb-6"
              >
                <Heart size={100} className="text-green-500" fill="currentColor" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-6">
                Official Phase Unlocked! 💚
              </h2>
              <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                I am brimming with happiness at this moment! I am eagerly anticipating all the memories that we will make together. This means so much to me that I cannot express it in words, so thank you for your YES!
              </p>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mt-6 text-6xl"
              >
                💛
              </motion.div>
            </motion.div>
          )}

          {finalAnswer === "no" && (
            <motion.div
              key="final-no"
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
                💙
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                I understand...
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Your choice is one that I truly admire. I value your honesty, and I would never want you to feel compelled. But who knows, perhaps there's something else in store for us in the future. Until then, I will always cherish our connection.
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
                🤍
              </motion.div>
            </motion.div>
          )}

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