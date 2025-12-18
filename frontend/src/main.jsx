// --- Main App Component ---
// Yeh hamara main component hai jo sabko jode rakhega.
export default function App() {
  // --- STATE ---
  const [chatHistory, setChatHistory] = useState([]); // Poori history
  const [currentChatId, setCurrentChatId] = useState(null); // Kaunsi chat khuli hai
  const [isLoading, setIsLoading] = useState(false); // Kya AI reply kar raha hai?
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile menu ke liye

  // --- LOGIC ---

  // Naya Topic (New Chat) shuru karne ke liye
  const handleNewChat = () => {
    setCurrentChatId(null); // Current chat ko band karke welcome screen dikhayein
    setSidebarOpen(false);
  };

  // Purana Topic (Chat) select karne ke liye
  const handleSelectChat = (id) => {
    setCurrentChatId(id);
    setSidebarOpen(false);
  };

  // Naya message bhejne ke liye (User se ya Welcome Screen se)
  // [MODIFIED] Is function ko 'async' banaya gaya hai
  const handleSendMessage = async (message, type, fromWelcome = false) => {
    let newChatId = currentChatId;
    let newChatHistory = [...chatHistory];
    
    // User message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      content: message,
    };

    // 1. Agar koi chat khuli nahi hai, toh pehle ek nayi chat banao
    if (currentChatId === null || fromWelcome) {
      newChatId = Date.now();
      setCurrentChatId(newChatId);
      const newChat = {
        id: newChatId,
        title: message, // Chat ka title user ke pehle message se set karein
        messages: [userMessage],
      };
      newChatHistory = [...newChatHistory, newChat];
    } 
    // 2. Agar chat pehle se khuli hai, toh bas message add karo
    else {
      newChatHistory = newChatHistory.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      );
    }
    
    setChatHistory(newChatHistory);
    setIsLoading(true);
    setSidebarOpen(false);

    // --- [MODIFIED] AI Response (Real API Call) ---
    // Humne 'setTimeout' ko hata diya hai aur real API call add kiya hai.
    
    const loadingMessage = {
      id: Date.now() + 1,
      sender: 'ai',
      type: 'loading',
    };

    // Pehle loading message dikhayein
    setChatHistory(prevHistory =>
      prevHistory.map(chat =>
        chat.id === newChatId
          ? { ...chat, messages: [...chat.messages, loadingMessage] }
          : chat
      )
    );

    try {
      // Naye Gemini API function ko call karein
      const apiResponse = await callGeminiAPI(message, type);
      
      let aiResponse;

      // API response ke type ke hisaab se state object banayein
      if (type === 'videos') {
        aiResponse = {
          id: Date.now() + 2,
          sender: 'ai',
          type: 'videos',
          data: apiResponse // Yeh ab ek array hai
        };
      } else { // 'explain' ya 'brief'
        aiResponse = {
          id: Date.now() + 2,
          sender: 'ai',
          type: 'text',
          content: apiResponse // Yeh ab ek string hai
        };
      }

      // Loading message ko asli response se badal dein
      setChatHistory(prevHistory =>
        prevHistory.map(chat =>
          chat.id === newChatId
            ? { ...chat, messages: [...chat.messages.filter(m => m.type !== 'loading'), aiResponse] }
            : chat
        )
      );

    } catch (error) {
      // Agar API call fail hota hai toh error message dikhayein
      const errorMessage = {
        id: Date.now() + 2,
        sender: 'ai',
        type: 'text',
        content: `Sorry, I ran into an error. Please try again. \n\n(Error: ${error.message})`
      };
      setChatHistory(prevHistory =>
        prevHistory.map(chat =>
          chat.id === newChatId
            ? { ...chat, messages: [...chat.messages.filter(m => m.type !== 'loading'), errorMessage] }
            : chat
        )
      );
    } finally {
      setIsLoading(false); // Loading state ko hamesha false karein
    }
  };

  // Active chat ka data dhoondhein
  const currentChat = chatHistory.find(chat => chat.id === currentChatId);

  // --- RENDER ---
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* Mobile Sidebar (Overlay) */}
      {/* Yeh sidebar mobile par 'isSidebarOpen' state se dikhega ya chhipega */}
      <div className={`fixed inset-0 z-20 bg-black/50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          currentChatId={currentChatId}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Mobile Header (Menu Button) */}
        <div className="lg:hidden p-4 border-b border-[#1f1f1f] bg-[#0c0c0c] flex items-center">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-200">
            <IconMenu size={24} />
          </button>
          <h2 className="text-lg font-semibold ml-4 truncate">
            {currentChat ? currentChat.title : "Raj's AI"}
          </h2>
        </div>
        
        {/* Chat Area Component */}
        <ChatArea
          currentChat={currentChat}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>

    </div>
  );
}