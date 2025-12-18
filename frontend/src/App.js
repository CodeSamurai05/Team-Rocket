import React, { useState, useRef, useEffect } from 'react';
import mermaid from 'mermaid';

const getEnhancedPrompt = (message, language) => {
  const basePrompt = language === 'hi' ? 
  `तुम लुनोरा AI हो, एक उन्नत शिक्षण सहायक। तुम्हारी विशेषताएँ:
  
  🌟 व्यक्तित्व विशेषताएं:
  1. **उत्साही और प्रोत्साहन देने वाली** - हमेशा सकारात्मक और प्रेरक रहें
  2. **रोगी और विस्तार-उन्मुख** - हर बात को धीरे-धीरे समझाएं
  3. **सांस्कृतिक रूप से संवेदनशील** - भारतीय संदर्भ और उदाहरण दें
  4. **व्यावहारिक और उपयोगी** - वास्तविक जीवन के उदाहरण दें
  
  📚 शैक्षणिक दृष्टिकोण:
  1. **चरण-दर-चरण स्पष्टीकरण** - छोटे-छोटे चरणों में समझाएं
  2. **एनालॉजी और उदाहरण** - कठिन अवधारणाओं को सरल उदाहरणों से समझाएं
  3. **इंटरएक्टिव लर्निंग** - प्रश्न पूछकर जुड़ाव बनाएं
  4. **मल्टी-मॉडल एक्सप्लेनेशन** - टेक्स्ट, डायग्राम, उदाहरण सभी दें
  
  🎯 प्रतिक्रिया संरचना:

  1. **संक्षिप्त सारांश** शुरू में
  2. **विस्तृत विवरण** मुख्य भाग में
  3. **कुंजी बिंदु** बुलेट पॉइंट्स में
  4. **प्रैक्टिकल एप्लीकेशन** अंत में
  5. **फॉलो-अप प्रश्न** सीखने को बढ़ाने के लिए
  
  भाषा शैली: स्पष्ट, मैत्रीपूर्ण, औपचारिक लेकिन आरामदायक
  
  प्रश्न: ${message}` : 
  
  `You are Lunora AI, an advanced learning assistant with these characteristics:
  
  🌟 Personality Traits:
  1. **Enthusiastic and Encouraging** - Always positive and motivating
  2. **Patient and Detail-oriented** - Explain everything step-by-step
  3. **Culturally Sensitive** - Use Indian context and examples
  4. **Practical and Useful** - Provide real-life applications
  
  📚 Pedagogical Approach:
  1. **Step-by-step explanations** - Break down complex topics
  2. **Analogies and Examples** - Use simple analogies for hard concepts
  3. **Interactive Learning** - Engage with questions
  4. **Multi-modal explanations** - Use text, diagrams, examples
  
  🎯 Response Structure:
  1. **Brief summary** at start
  2. **Detailed explanation** in main body
  3. **Key takeaways** in bullet points
  4. **Practical application** at end
  5. **Follow-up questions** to enhance learning
  
  Language Style: Clear, friendly, formal but approachable
  
  Query: ${message}`;
  
  return basePrompt;
};
const result = getEnhancedPrompt("Test Message","en");
console.log(result);

// --- Translation Data ---
const translations = {
  en: {
    sidebarTitle: "Lunora (Student)",
    newTopic: "New Topic",
    quizMode: "Quiz Mode",
    searchTopics: "Search topics...",
    recentTopics: "Recent Topics",
    noTopics: "No topics yet.",
    theme: "Theme",
    language: "Language",
    fontSize: "Font Size",
    fontSizeSmall: "Small",
    fontSizeMedium: "Medium",
    fontSizeLarge: "Large",
    welcomeTitle: "Lunora",
    welcomeSubtitle: "What do you want to learn today?",
    examplePrompt1: "Explain Photosynthesis",
    examplePrompt2: "Brief summary of World War 2",
    examplePrompt3: "Flowchart for Binary Search",
    examplePromptDesc: "Get an explanation for this topic.",
    inputPlaceholder: "Message Lunora...",
    inputListening: "Listening...",
    quizTitle: "AI-Powered Quiz Mode",
    quizSubtitle: "Select a subject to start a practice quiz.",
    quizDifficultyTitle: "Choose Difficulty",
    quizDifficultySubtitle: "Select the number of questions",
    quizEasy: "Easy (10 Questions)",
    quizHard: "Hard (25 Questions)",
    quizTimePerQuestion: "Time per question",
    quizTotalTime: "Total time",
    quizSubjects: {
      "Current Affairs": "Current Affairs",
      "Static GK": "Static GK",
      "History": "History",
      "Geography": "Geography",
      "Political Science": "Political Science",
      "Economics": "Economics",
      "General Science": "General Science",
      "English": "English",
      "Math Reasoning": "Math Reasoning",
    },
    quizQuestionHeader: "Question",
    quizQuestionOf: "of",
    quizCheck: "Check",
    quizNext: "Next",
    quizFinish: "Finish Quiz",
    quizScoreTitle: "Quiz Complete!",
    quizScoreSubtitle: "Your Score",
    quizScoreSummary: "You answered {score} out of {total} questions correctly.",
    quizRetry: "Try Another Subject",
    errorQuiz: "Sorry, I couldn't start the quiz.",
    errorQuizMessage: "AI did not return valid quiz questions.",
    errorBackend: "Sorry, I ran into an error. Please try again.",
    errorSpeech: "Sorry, your browser does not support text-to-speech.",
    errorAISearch: "Could not find videos for {topic}",
    errorAIDetails: "Error details",
    errorInvalidResponse: "Invalid response structure from backend.",
    ttsTitle: "Read aloud",
    codeCopied: "Copied!",
    codeCopy: "Copy",
    filePreview: "Selected preview",
    loading: "Loading...",
    generatingQuiz: "Generating your quiz...",
    generatingVideo: "Generating Instant Video...", 
    instantVideo: "Instant Video",
    generatedVideoTitle: "AI Generated Video",
    collapseSidebar: "Collapse Sidebar",
    expandSidebar: "Expand Sidebar",
    settings: "Settings",
    rateApp: "Rate App",
    helpFAQ: "Help & FAQ",
    logout: "Logout",
    appearance: "Appearance",
    contactSupport: "Contact Support",
    needHelp: "Need more help?",
    howToAsk: "How to ask questions?",
    howToAskAnswer: "Type your question in the chat box or use voice input by clicking the microphone icon.",
    howToUpload: "How to upload images?",
    howToUploadAnswer: "Click the paperclip icon to upload images of handwritten notes or textbook pages.",
    whatIsQuiz: "What is Quiz Mode?",
    whatIsQuizAnswer: "Quiz Mode generates practice questions based on subjects to test your knowledge.",
    howToGenerateVideo: "How to generate videos?",
    howToGenerateVideoAnswer: "Click the video icon or type 'video' in your query to generate instant video explanations.",
    backToChat: "Back to Chat",
    activity: "Activity",
    login: "Login",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    system: "System",
    account: "Account",
    notifications: "Notifications",
    privacy: "Privacy",
    about: "About",
    version: "Version 1.0.0",
    myProfile: "My Profile",
    security: "Security",
    paymentMethods: "Payment Methods",
    subscription: "Subscription",
    learningProgress: "Learning Progress",
    certificates: "Certificates",
    savedTopics: "Saved Topics",
    logoutConfirm: "Are you sure you want to logout?",
    yes: "Yes",
    no: "No",
    activityHistory: "Activity History",
    studySessions: "Study Sessions",
    quizResults: "Quiz Results",
    videoWatched: "Videos Watched",
    topicsLearned: "Topics Learned",
    timeSpent: "Time Spent",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
    allTime: "All Time",
    // New translations for student features
    quickRevision: "Quick Revision",
    difficultyLevel: "Difficulty Level",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    summary: "Summary",
    keyPoints: "Key Points",
    examples: "Examples",
    practiceQuestions: "Practice Questions",
    realWorldApplications: "Real World Applications",
    studyTips: "Study Tips",
    markImportant: "Mark Important",
    saveForLater: "Save for Later",
    generateFlashcards: "Generate Flashcards",
    explainLikeIm5: "Explain Like I'm 5",
    needMoreClarity: "Need More Clarity",
    relatedTopics: "Related Topics",
    studyPlan: "Study Plan",
    progressTracker: "Progress Tracker",
    achievementBadge: "Achievement Badge",
    streakCounter: "Streak Counter",
  },
  hi: {
    sidebarTitle: "लुनोरा (छात्र)",
    newTopic: "नया विषय",
    quizMode: "क्विज़ मोड",
    searchTopics: "विषय खोजें...",
    recentTopics: "हाल के विषय",
    noTopics: "अभी तक कोई विषय नहीं है।",
    theme: "थीम",
    language: "भाषा",
    fontSize: "फ़ॉन्ट आकार",
    fontSizeSmall: "छोटा",
    fontSizeMedium: "मध्यम",
    fontSizeLarge: "बड़ा",
    welcomeTitle: "लुनोरा",
    welcomeSubtitle: "आज आप क्या सीखना चाहते हैं?",
    examplePrompt1: "प्रकाश संश्लेषण (Photosynthesis) समझाओ",
    examplePrompt2: "द्वितीय विश्व युद्ध का संक्षिप्त सारांश",
    examplePrompt3: "बाइनरी सर्च का फ्लोचार्ट",
    examplePromptDesc: "इस विषय के लिए स्पष्टीकरण प्राप्त करें।",
    inputPlaceholder: "लुनोरा को संदेश भेजें...",
    inputListening: "सुन रहा हूँ...",
    quizTitle: "AI- पॉवर्ड क्विज़ मोड",
    quizSubtitle: "एक विषय चुनें।",
    quizDifficultyTitle: "कठिनाई चुनें",
    quizDifficultySubtitle: "प्रश्नों की संख्या चुनें",
    quizEasy: "आसान (10 प्रश्न)",
    quizHard: "कठिन (25 प्रश्न)",
    quizTimePerQuestion: "प्रति प्रश्न समय",
    quizTotalTime: "कुल समय",
    quizSubjects: {
      "Current Affairs": "करेंट अफेयर्स",
      "Static GK": "स्टैटिक जी.के.",
      "History": "इतिहास",
      "Geography": "भूगोल",
      "Political Science": "राजनीति विज्ञान",
      "Economics": "अर्थशास्त्र",
      "General Science": "सामान्य विज्ञान",
      "English": "अंग्रेज़ी",
      "Math Reasoning": "मैथ रीजनिंग",
    },
    quizQuestionHeader: "प्रश्न",
    quizQuestionOf: "में से",
    quizCheck: "जांचें",
    quizNext: "अगला",
    quizFinish: "क्विज़ समाप्त करें",
    quizScoreTitle: "क्विज़ समाप्त!",
    quizScoreSubtitle: "आपका स्कोर",
    quizScoreSummary: "आपने {total} में से {score} प्रश्नों के सही उत्तर दिए।",
    quizRetry: "दूसरा विषय आज़माएँ",
    errorQuiz: "क्षमा करें, मैं क्विज़ शुरू नहीं कर सका।",
    errorQuizMessage: "AI ने मान्य क्विज़ प्रश्न नहीं लौटाए।",
    errorBackend: "क्षमा करें, एक त्रुटि हुई है। कृपया पुनः प्रयास करें।",
    errorSpeech: "क्षमा करें, आपका ब्राउज़र टेक्स्ट-टू-स्पीच का समर्थन नहीं करता है।",
    errorAISearch: "{topic} के लिए वीडियो नहीं मिल सके",
    errorAIDetails: "त्रुटि विवरण",
    errorInvalidResponse: "बैकएंड से अमान्य प्रतिक्रिया संरचना।",
    ttsTitle: "जोर से पढ़ें",
    codeCopied: "कॉपी किया गया!",
    codeCopy: "कॉपी",
    filePreview: "चयनित पूर्वावलोकन",
    loading: "लोड हो रहा है...",
    generatingQuiz: "आपकी क्विज़ तैयार हो रही है...",
    generatingVideo: "इंस्टेंट वीडियो बन रहा है...",
    instantVideo: "इंस्टेंट वीडियो",
    generatedVideoTitle: "AI द्वारा निर्मित वीडियो",
    collapseSidebar: "साइडबार बंद करें",
    expandSidebar: "साइडबार खोलें",
    settings: "सेटिंग्स",
    rateApp: "रेट करें",
    helpFAQ: "मदद एवं सामान्य प्रश्न",
    logout: "लॉगआउट",
    appearance: "दिखावट",
    contactSupport: "सहायता से संपर्क करें",
    needHelp: "अधिक सहायता चाहिए?",
    howToAsk: "प्रश्न कैसे पूछें?",
    howToAskAnswer: "चैट बॉक्स में अपना प्रश्न टाइप करें या माइक्रोफ़ोन आइकन पर क्लिक करके वॉइस इनपुट का उपयोग करें।",
    howToUpload: "छवियाँ कैसे अपलोड करें?",
    howToUploadAnswer: "हस्तलिखित नोट्स या पाठ्यपुस्तक पृष्ठों की छवियाँ अपलोड करने के लिए पेपरक्लिप आइकन पर क्लिक करें।",
    whatIsQuiz: "क्विज़ मोड क्या है?",
    whatIsQuizAnswer: "क्विज़ मोड आपके ज्ञान का परीक्षण करने के लिए विषयों के आधार पर अभ्यास प्रश्न उत्पन्न करता है।",
    howToGenerateVideo: "वीडियो कैसे बनाएं?",
    howToGenerateVideoAnswer: "त्वरित वीडियो स्पष्टीकरण उत्पन्न करने के लिए वीडियो आइकन पर क्लिक करें या अपने प्रश्न में 'वीडियो' टाइप करें।",
    backToChat: "चैट पर वापस जाएं",
    activity: "गतिविधि",
    login: "लॉगिन",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    system: "सिस्टम",
    account: "खाता",
    notifications: "सूचनाएं",
    privacy: "गोपनीयता",
    about: "के बारे में",
    version: "संस्करण 1.0.0",
    myProfile: "मेरी प्रोफ़ाइल",
    security: "सुरक्षा",
    paymentMethods: "भुगतान विधियाँ",
    subscription: "सब्सक्रिप्शन",
    learningProgress: "सीखने की प्रगति",
    certificates: "प्रमाणपत्र",
    savedTopics: "सहेजे गए विषय",
    logoutConfirm: "क्या आप लॉगआउट करना चाहते हैं?",
    yes: "हाँ",
    no: "नहीं",
    activityHistory: "गतिविधि इतिहास",
    studySessions: "अध्ययन सत्र",
    quizResults: "क्विज़ परिणाम",
    videoWatched: "देखे गए वीडियो",
    topicsLearned: "सीखे गए विषय",
    timeSpent: "बिताया गया समय",
    today: "आज",
    thisWeek: "इस सप्ताह",
    thisMonth: "इस महीने",
    allTime: "सभी समय",
    // छात्रों के लिए नए अनुवाद
    quickRevision: "त्वरित रिवीजन",
    difficultyLevel: "कठिनाई स्तर",
    beginner: "शुरुआती",
    intermediate: "मध्यम",
    advanced: "उन्नत",
    summary: "सारांश",
    keyPoints: "मुख्य बिंदु",
    examples: "उदाहरण",
    practiceQuestions: "अभ्यास प्रश्न",
    realWorldApplications: "वास्तविक दुनिया के उपयोग",
    studyTips: "अध्ययन युक्तियाँ",
    markImportant: "महत्वपूर्ण चिह्नित करें",
    saveForLater: "बाद के लिए सहेजें",
    generateFlashcards: "फ्लैशकार्ड बनाएं",
    explainLikeIm5: "5 साल के बच्चे की तरह समझाएं",
    needMoreClarity: "और स्पष्टता चाहिए",
    relatedTopics: "संबंधित विषय",
    studyPlan: "अध्ययन योजना",
    progressTracker: "प्रगति ट्रैकर",
    achievementBadge: "उपलब्धि बैज",
    streakCounter: "लगातार दिनों की गिनती",
  }
};

