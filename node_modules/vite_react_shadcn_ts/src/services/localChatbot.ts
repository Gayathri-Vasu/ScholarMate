interface ChatbotResponse {
  text: string;
  suggestions?: string[];
}

class LocalChatbotService {
  private responses: { [key: string]: ChatbotResponse } = {
    // Greetings
    'hello': {
      text: "Hello! I'm your Scholar mate assistant. How can I help you today?",
      suggestions: ['What courses do you offer?', 'Tell me about NEET', 'Formula for LCM']
    },
    'hi': {
      text: "Hi there! Welcome to Scholar mate. I'm here to help you with your educational journey!",
      suggestions: ['What courses do you offer?', 'Tell me about NEET', 'Formula for LCM']
    },

    // NEET info
    'neet': {
      text: "NEET (National Eligibility cum Entrance Test) is the entrance exam for MBBS/BDS/AYUSH in India.\n\n📘 Subjects & Marks\n- Physics: 50 questions (200 marks)\n- Chemistry: 50 questions (200 marks)\n- Biology (Botany + Zoology): 100 questions (400 marks)\nTotal: 200 questions, 720 marks\n\n🧮 Marking Scheme\n+4 for correct, -1 for wrong, 0 for unattempted\n\n🎯 Preparation Tips\n- Learn NCERT thoroughly (Class 11 & 12)\n- Practice previous papers & mock tests\n- Focus on high-weightage chapters\n- Revise with short notes\n\nWant a subject-wise plan? Say: 'NEET physics plan', 'NEET biology plan'.",
      suggestions: ['NEET physics plan', 'NEET biology plan', 'NEET chemistry plan']
    },
    'neet physics plan': {
      text: "NEET Physics Plan:\n- Mechanics, Electrostatics, Current Electricity\n- Magnetism, Optics, Modern Physics\n- Daily: 20 MCQs per topic + 1 previous paper section\n- Weekly: 2 full-length tests",
    },

    // LCM formula
    'lcm': {
      text: "LCM (Least Common Multiple) Formula:\n\nFor two numbers a and b:\nLCM(a, b) = |a × b| / GCD(a, b)\n\nExample: Find LCM of 12 and 18\n- GCD(12, 18) = 6\n- LCM = (12 × 18) / 6 = 216 / 6 = 36\n\nPrime factorization method:\n12 = 2² × 3\n18 = 2 × 3²\nLCM = 2² × 3² = 4 × 9 = 36",
      suggestions: ['LCM of 24 and 36', 'LCM vs GCD', 'More examples']
    },

    // Biology: blood
    'blood': {
      text: "Blood is a connective tissue that circulates through the body transporting oxygen, nutrients, hormones and removing wastes.\n\nComponents:\n- Red blood cells (RBC): carry oxygen using hemoglobin\n- White blood cells (WBC): defend against infection\n- Platelets: help in blood clotting\n- Plasma: liquid part (water, proteins, salts) that carries cells and dissolved substances\n\nFunctions:\n- Transport (O₂/CO₂, nutrients, hormones)\n- Protection (immune defense, clotting)\n- Regulation (body temperature, pH, fluid balance)",
      suggestions: ['Functions of blood', 'Types of blood cells', 'What is hemoglobin?']
    },

    // About website/platform
    'about scholarmate': {
      text: "Scholar mate is a free learning platform for Tamil Nadu students.\n\nWe provide:\n- TN State Board courses (Classes 9–12)\n- TNPSC preparation\n- Engineering subjects\n- IT placement training\n\nFeatures:\n- Video lessons, comprehensive PDFs, previous year papers\n- AI assistant for doubts\n- Clean UI and 24/7 access",
      suggestions: ['Courses we offer', 'TN State Board details', 'IT placement help']
    },

    // Course information
    'courses': {
      text: "We offer comprehensive courses: TN State Board (9-12), TNPSC, Engineering, IT Placement. Ask for any category for details.",
      suggestions: ['TN State Board', 'TNPSC', 'Engineering', 'IT Placement']
    },

    // TN State Board
    'tn state board': {
      text: "**TN State Board Courses (Classes 9-12)**\n\n📖 **Subjects Covered:**\n- Mathematics (Algebra, Geometry, Calculus)\n- Physics (Mechanics, Thermodynamics, Optics)\n- Chemistry (Organic, Inorganic, Physical)\n- Biology (Botany, Zoology, Human Anatomy)\n- Tamil (Literature, Grammar, Poetry)\n- English (Grammar, Literature, Writing)\n- Social Science (History, Geography, Civics)\n- Computer Science (Programming, Database)\n\n🎯 **Features:**\n- Video lessons from expert teachers\n- Comprehensive PDF materials\n- Previous year question papers\n- Mock tests and assessments\n- 24/7 doubt clearing support",
      suggestions: ['Mathematics help', 'Physics concepts', 'Chemistry topics', 'Biology lessons']
    },
    'mathematics': {
      text: "**Mathematics Courses Available:**\n\n🔢 **Class 9-10:**\n- Algebra, Geometry, Trigonometry\n- Statistics and Probability\n- Coordinate Geometry\n\n📐 **Class 11-12:**\n- Calculus (Differential & Integral)\n- Linear Algebra\n- Probability & Statistics\n- Complex Numbers\n\n✨ **Features:**\n- Step-by-step problem solving\n- Interactive video lessons\n- Practice worksheets\n- Previous year papers\n- Doubt clearing sessions",
      suggestions: ['Algebra help', 'Geometry problems', 'Calculus concepts', 'Statistics']
    },
    'physics': {
      text: "**Physics Courses Available:**\n\n⚡ **Class 9-10:**\n- Motion, Force, Energy\n- Light, Sound, Electricity\n- Heat and Temperature\n\n🔬 **Class 11-12:**\n- Mechanics, Thermodynamics\n- Optics, Waves, Electricity\n- Modern Physics, Nuclear Physics\n\n✨ **Features:**\n- Animated video explanations\n- Practical demonstrations\n- Problem-solving techniques\n- Lab simulations\n- Concept clarity sessions",
      suggestions: ['Mechanics help', 'Electricity concepts', 'Optics problems', 'Modern Physics']
    },

    // TNPSC
    'tnpsc': {
      text: "**TNPSC Preparation Courses**\n\n🎯 **Exams Covered:**\n- Group I (Civil Services)\n- Group II (Subordinate Services)\n- Group IV (Village Administrative Officer)\n- VAO (Village Administrative Officer)\n- TET (Teacher Eligibility Test)\n\n📚 **Subjects:**\n- General Studies\n- Tamil Language\n- English Language\n- Current Affairs\n- History & Culture\n- Geography\n- Economics\n- Science & Technology\n\n✨ **Features:**\n- Complete syllabus coverage\n- Current affairs updates\n- Mock tests and practice papers\n- Previous year question analysis\n- Expert guidance and tips",
      suggestions: ['Group I preparation', 'Group II syllabus', 'Current affairs', 'Mock tests']
    },
    'group i': {
      text: "**TNPSC Group I Preparation**\n\n📋 **Preliminary Exam:**\n- General Studies (200 questions)\n- Aptitude & Mental Ability (100 questions)\n\n📝 **Main Exam:**\n- Paper I: General Studies\n- Paper II: Tamil/English\n- Paper III: Optional Subject\n\n🎯 **Key Topics:**\n- Indian History & Culture\n- Indian Geography\n- Indian Polity & Governance\n- Economic & Social Development\n- Current Affairs\n- Tamil Language & Literature\n\n✨ **Preparation Features:**\n- Comprehensive study materials\n- Video lectures by experts\n- Current affairs updates\n- Mock tests and analysis\n- Interview preparation",
      suggestions: ['Syllabus details', 'Study plan', 'Mock tests', 'Current affairs']
    },

    // Engineering
    'engineering': {
      text: "**Engineering Courses Available**\n\n🔧 **Branches Covered:**\n- Computer Science & Engineering (CSE)\n- Information Technology (IT)\n- Electrical Engineering\n- Mechanical Engineering\n- Civil Engineering\n- Electronics & Communication\n\n📚 **Subjects:**\n- Core engineering subjects\n- Programming languages\n- Mathematics & Physics\n- Project management\n- Industry-relevant skills\n\n✨ **Features:**\n- Industry expert instructors\n- Practical project work\n- Placement assistance\n- Internship opportunities\n- Latest technology updates",
      suggestions: ['CSE courses', 'IT programming', 'Mechanical engineering', 'Placement help']
    },
    'programming': {
      text: "**Programming Courses Available**\n\n💻 **Languages:**\n- Python (Beginner to Advanced)\n- Java (Core & Advanced)\n- C/C++ (Fundamentals)\n- JavaScript (Web Development)\n- SQL (Database Management)\n\n🎯 **Specializations:**\n- Web Development (Frontend & Backend)\n- Mobile App Development\n- Data Science & Analytics\n- Machine Learning & AI\n- Cloud Computing\n\n✨ **Features:**\n- Hands-on coding practice\n- Real-world projects\n- Code review sessions\n- Industry best practices\n- Placement preparation",
      suggestions: ['Python basics', 'Web development', 'Data science', 'Machine learning']
    },

    // IT Placement
    'it placement': {
      text: "**IT Placement Preparation**\n\n🎯 **Aptitude Training:**\n- Quantitative Aptitude\n- Logical Reasoning\n- Verbal Ability\n- Data Interpretation\n\n💻 **Technical Skills:**\n- Programming Languages\n- Data Structures & Algorithms\n- System Design\n- Database Management\n- Operating Systems\n\n🤖 **Modern Skills:**\n- GenAI & Prompting\n- Cloud Computing\n- DevOps\n- Cybersecurity\n\n💼 **Soft Skills:**\n- Communication Skills\n- Interview Preparation\n- Resume Building\n- Group Discussions\n- Presentation Skills",
      suggestions: ['Aptitude practice', 'Technical interviews', 'Resume help', 'Mock interviews']
    },

    // General help
    'help': {
      text: "I'm here to help you with:\n\n📚 **Course Information**\n- TN State Board (Classes 9-12)\n- TNPSC Preparation\n- Engineering Courses\n- IT Placement Training\n\n🎯 **Study Support**\n- Subject explanations\n- Problem solving\n- Study tips\n- Exam preparation\n\n💡 **General Questions**\n- Platform features\n- Course enrollment\n- Technical support\n\nWhat would you like to know?",
      suggestions: ['Course details', 'Study tips', 'Exam preparation', 'Technical help']
    },
    'study tips': {
      text: "**Effective Study Tips**\n\n⏰ **Time Management:**\n- Create a study schedule\n- Take regular breaks\n- Use the Pomodoro technique\n- Set realistic goals\n\n📝 **Study Methods:**\n- Active recall and spaced repetition\n- Make summary notes\n- Practice with previous papers\n- Join study groups\n\n🧠 **Memory Techniques:**\n- Use mnemonics\n- Create mind maps\n- Teach others what you learn\n- Regular revision\n\n💪 **Stay Motivated:**\n- Set clear goals\n- Reward yourself\n- Stay positive\n- Ask for help when needed",
      suggestions: ['Time management', 'Memory techniques', 'Exam strategies', 'Motivation tips']
    },

    // Default responses
    'default': {
      text: "I can help with course info, NEET guidance, biology topics like blood, and math formulas like LCM/GCD. Ask me anything!",
      suggestions: ['Tell me about NEET', 'What is blood?', 'Formula for LCM', 'Engineering courses']
    }
  };

