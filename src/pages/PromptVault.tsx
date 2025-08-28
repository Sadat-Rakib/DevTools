import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Search,
  Plus,
  Filter,
  Star,
  Download,
  Upload,
  Copy,
  Eye,
  Heart,
  Trash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  rating: number;
  uses: number;
  isFavorite: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  model: string[];
}

const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "React Component Generator",
    description: "Generate clean, typed React components with props interface",
    content:
      "Create a React TypeScript component named {componentName} that {functionality}. Include proper prop types, documentation, and follow best practices for {useCase}.",
    category: "Development",
    tags: ["React", "TypeScript", "Components"],
    rating: 4.8,
    uses: 1250,
    isFavorite: true,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "2",
    title: "API Documentation Writer",
    description: "Generate comprehensive API documentation",
    content:
      "Write detailed API documentation for {endpoint} including request/response examples, error codes, authentication requirements, and rate limiting information.",
    category: "Documentation",
    tags: ["API", "Documentation", "Backend"],
    rating: 4.6,
    uses: 890,
    isFavorite: false,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "3",
    title: "Database Schema Designer",
    description: "Design optimized database schemas with relationships",
    content:
      "Design a database schema for {projectType} with the following entities: {entities}. Include proper relationships, indexes, constraints, and consider scalability for {expectedLoad}.",
    category: "Database",
    tags: ["Database", "SQL", "Schema Design"],
    rating: 4.9,
    uses: 654,
    isFavorite: true,
    difficulty: "Advanced",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "4",
    title: "Code Review Assistant",
    description: "Comprehensive code review with suggestions",
    content:
      "Review this {language} code for {codeType}. Check for: security vulnerabilities, performance issues, code quality, best practices, and maintainability. Provide specific improvement suggestions.",
    category: "Development",
    tags: ["Code Review", "Security", "Performance"],
    rating: 4.7,
    uses: 2100,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "5",
    title: "Marketing Copy Creator",
    description: "Generate compelling marketing copy for products",
    content:
      "Create engaging marketing copy for {productType} targeting {audience}. Include: headline, value proposition, key benefits, call-to-action. Tone: {tone}. Length: {length}.",
    category: "Marketing",
    tags: ["Marketing", "Copywriting", "Content"],
    rating: 4.5,
    uses: 987,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "6",
    title: "Resume Optimization Prompt",
    description: "Optimize a resume for ATS compatibility",
    content:
      "Optimize a resume for a {jobTitle} role at {companyName}. Include ATS-friendly keywords, quantify achievements with metrics, and align with {industry} standards. Ensure a one-page format.",
    category: "Resume",
    tags: ["Resume", "ATS", "Optimization"],
    rating: 4.7,
    uses: 850,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "7",
    title: "Cover Letter Generator",
    description: "Create a tailored cover letter for a job application",
    content:
      "Generate a cover letter for a {jobTitle} position at {companyName}. Highlight {skill1}, {skill2}, and {achievement}. Use a professional tone, align with {companyValues}, and include a call-to-action.",
    category: "Resume",
    tags: ["Cover Letter", "Job Application", "Professional"],
    rating: 4.6,
    uses: 720,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "8",
    title: "LinkedIn Profile Enhancer",
    description: "Enhance a LinkedIn profile for job opportunities",
    content:
      "Optimize a LinkedIn profile for a {jobRole} in {industry}. Include a keyword-rich headline, a compelling about section with {years} years of experience, and showcase {skill1}, {skill2}. Add a recruiter pitch.",
    category: "Networking",
    tags: ["LinkedIn", "Networking", "Profile"],
    rating: 4.8,
    uses: 600,
    isFavorite: true,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "9",
    title: "Job Description Analyzer",
    description: "Analyze and extract key requirements from job descriptions",
    content:
      "Analyze a job description for {jobTitle} at {companyName}. Extract key skills, qualifications, and responsibilities. Suggest matching experiences and keywords for a resume or cover letter.",
    category: "Jobs",
    tags: ["Job Description", "Analysis", "Keywords"],
    rating: 4.5,
    uses: 950,
    isFavorite: false,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "10",
    title: "Interview Question Generator",
    description: "Generate technical interview questions",
    content:
      "Generate {number} technical interview questions for a {jobRole} position focusing on {topic}. Include difficulty levels: {levels}. Provide sample answers for each question.",
    category: "Interview",
    tags: ["Interview", "Technical", "Questions"],
    rating: 4.7,
    uses: 1100,
    isFavorite: true,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "11",
    title: "Mock Interview Script",
    description: "Create a mock interview script for practice",
    content:
      "Create a mock interview script for a {jobRole} position. Include {number} questions covering technical skills, behavioral aspects, and {specificTopic}. Provide expected answers and follow-ups.",
    category: "Interview",
    tags: ["Mock Interview", "Practice", "Script"],
    rating: 4.6,
    uses: 800,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "12",
    title: "Skill Assessment Prompt",
    description: "Generate a skill assessment test",
    content:
      "Design a skill assessment test for {skillType} with {number} questions. Include multiple-choice, coding problems, and short answers. Target {difficultyLevel} users and provide scoring guidelines.",
    category: "Skills",
    tags: ["Skill Assessment", "Test", "Learning"],
    rating: 4.8,
    uses: 700,
    isFavorite: true,
    difficulty: "Advanced",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "13",
    title: "Portfolio Project Description",
    description: "Generate a detailed project description for a portfolio",
    content:
      "Create a project description for a {projectType} portfolio entry. Include project name, overview, technologies used ({tech1}, {tech2}), challenges overcome, and impact. Target {audience}.",
    category: "Portfolio",
    tags: ["Portfolio", "Project", "Description"],
    rating: 4.7,
    uses: 650,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "14",
    title: "Networking Email Template",
    description: "Craft a professional networking email",
    content:
      "Write a networking email to connect with a {role} at {companyName}. Include a personalized introduction, reason for connection ({purpose}), and a polite call-to-action. Keep it under 150 words.",
    category: "Networking",
    tags: ["Networking", "Email", "Professional"],
    rating: 4.5,
    uses: 900,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "15",
    title: "Refine My Coding Resume with Contextual Enhancements",
    description: "Rewrite resume bullet points to make them stand out for high-paying software engineering roles",
    content: "Here’s the prompt you can use: Prompt: Refine My Coding Resume with Contextual Enhancements You are an expert in crafting high-impact software engineering resumes. Using the detailed framework below, rewrite all the bullet points in my resume to make them stand out for $100K+ software engineering roles. Framework for Each Resume Point: 1.What Technology Did You Use? Identify the specific technology mentioned in each point (e.g., React, Node.js, PostgreSQL). 2.How Did You Use It? Describe how you implemented or utilized this technology in the project or role, including any specific features or methodologies. 3.Why Did You Use It? •Micro Reason: Explain the technical problem the technology or feature solved. •Macro Reason: Highlight broader advantages or human impacts (e.g., improved user experience, scalability, compatibility). 4.Synthesize Combine all the above into a polished, concise bullet point showcasing impact and relevance. Example Before and After: Before: •Built a web app using React and Node.js. •Improved app performance by 20%. After: •“Developed a full-stack web application using React and Node.js, optimizing performance by 20% through the implementation of reusable components and server-side rendering, enhancing user experience and scalability.” Additional Notes: •Focus on measurable results and specific impacts where possible. •Prioritize technical achievements over generic descriptions. Input: Paste your resume below, including your job titles, projects, technologies, and descriptions of your responsibilities. I’ll rewrite each point to align with the framework above. Once your resume is pasted, the tool will refine it to ensure every point showcases your technical expertise, problem-solving abilities, and measurable results.",
    category: "Resume",
    tags: ["Resume", "Software Engineering", "Optimization"],
    rating: 4.8,
    uses: 1200,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "16",
    title: "Standout Coding Projects for Job Seekers",
    description: "Generate unique project ideas based on job market analysis for junior/mid-level engineers",
    content: "Job board Analysis: I'm a new coder who's struggling to land interviews, and I know basic CRUD apps and portfolio websites aren't enough anymore. I want to build three standout, technically impressive projects that companies would genuinely be impressed by. Here's what I need from you: Analyze real junior and mid-level software engineer job listings from LinkedIn, WellFound, and other job boards. Identify the top in-demand skills and problems companies are hiring to solve. Based on that, give me three unique project ideas that meet these criteria: Each project solves real-world problems and provides actual value to users. It uses industry-relevant tech. It includes at least one technically difficult feature like real-time collaboration, data visualization, AI-powered automation, multi-step workflows, etc. The end result should be something that looks like a real startup MVP. For each project, include: One sentence description A real-world use case A full tech stack Advanced features that show off technical depth A short description on how to pitch it on a resume to make recruiters interested Do not suggest generic projects like to-do lists, blogs, weather apps, or clones unless they're solving a real user problem in a unique, useful way.",
    category: "Portfolio",
    tags: ["Coding Projects", "Job Search", "Portfolio"],
    rating: 4.7,
    uses: 950,
    isFavorite: true,
    difficulty: "Advanced",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "17",
    title: "ATS Scan and Resume Optimization",
    description: "Analyze resume for ATS compatibility and provide improvement suggestions",
    content: "Hello GPT-4, I’m looking to optimize my software engineering resume for two key audiences: Applicant Tracking Systems (ATS) and human recruiters/hiring managers. I would appreciate your detailed analysis and actionable suggestions to improve its effectiveness. Please review my resume and provide feedback in the following areas: ATS Optimization: Verify that the resume’s structure (section headings, bullet points, formatting) is ATS-friendly. Identify and suggest improvements for any formatting issues that could hinder automated scanning. Recommend specific keywords and phrases aligned with industry-standard job descriptions that could boost the resume’s ATS ranking. Content and Structure: Evaluate the overall organization and clarity of the resume. Advise on how to better showcase my technical skills, projects, and measurable achievements. Suggest ways to reorder or reformat sections to maximize impact and readability. Language and Tone: Review the language for clarity, conciseness, and a professional tone. Propose modifications to highlight my contributions and results more effectively. Ensure the resume language aligns with current industry best practices and job market expectations. Here is my resume for your review: [Insert your resume text here]. Thank you for your comprehensive analysis and recommendations!",
    category: "Resume",
    tags: ["ATS", "Resume", "Optimization"],
    rating: 4.6,
    uses: 1100,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4"],
  },
  {
    id: "18",
    title: "ChatGPT Secret Codes",
    description: "Special commands to enhance ChatGPT responses for simplicity and expertise",
    content: "CHATGPT SECRET CODES 1. ELI10 — Explain Like I'm 10 🧒 Makes ChatGPT explain complex topics in super simple, kid-level language. Use case: Tech tutorials, science breakdowns, or explaining code to beginners. Example: ELI10: How does quantum computing work? 2.TL;DR ● Gives a short summary 2-3 sentences. Example: “TL;DR — What is cloud computing? 3. JARGONIZE To sound expert, professional, or \"nerdily impressive.. Use case: You're writing LinkedIn posts, tech blogs, whitepapers, or research docs Example: JARGONIZE: Explain how cloud storage works. 4. LISTIFY LISTIFY turns a simple idea into an easy-to-read list format Example: LISTIFY: Best camera phones under ₹30,000 in 2025",
    category: "Development",
    tags: ["ChatGPT", "Commands", "Productivity"],
    rating: 4.5,
    uses: 800,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "19",
    title: "Tech Nerd Custom Instructions for ChatGPT",
    description: "Custom commands to improve ChatGPT interactions for better results",
    content: "tech.nerdd PASTE THE BELOW COMMANDS HERE: Chatgpt > Settings > Personalization > Custom Instructions > Paste in “What traits should ChatGPT have ?” section (The below commands will work only if these are pasted in the above path. These will save you lot of time and better results from chatgpt.) 1. If I type /W or /w in my response, you will browse the web. 2. If I type /fix, fix all grammatical issues with the content, make it easy to understand, focus on clarity. Only respond with the proofread text. Do not say anything else in your response. 3. If I type /human in my message, respond in a way that sounds natural and human — not like it was written by AI. 📝 Example: /W best smartphones under ₹30,000 in 2025 Browses the web to fetch real-time, up-to-date information from trusted sources. /human Write a email to manager for sick leave Generates natural, human-sounding replies with tone and flow that feel like it was written by you, not AI. /fix This phone have a bestest camera for video shoot. fixes grammar, improves clarity, and returns only the corrected version (no extra comments).",
    category: "Development",
    tags: ["ChatGPT", "Custom Instructions", "Productivity"],
    rating: 4.7,
    uses: 650,
    isFavorite: false,
    difficulty: "Beginner",
    model: ["GPT-4"],
  },
  {
    id: "20",
    title: "Base44 Resume Review Prompt",
    description: "Brutally honest resume review with actionable improvements and tailoring suggestions",
    content: "Link to try Base44 - https://base44.com/ Code ANJALI10 for 10 free credits Link to my Resume Revamp App - https://app--resume-revamp-2e9212a2.base44.app/ Prompt - You are a brutally honest, highly experienced resume reviewer and job application strategist. Your job is to analyze a candidate’s resume and provide the following: Clear bullet-pointed issues with their current resume — this includes vague wording, lack of impact, poor formatting, repetitive descriptions, irrelevant details, or anything that weakens their candidacy. Specific, actionable improvement suggestions — rewrite weak lines, suggest metrics to add, improve clarity, recommend formatting, or restructure job descriptions using the format:→ “Did X using Y with Z impact”Example: “Improved system performance by 40% using Redis caching and async processing.” Tailoring suggestions — if a job description is provided, explain how the resume can better match it. Include keywords to add, relevant experience to highlight, and any changes to tone, structure, or focus that would make it a stronger match. A section called “➕ Add These Extra Details as Well” that prompts the user to enrich weak or vague sections by including missing context, metrics, or specifics. Your tone should be: Honest and constructive Never vague or generic Focused on measurable, professional improvements Resume Text (Extracted from PDF): {{RESUME_TEXT}} Job Description (Optional): {{JOB_DESCRIPTION}} Output Format (stick to this structure): 🛑 Resume Issues: [Problem 1] [Problem 2] ... ✅ Suggestions for Improvement: [Rewrite vague phrases using: Did X using Y with Z impact] [Add measurable outcomes, remove fluff, use action verbs, align tone] 🎯 Tailoring Suggestions (if job description is provided): [Keyword matches to include] [Skills to highlight or reorder] [Specific rephrasing to better align with role] ➕ Add These Extra Details as Well: Quantify your impact — e.g. how much time/money was saved, % improvements, number of users affected, or performance changes. Mention tools, technologies, or platforms used for each project or task. Include team size, collaboration details, or who benefited from your work. Be specific about outcomes — e.g. launched a product, got promoted, reduced bugs, increased engagement, etc. Make your suggestions direct, specific, and tailored to the actual content. Avoid generic advice like “add more detail” — explain how and why.",
    category: "Resume",
    tags: ["Resume Review", "Job Application", "Tailoring"],
    rating: 4.9,
    uses: 750,
    isFavorite: true,
    difficulty: "Advanced",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "21",
    title: "Cold Email Template for Job Applications",
    description: "Professional cold email template for reaching out to recruiters",
    content: "Subject Line: \"Experienced [Your Profession] Seeking Opportunities at [Company Name]\" or \"Interest in [Specific Role] at [Company Name]\" Hi [Recruiter's Name], [Brief Introduction] and [Purpose of email] [Value Proposition] [Call to Action] [Closing] Example: Subject : Application for [Specific Job Title] at [Company Name] or Innovative [Your Profession] Excited to Contribute to [Company Name] Dear [Recruiter's Name], I hope this message finds you well. My name is [Your Name], and I am a software engineer with over five years of experience in full-stack development. I am reaching out to express my interest in the Senior Software Engineer position at [Company Name]. In my current role at [Current Company], I have [Briefly Describe a Key Achievement or Responsibility]. I am particularly skilled in [List Relevant Skills], and I am excited about the possibility of bringing my expertise to your team. I have long admired [Company Name] for [Specific Reason, e.g., its innovative approach to technology, commitment to customer satisfaction, etc.]. I believe that my background in [Your Field/Industry] aligns well with your company’s goals, and I am eager to contribute to [Specific Project or Aspect of Company’s Work]. Could we schedule a time to discuss how my background and skills might align with the needs of [Company Name]? Thank you for considering my application. I look forward to the opportunity to speak with you. Best regards, [Your Name]   [Your Email] [LinkedIn Profile]",
    category: "Networking",
    tags: ["Cold Email", "Job Application", "Recruiters"],
    rating: 4.6,
    uses: 900,
    isFavorite: false,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "22",
    title: "LinkedIn Connection Request Templates",
    description: "Sample templates for personalized LinkedIn connection requests",
    content: "Sample LinkedIn Connection Requests Template 1: Hi [Name], I’m [Your Name], a student studying [Field]. I’m interested in your work in [Area]. Could we connect to discuss your experience? Template 2: Hello [Name], I’m [Your Name], currently upskilling in [Field]. Your journey inspires me. Would love to connect and learn from your insights! Template 3: Hi [Name], I’m exploring [Field/Skill] as a student and noticed your expertise in this area. Can we connect? I’d love to ask for your advice. Template 4: Hi [Name], I’m [Your Name], passionate about [Field]. Your career in [Company/Industry] is inspiring. Can we connect to learn more about your experience? Template 5: Hello [Name], I’m [Your Name], currently studying [Field]. Could we connect? I’d like to ask your advice on starting a career in [Industry/Role]. Template 6: Hi [Name], I’m [Your Name], a student interested in [Field]. I’m keen to learn from your experience in [Specific Area]. Can we connect? Template 7: Hello [Name], I’m a student studying [Field]. I came across your work in [Area] and would love to connect to gain insights and advice. Template 8: Hi [Name], I’m [Your Name], currently building skills in [Field]. Could we connect? I’d appreciate your advice on navigating this field as a student. Template 9: Hello [Name], I’m [Your Name], a student learning about [Topic]. Could we connect? I’d love to hear your thoughts on how to grow in this field. Template 10: Hi [Name], I’m [Your Name], an aspiring [Field/Role] professional and student. Your expertise in [Skill] inspires me. Can we connect to learn more from you?",
    category: "Networking",
    tags: ["LinkedIn", "Connection Requests", "Networking"],
    rating: 4.5,
    uses: 850,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "23",
    title: "Interview Feedback Prompt",
    description: "Simulate hiring manager to ask domain questions and provide feedback",
    content: "Promt for Chat GPT-Consider yourself as a hiring manager and ask me questions on [Your Domain], and I’m going to provide an answer. Give me feedback on my answer: What part of my answer stood out? What pieces were missing? What did I do well, and what may I have done differently, in light of best practices for interviews?",
    category: "Interview",
    tags: ["Interview Practice", "Feedback", "Hiring Manager"],
    rating: 4.7,
    uses: 1000,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4"],
  },
  {
    id: "24",
    title: "Excited to Contribute Cold Email",
    description: "Email template for recent graduates applying to roles",
    content: "Subject: Excited to Contribute and Learn with [Company Name] – [Your Name]Hi [Recruiter’s Name],I hope you're doing well! My name is [Your Name], and I recently came across the [Job Title] role at [Company Name]. I’m really excited about the opportunity because it aligns perfectly with both my academic background and my passion for [specific skill or field relevant to the role, e.g., marketing, data analysis, software development].As a recent graduate in [Your Degree] from [University Name], I’ve gained hands-on experience in [mention any relevant experience, such as internships, projects, or coursework]. I’m eager to bring my skills in [specific skills or tools] to a dynamic and forward-thinking company like [Company Name].I would love the opportunity to connect and discuss how my background, enthusiasm, and willingness to learn can contribute to the team’s success. Thank you for considering my message, and I look forward to hearing from you.Best regards,[Your Name][Your LinkedIn Profile URL]",
    category: "Networking",
    tags: ["Cold Email", "Job Application", "Graduates"],
    rating: 4.6,
    uses: 700,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "25",
    title: "ChatGPT Prompts for Resume Improvement",
    description: "Series of prompts to spot flaws, rewrite, and optimize resumes",
    content: "ChatGPT Prompt 1/ Spot the flaws Act as a hiring manager and review my resume critically. Point out any flaws, vague language, weak bullet points, or anything that could be improved to make it more impactful. 2/ Rewrite Act as a professional resume writer. Rewrite my resume to sound more concise, results-driven, and powerful, focusing on clear accomplishments. (Provide all your achievements with numbers) 3/ ATS Friendliness Act as a hiring manager and review my résumé critically. Point out any flaws, vague language, weak bullet points, or anything that could be improved to make it more impactful. (Check your ATS score for free at ResuScan) 4/ Professional Summary Write a compelling, 3 line professional summary for (role) that highlights my strengths and positions me strongly for recruiters. 5/ Experience Act as a recruiter and help me rewrite my experience section with action verbs, measurable impact, and bullet points that align with the (job role) 6/ Format Suggest an updated, clean, and modern format for my resume that enhances readability, looks professional, and aligns with industry standards. No tables, no graphs or fancy fonts.",
    category: "Resume",
    tags: ["Resume Improvement", "ATS", "Rewriting"],
    rating: 4.8,
    uses: 950,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4"],
  },
  {
    id: "26",
    title: "GPT-5 Job Seeker Mastery Guide",
    description: "Comprehensive guide using AI for job search tasks like resumes and interviews",
    content: "🚀 GPT-5 Job Seeker Mastery Guide How to Land Your Dream Job Faster Using GPT-5 1. Perfect Your Resume Tailor your resume for each job description in seconds. Prompt: \"Here’s my resume [paste text]. Here’s the job description [paste JD]. Rewrite my resume so it’s tailored for this role, keeping ATS optimization in mind, and highlight my most relevant skills and achievements.\" 💡 Tip: Ask GPT-5 to shorten or expand bullet points and perform keyword analysis. 2. Write Job-Winning Cover Letters Draft personalized, non-generic cover letters. Prompt: \"Write me a cover letter for this job [paste JD] using my resume [paste text]. Keep it conversational yet professional, and show enthusiasm for the company.\" 💡 Tip: Include a personal story or motivation for the role. 3. Master Interview Preparation Act as a mock interviewer for you. Prompt: \"You are an HR manager interviewing me for [role]. Ask me 10 most likely questions (technical + behavioral) and wait for my answers. Then give me detailed feedback and better sample answers.\" 💡 Tip: Use STAR method for behavioral questions. 4. Build Job-Ready Portfolio Projects Generate project ideas + execution plans. Prompt: \"Suggest 3 portfolio project ideas for a [job role] that will impress recruiters, using tools like [tools you know]. Then create a detailed step-by-step execution plan.\" 💡 Tip: Ask for no-code project ideas if you’re not into coding. 5. Ace LinkedIn Networking Write powerful LinkedIn connection requests and DMs. Prompt: \"Write a short and professional LinkedIn message to connect with [job title] at [company], mentioning my interest in their company and asking for advice on applying.\" 💡 Tip: Post skill-showcasing content to attract recruiters. 6. Track & Apply Strategically Create an application tracker. Prompt: \"Create a simple table to track my job applications — with columns for company, job title, application date, follow-up date, status, and notes.\" 💡 Tip: Ask for cold email templates to follow up with recruiters. 7. Learn & Upskill Fast Create learning roadmaps. Prompt: \"Create a 14-day learning plan to master [skill] for [role], with daily tasks, free resources, and small projects to showcase my learning.\" 💡 Tip: Combine with portfolio building for double impact.",
    category: "Jobs",
    tags: ["Job Search", "AI Guide", "Upskilling"],
    rating: 4.9,
    uses: 1300,
    isFavorite: true,
    difficulty: "Advanced",
    model: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "27",
    title: "Daily Job Search Prompt for Marketing Roles",
    description: "Automated prompt to search for new marketing jobs using ATS platforms",
    content: "Copy-Paste Prompt to Use with ChatGPT or Any AI Agent:Run a daily job search at 9 AM UK time for new marketing roles at top creative, digital, and advertising agencies in London (or remote-friendly). Focus on roles like Marketing Manager, Social Media Manager, Brand Manager, Campaign Manager, and Growth Marketer.Use these ATS platforms to find job listings: Greenhouse, Lever, Workday Recruiting, iCIMS, SmartRecruiters, BambooHR, JazzHR, Jobvite, Bullhorn, Recruitee, Ashby, Breezy, Comeet, Workable, Zoho Recruit, Teamtailor, Pinpoint, Manatal, Freshteam.Output format: For each job, include:- Job Title - Company Name - Location (Remote / City) - Posting Date - Direct Application Link Also check LinkedIn to see if a hiring manager or recruiter has posted about it. Include a short networking message I can send them.",
    category: "Jobs",
    tags: ["Job Search", "Marketing", "Automation"],
    rating: 4.5,
    uses: 600,
    isFavorite: false,
    difficulty: "Intermediate",
    model: ["GPT-4"],
  },
  {
    id: "28",
    title: "Ghost Job Checker",
    description: "AI prompt to detect if a job listing is legitimate or a ghost job",
    content: "Ghost Job Checker 🔍 AI-Powered Ghost Job Detector Goal: Check if a job is legit or just a fake listing wasting your time. Works with either a job link or the job description text. 🛠 Step 1: What Are You Analyzing? If you have a link to the job post (LinkedIn, Indeed, company website), paste it below. If you only have the text of the job description, paste that instead. We’ll run checks either way. 🕵️♂️ Step 2: Apply These 9 Checks 1️⃣ Recycled Job Postings → Has this job appeared before on other platforms? 2️⃣ Old Posting → If it's 30+ days old, is it still open or just left online? 3️⃣ Vague Description → Are the responsibilities, requirements, or reporting lines unclear? 4️⃣ Not on Company Website → Can you find it on the official careers page? 5️⃣ No Salary or Benefits Info → Are compensation or perks mentioned? 6️⃣ Suspicious Response Time → Do they reply instantly (bot) or ghost completely? 7️⃣ Mismatched Company Info → Does the company name, location, or contact info look inconsistent? 8️⃣ Lack of Employee Presence → Are there employees listed on LinkedIn or reviews on Glassdoor? 9️⃣ Weird Application Process → Are they asking for personal info like SSN or bank details too early? 📊 Step 3: Give a Structured Verdict Use this format for your answer: mathematicaCopyEdit📌 Final Assessment: [Likely Legitimate | Uncertain | High Probability Ghost Job]🎯 Confidence Score: [XX%]📑 Key Risk Indicators:- [List the red flags you found]🔗 Evidence & Sources:- [Links to company site, LinkedIn post, or missing pages]✅ Next Steps for User:- [Apply? Avoid? Investigate further?] 📥 Step 4: Paste Below to Start Drop in the job link or the job description text — and let the tool do the work. 🎯 Best Practice: Run the prompt on the job link — but if you only have the description, use it as a starting point and manually search for: The same job across platforms The company's career site Employer reviews on LinkedIn and Glassdoor",
    category: "Jobs",
    tags: ["Job Verification", "Ghost Jobs", "Analysis"],
    rating: 4.7,
    uses: 850,
    isFavorite: true,
    difficulty: "Beginner",
    model: ["GPT-4", "Claude"],
  },
  {
    id: "29",
    title: "Generate FAANG-Style Resume with ChatGPT",
    description: "Step-by-step guide to create ATS-friendly LaTeX resumes using AI",
    content: "How to Generate a FAANG-Style Resume with ChatGPT Follow these steps to create a polished, ATS-friendly LaTeX resume: Step 1 — Open ChatGPT Go to chat.openai.com (or your ChatGPT app). Make sure you’re using a model with file upload support (e.g., GPT-4/5). Step 2 — Prepare Your Files Save your existing resume (can be PDF, DOCX, or even an image like JPG/PNG). Get a LaTeX resume template (for FAANG/ATS style). Example: resume-faang.tex. Step 3 — Upload Files In ChatGPT, click the paperclip 📎 icon to upload both: Your resume file (image or text). The LaTeX template file (.tex). Step 4 — Give Clear Instructions Paste a prompt like this: I am sharing a LaTeX source code for a FAANG-style resume template along with my updated resume as a reference. Please tailor the LaTeX resume to align with the attached resume and optimize it for this job description: [Paste Job Description Here] Make the content concise, results-driven, and ATS-friendly while keeping the formatting consistent with FAANG standards. Step 5 — Get the LaTeX Code ChatGPT will rewrite your resume into LaTeX format. Copy the generated LaTeX code into a .tex file (e.g., resume.tex). Step 6 — Compile Your Resume Use https://texviewer.herokuapp.com/ Upload resume.tex. Compile → Download the PDF resume. Step 7 — Final Check Review the output to ensure: Keywords match the job description. Formatting looks clean. Achievements are quantified. ✅ Done! Now you have a FAANG-style ATS-friendly resume tailored for your target role.",
    category: "Resume",
    tags: ["FAANG Resume", "LaTeX", "ATS"],
    rating: 4.8,
    uses: 1100,
    isFavorite: false,
    difficulty: "Advanced",
    model: ["GPT-4"],
  },
  {
    id: "30",
    title: "Senior Hiring Manager Resume Assessment",
    description: "Prompt to evaluate resumes as a hiring manager for specific roles",
    content: "Resume Prompt : Act as a senior hiring manager with over 20 years of experience in the [PREFERRED INDUSTRY]. You have firsthand expertise in the [DESIRED ROLE] and a deep understanding of what it takes to succeed in this position. Your task is to identify the ideal candidate based solely on their resume, ensuring they meet and exceed expectations for [JOB DESCRIPTION].Break down the key qualifications, technical and soft skills, relevant experience, and project work that would make a candidate stand out. Highlight essential industry certifications, domain expertise, and the impact of past roles in shaping their suitability.Additionally, evaluate leadership qualities, problem-solving abilities, and adaptability to evolving industry trends. If applicable, consider cultural fit, teamwork, and communication skills required for success in the organization.Finally, provide a structured assessment framework what an exceptional resume should look like, red flags to avoid, and how to differentiate between a good candidate and a perfect hire. Ensure your response is comprehensive, strategic, and aligned with real-world hiring best practices.",
    category: "Resume",
    tags: ["Hiring Manager", "Assessment", "Industry Expertise"],
    rating: 4.9,
    uses: 900,
    isFavorite: true,
    difficulty: "Advanced",
    model: ["GPT-4", "Claude"],
  },
];

