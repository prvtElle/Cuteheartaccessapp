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
    setAnswer("granted");
    setShowBackButton(true);

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

    // Auto-show reply button after reading the letter (8 seconds delay)
    setTimeout(() => {
      setShowReplyButton(true);
    }, 8000);
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

    // Balloons for opening the reply
    const duration = 1500;
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
  };

  const handleYes = () => {
    setFinalAnswer("yes");

    // More intense balloons for YES
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ["#ffd700", "#ff69b4", "#ff1493", "#ff85c1", "#ffb6c1"];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ["circle"],
        scalar: 2.5,
        gravity: 0.5,
        drift: 0.3,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ["circle"],
        scalar: 2.5,
        gravity: 0.5,
        drift: -0.3,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Balloon explosion
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 360,
        origin: { y: 0.5 },
        colors: colors,
        shapes: ["circle"],
        scalar: 2.8,
        gravity: 0.6,
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
                  All this began with a simple "Hi" without any particular reason. Our interactions started with simple talk, and gradually, it grew beyond what we had expected. These simple talks began to develop into deep and serious conversations, which are tough to define at times. In essence, one simple talk led to a chance connection, which later formed the basis of a strong connection between two individuals who found solace in each other. Over time, our talks grew from simple ones to more meaningful discussions. We developed a relationship where one could vent problems while the other would listen patiently and offers comfort. While this may sound quite cringe, this made us realize that it was not just random chats, there was something developing in between which needs to nurture and cherish, some difficulties and differences along the way due to different personalities. Rather than becoming a conflict althroughout the connection, these differences helped us build a stronger bridge that connected us in ways that neither of us anticipated when that simple "Hi" happened. Those simply acts like serving as alarm clocks to each other whenever we had to change our sleeping schedules due to varying time zones. Either of us stayed awake to ensure the other got out of bed on time. Although it seems like a little gesture, it is an example of the extent to which we were both adjusted for each other. Constantly assuring each other that everything was okay was necessary to sustain the connection in spite of the challenges we faced due to distance. It is natural to be doubtful and to think too much about things specially with such a situation as long distance thing yet it is clear that such problems can only be overcome through adjustment and patience once both individual work on it together. It is amazing that we are able to remain in contact despite the fact that there are misunderstandings that might occur. Sometimes it takes time before we actually have a talk and sort everything out, but we always make it happen once we are in a good state of mind to do so. Conflicts help us understand how important communication to express ourselves properly and voicing out things that upsets us rather than keeping them inside. In the end, nothing is being lost when we choose to set aside our pride for the person we truly cherish instead, it strengthens the connection, teaching us patience, understanding, and the value of meeting each other halfway. Going above and beyond in things that are outside of my control is not a matter of duty or favor. This is something that I am choosing to do for you because you deserve it. You deserve the right to feel like an individual who should never have to compete against another person and even compare yourself to anyone else. You deserve to be heard in times where no one else will listen to you. You deserve to be seen. You are valid and always worthy of everything. In this world full of "It is what it is", do always remember that "You are worth to risk".
                </p>

                <div className="border-l-4 border-pink-400 pl-4 py-2 bg-pink-50 rounded-r-lg">
                  <p className="italic text-pink-700 text-sm md:text-base">
                    "God knows the right time, the right place, the right person, and the right answer to your prayers."
                  </p>
                </div>

                <p className="text-base text-justify indent-8">
                  And there are times when you ask yourself why nothing is happening yet, why your prayer of love, your prayer of opportunities, your prayer of breakthroughs has been postponed. However, as time passes by, you come to see that everything that was withheld was actually withheld for a reason. (Ecclesiastes 3:11)
                </p>

                <div className="border-l-4 border-purple-400 pl-4 py-2 bg-purple-50 rounded-r-lg">
                  <p className="italic text-purple-700 text-sm md:text-base">
                    "Love bears all things, believes all things, hopes all things, endures all things." <br/>
                    <span className="text-xs">(1 Corinthians 13:6–7 ESV)</span>
                  </p>
                </div>

                <p className="text-base text-justify indent-8">
                  Simply means that love isn't just sunshine and rainbows; it also entails the willingness to stick around when things start to go away. It endures all things, not only does it accept struggles and difficulties, but it accepts its partner's weaknesses and flaws, as well. It believes all things, not only does it believe in itself and its own strength, but it also believes in its partner, even when he or she fails to live up to expectations. It hopes all things not only does it hope for its own future happiness, but it hopes for its partner's future happiness, too. And it endures all things it doesn't give up at the first sign of trouble, but it persists through every storm, every trial, and every hardship.
                </p>

                <div className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50 rounded-r-lg">
                  <p className="italic text-blue-700 text-sm md:text-base">
                    "As long as we wait for the perfect time, everything will be worth it. The waiting season is hard though, but trusting God and His timing are way better."
                  </p>
                </div>

                <p className="text-base text-justify indent-8">
                  At this point, you might be feeling frustrated because there does not seem to be any change; but change is taking place slowly. The seed does not bloom immediately after being planted in the soil. The same happens for you too. (Galatians 6:9)
                </p>

                <div className="border-l-4 border-pink-400 pl-4 py-2 bg-pink-50 rounded-r-lg">
                  <p className="italic text-pink-700 text-sm md:text-base">
                    "True love, just like faith, often involves waiting and trusting God's timing."
                  </p>
                </div>

                <p className="text-base text-justify indent-8">
                  In an era where everything moves quickly from messages to responses to relationships, it may be difficult to understand the frustration that comes with love taking its time. "Why does it always take time? If it is meant to be, then why do I have to wait?" This is what you may think about when you have been longing for something that is supposed to come easy. However, the best kind of love always takes some time because it is built during the process of preparation, learning, growing, and healing so that when you meet the person that you will be spending your life with, you will be ready. As such, patience is key, just like with the case of faith, since everything in God's plan has a purpose. Sometimes, the reason for waiting might just be that God is protecting you from yourself or the other party. (Romans 8:25)
                </p>

                <div className="border-l-4 border-purple-400 pl-4 py-2 bg-purple-50 rounded-r-lg">
                  <p className="italic text-purple-700 text-sm md:text-base">
                    "May the Lord keep watch between you and me, when we are away from each other." <br/>
                    <span className="text-xs">(Genesis 31:49)</span>
                  </p>
                </div>

                <p className="text-base text-justify indent-8">
                  Distance is tough, not being able to see the person we love everyday, maintaining a relationship when apart from one another, or just being in a phase where we don't get to see each other much anymore. There would be instances when we want to be there for the other person because we want to provide protection and comfort. However, what this verse does is gently let us know that although we are unable to do so, God can do that for us and for our significant other. It tells us that the Lord sees both of us, takes care of both of our hearts, and closes the physical gap brought upon by distance. It's almost as if saying, "I may not be here at all times, but you're never without a protector and guide because He is with you wherever I can no longer be."
                </p>

                <p className="text-base text-justify indent-8">
                  As stated in 1 Peter 4:8 "Love without conditions", real love doesn't mean "If… I'll love you." instead it is selecting someone in spite of all these difficulties: despite it being a hassle; despite their imperfections; and despite the situation being hard. It involves tolerating and understanding the other person, no matter how difficult that may be. It shows up every day, despite being hurt, misunderstood, disappointed, and exhausted. Because it isn't fragile, fickle, or fleeting. It stands the test of time and trials. And yes, I do feel like having you in my life is a blessing, since sharing my life with you has made it that much easier to live and enjoy. It is much easier for people to live their lives when they have someone else supporting them. This means that two individuals together will do things faster, motivate each other, and deal with difficulties that might seem insurmountable on their own.
                </p>

                <p className="text-base text-justify indent-8">
                  The amount of thoughts that have been going through my mind lately includes a lot of things, but one thought that has been constantly occupying my heart is my gratitude towards you. It is something that I may not tell you often, but you mean a lot to me and your presence in my life means a lot. There is so much about you that I love, from the simple things to the big things. You've made my life so warm and joyful that I feel very blessed that I've met you not by choice, instead by chance. You have given me so many reasons to keep going forward that I feel lucky just to have you around. All you have done for me reminds me a lot and surely to be cherished. Those times when we were alone, when we laughed out loud, and even sleeping on our cellphone. It all wasn't just for fun. It meant a lot to me, especially those instances where we revealed parts of ourselves to one another. They had a certain authenticity about them that I will never forget. And those phone calls, you made them so memorable for me. I could talk with you for hours, yet they seemed like only a minute went by because it was such an enjoyable experience. Being with you, even through a screen, was always something I looked forward to. Each time you come to my mind, I catch myself silently thanking God for you. You are one individual who can inject warmth, peace, and joy into the lives of people yet, you have managed to do that in mine. You are more than precious to me as you are a valuable gem. All your little quirks, the feelings you instill within me, and our wonderful memories will always be with me. It is not enough for me to just remember you. It is about being thankful to you. Each and every time. Thank you for your patience, compassion, understanding, and decision to show up in my life. Thank you for making me feel safe, for putting a smile on my face, and for simply brightening my life just by being around. I can't thank you enough for the blessing you've been in my life. To blew these things up, I'm extremely thankful that it is YOU 💛
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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSecondEnvelopeClick}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Reply
                  </motion.button>
                </motion.div>
              )}

              {/* Question revealed after reply button is clicked */}
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
                      and can call you mine?
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