  private getSuggestionsForContext(userMessage: string): string[] {
    const m = userMessage.toLowerCase();
    if (m.includes('neet')) return ['NEET physics plan', 'NEET biology plan', 'NEET chemistry plan'];
    if (m.includes('lcm')) return ['LCM of 24 and 36', 'LCM vs GCD', 'More examples'];
    if (m.includes('blood')) return ['Functions of blood', 'Types of blood cells', 'What is hemoglobin?'];
    if (m.includes('website') || m.includes('about') || m.includes('scholar')) return ['Courses we offer', 'TN State Board details', 'IT placement help'];
    return ['Tell me about NEET', 'What is blood?', 'Formula for LCM', 'Engineering courses'];
  }

  async sendMessage(userMessage: string): Promise<string> {
    await new Promise((r) => setTimeout(r, 300));
    const message = userMessage.toLowerCase().trim();

    if (this.responses[message]) return this.responses[message].text;

    // fuzzy contains match on keys
    for (const [key, resp] of Object.entries(this.responses)) {
      if (message.includes(key)) return resp.text;
    }

    // keyword routing
    if (message.includes('neet')) return this.responses['neet'].text;
    if (message.includes('lcm')) return this.responses['lcm'].text;
    if (message.includes('blood')) return this.responses['blood'].text;
    if (message.includes('website') || message.includes('about') || message.includes('scholar')) return this.responses['about scholarmate'].text;

    return this.responses['default'].text;
  }

  getSuggestions(userMessage: string): string[] {
    const m = userMessage.toLowerCase().trim();
    if (this.responses[m]?.suggestions) return this.responses[m].suggestions as string[];
    return this.getSuggestionsForContext(m);
  }
}

export const localChatbotService = new LocalChatbotService();
export default localChatbotService;
