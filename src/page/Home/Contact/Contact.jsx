import React, { useState, useEffect, useRef } from "react";
import Loading from "../../../components/Loading";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  VideoCameraIcon,
  CalendarIcon,
  CheckCircleIcon,
  XMarkIcon,
  SparklesIcon,
  BoltIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  MicrophoneIcon,
  VideoCameraSlashIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowsPointingOutIcon,
  PauseIcon,
  PlayIcon,
  ChatBubbleLeftEllipsisIcon,
  QrCodeIcon,
  ShareIcon,
  WifiIcon,
  SignalIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon
} from "@heroicons/react/24/outline";
import {
  EnvelopeIcon as EnvelopeIconSolid,
  PhoneIcon as PhoneIconSolid,
  MapPinIcon as MapPinIconSolid,
  MicrophoneIcon as MicrophoneIconSolid,
  VideoCameraIcon as VideoCameraIconSolid
} from "@heroicons/react/24/solid";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    department: "general",
    priority: "normal"
  });
  const [formStep, setFormStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [activeContactMethod, setActiveContactMethod] = useState("live-chat");
  const [currentTime, setCurrentTime] = useState("");
  const [typingStatus, setTypingStatus] = useState(false);
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! I'm your LoanLink assistant. How can I help you today?", time: "10:00 AM" },
    { id: 2, sender: "user", text: "I need help with loan application tracking", time: "10:02 AM" },
    { id: 3, sender: "bot", text: "I can help with that! Let me connect you with our loan specialist.", time: "10:03 AM" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [connectionQuality, setConnectionQuality] = useState("excellent");

  const videoRef = useRef(null);
  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setCurrentTime(timeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Simulate connection quality changes
  useEffect(() => {
    const qualities = ["excellent", "good", "average", "poor"];
    const interval = setInterval(() => {
      const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
      setConnectionQuality(randomQuality);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setTypingStatus(true);
    setTimeout(() => setTypingStatus(false), 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request with steps
    const steps = [1, 2, 3];
    let currentStep = 0;
    
    const processStep = () => {
      if (currentStep < steps.length) {
        setFormStep(steps[currentStep]);
        currentStep++;
        setTimeout(processStep, 800);
      } else {
        setTimeout(() => {
          setLoading(false);
          setSubmitted(true);
          setTimeout(() => {
            setFormData({ name: "", email: "", message: "", department: "general", priority: "normal" });
            setFormStep(0);
          }, 3000);
        }, 800);
      }
    };

    processStep();
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        sender: "user",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          sender: "bot",
          text: "I've received your message. Let me help you with that!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const contactMethods = [
    {
      id: "live-chat",
      icon: <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />,
      activeIcon: <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />,
      title: "Live Chat",
      description: "Instant messaging with AI assistant",
      status: "online",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      id: "video-call",
      icon: <VideoCameraIcon className="h-6 w-6" />,
      activeIcon: <VideoCameraIconSolid className="h-6 w-6" />,
      title: "Video Call",
      description: "Face-to-face meeting with expert",
      status: "available",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      id: "voice-message",
      icon: <MicrophoneIcon className="h-6 w-6" />,
      activeIcon: <MicrophoneIconSolid className="h-6 w-6" />,
      title: "Voice Message",
      description: "Send audio messages quickly",
      status: "online",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      id: "qr-connect",
      icon: <QrCodeIcon className="h-6 w-6" />,
      activeIcon: <QrCodeIcon className="h-6 w-6" />,
      title: "QR Connect",
      description: "Scan QR code for instant connect",
      status: "available",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    }
  ];

  const departments = [
    { 
      value: "general", 
      label: "General Inquiry", 
      icon: <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />,
      waitTime: "2 min"
    },
    { 
      value: "technical", 
      label: "Technical Support", 
      icon: <DeviceTabletIcon className="h-5 w-5" />,
      waitTime: "5 min"
    },
    { 
      value: "sales", 
      label: "Sales Team", 
      icon: <UserGroupIcon className="h-5 w-5" />,
      waitTime: "3 min"
    },
    { 
      value: "demo", 
      label: "Live Demo", 
      icon: <VideoCameraIcon className="h-5 w-5" />,
      waitTime: "10 min"
    }
  ];

  const priorities = [
    { 
      value: "low", 
      label: "Low Priority", 
      color: "text-green-600", 
      bg: "bg-green-100",
      icon: "⏱️",
      response: "24-48 hours"
    },
    { 
      value: "normal", 
      label: "Normal", 
      color: "text-blue-600", 
      bg: "bg-blue-100",
      icon: "📧",
      response: "2-4 hours"
    },
    { 
      value: "high", 
      label: "High Priority", 
      color: "text-orange-600", 
      bg: "bg-orange-100",
      icon: "🚀",
      response: "1 hour"
    },
    { 
      value: "urgent", 
      label: "Urgent", 
      color: "text-red-600", 
      bg: "bg-red-100",
      icon: "🔥",
      response: "15 minutes"
    }
  ];

  const connectionIndicators = {
    excellent: { color: "bg-green-500", label: "Excellent", icon: <SignalIcon className="h-4 w-4" /> },
    good: { color: "bg-blue-500", label: "Good", icon: <WifiIcon className="h-4 w-4" /> },
    average: { color: "bg-yellow-500", label: "Average", icon: <SignalIcon className="h-4 w-4" /> },
    poor: { color: "bg-red-500", label: "Poor", icon: <SignalIcon className="h-4 w-4" /> }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                           linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <div className="relative">
          <div className="w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6">
            <SparklesIcon className="h-4 w-4" />
            CONNECT WITH FUTURE
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Contact
            </span>
            <br />
            <span className="text-white">Redefined</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Experience the future of customer support with AI-powered assistance, 
            real-time video calls, and interactive communication channels.
          </p>

          {/* Live Dashboard */}
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700/50">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
                <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-sm font-medium">Live Support Active</span>
            </div>
            <div className="h-4 w-px bg-gray-600" />
            <div className="flex items-center gap-2">
              {connectionIndicators[connectionQuality].icon}
              <span className="text-sm text-gray-300">{connectionIndicators[connectionQuality].label} Connection</span>
              <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full ${connectionIndicators[connectionQuality].color} transition-all duration-300`} 
                     style={{ width: connectionQuality === "excellent" ? "100%" : 
                                       connectionQuality === "good" ? "75%" : 
                                       connectionQuality === "average" ? "50%" : "25%" }} />
              </div>
            </div>
            <div className="h-4 w-px bg-gray-600" />
            <div className="text-sm text-gray-400">{currentTime} • GMT+6</div>
          </div>
        </div>

        {/* Main Content - Futuristic Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Left Panel - Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-2xl font-bold text-white mb-8">Communication Channels</h3>
              
              {contactMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setActiveContactMethod(method.id)}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 cursor-pointer group ${
                    activeContactMethod === method.id
                      ? `border-transparent bg-gradient-to-r ${method.color} shadow-2xl shadow-${method.color.split('-')[1]}-500/30`
                      : "border-gray-700/50 bg-gray-800/30 hover:border-gray-600"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl backdrop-blur-sm ${
                          activeContactMethod === method.id 
                            ? "bg-white/20" 
                            : "bg-gray-700/50"
                        }`}>
                          {activeContactMethod === method.id ? method.activeIcon : method.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{method.title}</h4>
                          <p className={`text-sm ${
                            activeContactMethod === method.id ? "text-white/90" : "text-gray-400"
                          }`}>
                            {method.description}
                          </p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        method.status === "online" 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {method.status}
                      </div>
                    </div>
                    
                    {activeContactMethod === method.id && (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/80">Estimated wait time:</span>
                          <span className="font-bold">30 seconds</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              ))}

              {/* Stats */}
              <div className="mt-8 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <h4 className="font-bold text-gray-300 mb-4">Support Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-blue-400">98.7%</div>
                    <div className="text-sm text-gray-400">Satisfaction</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-green-400">2.1m</div>
                    <div className="text-sm text-gray-400">Avg Response</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Panel - Active Communication */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-3xl border border-gray-700/50 backdrop-blur-lg overflow-hidden h-full">
                {/* Live Chat Interface */}
                {activeContactMethod === "live-chat" && (
                  <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-3 h-3 bg-green-500 rounded-full absolute -right-0 -top-0 animate-ping" />
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">AI Assistant • LoanLink</h3>
                            <p className="text-sm text-gray-400">Typically replies in seconds</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-700/50 rounded-lg">
                            <ArrowsPointingOutIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 hover:bg-gray-700/50 rounded-lg">
                            <ShareIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div 
                      ref={chatContainerRef}
                      className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[400px]"
                    >
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[80%] rounded-2xl p-4 ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30"
                              : "bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/50"
                          }`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                msg.sender === "user" 
                                  ? "bg-blue-500/20" 
                                  : "bg-purple-500/20"
                              }`}>
                                {msg.sender === "user" ? "You" : "AI"}
                              </div>
                              <span className="text-xs text-gray-400">{msg.time}</span>
                            </div>
                            <p className="text-gray-200">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                      
                      {typingStatus && (
                        <div className="flex justify-start">
                          <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-2xl p-4">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="p-6 border-t border-gray-700/50">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message here..."
                          className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500/50 placeholder-gray-500"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Call Interface */}
                {activeContactMethod === "video-call" && (
                  <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <VideoCameraIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">Video Call</h3>
                            <p className="text-sm text-gray-400">Connect face-to-face with our expert</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm text-gray-400">Live</span>
                          </div>
                          <button className="p-2 hover:bg-gray-700/50 rounded-lg">
                            <ArrowsPointingOutIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Video Area */}
                    <div className="flex-1 p-6 relative">
                      <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                        {videoCallActive ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserGroupIcon className="h-10 w-10" />
                              </div>
                              <h4 className="text-xl font-bold mb-2">Video Call Active</h4>
                              <p className="text-gray-400">Connected with Loan Specialist</p>
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                              <VideoCameraSlashIcon className="h-16 w-16 text-gray-400" />
                            </div>
                            <h4 className="text-xl font-bold mb-2">Ready to Connect</h4>
                            <p className="text-gray-400 mb-6">Start a video call with our expert</p>
                            <button
                              onClick={() => setVideoCallActive(true)}
                              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                            >
                              <VideoCameraIcon className="h-5 w-5" />
                              Start Video Call
                            </button>
                          </div>
                        )}

                        {/* Call Controls */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                          <div className="flex items-center gap-4 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4">
                            <button className="p-3 hover:bg-gray-800/50 rounded-xl">
                              <MicrophoneIcon className="h-5 w-5" />
                            </button>
                            <button className="p-3 hover:bg-gray-800/50 rounded-xl">
                              <VideoCameraIcon className="h-5 w-5" />
                            </button>
                            <button className="p-3 hover:bg-gray-800/50 rounded-xl">
                              <ShareIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => setVideoCallActive(!videoCallActive)}
                              className={`p-4 rounded-xl ${
                                videoCallActive
                                  ? "bg-red-500 hover:bg-red-600"
                                  : "bg-green-500 hover:bg-green-600"
                              }`}
                            >
                              {videoCallActive ? (
                                <PhoneIcon className="h-5 w-5" />
                              ) : (
                                <PhoneIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Voice Message Interface */}
                {activeContactMethod === "voice-message" && (
                  <div className="h-full flex flex-col items-center justify-center p-8">
                    <div className="text-center max-w-md">
                      <div className="relative mb-8">
                        <div className="w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                          <MicrophoneIcon className="h-16 w-16 text-green-400" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full animate-ping" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">Voice Message</h3>
                      <p className="text-gray-400 mb-8">
                        Record and send voice messages to our team. Speak naturally and we'll transcribe it for you.
                      </p>

                      <div className="mb-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <button
                            onClick={() => setIsRecording(!isRecording)}
                            className={`w-16 h-16 rounded-full flex items-center justify-center ${
                              isRecording 
                                ? "bg-red-500 hover:bg-red-600" 
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {isRecording ? (
                              <PauseIcon className="h-6 w-6" />
                            ) : (
                              <MicrophoneIcon className="h-6 w-6" />
                            )}
                          </button>
                          {isRecording && (
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              <span className="text-red-400">Recording...</span>
                            </div>
                          )}
                        </div>
                        
                        {isRecording && (
                          <div className="space-y-2">
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 animate-wave" />
                            </div>
                            <div className="text-sm text-gray-400 text-center">
                              0:00 / 2:00
                            </div>
                          </div>
                        )}
                      </div>

                      <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                        Send Voice Message
                      </button>
                    </div>
                  </div>
                )}

                {/* QR Connect Interface */}
                {activeContactMethod === "qr-connect" && (
                  <div className="h-full flex flex-col items-center justify-center p-8">
                    <div className="text-center max-w-md">
                      <div className="relative mb-8">
                        <div className="w-64 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border-2 border-gray-700/50 mx-auto">
                          {/* QR Code Pattern */}
                          <div className="grid grid-cols-11 gap-1">
                            {Array.from({ length: 121 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-full aspect-square rounded-sm ${
                                  Math.random() > 0.5 
                                    ? "bg-gradient-to-br from-orange-500 to-red-500" 
                                    : "bg-gray-900"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl animate-pulse" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">Scan to Connect</h3>
                      <p className="text-gray-400 mb-8">
                        Use your mobile device to scan this QR code for instant connection with our support team.
                      </p>

                      <div className="space-y-4">
                        <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                          Download QR Code
                        </button>
                        <button className="w-full px-6 py-3 bg-gray-800/50 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300">
                          Generate New Code
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section - Traditional Form */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  Traditional Contact
                </span>
                <br />
                <span className="text-white">Form</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Prefer email? Fill out the form below and we'll get back to you via email
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="relative mb-6">
                    <CheckCircleIcon className="h-24 w-24 text-green-500 animate-bounce" />
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-8">
                    We've received your message and will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : loading ? (
                <div className="text-center py-16">
                  <div className="relative mb-6">
                    <Loading />
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      {formStep === 1 && "Processing your request..."}
                      {formStep === 2 && "Encrypting your message..."}
                      {formStep === 3 && "Sending to our team..."}
                    </h3>
                    <p className="text-gray-400">Your message is being securely transmitted</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-3xl border border-gray-700/50 backdrop-blur-lg p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Department */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-4">
                          Department
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {departments.map((dept) => (
                            <button
                              type="button"
                              key={dept.value}
                              onClick={() => setFormData({...formData, department: dept.value})}
                              className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                                formData.department === dept.value
                                  ? "border-blue-500 bg-blue-500/10"
                                  : "border-gray-700 hover:border-blue-500/50"
                              }`}
                            >
                              <div className={`p-2 rounded-lg ${
                                formData.department === dept.value
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-gray-700/50 text-gray-400"
                              }`}>
                                {dept.icon}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{dept.label}</div>
                                <div className="text-xs text-gray-400">Wait: {dept.waitTime}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Priority */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-4">
                          Priority Level
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {priorities.map((priority) => (
                            <button
                              type="button"
                              key={priority.value}
                              onClick={() => setFormData({...formData, priority: priority.value})}
                              className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                                formData.priority === priority.value
                                  ? `${priority.bg} ${priority.color} border-transparent`
                                  : "border-gray-700 hover:border-gray-600"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{priority.icon}</span>
                                <div className="text-left">
                                  <div className="text-sm font-medium">{priority.label}</div>
                                  <div className="text-xs text-gray-400">{priority.response}</div>
                                </div>
                              </div>
                              {formData.priority === priority.value && (
                                <CheckCircleIcon className="h-5 w-5" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Your Email
                        </label>
                        <div className="relative">
                          <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Message
                      </label>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="6"
                          required
                          placeholder="Describe your inquiry in detail..."
                          className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500 resize-none"
                        />
                        <div className="absolute bottom-4 right-4 text-sm text-gray-500">
                          {formData.message.length}/2000 characters
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group bg-[length:200%_100%] animate-gradient-x"
                    >
                      <span>Send Message via Email</span>
                      <PaperAirplaneIcon className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MapPinIcon className="h-5 w-5 text-blue-400" />
                </div>
                <h4 className="font-bold text-white">Office Address</h4>
              </div>
              <p className="text-gray-400 text-sm">
                122, Main Street, Dhaka, Bangladesh
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <PhoneIcon className="h-5 w-5 text-green-400" />
                </div>
                <h4 className="font-bold text-white">Phone Number</h4>
              </div>
              <a href="tel:+8801944709984" className="text-white hover:text-blue-400 transition-colors">
                +880 1944709984
              </a>
            </div>

            <div className="p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <EnvelopeIcon className="h-5 w-5 text-purple-400" />
                </div>
                <h4 className="font-bold text-white">Email Address</h4>
              </div>
              <a href="mailto:support@loanlink.com" className="text-white hover:text-blue-400 transition-colors">
                support@loanlink.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
            </div>
            <span className="text-2xl font-bold">LoanLink Connect</span>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Future-ready communication platform for microfinance institutions
          </p>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LoanLink • All communications are encrypted • v3.0
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2); }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;