const categories = [
  "All",
  "Development",
  "Documentation",
  "Database",
  "Marketing",
  "Design",
  "SEO",
  "Analytics",
  "Resume",
  "Jobs",
  "Interview",
  "Skills",
  "Portfolio",
  "Networking",
];

export default function PromptVault() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [prompts, setPrompts] = useState<Prompt[]>(samplePrompts);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id
          ? { ...prompt, isFavorite: !prompt.isFavorite }
          : prompt
      )
    );
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => alert("Prompt copied to clipboard!"))
      .catch((err) =>
        alert("Failed to copy to clipboard: " + err.message)
      );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Advanced":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const deletePrompt = (id: string) => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      setPrompts((prev) => prev.filter((prompt) => prompt.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Prompt Vault</h1>
            <p className="text-muted-foreground">
              Curated collection of AI prompts for developers
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              aria-label="Import prompts"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".json";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      try {
                        const importedData = JSON.parse(
                          event.target?.result as string
                        );
                        if (
                          Array.isArray(importedData) &&
                          importedData.every(
                            (item) =>
                              item.id &&
                              item.title &&
                              item.content &&
                              item.category &&
                              Array.isArray(item.tags) &&
                              item.rating >= 0 &&
                              item.rating <= 5 &&
                              item.uses >= 0 &&
                              typeof item.isFavorite === "boolean" &&
                              ["Beginner", "Intermediate", "Advanced"].includes(
                                item.difficulty
                              ) &&
                              Array.isArray(item.model)
                          )
                        ) {
                          setPrompts((prev) => [
                            ...prev,
                            ...importedData.map((item) => ({
                              ...item,
                              id: uuidv4(), // Ensure unique IDs
                            })),
                          ]);
                          alert("Prompts imported successfully!");
                        } else {
                          throw new Error("Invalid prompt format");
                        }
                      } catch (error) {
                        alert(
                          "Error importing prompts. Please ensure the file is a valid JSON with correct prompt structure."
                        );
                      }
                    };
                    reader.readAsText(file);
                  }
                };
                input.click();
              }}
            >
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button
              variant="outline"
              size="sm"
              aria-label="Export prompts"
              onClick={() => {
                const dataStr = JSON.stringify(prompts, null, 2);
                const timestamp = new Date()
                  .toISOString()
                  .replace(/[:.]/g, "-");
                const dataUri =
                  "data:application/json;charset=utf-8," +
                  encodeURIComponent(dataStr);
                const exportFileDefaultName = `prompts_export_${timestamp}.json`;
                const linkElement = document.createElement("a");
                linkElement.setAttribute("href", dataUri);
                linkElement.setAttribute("download", exportFileDefaultName);
                document.body.appendChild(linkElement);
                linkElement.click();
                document.body.removeChild(linkElement);
              }}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              size="sm"
              aria-label="Create new prompt"
              onClick={() => {
                const newPrompt: Prompt = {
                  id: uuidv4(),
                  title: "New Prompt",
                  description: "Add your prompt description here",
                  content: "Your prompt content goes here...",
                  category: "Development",
                  tags: ["new"],
                  rating: 0,
                  uses: 0,
                  isFavorite: false,
                  difficulty: "Beginner",
                  model: ["GPT-4"],
                };
                setPrompts((prev) => [newPrompt, ...prev]);
                alert("New prompt created! You can now edit it.");
              }}
            >
              <Plus className="h-4 w-4" />
              New Prompt
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" aria-label="Filter prompts">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              aria-label="Switch to grid view"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              aria-label="Switch to list view"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            aria-label={`Select ${category} category`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{prompts.length}</div>
            <div className="text-sm text-muted-foreground">Total Prompts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {prompts.filter((p) => p.isFavorite).length}
            </div>
            <div className="text-sm text-muted-foreground">Favorites</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {categories.length - 1}
            </div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {prompts.reduce((sum, p) => sum + p.uses, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Uses</div>
          </CardContent>
        </Card>
      </div>

      {/* Prompts Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredPrompts.map((prompt) => (
          <Card
            key={prompt.id}
            className="group hover:shadow-lg transition-all duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {prompt.title}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {prompt.description}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={
                    prompt.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  onClick={() => toggleFavorite(prompt.id)}
                  className="shrink-0"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      prompt.isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Content Preview */}
              <div className="p-3 bg-muted/30 rounded-md text-sm font-mono text-muted-foreground line-clamp-3">
                {prompt.content}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {prompt.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(prompt.difficulty)}>
                    {prompt.difficulty}
                  </Badge>
                  <span className="text-muted-foreground">
                    {prompt.uses} uses
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{prompt.rating}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Copy prompt to clipboard"
                  onClick={() => copyToClipboard(prompt.content)}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="View prompt details"
                  onClick={() => {
                    alert(
                      `Prompt: ${prompt.title}\n\nDescription: ${
                        prompt.description
                      }\n\nContent: ${prompt.content}\n\nCategory: ${
                        prompt.category
                      }\nDifficulty: ${
                        prompt.difficulty
                      }\nModel: ${prompt.model.join(
                        ", "
                      )}\nTags: ${prompt.tags.join(", ")}\nRating: ${
                        prompt.rating
                      }\nUses: ${prompt.uses}`
                    );
                  }}
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  aria-label={`Delete ${prompt.title}`}
                  onClick={() => deletePrompt(prompt.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            No prompts found matching your criteria.
          </div>
          <Button className="mt-4" aria-label="Create new prompt">
            <Plus className="h-4 w-4" />
            Create New Prompt
          </Button>
        </div>
      )}
    </div>
  );
}