/**
 * PORTFOLIO DATA – Kalpesh Bavaliya
 * Edit this file to update all content site-wide.
 * Future: replace with API / CMS fetch.
 */
const KB = {

    /* ── Personal ── */
    name: "Kalpesh Bavaliya",
    role: "Full Stack Developer",
    badge: "Available for work",
    location: "Gujarat, India",
    email: "kalpeshbavaliya2005@gmail.com",
    phone: "+91 70967 20915",
    github: "https://github.com/kalpo2005",
    linkedin: "https://linkedin.com/in/kalpesh-bavaliya",
    twitter: "https://twitter.com",
    resume: "~/resume/resume.pdf",
    image: "~/images/kalpesh-portfolio.png",

    /* ── Typewriter phrases ── */
    taglines: [
        "Full Stack Apps.",
        "RESTful APIs.",
        // "Flutter Apps.",
        "React Dashboards.",
        "Scalable Systems.",
        "Fast Experiences.",
    ],

    /* ── Hero stats ── */
    heroStats: [
        { count: 2.5, suffix: "+", label: "Years XP" },
        { count: 3, suffix: "+", label: "Projects" },
        { count: 2, suffix: "+", label: "Clients" },
        { count: 100, suffix: "k+", label: "Users Served" },
    ],

    /* ── Hero slide 3 tech pills ── */
    techPills: ["React", "Node.js", "Flutter", "Laravel", "MongoDB"],

    /* ── About ── */
    about: {
        cards: [
            { icon: "⚡", title: "2.5+ Years", sub: "Experience" },
            { icon: "📍", title: "Gujarat,India", sub: "Available Remote" },
        ],
        lead: "Hey there! I'm a passionate <strong>Full Stack Developer</strong> with 2.5+ years of experience turning ideas into robust, scalable digital products.",
        body: [
            "I specialize in <strong>React.js, Node.js, Laravel</strong> and cloud infrastructure. From pixel-perfect UIs to high-throughput APIs, I love every layer of the stack.",
            "When I'm not coding, I'm exploring system design, contributing to open source, or mentoring junior devs. I believe great software is built on clean code, empathy for users, and relentless iteration.",
        ],
        highlights: [
            { icon: "⚡", text: "Performance-first mindset" },
            { icon: "🎯", text: "Product-driven approach" },
            { icon: "🤝", text: "Strong collaborator" },
            { icon: "📱", text: "Mobile & web expertise" },
        ],
    },

    /* ── Skills ── */
    skills: [
        { name: "Node.js", icon: "devicon-nodejs-plain", pct: 93 },
        { name: "React.js", icon: "devicon-react-original", pct: 80 },
        { name: "Laravel", icon: "devicon-laravel-plain", pct: 90 },
        { name: "Flutter", icon: "devicon-flutter-plain", pct: 40 },
        { name: "JavaScript", icon: "devicon-javascript-plain", pct: 93 },
        { name: "TypeScript", icon: "devicon-typescript-plain", pct: 85 },
        { name: "Python", icon: "devicon-python-plain", pct: 75 },
        { name: "MySQL", icon: "devicon-mysql-plain", pct: 90 },
        { name: "MongoDB", icon: "devicon-mongodb-plain", pct: 75 },
        // { name: "Redis", icon: "devicon-redis-plain", pct: 78 },
        // { name: "Vue.js", icon: "devicon-vuejs-plain", pct: 78 },
        // { name: "Next.js", icon: "devicon-nextjs-original", pct: 88 },
        // { name: "Docker", icon: "devicon-docker-plain", pct: 80 },
        // { name: "AWS", icon: "devicon-amazonwebservices-original", pct: 75 },
        { name: "Git", icon: "devicon-git-plain", pct: 95 },
        { name: "Firebase", icon: "devicon-firebase-plain", pct: 85 },
        { name: "GraphQL", icon: "devicon-graphql-plain", pct: 82 },
        { name: "Tailwind", icon: "devicon-tailwindcss-plain", pct: 90 },
        { name: "Figma", icon: "devicon-figma-plain", pct: 80 },
        { name: "Linux", icon: "devicon-linux-plain", pct: 72 },
        { name: "macOS", icon: "devicon-apple-original", pct: 85 },
    ],

    /* ── Projects ── */
    projects: [
        {
            emoji: "📚",
            category: "fullstack",
            title: "Gujju Ebook",
            desc: "API-integrated multi-vendor ebook marketplace featuring role-based admin management, secure payments, real-time inventory, and a comprehensive analytics dashboard.",
            tags: ["PHP", "RESTfull API", "MySQL"],
            grad: "linear-gradient(135deg,#0a0a0a,#1a1a2e,#0d47a1)",
            live: "http://gkmaza.com/apps/gujjuebook/admin/login.php",
            repo: "#",
        }
        // {
        //     emoji: "💊", category: "mobile",
        //     title: "MediTrack Health App",
        //     desc: "Cross-platform health management app with medication reminders, doctor appointments, and lab report tracking.",
        //     tags: ["Flutter", "Firebase", "Dart"],
        //     grad: "linear-gradient(135deg,#0a0a0a,#1b2838,#00897b)",
        //     live: "#", repo: "#",
        // },
        // {
        //     emoji: "📊", category: "web",
        //     title: "AnalytiX Dashboard",
        //     desc: "Business intelligence dashboard with real-time charts, KPI tracking, and customizable reporting for SMEs.",
        //     tags: ["Vue.js", "Laravel", "MySQL"],
        //     grad: "linear-gradient(135deg,#0a0a0a,#1a1a1a,#6a1b9a)",
        //     live: "#", repo: "#",
        // },
        // {
        //     emoji: "🏠", category: "fullstack",
        //     title: "RealEste Property Portal",
        //     desc: "Property listing platform with map integration, virtual tours, mortgage calculator, and agent CRM module.",
        //     tags: ["Next.js", "Node.js", "PostgreSQL"],
        //     grad: "linear-gradient(135deg,#0a0a0a,#212121,#e65100)",
        //     live: "#", repo: "#",
        // },
        // {
        //     emoji: "💬", category: "mobile",
        //     title: "ChatFlow Messenger",
        //     desc: "Real-time messaging app with end-to-end encryption, group chats, voice messages, and file sharing.",
        //     tags: ["React Native", "Socket.io", "Redis"],
        //     grad: "linear-gradient(135deg,#0a0a0a,#1a1a1a,#1565c0)",
        //     live: "#", repo: "#",
        // },
        // {
        //     emoji: "🍕", category: "web",
        //     title: "FoodHub Delivery",
        //     desc: "Food ordering platform with live order tracking, restaurant management panel, and driver mobile app.",
        //     tags: ["React", "Laravel", "Stripe"],
        //     grad: "linear-gradient(135deg,#0a0a0a,#1a1a1a,#2e7d32)",
        //     live: "#", repo: "#",
        // },
    ],

    /* ── Experience (no salary/CTC) ── */
    experience: [
        // {
        //     title: "Senior Full Stack Developer",
        //     company: "TechCorp Solutions Pvt. Ltd.",
        //     period: "Jan 2023 – Present",
        //     current: true,
        //     points: [
        //         "Led development of 5+ enterprise-grade web applications serving 100k+ daily users",
        //         "Architected microservices with Node.js & Docker reducing system downtime by 40%",
        //         "Mentored a team of 6 junior developers and conducted weekly code reviews",
        //         "Implemented CI/CD pipelines cutting deployment time by 60%",
        //     ],
        //     tech: ["React", "Node.js", "AWS", "Docker"],
        // },
        {
            title: "Full Stack Developer",
            company: "Freelance / Remote",
            period: "October 2023 – Present",
            current: true,
            points: [
                "Built a college results portal with Laravel backend and React.js frontend, serving 10k+ students with real-time updates",
                "Role based jwt authentication, and admin dashboard for content management",
            ],
            tech: ["Laravel", "Node.js", "MySQL", "Flutter", "React.js"],
        },
        // {
        //     title: "Junior Web Developer",
        //     company: "StartupHub India",
        //     period: "Jul 2019 – Feb 2021",
        //     current: false,
        //     points: [
        //         "Developed responsive frontends with HTML, CSS, JavaScript and Bootstrap",
        //         "Contributed to backend APIs with PHP/Laravel for various client projects",
        //         "Collaborated closely with UI/UX teams to rapidly prototype features",
        //     ],
        //     tech: ["PHP", "Laravel", "jQuery", "Bootstrap"],
        // },
    ],

    /* ── Education ── */
    education: [
        {
            icon: "🎓",
            degree: "Bachelor of Computer Applications (B.C.A.)",
            institute: "Shree Adarsh B.C.A. College, Botad",
            period: "July 2023 – pursuing",
            grade: "CGPA: -",
            points: [
                "Core computer science curriculum with focus on software development, data structures, and algorithms",
                "Winner of inter-college coding competitions and hackathons",
                "IT quiz champion at college level",
            ],
        },
        {
            icon: "🎓",
            degree: "B.E. Civil Engineering",
            institute: "Government Engineering College, Bhavnagar",
            period: "September 2022 – May 2023",
            grade: "CGPA: -",
            points: [
                "Building material testing, structural analysis, and construction management",
                "Team Lead for college cultural fest, organizing events and managing logistics",
            ],
        },
        {
            icon: "📚",
            degree: "Higher Secondary (Science – PCM)",
            institute: "Shree Dakshinamurti Vinay Mandir, Bhavnagar",
            period: "2020 – 2022",
            grade: "75.4%",
            points: [
                "Physics, Chemistry & Mathematics core stream",
                "School-level Math Olympiad winner",
            ],
        },
    ],

    /* ── Certifications ── */
    // certifications: [
    //     { badge: "AWS", title: "AWS Certified Solutions Architect" },
    //     { badge: "Meta", title: "Meta React Developer Certificate" },
    //     { badge: "Google", title: "Google IT Automation with Python" },
    //     { badge: "MongoDB", title: "MongoDB Certified Developer" },
    // ],

    /* ── Life At ── */
    lifeAt: [
        {
            icon: "🏫", emoji: "📖",
            period: "June 2005 – May 2018",
            title: "Life at School",
            place: "Shree Hamapar Primary School, Hamapar, Botad",
            body: [
                "School was where my passion for <strong>mathematics, logic puzzles, and science</strong> first began. Winning the District Math Olympiad in Grade 9 was my first recognition for hard work and analytical thinking.",
                "I served as the <strong>School Committee Leader for 2 years</strong>, where I helped manage school activities, organized annual events like sports day, and supported teachers in coordinating academic and extracurricular programs."
            ],
            highlights: ["🏆 District Math Olympiad Winner", "📡 Science Exhibition Lead", "🎤 Quiz Champion"],
        },
        {
            icon: "🌾", emoji: "👨‍🌾",
            period: "Every Year · Farming Season",
            title: "Helping My Father in the Fields",
            place: "Family Farm, Gujarat",
            body: [
                "Every year during the cotton farming season, I work alongside my father on our family farm. From preparing the soil to harvesting cotton, I actively help in the entire process.",
                "This experience taught me the true meaning of <strong>hard work, responsibility, and dedication</strong>. Farming showed me that success comes from patience, consistent effort, and teamwork."
            ],
            highlights: ["🌾 Cotton crop farming", "🤝 Supporting family work", "💪 Learning hard work & responsibility"]
        },
        {
            icon: "🎓", emoji: "💻",
            period: "2023 – 2026",
            title: "Life at College",
            place: "Shree Adarsh B.C.A. College, Botad",
            body: [
                "During my college years, I became actively involved in programming and software development. I served as a <strong>champion in the college programming committee</strong>, contributing to coding initiatives and supporting students in technical projects.",
                "I developed a <strong>college academic management system</strong> to manage results, assignments, and academic records efficiently. The platform simplified administrative work and was later adopted by <strong>multiple colleges</strong> for managing their academic processes."
            ],
            highlights: [
                "💻 Programming Committee Champion",
                "📊 Built Result & Assignment Management System",
                "🏫 Adopted by multiple colleges",
                "🚀 Real-world software development impact"
            ],
        },
        // {
        //     icon: "💼", emoji: "🖥️",
        //     period: "2019 – Present",
        //     title: "Life at Work",
        //     place: "Surat → Remote → Global",
        //     body: [
        //         "Five years of building products that people actually use. From <strong>startup hustles to enterprise architectures</strong>, every project has been a new chapter.",
        //         "Today I balance deep technical work with <strong>architectural decisions, team mentorship, and client communication</strong>. The farmer's values never left — grow things slowly and get them right.",
        //     ],
        //     highlights: ["🏢 3 Companies", "👨‍💻 40+ Projects", "👥 6-person team led", "🌍 20+ global clients"],
        //     last: true,
        // },
    ],

    /* ── Testimonials ── */
    testimonials: [
        {
            initials: "TM", grad: "linear-gradient(135deg,#1565c0,#42a5f5)",
            image: null,
            name: "Trushit Mamaiya", role: "FOUNDER, BharatNextGenTech",
            text: "\"Kalpesh is one of the most talented developers I've worked with. He delivered our e-commerce platform 2 weeks ahead of schedule with exceptional quality.\"",
        },
        {
            initials: "PM", grad: "linear-gradient(135deg,#00897b,#4db6ac)",
            image: null,
            name: "Priya Mehta", role: "Product Manager, GK Maza Innovation",
            text: "\"Kalpesh built our Flutter app from scratch — it now has 50k+ downloads on the Play Store. He's proactive, communicates well, and always delivers quality work.\"",
        },
        // {
        //     initials: "AK", grad: "linear-gradient(135deg,#6a1b9a,#ab47bc)",
        //     image: null,
        //     name: "Ankit Kumar", role: "CTO, AnalytiX Corp",
        //     text: "\"Kalpesh restructured our entire backend. Response times dropped from 3s to under 200ms. His deep knowledge of Node.js, Redis, and AWS made all the difference.\"",
        // },
        // {
        //     initials: "NP", grad: "linear-gradient(135deg,#e65100,#ff8f00)",
        //     image: null,
        //     name: "Neha Patel", role: "Founder, RealEste Ventures",
        //     text: "\"We hired Kalpesh as a freelancer and ended up offering him a full-time role. His work ethic and ability to ship fast while maintaining quality is truly impressive.\"",
        // },
        // {
        //     initials: "VD", grad: "linear-gradient(135deg,#2e7d32,#66bb6a)",
        //     image: null,
        //     name: "Vikram Desai", role: "Head of Product, FoodHub",
        //     text: "\"Kalpesh led the frontend team for our SaaS dashboard. The UI is incredibly polished and our users love it — churn dropped by 25% after launch.\"",
        // },
    ],

    /* ── Achievements ── */
    achievements: [
        {
            type: "certificate",
            image: null,
            title: "District First Rank – Scholarship Examination",
            issuer: "State Examination Board, Gujarat",
            year: "2018",
            desc: "Secured <strong>1st rank in the district</strong> in the State Scholarship Examination conducted by the State Examination Board, Gujarat. The scholarship was awarded to students demonstrating exceptional academic performance and excellence in the state-level competitive exam.",
            badge: "🏅",
            color: "linear-gradient(135deg,#ff6b00,#ffaa00)",
        },
        {
            type: "award",
            image: null,
            title: "Best Final Year Project",
            issuer: "SVNIT – NIT Surat",
            year: "2019",
            desc: "Awarded for developing a multi-tenant SaaS ERP system as the final year project.",
            badge: "🏆",
            color: "linear-gradient(135deg,#0071e3,#2997ff)",
        },
        // {
        //     type: "certificate",
        //     image: null,
        //     title: "Meta React Developer",
        //     issuer: "Meta (Facebook)",
        //     year: "2022",
        //     desc: "Professional certificate covering React.js fundamentals, advanced patterns, and ecosystem tools.",
        //     badge: "📜",
        //     color: "linear-gradient(135deg,#4267B2,#67a1f5)",
        // },
        // {
        //     type: "award",
        //     image: null,
        //     title: "District Math Olympiad Winner",
        //     issuer: "Gujarat State Education Board",
        //     year: "2013",
        //     desc: "First place in the district-level mathematics olympiad, recognized for analytical excellence.",
        //     badge: "🥇",
        //     color: "linear-gradient(135deg,#6a1b9a,#ab47bc)",
        // },
        // {
        //     type: "certificate",
        //     image: null,
        //     title: "Google IT Automation with Python",
        //     issuer: "Google / Coursera",
        //     year: "2021",
        //     desc: "Six-course certificate covering Python scripting, Git, Linux, and IT automation at scale.",
        //     badge: "🐍",
        //     color: "linear-gradient(135deg,#0f9d58,#34a853)",
        // },
        // {
        //     type: "award",
        //     image: null,
        //     title: "Hackathon Organizer of the Year",
        //     issuer: "NIT Surat Coding Club",
        //     year: "2018",
        //     desc: "Recognized for organizing 3 national-level hackathons with 500+ participants each.",
        //     badge: "⚡",
        //     color: "linear-gradient(135deg,#e65100,#ff8f00)",
        // },
    ],
};