// --- Icon Components ---
const IconMenu = ({ size = 24 }) => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg> );
const IconPlus = ({ size = 18 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> );
const IconFileText = ({ size = 16 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2 2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> );
const IconBookOpen = ({ size = 18 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg> );
const IconMic = ({ size = 18 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg> );
const IconUser = ({ size = 18 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );
// Professional AI Icon (Brain with Lightning)
const IconAi = ({ size = 18 }) => ( 
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0z" />
    <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="#60a5fa" />
  </svg>
);
const IconSun = ({ size = 18 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> );
const IconMoon = ({ size = 18 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> );
const IconVolume2 = ({ size = 16 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg> );
const IconCopy = ({ size = 16 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> );
const IconCheck = ({ size = 16 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> );
const IconPaperclip = ({ size = 18 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg> );
const IconX = ({ size = 16 }) => ( <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> );
const IconCheckSquare = ({ size = 18 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg> );
const IconSearch = ({ size = 16 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> );
const IconSend = ({ size = 18 }) => ( <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> );
const IconVideo = ({ size = 18 }) => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg> );

const IconSettings = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconHelpCircle = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconActivity = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const IconChevronRight = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const IconShield = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconCreditCard = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const IconCertificate = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconBookmark = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const IconStar = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} className={className || 'w-5 h-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L12 16.347l-3.37 2.449c-.784.57-1.84-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L11.05 2.927z" />
  </svg>
);

const IconClock = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconLogOut = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} className={className || 'w-5 h-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
  </svg>
);

const IconTarget = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconLightbulb = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const IconBookmarkPlus = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5zM12 7v6m-3-3h6" />
  </svg>
);

const IconFlame = ({ size = 18 }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
  </svg>
);

// --- नया AiLoader Component (आपके दिए गए design के अनुसार) ---
const AiLoader = ({ isDarkMode }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer Ring - dark mode में cyan, light mode में slate */}
      <div 
        className={`
          absolute inset-0 rounded-full border-[3px] border-dotted 
          animate-[spin_3s_linear_infinite]
          ${isDarkMode 
            ? 'border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]' 
            : 'border-slate-800 opacity-80'}
        `}
      ></div>
    

      {/* Inner Ring (reverse direction) */}
      <div 
        className={`
          absolute inset-1.5 rounded-full border-[3px] border-dotted 
          animate-[spin_4s_linear_infinite] 
          ${isDarkMode 
            ? 'border-cyan-200 shadow-[0_0_5px_rgba(34,211,238,0.5)]' 
            : 'border-slate-600 opacity-60'}
        `}
        style={{ animationDirection: 'reverse' }} 
      ></div>
      
      {/* Center Glow */}
      <div 
        className={`
          w-1.5 h-1.5 rounded-full animate-pulse
          ${isDarkMode ? 'bg-cyan-100 shadow-[0_0_8px_#fff]' : 'bg-slate-900'}
        `}
      ></div>
    </div>
  );
};

// --- छात्रों के लिए नए Components ---

// QuickRevisionCards Component
function QuickRevisionCards({ currentTopic, lang, theme, onActionClick }) {
  const T = translations[lang];
  const revisionPoints = [
    T.summary,
    T.keyPoints,
    T.examples,
    T.practiceQuestions,
    T.realWorldApplications,
    T.studyTips
  ];

  const handleAction = (action) => {
    if (onActionClick) {
      onActionClick(action);
    }
  };

  return (
    <div className={`mt-4 p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-100/50 border-gray-300'}`}>
      <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        📝 {T.quickRevision}
      </h3>
      <div className="flex flex-wrap gap-2">
        {revisionPoints.map((point, idx) => (
          <button
            key={idx}
            onClick={() => handleAction(point)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105 active:scale-95 ${theme === 'dark' 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            {point}
          </button>
        ))}
      </div>
    </div>
  );
}

// TopicDifficultyIndicator Component
function TopicDifficultyIndicator({ difficulty = 'intermediate', lang, theme }) {
  const T = translations[lang];
  
  const difficultyLevels = {
    beginner: { color: 'bg-green-500', text: T.beginner },
    intermediate: { color: 'bg-yellow-500', text: T.intermediate },
    advanced: { color: 'bg-red-500', text: T.advanced }
  };

  const level = difficultyLevels[difficulty] || difficultyLevels.intermediate;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
      <span className={`w-2 h-2 rounded-full ${level.color}`}></span>
      <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        {T.difficultyLevel}: {level.text}
      </span>
    </div>
  );
}

// StudentActionButtons Component
function StudentActionButtons({ onActionClick, lang, theme }) {
  const T = translations[lang];
  const actions = [
    { label: T.markImportant, icon: '🔖' },
    { label: T.saveForLater, icon: '💾' },
    { label: T.generateFlashcards, icon: '📇' },
    { label: T.explainLikeIm5, icon: '👶' },
    { label: T.needMoreClarity, icon: '❓' },
    { label: T.relatedTopics, icon: '🔗' }
  ];

  const handleClick = (action) => {
    if (onActionClick) {
      onActionClick(action);
    }
  };

  return (
    <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/20 border-gray-700' : 'bg-gray-100/30 border-gray-300'}`}>
      <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Quick Actions</h4>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(action.label)}
            className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all hover:scale-105 ${theme === 'dark' 
              ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300' 
              : 'bg-white/80 hover:bg-white text-gray-700'}`}
          >
            <span>{action.icon}</span>
            <span className="truncate">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// StudyProgressTracker Component
function StudyProgressTracker({ lang, theme, streak, studyTime, setShowStudentFeatures }) {
  const T = translations[lang];
// Ise return() se pehle paste karein
  return (
    <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-100/50 border-gray-300'}`}>
      <div className="flex gap-4 mb-4 justify-start overflow-x-auto pb-2 border-b border-gray-600/30">
          <div title="Goals" className="cursor-pointer hover:text-blue-400"><IconTarget size={20} /></div>
          <div title="Ideas" className="cursor-pointer hover:text-yellow-400"><IconLightbulb size={20} /></div>
          <div title="Saved" className="cursor-pointer hover:text-green-400"><IconBookmarkPlus size={20} /></div>
          <div title="Trending" className="cursor-pointer hover:text-red-400"><IconFlame size={20} /></div>
          </div>
      <div className="flex justify-between items-center mb-3">
        <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {T.progressTracker}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
          🏆 {T.achievementBadge}
        </span>
      </div>
      <div className="mt-3 pt-2 border-t border-gray-500/20 text-center">
        <button 
           onClick={() => setShowStudentFeatures(prev => !prev)}
           className="text-xs text-blue-500 hover:text-blue-400 underline"
        >
           Toggle Features
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{T.streakCounter}</span>
            <span className={`text-xs font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>{streak} days 🔥</span>
          </div>
          <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
              style={{ width: `${Math.min(streak * 10, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{T.timeSpent}</span>
            <span className={`text-xs font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{studyTime} min</span>
          </div>
          <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
              style={{ width: `${Math.min(studyTime / 300 * 100, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className={`text-center p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
            <div className={`text-lg font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>5</div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Topics</div>
          </div>
          <div className={`text-center p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
            <div className={`text-lg font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>12</div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Quizzes</div>
          </div>
          <div className={`text-center p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
            <div className={`text-lg font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>85%</div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 1. Sidebar Component (UPDATED with student features) ---
function Sidebar({ 
  chatHistory,
  onNewChat,
  onSelectChat, 
  currentChatId, 
  setSidebarOpen, 
  theme, 
  toggleTheme, 
  currentView, 
  setView, 
  lang, 
  fontSize, 
  toggleFontSize, 
  searchQuery, 
  setSearchQuery, 
  setShowHelp,
  isSidebarOpen,
  setTheme,
  setLanguage,
  setShowActivity,
  showActivity,
  setShowAccount,
  setIsLoggedIn,
  isLoggedIn
  , addActivity
  ,showStudentFeatures,
  setShowStudentFeatures,
  streak,
  studyTime
}) {
  const T = translations[lang];
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const filteredHistory = chatHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Settings Menu Items
  const settingsMenuItems = [
    { icon: <IconStar size={18} />, label: T.rateApp, onClick: () => { window.open('https://your-app-store-link', '_blank'); addActivity && setTimeout(() => addActivity('rate','Opened rate dialog'), 0); } },
    { icon: <IconHelpCircle size={18} />, label: T.helpFAQ, onClick: () => { setShowHelp(true); addActivity && setTimeout(() => addActivity('help','Opened help'), 0); } },
  ];

  const accountMenuItems = [
    { icon: <IconUser size={18} />, label: T.myProfile, onClick: () => { setShowAccount(true); if (!showActivity) { addActivity && setTimeout(() => addActivity('view_profile','Opened profile'), 0); } } },
    { icon: <IconShield size={18} />, label: T.security, onClick: () => console.log('Security clicked') },
    { icon: <IconCreditCard size={18} />, label: T.paymentMethods, onClick: () => console.log('Payment Methods clicked') },
    { icon: <IconCertificate size={18} />, label: T.subscription, onClick: () => console.log('Subscription clicked') },
    { icon: <IconBookmark size={18} />, label: T.savedTopics, onClick: () => console.log('Saved Topics clicked') },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
    setShowSettings(false);
    try { addActivity && setTimeout(() => addActivity('logout','User logged out'), 0); } catch (e) {}
    console.log('User logged out');
  };

  return (
    <div className={`h-full flex flex-col border-r ${theme === 'dark' ? 'border-gray-800 bg-gray-950/90' : 'border-gray-300 bg-white/95'} backdrop-blur-xl w-64 md:w-72 transition-all duration-300 relative`}>
      {/* Header with Logo and Menu Button */}
      <div className={`p-4 flex items-center justify-between border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div onClick={() => { setShowAccount(true); addActivity && setTimeout(() => addActivity('view_profile','Opened profile'), 0); }} className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center ${theme === 'dark' ? 'cursor-pointer' : 'cursor-pointer shadow-md'}`} title={T.myProfile}>
            <IconBookOpen size={18} className="text-white" />
          </div>      
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-wide">{T.sidebarTitle}</h1>
        </div>
        
        {/* Menu Button (3 lines) for sidebar toggle */}
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className={`p-2 hover:bg-white/5 rounded-full transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          title={isSidebarOpen ? T.collapseSidebar : T.expandSidebar}
        >
          <IconMenu size={20} />
        </button>
      </div>
      
      {/* Quick Actions - Smaller Size */}
      <div className="p-3 space-y-2">
        <button 
          onClick={() => { onNewChat(); setView('chat'); setShowActivity(false); setShowAccount(false); setShowHelp(false); }} 
          className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${currentView === 'chat' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : theme === 'dark' ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200'}`}
        >
          <IconPlus size={16} /> {T.newTopic}
        </button>
        <button 
          onClick={() => { setView('quiz'); setSidebarOpen(false); setShowActivity(false); setShowAccount(false); setShowHelp(false); }} 
          className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${currentView === 'quiz' ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' : theme === 'dark' ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200'}`}
        >
          <IconCheckSquare size={16} /> <span>{T.quizMode}</span>
        </button>
      </div>
      
      {/* Search - Smaller Size */}
      <div className="px-3 pb-2">
        <div className={`flex items-center ${theme === 'dark' ? 'bg-gray-900/50 border-white/5' : 'bg-gray-100 border-gray-300'} border rounded-lg px-3 py-2 focus-within:border-blue-500/50 focus-within:${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-all`}>
          <IconSearch size={14} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} />
          <input 
            type="text" 
            placeholder={T.searchTopics} 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className={`bg-transparent border-none outline-none text-xs ml-2 w-full ${theme === 'dark' ? 'text-gray-200 placeholder-gray-600' : 'text-gray-800 placeholder-gray-500'}`}
          />
        </div>
      </div>
      
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        <div className={`px-3 py-2 text-xs font-semibold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} uppercase tracking-wider flex justify-between items-center`}>
          <span>{T.recentTopics}</span>
          <span className={`text-xs ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} px-2 py-1 rounded-full`}>{filteredHistory.length}</span>
        </div>
        {filteredHistory.map((chat) => (
          <div 
            key={chat.id} 
            onClick={() => { onSelectChat(chat.id); setView('chat'); }} 
            className={`group flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${currentChatId === chat.id ? theme === 'dark' ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'bg-blue-50 text-blue-700 shadow-inner border border-blue-200' : theme === 'dark' ? 'text-gray-400 hover:bg-white/5 hover:text-gray-200' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <IconFileText size={14} className={currentChatId === chat.id ? 'text-blue-400' : theme === 'dark' ? 'group-hover:text-blue-400/70' : 'group-hover:text-blue-600'} />
            <div className="flex-1 min-w-0">
              <span className="text-xs truncate block">{chat.title}</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'} truncate block`}>
                {chat.messages?.length > 0 ? 
                  `${chat.messages.length} msgs • ${new Date(chat.id).toLocaleDateString()}` : 
                  'No messages'}
              </span>
            </div>
          </div>
        ))}
        {filteredHistory.length === 0 && (
          <div className="text-center py-6">
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200'} flex items-center justify-center`}>
              <IconFileText size={20} className={theme === 'dark' ? 'text-gray-600' : 'text-gray-500'} />
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'} italic`}>{T.noTopics}</p>
          </div>
        )}
      </div>
      
      {/* Bottom Section with Settings, Activity, Login/Logout */}
      <div className={`p-3 border-t ${theme === 'dark' ? 'border-white/5 bg-gray-900/30' : 'border-gray-200 bg-gray-100/50'} space-y-2`}>
        
        {/* Activity Button */}
        <button 
          onClick={() => setShowActivity(true)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-200/50 hover:bg-gray-300/50 text-gray-700 hover:text-gray-900'}`}
        >
          <IconActivity size={16} />
          <span className="text-sm font-medium">{T.activity}</span>
        </button>
        
        {/* Settings Button */}
        <button 
          onClick={() => setShowSettings(true)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-200/50 hover:bg-gray-300/50 text-gray-700 hover:text-gray-900'}`}
        >
          <IconSettings size={16} />
          <span className="text-sm font-medium flex-1 text-left">{T.settings}</span>
          <IconChevronRight size={14} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} />
        </button>
        
        {/* Login/Logout Button */}
        <button 
          onClick={() => {
            if (isLoggedIn) setShowLogoutConfirm(true);
            else { setIsLoggedIn(true); try { addActivity && setTimeout(() => addActivity('login','User logged in'), 0); } catch (e) {} }
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${theme === 'dark' ? isLoggedIn ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 border border-red-500/20' : 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-500/20' : isLoggedIn ? 'bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border border-red-200' : 'bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 border border-blue-200'}`}
        >
          {isLoggedIn ? <IconLogOut size={16} /> : <IconUser size={16} />}
          <span className="text-sm font-medium">{isLoggedIn ? T.logout : T.login}</span>
        </button>
      </div>
      
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} border rounded-2xl w-full max-w-md p-6 animate-fade-in-up max-h-[80vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{T.settings}</h3>
              <button onClick={() => setShowSettings(false)} className={`p-2 hover:bg-white/5 rounded-full ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <IconX size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Appearance Section */}
              <div>
                <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3 uppercase tracking-wider`}>{T.appearance}</h4>
                <div className="space-y-2">
                  {/* Theme Options */}
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => {
                        setTheme('light');
                        const root = document.documentElement;
                        root.classList.remove('dark');
                        root.classList.add('light');
                        localStorage.setItem('theme', 'light');
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600' : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400'}`}
                    >
                      <IconSun size={20} />
                      <span className="text-xs mt-2">{T.lightMode}</span>
                    </button>
                    <button 
                      onClick={() => {
                        setTheme('dark');
                        const root = document.documentElement;
                        root.classList.remove('light');
                        root.classList.add('dark');
                        localStorage.setItem('theme', 'dark');
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600' : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400'}`}
                    >
                      <IconMoon size={20} />
                      <span className="text-xs mt-2">{T.darkMode}</span>
                    </button>
                    <button 
                      onClick={() => {
                        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        const newTheme = prefersDark ? 'dark' : 'light';
                        setTheme(newTheme);
                        const root = document.documentElement;
                        root.classList.remove('light', 'dark');
                        root.classList.add(newTheme);
                        localStorage.setItem('theme', newTheme);
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600' : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <span className="text-xs mt-2">{T.system}</span>
                    </button>
                  </div>
                  
                  {/* Font Size - FIXED */}
                  <div className="mt-4">
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{T.fontSize}</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => toggleFontSize('sm')}
                        className={`py-2 rounded-lg border transition-all ${fontSize === 'text-sm' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600' : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400'}`}
                      >
                        {T.fontSizeSmall}
                      </button>
                      <button 
                        onClick={() => toggleFontSize('md')}
                        className={`py-2 rounded-lg border transition-all ${fontSize === 'text-base' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600' : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400'}`}
                      >
                        {T.fontSizeMedium}
                      </button>
                      <button 
                        onClick={() => toggleFontSize('lg')}
                        className={`py-2 rounded-lg border transition-all ${fontSize === 'text-lg' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600' : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400'}`}
                      >
                        {T.fontSizeLarge}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Language Section */}
              <div>
                <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3 uppercase tracking-wider`}>{T.language}</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`flex-1 py-3 rounded-lg border transition-all ${lang === 'en' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600' : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => setLanguage('hi')}
                    className={`flex-1 py-3 rounded-lg border transition-all ${lang === 'hi' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600' : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400'}`}
                  >
                    हिंदी
                  </button>
                </div>
              </div>
              
              {/* Other Settings */}
              <div>
                <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3 uppercase tracking-wider`}>General</h4>
                <div className="space-y-2">
                  {settingsMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-gray-300' : 'border-gray-300 bg-gray-100/50 hover:bg-gray-200 text-gray-700'}`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.subLabel && (
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{item.subLabel}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Account Settings */}
              <div>
                <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3 uppercase tracking-wider`}>{T.account}</h4>
                <div className="space-y-2">
                  {accountMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-gray-300' : 'border-gray-300 bg-gray-100/50 hover:bg-gray-200 text-gray-700'}`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.subLabel && (
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{item.subLabel}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Logout Button */}
              {isLoggedIn && (
                <button 
                  onClick={() => setShowLogoutConfirm(true)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors ${theme === 'dark' ? 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300' : 'border-red-300 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800'}`}
                >
                  <IconLogOut size={16} />
                  <span className="text-sm font-medium">{T.logout}</span>
                </button>
              )}
              
              {/* Version Info */}
              <div className={`text-center pt-4 border-t ${theme === 'dark' ? 'border-gray-800 text-gray-500' : 'border-gray-300 text-gray-600'}`}>
                <p className="text-xs">{T.version}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} border rounded-2xl w-full max-w-sm p-6 animate-fade-in-up`}>
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{T.logoutConfirm}</h3>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleLogout}
                className={`flex-1 py-2.5 rounded-lg border transition-colors ${theme === 'dark' ? 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300' : 'border-red-300 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800'}`}
              >
                {T.yes}
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className={`flex-1 py-2.5 rounded-lg border transition-colors ${theme === 'dark' ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300' : 'border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                {T.no}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 2. Welcome Screen (UPDATED with student focus) ---
// --- 6. Welcome Screen (UPDATED & FIXED) ---
function WelcomeScreen({ onPromptClick, lang, theme }) {
  const T = translations[lang];

  // 1. Data Source with Icons & Difficulty
  const suggestions = [
    { 
      icon: "🧠", 
      text: T.suggestion1 || "Explain Photosynthesis", 
      desc: T.desc1 || "Get an explanation for this topic.",
      difficulty: "beginner" // 🟢 Easy
    },
    { 
      icon: "📜", 
      text: T.suggestion2 || "Brief summary of World War 2", 
      desc: T.desc2 || "Get an explanation for this topic.",
      difficulty: "intermediate" // 🟡 Medium
    },
    { 
      icon: "💻", 
      text: T.suggestion3 || "Flowchart for Binary Search", 
      desc: T.desc3 || "Get an explanation for this topic.",
      difficulty: "advanced" // 🔴 Hard
    }
  ];

  return (
    <div className={`flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center ${theme === 'dark' ? 'bg-transparent' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      
      {/* --- Header Section --- */}
      <div className={`${theme === 'dark' ? 'bg-gradient-to-b from-gray-800/50 to-gray-900/50' : 'bg-gradient-to-b from-blue-50 to-white'} p-4 rounded-full mb-6 ${theme === 'dark' ? 'border border-white/5' : 'border border-blue-200'} shadow-2xl animate-bounce-slow`}>
        <IconBookOpen size={48} className="text-blue-400" />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-3 tracking-tight">{T.welcomeTitle}</h1>
      <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-12 max-w-lg leading-relaxed`}>{T.welcomeSubtitle}</p>
      
      {/* --- Student Focus Features (As per your request) --- */}
      <div className={`max-w-4xl w-full mb-8 p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/30 border border-white/5' : 'bg-white/80 border border-gray-300'}`}>
        <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>🎯 सीखने का नया तरीका</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
            <div className="text-2xl mb-2">🧠</div>
            <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>समझ में आसान</h4>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>कठिन विषयों को सरल भाषा में</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
            <div className="text-2xl mb-2">📊</div>
            <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>प्रगति ट्रैकिंग</h4>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>रोजाना की प्रगति देखें</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
            <div className="text-2xl mb-2">🎮</div>
            <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>इंटरएक्टिव लर्निंग</h4>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>क्विज़ और अभ्यास के साथ</p>
          </div>
        </div>
      </div>
      
      {/* --- Suggestion Cards (FIXED: Icons + No Overlap + Dynamic Difficulty) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onPromptClick(s.text, "explain")}
            className={`group relative flex flex-col items-start p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 text-left hover:-translate-y-1 shadow-lg hover:shadow-blue-900/20 ${theme === 'dark' ? 'bg-gray-800/30 border-white/5 hover:border-blue-500/30 hover:bg-gray-800/60' : 'bg-white/80 border-gray-200 hover:border-blue-300 hover:bg-white'}`}
          >
            {/* 1. Icon */}
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
            
            {/* 2. Text & Badge Container (Flex-Col + Gap fixes overlap) */}
            <div className="flex flex-col gap-2 w-full items-start mb-2">
                <span className={`font-bold text-lg leading-tight group-hover:text-blue-300 transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    {s.text}
                </span>
                
                {/* 3. Difficulty Badge */}
                <div className="transform scale-90 origin-left">
                    <TopicDifficultyIndicator difficulty={s.difficulty} lang={lang} theme={theme} />
                </div>
            </div>

            {/* 4. Description */}
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} line-clamp-2`}>
                {s.desc}
            </p>

            {/* Decoration Icon */}
            <div className="absolute top-4 right-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-blue-400 transition-all">
              <IconSend size={16} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
// --- 3. Chat Input (Floating Glass Bar) ---
function ChatInput({ onSendMessage, isLoading, selectedFile, setSelectedFile, filePreview, setFilePreview, lang, theme }) {
  const T = translations[lang];
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInputValue(transcript);
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }
  }, [lang]); 

  const handleMicClick = () => {
    if (isLoading || !recognitionRef.current) return;
    if (isListening) { 
      recognitionRef.current.stop(); 
    } else { 
      setInputValue(""); 
      recognitionRef.current.start(); 
      setIsListening(true); 
    }
  };

  const handleSendClick = () => {
    const type = selectedFile ? "image_explain" : "explain";
    if ((inputValue.trim() === "" && !selectedFile) || isLoading) return;
    onSendMessage(inputValue, type); 
    setInputValue("");
  };
  
  const handleKeyDown = (e) => { 
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleVideoClick = () => {
    if (inputValue.trim() === "" || isLoading) return;
    onSendMessage(inputValue, "generate_video"); 
    setInputValue("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) { 
      setSelectedFile(file); 
      setFilePreview(URL.createObjectURL(file)); 
    }
    event.target.value = null;
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 px-4 md:px-8 flex flex-col items-center pointer-events-none z-20">
      {filePreview && (
        <div className={`pointer-events-auto backdrop-blur-xl border p-2 rounded-xl flex items-center gap-3 mb-3 shadow-xl animate-fade-in-up ${theme === 'dark' ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-300'}`}>
          <img src={filePreview} alt={T.filePreview} className="w-12 h-12 rounded-lg object-cover border border-gray-600" />
          <div className="flex flex-col">
            <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>Selected</span>
            <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'} truncate max-w-[150px]`}>{selectedFile?.name}</span>
          </div>
          <button onClick={() => { setSelectedFile(null); setFilePreview(null); }} className={`p-1.5 hover:bg-gray-700 rounded-full ${theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'} transition-colors`}><IconX size={16} /></button>
        </div>
      )}

      <div className={`pointer-events-auto w-full max-w-3xl backdrop-blur-2xl border rounded-full p-2 flex items-center shadow-2xl transition-all focus-within:bg-gray-800/80 focus-within:border-blue-500/30 focus-within:shadow-[0_0_25px_rgba(37,99,235,0.15)] ${theme === 'dark' ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-300'}`}>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/png, image/jpeg, image/webp" />
        <button type="button" className={`p-3 rounded-full transition-all duration-200 ${theme === 'dark' ? 'text-gray-400 hover:text-blue-400 hover:bg-white/5' : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100'}`} onClick={handleAttachClick} disabled={isLoading}><IconPaperclip size={20} /></button>
        <button type="button" className={`p-3 rounded-full transition-all duration-200 hidden md:block ${theme === 'dark' ? 'text-gray-400 hover:text-pink-400 hover:bg-white/5' : 'text-gray-600 hover:text-pink-500 hover:bg-gray-100'}`} onClick={handleVideoClick} disabled={isLoading || inputValue.trim() === ""} title={T.instantVideo}><IconVideo size={20} /></button>
        
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder={isListening ? T.inputListening : T.inputPlaceholder} 
          className={`flex-1 bg-transparent border-none outline-none placeholder-gray-500 px-3 text-base md:text-lg ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`} 
          disabled={isLoading} 
        />

        <div className="flex items-center gap-1">
          <button type="button" className={`p-3 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`} onClick={handleMicClick} disabled={isLoading || !recognitionRef.current}><IconMic size={20} /></button>
          <button onClick={handleSendClick} disabled={isLoading || (inputValue.trim() === "" && !selectedFile)} className={`p-3 rounded-full shadow-lg transition-all duration-300 transform ${isLoading || (inputValue.trim() === "" && !selectedFile) ? theme === 'dark' ? 'bg-gray-700 text-gray-500' : 'bg-gray-300 text-gray-500' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/40 hover:scale-105'} cursor-not-allowed`}><IconSend size={20} /></button>
        </div>
      </div>
    </div>
  );
}

// --- 4. Code Block ---
function CodeBlock({ language, code, lang, theme }) {
  const T = translations[lang];
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => { 
    navigator.clipboard.writeText(code).then(() => { 
      setIsCopied(true); 
      setTimeout(() => setIsCopied(false), 2000); 
    }); 
  };

  return (
    <div className={`my-4 rounded-xl overflow-hidden border shadow-xl ${theme === 'dark' ? 'border-gray-700 bg-[#0d1117]' : 'border-gray-300 bg-gray-50'}`}>
      <div className={`flex justify-between items-center px-4 py-2 border-b ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
        <span className="text-xs font-mono text-blue-400 lowercase">{language}</span>
        <button onClick={handleCopy} className={`flex items-center gap-1.5 text-xs transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          {isCopied ? <IconCheck size={14} className="text-green-400" /> : <IconCopy size={14} />} <span>{isCopied ? T.codeCopied : T.codeCopy}</span>
        </button>
      </div>
      <pre className={`p-4 overflow-x-auto text-sm md:text-base font-mono leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}><code>{code}</code></pre>
    </div>
  );
}

// --- 5. Math Renderer ---
function MathRenderer({ text }) {
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g);
  return <span className="leading-relaxed">{parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) return <div key={index} className="my-3 p-3 bg-white/5 rounded-lg border-l-2 border-blue-500 overflow-x-auto text-blue-100 font-serif italic text-center">{part}</div>;
    if (part.startsWith('$') && part.endsWith('$')) return <span key={index} className="px-1 text-blue-300 font-serif italic font-medium">{part}</span>;
    return <span key={index}>{part}</span>;
  })}</span>;
}

// --- 6. Step-by-Step ---
function StepByStepRenderer({ steps, theme }) {
  return (
    <div className="space-y-4 my-2">
      {steps.map((step, index) => (
        <div key={index} className={`flex gap-4 p-4 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50' : 'bg-gray-100/50 border-gray-300 hover:bg-gray-200/50'}`} style={{ animationDelay: `${index * 150}ms` }}>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-sm">{index + 1}</div>
          <div className={`leading-relaxed pt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}><MathRenderer text={step} /></div>
        </div>
      ))}
    </div>
  );
}

// --- 7. Mermaid ---
function MermaidRenderer({ chartDefinition, theme }) { 
  const ref = useRef(null);
  useEffect(() => {
    if (chartDefinition && ref.current) {
      mermaid.initialize({ startOnLoad: false, theme: theme === 'dark' ? 'dark' : 'default' });
      mermaid.render(`graph-${Date.now()}`, chartDefinition).then(({ svg }) => { if (ref.current) ref.current.innerHTML = svg; }).catch(e => { if(ref.current) ref.current.innerHTML = `<div class="text-red-400 text-sm">Map Error</div>`; });
    }
  }, [chartDefinition, theme]);
  return <div ref={ref} className={`my-4 p-4 border rounded-xl overflow-x-auto flex justify-center ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'}`} />;
}

// --- 8. Chat Area (UPDATED with typing effect and student features) ---
function ChatArea({ currentChat, onSendMessage, isLoading, selectedFile, setSelectedFile, filePreview, setFilePreview, theme, lang, showStudentFeatures }) {
  const chatEndRef = useRef(null);
  const T = translations[lang];
  
  // State for typing effect
  const [typingMessages, setTypingMessages] = useState({});
  
  // State for student features
  
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages, typingMessages]);

  // Process messages for typing effect
  useEffect(() => {
    if (!currentChat) return;
    
    currentChat.messages.forEach(message => {
      if (message.sender === 'ai' && message.type === 'text' && message.text && !typingMessages[message.id]) {
        // Initialize typing effect for this message
        setTypingMessages(prev => ({
          ...prev,
          [message.id]: {
            displayText: '',
            fullText: message.text,
            isComplete: false
          }
        }));
      }
    });
  }, [currentChat, typingMessages]);

  // Handle typing animation
  useEffect(() => {
    const messageIds = Object.keys(typingMessages);
    
    messageIds.forEach(messageId => {
      const typingState = typingMessages[messageId];
      
      if (!typingState.isComplete && typingState.displayText.length < typingState.fullText.length) {
        const timer = setTimeout(() => {
          setTypingMessages(prev => {
            const currentState = prev[messageId];
            if (!currentState) return prev;
            
            const nextChar = currentState.fullText[currentState.displayText.length];
            const isComplete = currentState.displayText.length + 1 >= currentState.fullText.length;
            
            return {
              ...prev,
              [messageId]: {
                ...currentState,
                displayText: currentState.displayText + nextChar,
                isComplete
              }
            };
          });
        }, 20); // Typing speed: 20ms per character
        
        return () => clearTimeout(timer);
      }
    });
  }, [typingMessages]);

  const handleSpeakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStudentAction = (action) => {
    // Handle student action buttons
    if (action === T.markImportant) {
      onSendMessage(`Please mark this as important: ${currentChat?.messages[currentChat?.messages.length - 1]?.text?.substring(0, 50)}...`, "explain");
    } else if (action === T.explainLikeIm5) {
      onSendMessage("Explain this in simple terms like I'm 5 years old", "explain");
    } else if (action === T.needMoreClarity) {
      onSendMessage("Can you explain this with more clarity and examples?", "explain");
    } else if (action === T.relatedTopics) {
      onSendMessage("What are some related topics I should learn next?", "explain");
    }
  };

  const renderContent = (content, messageId) => {
    // Ensure content is a string
    if (typeof content !== 'string') {
      return null;
    }

    // Get the display text for typing effect
    const displayContent = typingMessages[messageId]?.displayText || content;
    
    return displayContent.split(/(```[\w-]*\n.*?\n```)/gs).map((part, i) => {
      const match = part.match(/^```([\w-]*)?\n(.*?)\n```$/s);
      if (match) return match[1] === 'mermaid' ? <MermaidRenderer key={i} chartDefinition={match[2]} theme={theme} /> : <CodeBlock key={i} language={match[1] || 'text'} code={match[2]} lang={lang} theme={theme} />;
      return part.trim() ? <div key={i} className="whitespace-pre-wrap mb-2"><MathRenderer text={part} /></div> : null;
    });
  };

  if (!currentChat) return <div className="flex-1 flex flex-col relative h-full"><WelcomeScreen onPromptClick={(p, t) => onSendMessage(p, t, true)} lang={lang} theme={theme} /><ChatInput onSendMessage={onSendMessage} isLoading={isLoading} selectedFile={selectedFile} setSelectedFile={setSelectedFile} filePreview={filePreview} setFilePreview={setFilePreview} lang={lang} theme={theme} /></div>;

  return (
    <div className="flex-1 flex flex-col relative h-full">
      <div className={`flex-1 overflow-y-auto px-4 md:px-12 py-6 space-y-8 pb-32 scrollbar-thin ${theme === 'dark' ? 'scrollbar-thumb-gray-700' : 'scrollbar-thumb-gray-400'} scrollbar-track-transparent`}>
        {currentChat.messages.map((message) => {
          const isThinking = message.sender === 'ai' && (
                          message.type === 'loading' || (message.type === 'text' && typingMessages[message.id] && !typingMessages[message.id].isComplete)
                        );
          
          return (
            <div key={message.id} className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              {message.sender === 'ai' && (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0 flex items-center justify-center">
                  {isThinking ? (
                    // NAYA LOADER CODE
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center overflow-hidden`}> 
                      <AiLoader isDarkMode={theme === 'dark'} />
                    </div>
                  ) : (
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20`}>
                      <IconAi size={20} className="text-white" />
                    </div>
                  )}
                </div>
              )}
              
              <div className={`relative max-w-[85%] md:max-w-2xl p-3 md:p-4 rounded-2xl shadow-sm backdrop-blur-sm border ${
                message.sender === 'user' 
                  ? (theme === 'dark' ? 'bg-transparent text-white rounded-tr-none border border-gray-600/30 shadow-none' : 'bg-white/90 text-gray-900 rounded-tr-none border border-gray-200/30 shadow-none')
                  : theme === 'dark' 
                    ? 'bg-gray-800/80 text-gray-100 rounded-tl-none border-white/5' 
                    : 'bg-white/80 text-gray-800 rounded-tl-none border-gray-300'
              }`}>
                {message.image && <img src={message.image} alt="Upload" className="max-w-full rounded-lg mb-2 border border-white/10" />}
                
                {message.type === 'text' && (
                  <div className={message.sender === 'user' ? "text-sm md:text-sm leading-relaxed whitespace-pre-wrap font-medium" : "prose prose-invert prose-sm md:prose-base max-w-none"}>
                    {renderContent(message.text, message.id)}
                    
                    {/* Student Features for AI messages */}
                    {message.sender === 'ai' && !isThinking && (
                      <div className="mt-4 space-y-4">
                        <TopicDifficultyIndicator difficulty="intermediate" lang={lang} theme={theme} />
                        
                        {showStudentFeatures && (
                          <>
                            <QuickRevisionCards 
                              currentTopic={currentChat.title} 
                              lang={lang} 
                              theme={theme}
                              onActionClick={handleStudentAction}
                            />
                            
                            <StudentActionButtons 
                              onActionClick={handleStudentAction}
                              lang={lang}
                              theme={theme}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {message.type === 'steps' && <div className="w-full"><StepByStepRenderer steps={message.data} theme={theme} /></div>}
                
                {message.type === 'generated_video' && (
                  <div className={`mt-2 rounded-xl overflow-hidden border ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'}`}>
                     <div className={`p-2 border-b text-xs font-medium uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'}`}><IconVideo size={14} /> {T.generatedVideoTitle}</div>
                     <video controls className="w-full"><source src={message.content} type="video/mp4" />Your browser does not support the video tag.</video>
                  </div>
                )}

                {message.type === 'videos' && (
                  <div className="mt-2 space-y-2">
                     <p className={`text-xs uppercase font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Recommended Videos</p>
                     {message.data && message.data.map((v, i) => (
                       <a key={i} href={v.url} target="_blank" rel="noreferrer" className={`block p-3 rounded-lg border transition-all group ${theme === 'dark' ? 'bg-gray-900/50 hover:bg-gray-900 border-white/5 hover:border-blue-500/30' : 'bg-gray-100/50 hover:bg-gray-200 border-gray-300 hover:border-blue-300'}`}>
                         <div className={`font-medium group-hover:text-blue-300 truncate ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{v.title}</div>
                         <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{v.source}</div>
                       </a>
                     ))}
                  </div>
                )}
                
                {message.sender === 'ai' && (message.type === 'text' || message.type === 'steps') && !isThinking && (
                  <button className="absolute -bottom-6 left-0 p-1.5 text-gray-500 hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" onClick={() => handleSpeakText(message.text || "")} title={T.ttsTitle}><IconVolume2 size={16} /></button>
                )}
              </div>

              {message.sender === 'user' && <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg border ${
                theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-900 border-gray-800'
              }`}>
                <IconUser size={18} className="text-white" />
              </div>}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>
      
      {/* Study Progress Tracker (Fixed at bottom right) */}
      {showStudentFeatures && (
        <div className="absolute bottom-24 right-4 w-64">
          <StudyProgressTracker lang={lang} theme={theme} />
        </div>
      )}
      
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} selectedFile={selectedFile} setSelectedFile={setSelectedFile} filePreview={filePreview} setFilePreview={setFilePreview} lang={lang} theme={theme} />
    </div>
  );
}

// --- 9. Quiz Components ---
function QuizDifficultySelector({ onDifficultySelect, onBack, lang, theme }) {
  const T = translations[lang];

  const handleSelect = (difficulty) => {
    onDifficultySelect(difficulty);
  }

  return (
    <div className={`flex-1 overflow-y-auto p-6 md:p-12 ${theme === 'dark' ? '' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <button onClick={onBack} className={`mb-6 flex items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {T.back || "Back"}
      </button>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">{T.quizDifficultyTitle}</h1>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{T.quizDifficultySubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Easy Mode */}
        <button 
          onClick={() => handleSelect('easy')}
          className={`group relative overflow-hidden backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-left ${theme === 'dark' ? 'bg-gray-800/40 border-white/5 hover:border-white/10' : 'bg-white/60 border-gray-300 hover:border-gray-400'}`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-green-500 to-emerald-500 transition-opacity duration-300" />
          <span className="text-5xl mb-4 block">🟢</span>
          <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{T.quizEasy}</h3>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{T.quizTimePerQuestion}: ~60 sec</p>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{T.quizTotalTime}: ~10 min</p>
        </button>

        {/* Hard Mode */}
        <button 
          onClick={() => handleSelect('hard')}
          className={`group relative overflow-hidden backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-left ${theme === 'dark' ? 'bg-gray-800/40 border-white/5 hover:border-white/10' : 'bg-white/60 border-gray-300 hover:border-gray-400'}`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-red-500 to-orange-500 transition-opacity duration-300" />
          <span className="text-5xl mb-4 block">🔴</span>
          <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{T.quizHard}</h3>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{T.quizTimePerQuestion}: ~45 sec</p>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{T.quizTotalTime}: ~20 min</p>
        </button>
      </div>
    </div>
  );
}

function QuizSubjectSelector({ onSubjectSelect, onLoading, lang, theme }) {
  const T = translations[lang];
  const subjects = [
    { name: T.quizSubjects["Current Affairs"], emoji: "📰", color: "from-blue-500 to-cyan-500" },
    { name: T.quizSubjects["Static GK"], emoji: "🏛️", color: "from-purple-500 to-pink-500" },
    { name: T.quizSubjects["History"], emoji: "📜", color: "from-amber-500 to-orange-500" },
    { name: T.quizSubjects["Geography"], emoji: "🌍", color: "from-emerald-500 to-green-500" },
    { name: T.quizSubjects["Political Science"], emoji: "🗳️", color: "from-red-500 to-rose-500" },
    { name: T.quizSubjects["Economics"], emoji: "📈", color: "from-indigo-500 to-blue-600" },
    { name: T.quizSubjects["General Science"], emoji: "🔬", color: "from-teal-500 to-emerald-400" },
    { name: T.quizSubjects["English"], emoji: "🇬🇧", color: "from-sky-500 to-blue-500" },
    { name: T.quizSubjects["Math Reasoning"], emoji: "🧠", color: "from-violet-500 to-fuchsia-500" },
  ];

  const handleSelect = (subjectName) => {
    onLoading(true);
    const subjectKey = Object.keys(T.quizSubjects).find(key => T.quizSubjects[key] === subjectName);
    onSubjectSelect(subjectKey); 
  }

  return (
    <div className={`flex-1 overflow-y-auto p-6 md:p-12 ${theme === 'dark' ? '' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">{T.quizTitle}</h1>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{T.quizSubtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {subjects.map((subject, idx) => (
          <button 
            key={subject.name} 
            className={`group relative overflow-hidden backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-left ${theme === 'dark' ? 'bg-gray-800/40 border-white/5 hover:border-white/10' : 'bg-white/60 border-gray-300 hover:border-gray-400'}`}
            onClick={() => handleSelect(subject.name)}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${subject.color} transition-opacity duration-300`} />
            <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">{subject.emoji}</span>
            <span className={`text-xl font-bold group-hover:text-white transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{subject.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuizRenderer({ questions, onQuizComplete, lang, theme, totalTime = 0 }) {
  const T = translations[lang];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      // Time's up - auto submit
      let score = 0;
      for (let i = 0; i < questions.length; i++) {
        if (selectedAnswers[i] === questions[i].answer) score++;
      }
      onQuizComplete(score, questions.length);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, questions, selectedAnswers, onQuizComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (option) => { 
    if (showResults) return; 
    setSelectedAnswers({...selectedAnswers, [currentQuestionIndex]: option}); 
  };
  
  const handleNext = () => {
    setShowResults(false);
    if (currentQuestionIndex < questions.length - 1) { 
      setCurrentQuestionIndex(currentQuestionIndex + 1); 
    } else { 
      let score = 0; 
      for (let i = 0; i < questions.length; i++) { 
        if (selectedAnswers[i] === questions[i].answer) score++; 
      }
      onQuizComplete(score, questions.length); 
    }
  };

  return (
    <div className={`flex-1 flex flex-col items-center justify-center p-6 ${theme === 'dark' ? '' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className={`w-full max-w-3xl backdrop-blur-xl border rounded-3xl p-8 shadow-2xl relative overflow-hidden ${theme === 'dark' ? 'bg-gray-800/60 border-gray-700' : 'bg-white/80 border-gray-300'}`}>
        <div className="absolute top-0 left-0 h-1 bg-gray-700 w-full">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} />
        </div>
        <div className={`flex justify-between items-center mb-6 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <span>{T.quizQuestionHeader} {currentQuestionIndex + 1} / {questions.length}</span>
          {totalTime > 0 && (
            <span className={`px-3 py-1 rounded-lg ${timeRemaining < 30 ? 'bg-red-500/20 text-red-400 font-bold' : 'bg-blue-500/20 text-blue-400'}`}>
              ⏱️ {formatTime(timeRemaining)}
            </span>
          )}
        </div>
        <h2 className={`text-2xl font-bold mb-8 leading-relaxed ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}><MathRenderer text={currentQuestion.question} /></h2>
        <div className="grid gap-4">
          {currentQuestion.options.map((option) => {
            // Default neutral style
            let styleClass = theme === 'dark'
              ? "border-gray-700 bg-gray-700/30 text-gray-300 hover:bg-gray-700/60"
              : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200";

            if (showResults) {
              // Highlight correct answer strongly (green)
              if (option === currentQuestion.answer) {
                styleClass = "border-green-600 bg-green-600 text-white";
              }
              // Highlight user's wrong selection strongly (red)
              else if (selectedOption === option) {
                styleClass = "border-red-600 bg-red-600 text-white";
              }
              // Dim other options
              else {
                styleClass = theme === 'dark' ? "border-gray-700 opacity-50" : "border-gray-300 opacity-50";
              }
            } else if (selectedOption === option) {
              // Selected but not yet checked
              styleClass = "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20";
            }

            return (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                disabled={showResults}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 font-medium ${styleClass}`}>
                <MathRenderer text={option} />
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex justify-end">
          {!showResults ? <button onClick={() => setShowResults(true)} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50" disabled={!selectedOption}>{T.quizCheck}</button> : <button onClick={handleNext} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-semibold shadow-lg">{currentQuestionIndex === questions.length - 1 ? T.quizFinish : T.quizNext}</button>}
        </div>
      </div>
    </div>
  );
}

function QuizScoreScreen({ score, total, onRetry, lang, theme }) {
  const T = translations[lang];
  const percentage = (score / total) * 100;
  return (
    <div className={`flex-1 flex flex-col items-center justify-center p-6 text-center ${theme === 'dark' ? '' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className={`backdrop-blur-xl border p-12 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden ${theme === 'dark' ? 'bg-gray-800/60 border-gray-700' : 'bg-white/80 border-gray-300'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <div className={`w-32 h-32 mx-auto mb-6 rounded-full border-4 flex items-center justify-center shadow-xl ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'}`}>
            <span className={`text-4xl font-black ${percentage >= 70 ? 'text-green-400' : 'text-blue-400'}`}>{score}/{total}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{T.quizScoreTitle}</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-8`}>{T.quizScoreSubtitle}</p>
          <p className={`text-lg mb-8 font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{T.quizScoreSummary.replace('{score}', score).replace('{total}', total)}</p>
          <button onClick={onRetry} className={`w-full py-4 text-white rounded-xl font-bold transition-all border ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-gray-500' : 'bg-gray-800 hover:bg-gray-700 border-gray-700 hover:border-gray-600'}`}>{T.quizRetry}</button>
        </div>
      </div>
    </div>
  );
}

// --- 10. Main Loading Screen ---
function MainLoadingScreen({ text, theme }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className={`flex items-center gap-3 backdrop-blur px-6 py-4 rounded-2xl border shadow-xl ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-300'}`}>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-200"></div>
        </div>
        <span className={`font-medium tracking-wide ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{text}</span>
      </div>
    </div>
  );
}

// --- 11. Help Screen ---
function HelpScreen({ onBack, lang, theme }) {
  const T = translations[lang];
  const faqs = [
    {
      question: T.howToAsk,
      answer: T.howToAskAnswer
    },
    {
      question: T.howToUpload,
      answer: T.howToUploadAnswer
    },
    {
      question: T.whatIsQuiz,
      answer: T.whatIsQuizAnswer
    },
    {
      question: T.howToGenerateVideo,
      answer: T.howToGenerateVideoAnswer
    }
  ];

  return (
    <div className={`flex-1 p-6 overflow-y-auto ${theme === 'dark' ? '' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className={`mb-6 flex items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {T.backToChat}
        </button>

        <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{T.helpFAQ}</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-8`}>Get help with using Lunora AI Tutor</p>

        <div className="grid gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className={`border rounded-xl p-6 hover:border-blue-500/30 transition-all ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'}`}>
              <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                  {index + 1}
                </span>
                {faq.question}
              </h3>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-3">{T.needHelp}</h3>
          <p className="text-gray-300 mb-4">Contact our support team for further assistance.</p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
            {T.contactSupport}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 12. Activity Screen ---
function ActivityScreen({ onBack, lang, theme, activityLog = [], clearActivity }) {
  const T = translations[lang];
  const [timeFilter, setTimeFilter] = useState('today');
  
  const total = activityLog.length;
  const chats = activityLog.filter(a => a.type === 'chat').length;
  const messages = activityLog.filter(a => a.type === 'message').length;
  const quizzes = activityLog.filter(a => a.type === 'quiz' || a.type === 'quiz_result').length;
  const logins = activityLog.filter(a => a.type === 'login').length;

  const timeFilters = [
    { id: 'today', label: T.today },
    { id: 'thisWeek', label: T.thisWeek },
    { id: 'thisMonth', label: T.thisMonth },
    { id: 'allTime', label: T.allTime }
  ];

  return (
    <div className={`flex-1 p-6 overflow-y-auto ${theme === 'dark' ? '' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className={`mb-6 flex items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {T.backToChat}
        </button>
        
        <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{T.activity}</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-8`}>{T.activityHistory}</p>
        
        {/* Time Filter */}
        <div className="flex gap-2 mb-8">
          {timeFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setTimeFilter(filter.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${timeFilter === filter.id ? 
                theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700' : 
                theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Stats Grid (computed from activityLog) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <IconBookOpen size={20} className="text-blue-400" />
              </div>
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{total}</span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Actions</p>
          </div>
          
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <IconCheckSquare size={20} className="text-purple-400" />
              </div>
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{quizzes}</span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Quizzes</p>
          </div>
          
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <IconVideo size={20} className="text-pink-400" />
              </div>
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{messages}</span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Messages</p>
          </div>
          
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <IconFileText size={20} className="text-green-400" />
              </div>
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{chats}</span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Chats Started</p>
          </div>
          
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <IconClock size={20} className="text-amber-400" />
              </div>
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{logins}</span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Logins</p>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
            <div className="flex gap-2">
              <button onClick={() => clearActivity && clearActivity()} className="px-3 py-1 rounded-md border text-sm">Clear</button>
            </div>
          </div>
          <div className="space-y-4">
            {activityLog.length === 0 ? (
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>No recent activity</p>
            ) : (
              activityLog.map((item) => (
                <div key={item.id} className={`flex items-center gap-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/30 hover:bg-gray-800/50' : 'bg-gray-100/50 hover:bg-gray-200/50'} transition-colors`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'chat' ? 'bg-blue-500/20' : item.type === 'quiz' || item.type === 'quiz_result' ? 'bg-purple-500/20' : item.type === 'message' ? 'bg-pink-500/20' : 'bg-green-500/20'}`}>
                    {item.type === 'chat' ? <IconBookOpen size={16} className="text-blue-400" /> : item.type === 'quiz' || item.type === 'quiz_result' ? <IconCheckSquare size={16} className="text-purple-400" /> : item.type === 'message' ? <IconVideo size={16} className="text-pink-400" /> : <IconClock size={16} className="text-green-400" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.text}</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{new Date(item.time).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 13. Account Screen ---
function AccountScreen({ onBack, lang, theme, userProfile, setUserProfile, addActivity }) {
  const T = translations[lang];
  const [editing, setEditing] = useState(!userProfile?.name);
  const [form, setForm] = useState({ ...(userProfile || { name: '', email: '', avatar: '', membership: 'Free', joinDate: new Date().toLocaleDateString() }) });

  useEffect(() => {
    setForm({ ...(userProfile || { name: '', email: '', avatar: '', membership: 'Free', joinDate: new Date().toLocaleDateString() }) });
  }, [userProfile]);

  const handleSave = () => {
    const updated = { ...form };
    setUserProfile(updated);
    try { localStorage.setItem('userProfile', JSON.stringify(updated)); } catch (e) {}
    try { addActivity && setTimeout(() => addActivity('profile_update', 'Updated profile'), 0); } catch (e) {}
    setEditing(false);
  };

  const accountSections = [
    { icon: <IconUser size={18} />, label: T.myProfile, description: "View and edit your profile information" },
    { icon: <IconShield size={18} />, label: T.security, description: "Manage password and security settings" },
    { icon: <IconCreditCard size={18} />, label: T.paymentMethods, description: "Update your payment methods" },
    { icon: <IconCertificate size={18} />, label: T.subscription, description: "Manage your subscription plan" },
    { icon: <IconBookOpen size={18} />, label: T.learningProgress, description: "Track your learning journey" },
    { icon: <IconBookmark size={18} />, label: T.savedTopics, description: "Access your saved topics and notes" },
  ];

  return (
    <div className={`flex-1 p-6 overflow-y-auto ${theme === 'dark' ? '' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className={`mb-6 flex items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {T.backToChat}
        </button>
        
        {/* Profile Header */}
        <div className={`rounded-2xl border p-6 mb-8 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'}`}>
          <div className="flex items-start gap-4">
            <img src={form.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'} alt="Profile" className="w-20 h-20 rounded-full border-4 border-blue-500/30" />
            <div className="flex-1">
              {!editing ? (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{form.name || 'Unnamed User'}</h1>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{form.email}</p>
                    </div>
                    <div>
                      <button onClick={() => setEditing(true)} className={`px-3 py-1 rounded-md text-sm ${theme === 'dark' ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{T.editProfile || 'Edit'}</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                      {form.membership || 'Free'}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Member since {form.joinDate}</span>
                  </div>
                </>
              ) : (
                <div>
                  <div className="grid grid-cols-1 gap-2 mb-3">
                    <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder={T.name || 'Full name'} className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`} />
                    <input value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder={T.email || 'Email'} className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`} />
                    <input value={form.avatar} onChange={(e) => setForm({...form, avatar: e.target.value})} placeholder={T.avatarUrl || 'Avatar URL'} className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`} />
                    <input value={form.membership} onChange={(e) => setForm({...form, membership: e.target.value})} placeholder={T.membership || 'Membership'} className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md">{T.save || 'Save'}</button>
                    <button onClick={() => { setEditing(false); setForm(userProfile || {}); }} className="px-4 py-2 border rounded-md">{T.cancel || 'Cancel'}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{T.account}</h2>
        
        {/* Account Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accountSections.map((section, index) => (
            <button
              key={index}
              onClick={() => console.log(`${section.label} clicked`)}
              className={`p-4 rounded-xl border text-left transition-all hover:-translate-y-1 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/30 hover:bg-gray-800/80' : 'bg-white border-gray-300 hover:border-blue-300 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${index % 3 === 0 ? 'bg-blue-500/20' : index % 3 === 1 ? 'bg-purple-500/20' : 'bg-green-500/20'}`}>
                  <div className={index % 3 === 0 ? 'text-blue-400' : index % 3 === 1 ? 'text-purple-400' : 'text-green-400'}>
                    {section.icon}
                  </div>
                </div>
                <div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{section.label}</h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{section.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main App Component (UPDATED) ---
export default function App() {
  // --- STATE ---
  const [showStudentFeatures, setShowStudentFeatures] = useState(true);
  const [streak, setStreak] = useState(0);
  const [studyTime, setStudyTime] = useState(0);
  const [chatHistory, setChatHistory] = useState([]); 
  const [currentChatId, setCurrentChatId] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [theme, setTheme] = useState('dark');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [currentView, setCurrentView] = useState('chat');
  const [quizState, setQuizState] = useState({
    status: 'idle',  // idle, selectDifficulty, loading, active, score
    difficulty: 'easy',  // easy (10 q) or hard (25 q)
    selectedSubject: '',
    questions: [],
    score: 0,
    timeRemaining: 0,
    totalTime: 0
  });
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('text-base');
  const [searchQuery, setSearchQuery] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // User profile state (editable)
  const [userProfile, setUserProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('userProfile')) || { name: '', email: '', avatar: '', membership: 'Free', joinDate: new Date().toLocaleDateString() };
    } catch (e) {
      return { name: '', email: '', avatar: '', membership: 'Free', joinDate: new Date().toLocaleDateString() };
    }
  });
  // Activity log (most recent first)
  const [activityLog, setActivityLog] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('activityLog')) || [];
    } catch (e) {
      return [];
    }
  });
  // Helper to add activity entries and persist
  const addActivity = (type, text) => {
    const entry = { id: Date.now(), type, text, time: new Date().toISOString() };
    setActivityLog(prev => {
      const next = [entry, ...prev].slice(0, 200); // keep recent 200
      try { localStorage.setItem('activityLog', JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };
  const T = translations[language]; 
  useEffect(() => {
    // Ye function automatic streak aur time set karega
    setStreak(5);       // Example: 5 days
    setStudyTime(120);  // Example: 120 mins
  }, []);

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement;
    // Remove all font size classes (Tailwind text size classes)
    root.classList.remove('text-sm', 'text-base', 'text-lg');
    // Add current font size class
    root.classList.add(fontSize);
    // Save to localStorage
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- LOGIC ---
  const handleNewChat = () => {
    const newChatId = Date.now();
    setCurrentChatId(newChatId);
    if (window.innerWidth < 768) setSidebarOpen(false);
    setSelectedFile(null);
    setFilePreview(null);
    setCurrentView('chat');
    setShowHelp(false);
    setShowActivity(false);
    setShowAccount(false);
    // Log activity
    try { addActivity && setTimeout(() => addActivity('chat', 'Started a new chat'), 0); } catch (e) {}
  };

  const handleSelectChat = (id) => {
    setCurrentChatId(id);
    if (window.innerWidth < 768) setSidebarOpen(false);
    setSelectedFile(null);
    setFilePreview(null);
    setCurrentView('chat');
    setShowHelp(false);
    setShowActivity(false);
    setShowAccount(false);
  };

  const toggleFontSize = (size) => {
    let newFontSize;
    switch (size) {
      case 'sm':
        newFontSize = 'text-sm';
        break;
      case 'lg':
        newFontSize = 'text-lg';
        break;
      default:
        newFontSize = 'text-base';
    }
    setFontSize(newFontSize);
  };

  const handleSelectDifficulty = (difficulty) => {
    setQuizState(prev => ({ ...prev, status: 'selectSubject', difficulty }));
  };

  const handleStartQuiz = async (subject) => {
    setQuizState(prev => ({ ...prev, status: 'loading', selectedSubject: subject, questions: [], score: 0 }));
    setIsLoading(true);
    try { addActivity && setTimeout(() => addActivity('quiz', `Started ${quizState.difficulty} quiz: ${subject}`), 0); } catch (e) {}

    try {
      const YOUR_TEXT_BACKEND_API_URL = 'http://127.0.0.1:8000/chat';
      
      // Calculate total time based on difficulty and subject
      const timePerQuestion = quizState.difficulty === 'easy' ? 60 : 45;
      const numQuestions = quizState.difficulty === 'easy' ? 10 : 25;
      const totalTime = timePerQuestion * numQuestions;

      const response = await fetch(YOUR_TEXT_BACKEND_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: subject,
          type: 'quiz',
          language: language,
          difficulty: quizState.difficulty
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend Quiz Error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json(); 

      if (data.questions && data.questions.length > 0) {
        setQuizState(prev => ({ 
          ...prev, 
          status: 'active', 
          questions: data.questions, 
          score: 0,
          timeRemaining: totalTime,
          totalTime: totalTime
        }));
      } else {
        throw new Error(T.errorQuizMessage);
      }

    } catch (error) {
      handleQuizError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizError = (errorMessage) => {
    setCurrentView('chat');
    setQuizState(prev => ({ ...prev, status: 'idle', difficulty: 'easy', questions: [], score: 0 }));
    
    const errorChatId = Date.now();
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      text: T.quizTitle 
    };
    const aiErrorMessage = {
      id: Date.now() + 1,
      sender: 'ai',
      type: 'text',
      text: `${T.errorQuiz} \n\n(Error: ${errorMessage})`
    };
    
    const newChat = {
      id: errorChatId,
      title: "Quiz Failed",
      messages: [userMessage, aiErrorMessage],
    };
    
    setChatHistory([...chatHistory, newChat]);
    setCurrentChatId(errorChatId);
  };

  const handleQuizComplete = (finalScore, totalQuestions) => {
    const updatedState = { ...quizState, status: 'score', score: finalScore };
    setQuizState(updatedState);
    try { addActivity && setTimeout(() => addActivity('quiz_result', `Scored ${finalScore}/${totalQuestions} on ${updatedState.selectedSubject}`), 0); } catch (e) {}
  };

  const handleQuizRetry = () => {
    setQuizState(prev => ({ ...prev, status: 'selectDifficulty', difficulty: 'easy', questions: [], score: 0 }));
  };

  const handleSendMessage = async (message, type, fromWelcome = false) => {
    if (currentView === 'quiz') return;

    try { addActivity && setTimeout(() => addActivity('message', typeof message === 'string' ? message : (message?.slice ? message.slice(0,120) : 'sent a file')), 0); } catch (e) {}

    const timestamp = Date.now();
    let newChatId = currentChatId;
    
    // Create new chat if needed
    if (!newChatId || fromWelcome) {
      newChatId = timestamp;
      setCurrentChatId(newChatId);
    }

    // User message with image if exists
    const userMessage = {
      id: timestamp,
      sender: 'user',
      type: 'text',
      text: message,
      image: filePreview
    };

    const loadingMessage = {
      id: timestamp + 1,
      sender: 'ai',
      type: 'loading',
    };

    // 1. Optimistic Update with single state change
    setChatHistory(prevHistory => {
      const existingChatIndex = prevHistory.findIndex(chat => chat.id === newChatId);
      
      if (existingChatIndex > -1) {
        const updatedHistory = [...prevHistory];
        const existingChat = updatedHistory[existingChatIndex];
        updatedHistory[existingChatIndex] = {
          ...existingChat,
          messages: [...existingChat.messages, userMessage, loadingMessage]
        };
        return updatedHistory;
      } else {
        const newChat = {
          id: newChatId,
          title: message.substring(0, 30) + (message.length > 30 ? "..." : "") || "New Chat",
          messages: [userMessage, loadingMessage]
        };
        return [newChat, ...prevHistory];
      }
    });

    setIsLoading(true);
    if (window.innerWidth < 768) setSidebarOpen(false);
    
    // Store file locally before clearing
    const currentFile = selectedFile;
    
    // Clear immediately for UI
    setSelectedFile(null);
    setFilePreview(null);

    try {
      let aiResponse;
      
      // Handle video generation
      if (type === "generate_video") {
        const YOUR_VIDEO_BACKEND_API_URL = 'http://127.0.0.1:8000/generate-video';
        const response = await fetch(YOUR_VIDEO_BACKEND_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: message }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Backend Video Error: ${response.status} - ${errorText}`);
        }

        // Backend returns JSON: either {found: true, videos: [...] } or {found: false, video_url: '...'}
        const data = await response.json();

        if (data.found && Array.isArray(data.videos) && data.videos.length > 0) {
          aiResponse = {
            id: timestamp + 2,
            sender: 'ai',
            type: 'videos',
            data: data.videos
          };
        } else if (data.video_url) {
          aiResponse = {
            id: timestamp + 2,
            sender: 'ai',
            type: 'generated_video',
            content: data.video_url
          };
        } else {
          throw new Error('Unexpected video response from backend')
        }

      } else if (currentFile) {
        // Handle image upload
        const YOUR_IMAGE_BACKEND_API_URL = 'http://127.0.0.1:8000/chat-with-image';
        const formData = new FormData();
        formData.append('prompt', message);
        formData.append('file', currentFile);
        formData.append('language', language); 
        
        const response = await fetch(YOUR_IMAGE_BACKEND_API_URL, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Backend Image Error: ${response.status} - ${errorText}`);
        }
        
        const responseData = await response.json();
        
        // Process response based on type
        if (responseData.steps) {
          aiResponse = {
            id: timestamp + 2,
            sender: 'ai',
            type: 'steps',
            data: responseData.steps
          };
        } else if (responseData.text) {
          aiResponse = {
            id: timestamp + 2,
            sender: 'ai',
            type: 'text',
            text: (responseData.text || "").toString().replace(/<s>/g, "").replace(/<\/s>/g, "").trim()
          };
        } else {
          aiResponse = {
            id: timestamp + 2,
            sender: 'ai',
            type: 'text',
            text: "I processed your image but got an unexpected response format."
          };
        }
        
      } else {
        // Handle text message - IMPROVED AI PROMPT for Hindi understanding
        const YOUR_TEXT_BACKEND_API_URL = 'http://127.0.0.1:8000/chat';
        
        // Enhanced prompt for better Hindi understanding and engaging responses
        const professionalPrompt = language === 'hi' ? 
        `तुम लुनोरा AI हो, छात्रों के लिए एक मित्रवत सहायक। 
महत्वपूर्ण: जवाब छोटा और सीधा रखें!
- साधारण प्रश्न के लिए 3-4 वाक्य
- विस्तृत जवाब के लिए अधिकतम 6-7 वाक्य  
- अनावश्यक लंबाई से बचें
- सरल शब्द और भारतीय उदाहरण दें

प्रश्न: ${message}` : 
        `You are Lunora, an AI study assistant for students.
CRITICAL: Keep responses SHORT and CONCISE!
- Simple questions: 3-4 sentences max
- Complex topics: 6-7 sentences max
- Avoid lengthy explanations and repetition
- Use simple language and clear examples
- Be helpful and friendly

Question: ${message}`;

        // Use AbortController for timeout so the UI doesn't hang indefinitely
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

        let response;
        try {
          response = await fetch(YOUR_TEXT_BACKEND_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: professionalPrompt,
              type: type,
              language: language 
            }),
            signal: controller.signal
          });
        } catch (err) {
          clearTimeout(timeoutId);
          if (err.name === 'AbortError') {
            throw new Error('Request timed out (25s)');
          }
          throw err;
        }
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text().catch(() => response.statusText);
          throw new Error(`Backend Text Error: ${response.status} - ${errorText}`);
        }

        // Try to parse JSON, but fall back to text if backend returned plain text
        let responseData;
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          responseData = await response.json();
        } else {
          const txt = await response.text();
          // If backend returned a plain string (e.g., LLM error message), wrap it
          responseData = { text: txt };
        }
        
        // Process response
        if (responseData.steps) {
          aiResponse = {
            id: timestamp + 2,
            sender: 'ai',
            type: 'steps',
            data: responseData.steps
          };
        } else if (responseData.text) {
          aiResponse = {
            id: timestamp + 2,
            sender: 'ai',
            type: 'text',
            text: (responseData.text || "").toString().replace(/<s>/g, "").replace(/<\/s>/g, "").trim()
          };
        } else if (responseData.videos) {
          aiResponse = {
            id: timestamp + 2,
            sender: 'ai',
            type: 'videos',
            data: responseData.videos
          };
        } else {
          aiResponse = {
            id: timestamp + 2,
            sender: 'ai',
            type: 'text',
            text: responseData.text || responseData.response || "I received your message and will provide a detailed explanation."
          };
        }
      }

      // 2. Replace Loading Message with AI Response
      setChatHistory(prevHistory => 
        prevHistory.map(chat => {
          if (chat.id === newChatId) {
            // Filter out loading message and add AI response
            const messagesWithoutLoading = chat.messages.filter(m => m.type !== 'loading');
            return { 
              ...chat, 
              messages: [...messagesWithoutLoading, aiResponse] 
            };
          }
          return chat;
        })
      );

    } catch (error) {
      console.error("Message sending error:", error);
      // Improve network/fetch error messaging for clarity
      let hint = '';
      const em = (error && error.message) ? error.message.toLowerCase() : '';
      if (em.includes('failed to fetch') || em.includes('networkerror') || em.includes('network')) {
        hint = "\n\nPossible cause: the backend server may be offline or there is a network issue.\nPlease start the backend (run `uvicorn main:app --reload --host 127.0.0.1 --port 8000` in `Backend/`) and try again.";
      }

      const errorMessage = {
        id: timestamp + 2,
        sender: 'ai',
        type: 'text',
        text: `${T.errorBackend}\n\n(Error: ${error.message})${hint}`
      };
      
      // Replace loading with error
      setChatHistory(prevHistory => 
        prevHistory.map(chat => {
          if (chat.id === newChatId) {
            const messagesWithoutLoading = chat.messages.filter(m => m.type !== 'loading');
            return { 
              ...chat, 
              messages: [...messagesWithoutLoading, errorMessage] 
            };
          }
          return chat;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const currentChat = chatHistory.find(chat => chat.id === currentChatId);

  // Default Sidebar state on desktop and theme initialization
  useEffect(() => {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.add(savedTheme);
    
    // Apply font size (support older keys if present)
    let savedFontSize = localStorage.getItem('fontSize') || 'text-base';
    if (savedFontSize === 'font-sm') savedFontSize = 'text-sm';
    else if (savedFontSize === 'font-md') savedFontSize = 'text-base';
    else if (savedFontSize === 'font-lg') savedFontSize = 'text-lg';
    setFontSize(savedFontSize);
    root.classList.add(savedFontSize);
    
    // Default sidebar state based on screen size
    if (window.innerWidth >= 768) {
      setSidebarOpen(true);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Determine what to show in main content area
  const renderMainContent = () => {
    if (showHelp) {
      return <HelpScreen onBack={() => setShowHelp(false)} lang={language} theme={theme} />;
    } else if (showActivity) {
      return <ActivityScreen onBack={() => setShowActivity(false)} lang={language} theme={theme} activityLog={activityLog} clearActivity={() => { setActivityLog([]); try{ localStorage.removeItem('activityLog'); }catch(e){} }} />;
    } else if (showAccount) {
      return <AccountScreen onBack={() => setShowAccount(false)} lang={language} theme={theme} userProfile={userProfile} setUserProfile={setUserProfile} addActivity={addActivity} />;
    } else if (currentView === 'chat') {
      return (
        <ChatArea
          currentChat={currentChat}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          filePreview={filePreview}
          setFilePreview={setFilePreview}
          theme={theme}
          lang={language}
        />
      );
    } else {
      return (
        <div className="flex-1 overflow-hidden relative"> 
          {(quizState.status === 'idle' || quizState.status === 'selectDifficulty') && (
            <QuizDifficultySelector 
              onDifficultySelect={handleSelectDifficulty}
              onBack={() => {
                setCurrentView('chat');
                setQuizState(prev => ({ ...prev, status: 'idle', difficulty: 'easy', questions: [], score: 0 }));
              }}
              lang={language}
              theme={theme}
            />
          )}
          {quizState.status === 'selectSubject' && (
            <QuizSubjectSelector 
              onSubjectSelect={handleStartQuiz} 
              onLoading={setIsLoading} 
              lang={language}
              theme={theme}
            />
          )}
          {quizState.status === 'loading' && (
            <MainLoadingScreen text={T.generatingQuiz} theme={theme} />
          )}
          {quizState.status === 'active' && (
            <QuizRenderer 
              questions={quizState.questions} 
              onQuizComplete={handleQuizComplete} 
              lang={language}
              theme={theme}
              totalTime={quizState.totalTime}
            />
          )}
          {quizState.status === 'score' && (
            <QuizScoreScreen 
              score={quizState.score}
              total={quizState.questions.length}
              onRetry={handleQuizRetry}
              lang={language}
              theme={theme}
            />
          )}
        </div>
      );
    }
  };

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-[#050505] text-gray-100' : 'bg-gray-50 text-gray-900'} font-sans overflow-hidden selection:bg-blue-500/30 ${fontSize}`}>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className={`fixed inset-0 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${theme === 'dark' ? 'bg-black/60' : 'bg-black/40'}`} 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Expand Sidebar Button (when hidden) - WITH 3 LINES ICON */}
      {!isSidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className={`fixed left-4 top-4 z-30 p-2 backdrop-blur-sm border rounded-lg shadow-lg transition-all ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800' : 'bg-white/80 border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-white'}`}
          title={T.expandSidebar}
        >
          <IconMenu size={20} />
        </button>
      )}

      {/* Sidebar Wrapper */}
      <div className={`fixed md:relative z-50 h-full transition-transform duration-300 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden'
      }`}>
        <Sidebar
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          currentChatId={currentChatId}
          setSidebarOpen={setSidebarOpen}
          theme={theme}
          toggleTheme={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            const root = document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(newTheme);
          }}
          currentView={currentView}
          setView={setCurrentView}
          lang={language}
          fontSize={fontSize}
          toggleFontSize={toggleFontSize}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setShowHelp={setShowHelp}
          isSidebarOpen={isSidebarOpen}
          setTheme={setTheme}
          setLanguage={setLanguage}
          setShowActivity={setShowActivity}
          showActivity={showActivity}
          setShowAccount={setShowAccount}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          addActivity={addActivity}
          showStudentFeatures={showStudentFeatures}
          setShowStudentFeatures={setShowStudentFeatures}
          streak={streak}
          studyTime={studyTime}
        />
      </div>

      <div className={`flex-1 flex flex-col relative w-full ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        {/* Top Mobile Bar */}
        <div className={`md:hidden p-4 border-b flex items-center justify-between backdrop-blur ${theme === 'dark' ? 'border-white/5 bg-gray-900/90' : 'border-gray-200 bg-white/90'}`}>
          <button onClick={() => setSidebarOpen(true)} className={`p-2 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
            <IconMenu size={24} />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {showHelp ? T.helpFAQ : 
               showActivity ? T.activity :
               showAccount ? T.account :
               currentView === 'quiz' ? T.quizTitle : 
               (currentChat ? currentChat.title : "Lunora AI")}
            </span>
          </div>
          
          <button 
            onClick={() => setShowHelp(!showHelp)} 
            className={`p-2 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
          >
            <IconHelpCircle size={22} />
          </button>
        </div>
        
        {/* Main Content Area */}
        {renderMainContent()}
      </div>
    </div>
  );
}