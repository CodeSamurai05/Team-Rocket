// --- 2. Welcome Screen Component ---
// Yeh tab dikhega jab koi chat selected nahi hogi.
function WelcomeScreen({ onPromptClick }) {
  const examplePrompts = [
    { title: "Explain Photosynthesis", type: "explain" },
    { title: "Brief summary of World War 2", type: "brief" },
    { title: "Find videos on Python Data Structures", type: "videos" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <IconBookOpen size={48} className="text-blue-500 mb-4" />
      <h1 className="text-3xl font-semibold text-gray-100 mb-2">Raj's AI</h1>
      <p className="text-lg text-gray-400 mb-8">What do you want to learn today?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg w-full">
        {examplePrompts.map((prompt) => (
          <button
            key={prompt.title}
            onClick={() => onPromptClick(prompt.title, prompt.type)}
            className="bg-[#1a1a1a] hover:bg-[#222] text-gray-200 p-4 rounded-lg text-left transition"
          >
            <span className="font-medium">{prompt.title}</span>
            <p className="text-sm text-gray-400 mt-1">Get a {prompt.type} for this topic.</p>
          </button>
        ))}
      </div>
    </div>
  );
}