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
    location: "Botad, ujarat, India",
    email: "kalpesh.bavaliya2005@gmail.com",
    phone: "+91 98250 00000",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    resume: "resume.pdf",
    image: "images/kalpesh-portfolio.png",

    /* ── Typewriter phrases ── */
    taglines: [
        "Full Stack Apps.",
        "RESTful APIs.",
        "Flutter Apps.",
        "React Dashboards.",
        "Scalable Systems.",
        "Fast Experiences.",
    ],

    /* ── Hero stats ── */
    heroStats: [
        { count: 5, suffix: "+", label: "Years XP" },
        { count: 40, suffix: "+", label: "Projects" },
        { count: 20, suffix: "+", label: "Clients" },
        { count: 100, suffix: "k+", label: "Users Served" },
    ],

    /* ── Hero slide 3 tech pills ── */
    techPills: ["React", "Node.js", "Flutter", "Laravel", "AWS", "Docker", "MongoDB"],

    /* ── About ── */
    about: {
        cards: [
            { icon: "⚡", title: "5+ Years", sub: "Experience" },
            { icon: "📍", title: "Surat, India", sub: "Available Remote" },
        ],
        lead: "Hey there! I'm a passionate <strong>Full Stack Developer</strong> with 5+ years of experience turning ideas into robust, scalable digital products.",
        body: [
            "I specialize in <strong>React.js, Node.js, Laravel, Flutter</strong> and cloud infrastructure. From pixel-perfect UIs to high-throughput APIs, I love every layer of the stack.",
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
        { name: "Node.js", icon: "devicon-nodejs-plain", pct: 92 },
        { name: "React.js", icon: "devicon-react-original", pct: 95 },
        { name: "Laravel", icon: "devicon-laravel-plain", pct: 90 },
        { name: "Flutter", icon: "devicon-flutter-plain", pct: 90 },
        { name: "JavaScript", icon: "devicon-javascript-plain", pct: 93 },
        { name: "TypeScript", icon: "devicon-typescript-plain", pct: 85 },
        { name: "Python", icon: "devicon-python-plain", pct: 75 },
        { name: "MySQL", icon: "devicon-mysql-plain", pct: 88 },
        { name: "MongoDB", icon: "devicon-mongodb-plain", pct: 82 },
        { name: "Redis", icon: "devicon-redis-plain", pct: 78 },
        { name: "Vue.js", icon: "devicon-vuejs-plain", pct: 78 },
        { name: "Next.js", icon: "devicon-nextjs-original", pct: 88 },
        { name: "Docker", icon: "devicon-docker-plain", pct: 80 },
        { name: "AWS", icon: "devicon-amazonwebservices-original", pct: 75 },
        { name: "Git", icon: "devicon-git-plain", pct: 95 },
        { name: "Firebase", icon: "devicon-firebase-plain", pct: 85 },
        { name: "GraphQL", icon: "devicon-graphql-plain", pct: 72 },
        { name: "Tailwind", icon: "devicon-tailwindcss-plain", pct: 90 },
        { name: "Figma", icon: "devicon-figma-plain", pct: 70 },
        { name: "Linux", icon: "devicon-linux-plain", pct: 72 },
        { name: "macOS", icon: "devicon-apple-original", pct: 85 },
    ],

    /* ── Projects ── */
    projects: [
        {
            emoji: "🛒", category: "fullstack",
            title: "ShopNest E-Commerce",
            desc: "Full-featured multi-vendor e-commerce platform with real-time inventory, Stripe payments, and analytics dashboard.",
            tags: ["React", "Node.js", "MongoDB"],
            grad: "linear-gradient(135deg,#0a0a0a,#1a1a2e,#0d47a1)",
            live: "#", repo: "#",
        },
        {
            emoji: "💊", category: "mobile",
            title: "MediTrack Health App",
            desc: "Cross-platform health management app with medication reminders, doctor appointments, and lab report tracking.",
            tags: ["Flutter", "Firebase", "Dart"],
            grad: "linear-gradient(135deg,#0a0a0a,#1b2838,#00897b)",
            live: "#", repo: "#",
        },
        {
            emoji: "📊", category: "web",
            title: "AnalytiX Dashboard",
            desc: "Business intelligence dashboard with real-time charts, KPI tracking, and customizable reporting for SMEs.",
            tags: ["Vue.js", "Laravel", "MySQL"],
            grad: "linear-gradient(135deg,#0a0a0a,#1a1a1a,#6a1b9a)",
            live: "#", repo: "#",
        },
        {
            emoji: "🏠", category: "fullstack",
            title: "RealEste Property Portal",
            desc: "Property listing platform with map integration, virtual tours, mortgage calculator, and agent CRM module.",
            tags: ["Next.js", "Node.js", "PostgreSQL"],
            grad: "linear-gradient(135deg,#0a0a0a,#212121,#e65100)",
            live: "#", repo: "#",
        },
        {
            emoji: "💬", category: "mobile",
            title: "ChatFlow Messenger",
            desc: "Real-time messaging app with end-to-end encryption, group chats, voice messages, and file sharing.",
            tags: ["React Native", "Socket.io", "Redis"],
            grad: "linear-gradient(135deg,#0a0a0a,#1a1a1a,#1565c0)",
            live: "#", repo: "#",
        },
        {
            emoji: "🍕", category: "web",
            title: "FoodHub Delivery",
            desc: "Food ordering platform with live order tracking, restaurant management panel, and driver mobile app.",
            tags: ["React", "Laravel", "Stripe"],
            grad: "linear-gradient(135deg,#0a0a0a,#1a1a1a,#2e7d32)",
            live: "#", repo: "#",
        },
    ],

    /* ── Experience (no salary/CTC) ── */
    experience: [
        {
            title: "Senior Full Stack Developer",
            company: "TechCorp Solutions Pvt. Ltd.",
            period: "Jan 2023 – Present",
            current: true,
            points: [
                "Led development of 5+ enterprise-grade web applications serving 100k+ daily users",
                "Architected microservices with Node.js & Docker reducing system downtime by 40%",
                "Mentored a team of 6 junior developers and conducted weekly code reviews",
                "Implemented CI/CD pipelines cutting deployment time by 60%",
            ],
            tech: ["React", "Node.js", "AWS", "Docker"],
        },
        {
            title: "Full Stack Developer",
            company: "InnovateTech Pvt. Ltd.",
            period: "Mar 2021 – Dec 2022",
            current: false,
            points: [
                "Built and shipped 10+ client projects using React.js, Laravel, and Flutter",
                "Integrated third-party APIs (Razorpay, Twilio, Google Maps) across multiple products",
                "Optimized database queries reducing API response times by 35%",
            ],
            tech: ["Flutter", "Laravel", "Vue.js", "MySQL"],
        },
        {
            title: "Junior Web Developer",
            company: "StartupHub India",
            period: "Jul 2019 – Feb 2021",
            current: false,
            points: [
                "Developed responsive frontends with HTML, CSS, JavaScript and Bootstrap",
                "Contributed to backend APIs with PHP/Laravel for various client projects",
                "Collaborated closely with UI/UX teams to rapidly prototype features",
            ],
            tech: ["PHP", "Laravel", "jQuery", "Bootstrap"],
        },
    ],

    /* ── Education ── */
    education: [
        {
            icon: "🎓",
            degree: "B.E. in Computer Engineering",
            institute: "SVNIT – NIT Surat",
            period: "2015 – 2019",
            grade: "CGPA: 8.4 / 10",
            points: [
                "Specialized in Software Engineering & Distributed Systems",
                "Final year project: Multi-tenant SaaS ERP (Best Project Award 🏆)",
                "Technical lead of college coding club",
            ],
        },
        {
            icon: "📚",
            degree: "Higher Secondary (Science – PCM)",
            institute: "Shree Swaminarayan School, Surat",
            period: "2013 – 2015",
            grade: "89.4%",
            points: [
                "Physics, Chemistry & Mathematics core stream",
                "District-level Math Olympiad winner",
            ],
        },
    ],

    /* ── Certifications ── */
    certifications: [
        { badge: "AWS", title: "AWS Certified Solutions Architect" },
        { badge: "Meta", title: "Meta React Developer Certificate" },
        { badge: "Google", title: "Google IT Automation with Python" },
        { badge: "MongoDB", title: "MongoDB Certified Developer" },
    ],

    /* ── Life At ── */
    lifeAt: [
        {
            icon: "🏫", emoji: "📖",
            period: "2005 – 2013",
            title: "Life at School",
            place: "Shree Swaminarayan School, Surat",
            body: [
                "School was where my love for <strong>mathematics and logic puzzles</strong> first bloomed. Winning the District Math Olympiad in Grade 9 was my first taste of recognition through hard work.",
                "I discovered a knack for <strong>leadership</strong> — class monitor for 4 consecutive years, leading the annual science exhibition, and organizing inter-school quiz competitions.",
            ],
            highlights: ["🏆 District Math Olympiad Winner", "📡 Science Exhibition Lead", "🎤 Quiz Champion"],
        },
        {
            icon: "🌾", emoji: "🌱",
            period: "Summers · Every Year",
            title: "Life at the Farm",
            place: "Ancestral Village, Gujarat",
            body: [
                "Every summer our family returned to our ancestral village in Gujarat. Working alongside my grandfather in the fields taught me <strong>patience, resilience, and the value of hard work</strong>.",
                "Watching a seed become a harvest gave me a deep appreciation for <strong>process, iteration, and delayed gratification</strong> — the same patience I apply when architecting large-scale systems.",
            ],
            highlights: ["🌾 Cotton & Groundnut farming", "🐄 Village livestock care", "🌅 Lessons in patience"],
        },
        {
            icon: "🎓", emoji: "💻",
            period: "2015 – 2019",
            title: "Life at College",
            place: "SVNIT – NIT Surat",
            body: [
                "NIT Surat transformed me from a math enthusiast into a <strong>full-blown software engineer</strong>. The first time I deployed a web app live — that was the moment I knew this was my calling.",
                "Led the college <strong>coding club</strong>, organized 3 national-level hackathons, and built a campus food delivery app used by 500+ students daily.",
            ],
            highlights: ["🏆 Best Final Year Project", "💡 Coding Club Lead", "🚀 Built campus food app", "🌐 3 Hackathons organized"],
        },
        {
            icon: "💼", emoji: "🖥️",
            period: "2019 – Present",
            title: "Life at Work",
            place: "Surat → Remote → Global",
            body: [
                "Five years of building products that people actually use. From <strong>startup hustles to enterprise architectures</strong>, every project has been a new chapter.",
                "Today I balance deep technical work with <strong>architectural decisions, team mentorship, and client communication</strong>. The farmer's values never left — grow things slowly and get them right.",
            ],
            highlights: ["🏢 3 Companies", "👨‍💻 40+ Projects", "👥 6-person team led", "🌍 20+ global clients"],
            last: true,
        },
    ],

    /* ── Testimonials ── */
    testimonials: [
        {
            initials: "RS", grad: "linear-gradient(135deg,#1565c0,#42a5f5)",
            name: "Rajesh Sharma", role: "CEO, ShopNest Technologies",
            text: "\"Kalpesh is one of the most talented developers I've worked with. He delivered our e-commerce platform 2 weeks ahead of schedule with exceptional quality.\"",
        },
        {
            initials: "PM", grad: "linear-gradient(135deg,#00897b,#4db6ac)",
            name: "Priya Mehta", role: "Product Manager, HealthTech India",
            text: "\"Kalpesh built our Flutter app from scratch — it now has 50k+ downloads on the Play Store. He's proactive, communicates well, and always delivers quality work.\"",
        },
        {
            initials: "AK", grad: "linear-gradient(135deg,#6a1b9a,#ab47bc)",
            name: "Ankit Kumar", role: "CTO, AnalytiX Corp",
            text: "\"Kalpesh restructured our entire backend. Response times dropped from 3s to under 200ms. His deep knowledge of Node.js, Redis, and AWS made all the difference.\"",
        },
        {
            initials: "NP", grad: "linear-gradient(135deg,#e65100,#ff8f00)",
            name: "Neha Patel", role: "Founder, RealEste Ventures",
            text: "\"We hired Kalpesh as a freelancer and ended up offering him a full-time role. His work ethic and ability to ship fast while maintaining quality is truly impressive.\"",
        },
        {
            initials: "VD", grad: "linear-gradient(135deg,#2e7d32,#66bb6a)",
            name: "Vikram Desai", role: "Head of Product, FoodHub",
            text: "\"Kalpesh led the frontend team for our SaaS dashboard. The UI is incredibly polished and our users love it — churn dropped by 25% after launch.\"",
        },
    ],
};
