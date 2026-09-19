export type Language = 'en' | 'hi';

export interface TranslationDictionary {
  nav: {
    home: string;
    projects: string;
    blog: string;
    wall: string;
    contact: string;
    search: string;
    cmdK: string;
    greetings: {
      morning: string;
      afternoon: string;
      evening: string;
      night: string;
    };
  };
  hero: {
    nameChars: { char: string; pos: string }[];
    title: string;
    tagline: string;
    status: string;
    viewProjects: string;
    downloadResume: string;
    contactMe: string;
    exploreArchive: string;
    stats: {
      contributions: string;
      contributionsLabel: string;
      consistency: string;
      consistencyLabel: string;
      distinction: string;
      distinctionLabel: string;
    };
  };
  about: {
    sectionBadge: string;
    heading: string;
    headingAccent: string;
    subtitle: string;
    bioP1: string;
    bioP2: string;
    bioP3: string;
    statusBadge: string;
    tabs: {
      skills: string;
      experience: string;
      education: string;
      certifications: string;
    };
    education: {
      degree: string;
      college: string;
      period: string;
      location: string;
    };
    experienceHeading: string;
    skillsHeading: string;
  };
  experience: {
    heading: string;
    nodeConnected: string;
    standby: string;
    items: {
      id: string;
      role: string;
      company: string;
      period: string;
      description: string;
      skills: string;
    }[];
  };
  skillsSection: {
    heading: string;
    dragPrompt: string;
  };
  achievementsSection: {
    heading: string;
    viewCertificate: string;
    verify: string;
    idPrefix: string;
  };
  githubSection: {
    heading: string;
  };
  projects: {
    sectionBadge: string;
    heading: string;
    headingAccent: string;
    subtitle: string;
    categories: {
      all: string;
      ai: string;
      enterprise: string;
      fintech: string;
    };
    viewCaseStudy: string;
    liveDemo: string;
    sourceCode: string;
    featuredBadge: string;
    exploreAll: string;
    breadcrumbHome: string;
    breadcrumbProjects: string;
    searchPlaceholder: string;
  };
  projectDetail: {
    breadcrumbHome: string;
    breadcrumbProjects: string;
    architectureOverview: string;
    keyMetrics: string;
    keyFeatures: string;
    techStack: string;
    gallery: string;
    liveApp: string;
    githubSource: string;
    getInTouch: string;
    backToProjects: string;
    nextProject: string;
    previousProject: string;
  };
  blog: {
    sectionBadge: string;
    heading: string;
    headingAccent: string;
    subtitle: string;
    readTime: string;
    views: string;
    takeaways: string;
    architectureDiagram: string;
    allArticles: string;
    backToBlog: string;
  };
  wall: {
    sectionBadge: string;
    heading: string;
    subtitle: string;
    dropModeLabel: string;
    onlyNote: string;
    noteWithSticker: string;
    chooseSticker: string;
    namePlaceholder: string;
    notePlaceholderOnly: string;
    notePlaceholderSticker: string;
    stickNoteOnly: string;
    stickNoteWith: string;
    shuffle: string;
    reset: string;
    fullWall: string;
    fullscreenGuestbook: string;
  };
  contact: {
    sectionBadge: string;
    heading: string;
    headingAccent: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    sendMessage: string;
    sending: string;
    sentSuccess: string;
    directChannels: string;
    locationLabel: string;
    locationValue: string;
    statusLabel: string;
    statusValue: string;
  };
  footer: {
    tagline: string;
    navigation: string;
    socials: string;
    copyright: string;
    builtWith: string;
    privacy: string;
    terms: string;
  };
  cmd: {
    placeholder: string;
    navigationGroup: string;
    projectsGroup: string;
    socialsGroup: string;
    actionsGroup: string;
  };
  seo: {
    homeTitle: string;
    homeDesc: string;
    projectsTitle: string;
    projectsDesc: string;
    blogTitle: string;
    blogDesc: string;
    wallTitle: string;
    wallDesc: string;
    contactTitle: string;
    contactDesc: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      blog: 'Blog',
      wall: 'The Wall',
      contact: 'Contact',
      search: 'Search',
      cmdK: '⌘K',
      greetings: {
        morning: 'Good Morning',
        afternoon: 'Good Afternoon',
        evening: 'Good Evening',
        night: 'Good Night',
      },
    },
    hero: {
      nameChars: [
        { char: 'A', pos: '0%' },
        { char: 'n', pos: '8.3%' },
        { char: 'i', pos: '16.6%' },
        { char: 'k', pos: '25%' },
        { char: 'e', pos: '33.3%' },
        { char: 't', pos: '41.6%' },
        { char: ' ', pos: '50%' },
        { char: 'M', pos: '58.3%' },
        { char: 'e', pos: '66.6%' },
        { char: 's', pos: '75%' },
        { char: 'h', pos: '83.3%' },
        { char: 'r', pos: '91.6%' },
        { char: 'a', pos: '96%' },
        { char: 'm', pos: '100%' },
      ],
      title: 'Aniket Meshram',
      tagline: 'Software Engineer & Full-Stack Developer',
      status: 'Available for new opportunities',
      viewProjects: 'Explore Projects',
      downloadResume: 'Resume / CV',
      contactMe: 'Get in Touch',
      exploreArchive: 'Explore Archive',
      stats: {
        contributions: '3,500+',
        contributionsLabel: 'GitHub Contributions',
        consistency: '100%',
        consistencyLabel: 'Commit Consistency',
        distinction: 'Grade O',
        distinctionLabel: 'AICTE Honors',
      },
    },
    about: {
      sectionBadge: 'BIOGRAPHY & CORE STACK',
      heading: 'Engineering Scalable Systems,',
      headingAccent: 'Crafting Clean Experiences.',
      subtitle:
        'Bridging the divide between high-performance systems engineering and modern interactive user experiences.',
      bioP1:
        "I'm a Software Engineer & Full-Stack Developer with a deep focus on building resilient, sub-second web platforms, enterprise distributed architectures, and autonomous AI systems.",
      bioP2:
        'My expertise spans Next.js 16, React 19, TypeScript, Java 17, Spring Boot 3.5, and PostgreSQL. I take pride in engineering zero-downtime, low-latency applications with clean architectural separation.',
      bioP3:
        'Graduated with honors from KIT’s College of Engineering, Kolhapur, achieving Grade O (Outstanding) distinction across AICTE-supported Google for Developers and EduSkills virtual internships.',
      statusBadge: 'Ready for Immediate Deployment',
      tabs: {
        skills: 'Technical Skills',
        experience: 'Experience',
        education: 'Education',
        certifications: 'Honors & Certs',
      },
      education: {
        degree: "B.Tech in Computer Engineering",
        college: "Kolhapur Institute of Technology's College of Engineering (KITCoEK)",
        period: "2022 – 2026",
        location: "Kolhapur, Maharashtra, India",
      },
      experienceHeading: 'Professional Experience & Virtual Internships',
      skillsHeading: 'Core Competencies & Technology Stack',
    },
    experience: {
      heading: 'Experience',
      nodeConnected: 'NODE CONNECTED',
      standby: 'STANDBY',
      items: [
        {
          id: 'exp-google-aiml',
          role: 'AI-ML Virtual Intern',
          company: 'Google for Developers & EduSkills / AICTE',
          period: 'JAN 2026 – MAR 2026',
          description:
            'Completed an intensive 10-week AI-ML virtual internship supported by Google for Developers (India Edu Program) and the Ministry of Education / AICTE. Engineered machine learning models, trained neural network pipelines, and achieved an Outstanding (Grade O) rating.',
          skills: 'Machine Learning · Python · Neural Networks · AICTE · Grade O',
        },
        {
          id: 'exp-eduskills-java',
          role: 'Java Full Stack Developer Intern',
          company: 'EduSkills Academy & AICTE (Ministry of Education)',
          period: 'APR 2026 – JUN 2026',
          description:
            'Engineered full-stack Java solutions across an 8-week virtual internship. Built Spring Boot REST APIs, relational PostgreSQL databases, and modern interactive frontends, graduating with Outstanding (Grade O) distinction.',
          skills: 'Java · Spring Boot · PostgreSQL · Full Stack · Grade O',
        },
        {
          id: 'exp-paloalto-cyber',
          role: 'Cybersecurity Virtual Intern',
          company: 'Palo Alto Networks & EduSkills / AICTE',
          period: 'JUL 2025 – SEP 2025',
          description:
            'Completed a 10-week cybersecurity engineering virtual internship supported by Palo Alto Networks and AICTE NEAT Cell. Implemented security policies, zero-trust architectures, network traffic inspection, and threat mitigation.',
          skills: 'Cybersecurity · Zero Trust · Network Security · Threat Defense',
        },
      ],
    },
    skillsSection: {
      heading: 'Skills',
      dragPrompt: '✦ Drag to spin the sphere',
    },
    achievementsSection: {
      heading: 'Achievements',
      viewCertificate: 'View Certificate',
      verify: 'Verify',
      idPrefix: 'ID:',
    },
    githubSection: {
      heading: 'Code & Contributions',
    },
    projects: {
      sectionBadge: 'FLAGSHIP PLATFORMS // 2025 – 2026',
      heading: 'Architected for Scale,',
      headingAccent: 'Engineered with Precision.',
      subtitle:
        'A curated collection of production platforms, autonomous AI cascades, high-throughput POS architectures, and institutional trading terminals.',
      categories: {
        all: 'All Platforms',
        ai: 'Autonomous AI',
        enterprise: 'Enterprise & POS',
        fintech: 'FinTech & Web3',
      },
      viewCaseStudy: 'Explore Case Study',
      liveDemo: 'Live App',
      sourceCode: 'Source Code',
      featuredBadge: 'Featured Platform',
      exploreAll: 'View All Projects',
      breadcrumbHome: 'Home',
      breadcrumbProjects: 'Projects',
      searchPlaceholder: 'Search by platform name, technology, or keywords...',
    },
    projectDetail: {
      breadcrumbHome: 'Home',
      breadcrumbProjects: 'Projects',
      architectureOverview: 'System Architecture Overview',
      keyMetrics: 'Verified Performance Metrics',
      keyFeatures: 'Core Capabilities & Engineering Breakdown',
      techStack: 'Full Technology Stack',
      gallery: 'Interactive Screen Previews & Media',
      liveApp: 'Open Live Application',
      githubSource: 'GitHub Repository',
      getInTouch: 'Discuss This Architecture',
      backToProjects: 'Back to Projects',
      nextProject: 'Next Project',
      previousProject: 'Previous Project',
    },
    blog: {
      sectionBadge: 'JOURNAL & DEEP DIVES',
      heading: 'System Architecture',
      headingAccent: 'Journal.',
      subtitle:
        'In-depth technical reflections on architecting low-latency POS terminals, STOMP WebSockets, and scalable full-stack applications.',
      readTime: 'Read Time',
      views: 'Views',
      takeaways: 'Key Takeaways & Architectural Lessons',
      architectureDiagram: 'Architecture Blueprint',
      allArticles: 'All Articles',
      backToBlog: 'Back to Articles',
    },
    wall: {
      sectionBadge: 'COMMUNITY INTERACTIVE CANVAS',
      heading: 'Misc & The Wall',
      subtitle:
        'Interactive physics board: grab and toss stickers, like/unlike notes, or drop a note with or without a companion anime sticker!',
      dropModeLabel: 'Drop Mode:',
      onlyNote: 'Only Note',
      noteWithSticker: 'Note + Sticker',
      chooseSticker: 'Choose companion sticker to drop with note:',
      namePlaceholder: 'Your Name / Handle',
      notePlaceholderOnly: 'Drop a friendly note on the wall... 📝',
      notePlaceholderSticker: 'Drop a note (spawns companion sticker!) ✨',
      stickNoteOnly: 'Stick Note Only',
      stickNoteWith: 'Stick Note +',
      shuffle: 'Shuffle',
      reset: 'Reset',
      fullWall: 'Full Wall ↗',
      fullscreenGuestbook: 'Want fullscreen guestbook view?',
    },
    contact: {
      sectionBadge: 'GET IN TOUCH // 24/7 CHANNEL',
      heading: "Let's Build Something",
      headingAccent: 'Remarkable Together.',
      subtitle:
        'Available for full-time software engineering roles, high-concurrency architecture consulting, or technical collaborations.',
      formName: 'Your Full Name',
      formEmail: 'Your Email Address',
      formSubject: 'Subject / Project Domain',
      formMessage: 'How can I help you? (Describe your goal, role, or project)',
      sendMessage: 'Send Message ⚡',
      sending: 'Dispatching...',
      sentSuccess: 'Message sent successfully! I will respond within 24 hours.',
      directChannels: 'Direct Contact Channels',
      locationLabel: 'Base Location',
      locationValue: 'Amravati, Maharashtra, India',
      statusLabel: 'Current Status',
      statusValue: 'Available for Immediate Onboarding',
    },
    footer: {
      tagline: 'Software Engineer & Full-Stack Developer specializing in sub-second systems and clean design architectures.',
      navigation: 'Navigation',
      socials: 'Connect',
      copyright: 'All rights reserved. Designed & Engineered with precision.',
      builtWith: 'Built with React 19, Vite, Tailwind CSS & Framer Motion',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
    },
    cmd: {
      placeholder: 'Search projects, sections, social links, or press Esc...',
      navigationGroup: 'Navigation',
      projectsGroup: 'Featured Projects',
      socialsGroup: 'Social & Code Profiles',
      actionsGroup: 'Quick Actions',
    },
    seo: {
      homeTitle: 'Aniket Meshram | Software Engineer & Full-Stack Developer',
      homeDesc:
        'Official portfolio of Aniket Meshram, Software Engineer & Full-Stack Developer specializing in high-performance web systems, Next.js 16, and Spring Boot.',
      projectsTitle: 'Production Projects Archive | Aniket Meshram',
      projectsDesc:
        'Explore scalable production platforms, autonomous AI cascades, sub-200ms POS engines, and crypto trading terminals engineered by Aniket Meshram.',
      blogTitle: 'Architecture Journal & Articles | Aniket Meshram',
      blogDesc:
        'Technical deep-dives on architecting sub-200ms POS systems, atomic multi-branch inventory, STOMP WebSockets, and distributed application design.',
      wallTitle: 'The Interactive Wall & Guestbook | Aniket Meshram',
      wallDesc:
        'Leave notes, grab and toss anime vinyl stickers, and test interactive physics on Aniket Meshram’s community interactive canvas.',
      contactTitle: 'Contact & Inquiries | Aniket Meshram',
      contactDesc:
        'Get in touch with Aniket Meshram for full-stack engineering roles, distributed systems architecture projects, or technical consulting.',
    },
  },

  hi: {
    nav: {
      home: 'मुख्य पृष्ठ',
      projects: 'परियोजनाएं',
      blog: 'ब्लॉग व आलेख',
      wall: 'दीवार',
      contact: 'संपर्क',
      search: 'खोजें',
      cmdK: '⌘K',
      greetings: {
        morning: 'शुभ प्रभात',
        afternoon: 'शुभ दोपहर',
        evening: 'शुभ संध्या',
        night: 'शुभ रात्रि',
      },
    },
    hero: {
      nameChars: [
        { char: 'अ', pos: '0%' },
        { char: 'नि', pos: '14.2%' },
        { char: 'के', pos: '28.5%' },
        { char: 'त', pos: '42.8%' },
        { char: ' ', pos: '50%' },
        { char: 'मे', pos: '57.1%' },
        { char: 'श्रा', pos: '78.5%' },
        { char: 'म', pos: '100%' },
      ],
      title: 'अनिकेत मेश्राम',
      tagline: 'सॉफ़्टवेयर इंजीनियर एवं फुल-स्टैक डेवलपर',
      status: 'नई चुनौतियों एवं अवसरों के लिए उपलब्ध',
      viewProjects: 'परियोजनाएं देखें',
      downloadResume: 'बायोडाटा / रिज़्यूमे',
      contactMe: 'सीधा संपर्क करें',
      exploreArchive: 'संग्रह देखें',
      stats: {
        contributions: '3,500+',
        contributionsLabel: 'गिटहब योगदान',
        consistency: '100%',
        consistencyLabel: 'कमिट निरंतरता',
        distinction: 'ग्रेड O',
        distinctionLabel: 'AICTE उत्कृष्ट सम्मान',
      },
    },
    about: {
      sectionBadge: 'जीवन परिचय एवं मुख्य तकनीकी स्टैक',
      heading: 'पैमाने के लिए सिस्टम निर्माण,',
      headingAccent: 'उत्कृष्ट उपयोगकर्ता अनुभव।',
      subtitle:
        'उच्च-प्रदर्शन सिस्टम इंजीनियरिंग और आधुनिक इंटरैक्टिव डिज़ाइन के बीच का सहज सामंजस्य।',
      bioP1:
        'मैं एक सॉफ़्टवेयर इंजीनियर एवं फुल-स्टैक डेवलपर हूँ, जिसका मुख्य ध्यान अत्यधिक तीव्र, सब-सेकंड वेब प्लेटफॉर्म्स, एंटरप्राइज डिस्ट्रीब्यूटेड आर्किटेक्चर और स्वायत्त AI सिस्टम्स के निर्माण पर है।',
      bioP2:
        'मेरी तकनीकी विशेषज्ञता Next.js 16, React 19, TypeScript, Java 17, Spring Boot 3.5 और PostgreSQL पर आधारित है। मैं स्वच्छ कोड संरचना और शून्य-डाउनटाइम समाधान तैयार करने में विश्वास रखता हूँ।',
      bioP3:
        'कोल्हापुर इंस्टीट्यूट ऑफ टेक्नोलॉजी (KITCoEK) से इंजीनियरिंग में स्नातक। Google for Developers और AICTE द्वारा समर्थित इंटर्नशिप्स में उत्कृष्ट (Grade O) डिस्टिंक्शन प्राप्त।',
      statusBadge: 'तत्काल उपलब्ध / रेडी फॉर डिप्लॉयमेंट',
      tabs: {
        skills: 'तकनीकी दक्षता',
        experience: 'अनुभव',
        education: 'शिक्षा',
        certifications: 'प्रमाणपत्र एवं सम्मान',
      },
      education: {
        degree: 'बी.टेक — कंप्यूटर इंजीनियरिंग',
        college: "कोल्हापुर इंस्टीट्यूट ऑफ टेक्नोलॉजी'स कॉलेज ऑफ इंजीनियरिंग (KITCoEK)",
        period: '2022 – 2026',
        location: 'अमरावती / कोल्हापुर, महाराष्ट्र',
      },
      experienceHeading: 'व्यावसायिक अनुभव एवं वर्चुअल इंटर्नशिप्स',
      skillsHeading: 'मूल तकनीकी क्षमताएं एवं स्टैक',
    },
    experience: {
      heading: 'व्यावसायिक अनुभव',
      nodeConnected: 'नोड कनेक्टेड',
      standby: 'स्टैंडबाय',
      items: [
        {
          id: 'exp-google-aiml',
          role: 'एआई-एमएल वर्चुअल इंटर्न',
          company: 'Google for Developers और EduSkills / AICTE',
          period: 'जनवरी 2026 – मार्च 2026',
          description:
            'Google for Developers (India Edu Program) और शिक्षा मंत्रालय / AICTE द्वारा समर्थित 10-सप्ताह की गहन AI-ML वर्चुअल इंटर्नशिप सफलतापूर्वक पूरी की। मशीन लर्निंग मॉडल्स तैयार किए, न्यूरल नेटवर्क पाइपलाइन्स को ट्रेन किया और आउटस्टैंडिंग (ग्रेड O) रेटिंग प्राप्त की।',
          skills: 'मशीन लर्निंग · Python · न्यूरल नेटवर्क्स · AICTE · ग्रेड O',
        },
        {
          id: 'exp-eduskills-java',
          role: 'जावा फुल स्टैक डेवलपर इंटर्न',
          company: 'EduSkills Academy और AICTE (शिक्षा मंत्रालय)',
          period: 'अप्रैल 2026 – जून 2026',
          description:
            '8-सप्ताह की वर्चुअल इंटर्नशिप के दौरान फुल-स्टैक जावा सॉल्यूशंस का निर्माण किया। Spring Boot REST APIs, रिलेशनल PostgreSQL डेटाबेस और आधुनिक इंटरैक्टिव फ्रंटएंड्स विकसित किए, तथा आउटस्टैंडिंग (ग्रेड O) विशिष्टता के साथ उत्तीर्ण हुए।',
          skills: 'Java · Spring Boot · PostgreSQL · फुल स्टैक · ग्रेड O',
        },
        {
          id: 'exp-paloalto-cyber',
          role: 'साइबर सुरक्षा वर्चुअल इंटर्न',
          company: 'Palo Alto Networks और EduSkills / AICTE',
          period: 'जुलाई 2025 – सितंबर 2025',
          description:
            'Palo Alto Networks और AICTE NEAT Cell द्वारा समर्थित 10-सप्ताह की साइबर सुरक्षा इंजीनियरिंग वर्चुअल इंटर्नशिप पूरी की। सुरक्षा नीतियां, जीरो-ट्रस्ट आर्किटेक्चर, नेटवर्क ट्रैफिक निरीक्षण और थ्रेट मिटिगेशन लागू किए।',
          skills: 'साइबर सुरक्षा · जीरो ट्रस्ट · नेटवर्क सुरक्षा · थ्रेट डिफेंस',
        },
      ],
    },
    skillsSection: {
      heading: 'तकनीकी कौशल',
      dragPrompt: '✦ घुमाने के लिए ड्रैग करें',
    },
    achievementsSection: {
      heading: 'उपलब्धियां एवं प्रमाणपत्र',
      viewCertificate: 'प्रमाणपत्र देखें',
      verify: 'सत्यापित करें',
      idPrefix: 'आईडी:',
    },
    githubSection: {
      heading: 'कोड एवं योगदान',
    },
    projects: {
      sectionBadge: 'प्रमुख प्लेटफॉर्म्स // 2025 – 2026',
      heading: 'पैमाने के लिए आर्किटेक्चर,',
      headingAccent: 'सटीकता से इंजीनियरिंग।',
      subtitle:
        'उत्पादन-तैयार प्लेटफॉर्म्स, स्वायत्त AI कैस्केड, उच्च-थ्रूपुट पीओएस और संस्थागत क्रिप्टो ट्रेडिंग टर्मिनल्स का एक विशेष संग्रह।',
      categories: {
        all: 'सभी प्लेटफॉर्म्स',
        ai: 'स्वायत्त AI',
        enterprise: 'एंटरप्राइज व POS',
        fintech: 'फिनटेक व Web3',
      },
      viewCaseStudy: 'केस स्टडी देखें',
      liveDemo: 'लाइव ऐप',
      sourceCode: 'सोर्स कोड',
      featuredBadge: 'विशेष प्रदर्शित प्लेटफॉर्म',
      exploreAll: 'सभी परियोजनाएं देखें',
      breadcrumbHome: 'मुख्य पृष्ठ',
      breadcrumbProjects: 'परियोजनाएं',
      searchPlaceholder: 'प्लेटफॉर्म नाम, तकनीक या कीवर्ड से खोजें...',
    },
    projectDetail: {
      breadcrumbHome: 'मुख्य पृष्ठ',
      breadcrumbProjects: 'परियोजनाएं',
      architectureOverview: 'सिस्टम आर्किटेक्चर सारांश',
      keyMetrics: 'सत्यापित प्रदर्शन मेट्रिक्स',
      keyFeatures: 'मूल क्षमताएं एवं तकनीकी विश्लेषण',
      techStack: 'सम्पूर्ण तकनीकी स्टैक',
      gallery: 'स्क्रीनशॉट गैलरी एवं मीडिया',
      liveApp: 'लाइव एप्लिकेशन खोलें',
      githubSource: 'गिटहब रिपॉजिटरी',
      getInTouch: 'इस आर्किटेक्चर पर चर्चा करें',
      backToProjects: 'वापस परियोजनाओं पर जाएं',
      nextProject: 'अगली परियोजना',
      previousProject: 'पिछली परियोजना',
    },
    blog: {
      sectionBadge: 'जर्नल एवं तकनीकी विश्लेषण',
      heading: 'सिस्टम आर्किटेक्चर',
      headingAccent: 'जर्नल।',
      subtitle:
        'सब-200ms रिटेल पीओएस, एसटीओएमपी वेबसॉकेट्स और उच्च-संगामी डिस्ट्रीब्यूटेड प्रणालियों पर गहन तकनीकी विश्लेषण।',
      readTime: 'पठन समय',
      views: 'पाठक',
      takeaways: 'मुख्य तकनीकी निष्कर्ष एवं सबक',
      architectureDiagram: 'आर्किटेक्चर ब्लूप्रिंट',
      allArticles: 'सभी आलेख',
      backToBlog: 'वापस ब्लॉग पर जाएं',
    },
    wall: {
      sectionBadge: 'सामुदायिक इंटरैक्टिव कैनवस',
      heading: 'विविध व दीवार (The Wall)',
      subtitle:
        'इंटरैक्टिव भौतिकी बोर्ड: स्टिकर उछालें, नोट्स लाइक/अनलाइक करें, या साथी एनीमे स्टिकर के साथ संदेश जोड़ें!',
      dropModeLabel: 'ड्रॉप मोड:',
      onlyNote: 'केवल नोट',
      noteWithSticker: 'नोट + स्टिकर',
      chooseSticker: 'नोट के साथ रखने के लिए स्टिकर चुनें:',
      namePlaceholder: 'आपका नाम / हैंडल',
      notePlaceholderOnly: 'दीवार पर एक मित्रतापूर्ण नोट छोड़ें... 📝',
      notePlaceholderSticker: 'नोट लिखें (साथ में नया स्टिकर आएगा!) ✨',
      stickNoteOnly: 'केवल नोट चिपकाएं',
      stickNoteWith: 'नोट + स्टिकर चिपकाएं:',
      shuffle: 'शफ़ल',
      reset: 'रीसेट',
      fullWall: 'पूरी दीवार ↗',
      fullscreenGuestbook: 'फुलस्क्रीन गेस्टबुक देखना चाहते हैं?',
    },
    contact: {
      sectionBadge: 'संपर्क करें // 24/7 सक्रिय',
      heading: 'आइए मिलकर कुछ',
      headingAccent: 'असाधारण निर्माण करें।',
      subtitle:
        'फुल-टाइम सॉफ़्टवेयर इंजीनियरिंग भूमिकाओं, हाई-कन्क्रेन्सी सिस्टम आर्किटेक्चर या तकनीकी सहयोग के लिए सदैव उपलब्ध।',
      formName: 'आपका पूरा नाम',
      formEmail: 'आपका ईमेल पता',
      formSubject: 'विषय / प्रोजेक्ट का क्षेत्र',
      formMessage: 'मैं आपकी किस प्रकार सहायता कर सकता हूँ? (अपने प्रोजेक्ट या भूमिका का विवरण दें)',
      sendMessage: 'संदेश भेजें ⚡',
      sending: 'भेजा जा रहा है...',
      sentSuccess: 'संदेश सफलतापूर्वक भेजा गया! मैं 24 घंटे के भीतर उत्तर दूंगा।',
      directChannels: 'सीधे संपर्क सूत्र',
      locationLabel: 'वर्तमान स्थान',
      locationValue: 'अमरावती, महाराष्ट्र, भारत',
      statusLabel: 'उपलब्धता स्थिति',
      statusValue: 'तत्काल कार्यभार संभालने हेतु उपलब्ध',
    },
    footer: {
      tagline: 'सॉफ़्टवेयर इंजीनियर एवं फुल-स्टैक डेवलपर - उच्च गति, सब-सेकंड सिस्टम्स और आधुनिक डिज़ाइन में विशेषज्ञ।',
      navigation: 'नेविगेशन',
      socials: 'सोशल मीडिया',
      copyright: 'सर्वाधिकार सुरक्षित। पूर्ण तकनीकी सटीकता के साथ निर्मित।',
      builtWith: 'React 19, Vite, Tailwind CSS और Framer Motion द्वारा संचालित',
      privacy: 'गोपनीयता नीति',
      terms: 'उपयोग की शर्तें',
    },
    cmd: {
      placeholder: 'प्रोजेक्ट्स, सेक्शन्स या सोशल प्रोफाइल्स खोजें...',
      navigationGroup: 'नेविगेशन',
      projectsGroup: 'प्रमुख परियोजनाएं',
      socialsGroup: 'सोशल व कोड प्रोफाइल्स',
      actionsGroup: 'त्वरित क्रियाएं',
    },
    seo: {
      homeTitle: 'अनिकेत मेश्राम | सॉफ़्टवेयर इंजीनियर एवं फुल-स्टैक डेवलपर',
      homeDesc:
        'अनिकेत मेश्राम का आधिकारिक पोर्टफोलियो - उच्च-प्रदर्शन वेब सिस्टम्स, Next.js 16, और Spring Boot में विशेषज्ञ सॉफ़्टवेयर इंजीनियर।',
      projectsTitle: 'परियोजनाएं संग्रह | अनिकेत मेश्राम - सॉफ़्टवेयर इंजीनियर',
      projectsDesc:
        'अनिकेत मेश्राम द्वारा निर्मित उत्पादन प्लेटफॉर्म्स, स्वायत्त AI सिस्टम्स, सब-200ms POS और क्रिप्टो ट्रेडिंग टर्मिनल्स देखें।',
      blogTitle: 'सिस्टम आर्किटेक्चर जर्नल | अनिकेत मेश्राम',
      blogDesc:
        'सब-200ms रिटेल पीओएस, एसटीओएमपी वेबसॉकेट्स और आधुनिक डिस्ट्रीब्यूटेड प्रणालियों पर तकनीकी शोध आलेख।',
      wallTitle: 'इंटरैक्टिव वॉल एवं गेस्टबुक | अनिकेत मेश्राम',
      wallDesc:
        'अनिकेत मेश्राम के इंटरैक्टिव कम्युनिटी कैनवस पर नोट्स लिखें, स्टिकर उछालें और इंटरैक्टिव फिजिक्स का अनुभव करें।',
      contactTitle: 'संपर्क एवं परामर्श | अनिकेत मेश्राम',
      contactDesc:
        'सॉफ़्टवेयर इंजीनियरिंग भूमिकाओं, फुल-स्टैक आर्किटेक्चर प्रोजेक्ट्स या तकनीकी परामर्श हेतु अनिकेत मेश्राम से संपर्क करें।',
    },
  },
};
