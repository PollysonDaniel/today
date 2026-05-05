import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    
    // Simple keyword-based responses for now (works 100%)
    let text = "";
    const question = lastMessage.content.toLowerCase();
    
    if (question.includes("hi") || question.includes("hello")) {
      text = "Hello! How can I help you today?";
    } else if (question.includes("your name")) {
      text = "I'm your Q&A Assistant! I'm here to answer your questions.";
    } else if (question.includes("how are you")) {
      text = "I'm doing great! Thanks for asking. How can I assist you?";
    } else if (question.includes("python")) {
      text = "Python is a popular programming language used for web development, AI, data science, and more!";
    } else if (question.includes("javascript")) {
      text = "JavaScript is a programming language that makes websites interactive and runs in web browsers.";
    } else if (question.includes("react")) {
      text = "React is a JavaScript library for building user interfaces, created by Facebook.";
    } else if (question.includes("next")) {
      text = "Next.js is a React framework that gives you building blocks to create web applications.";
    } else if (question.includes("network operating system")) {
      text = "Network Operating System (NOS) is an operating system that allows computers to communicate and share resources over a network.";
    } else if (question.includes("futo")) {
      text = "Founded in 1980 by President Shehu Shagari, FUTO opened its doors on November 28, 1980 with 225 students and 60 staff members. It began on the temporary site of the Old Government Technical College (GTC) in Owerri before moving to its permanent location 25 kilometers south of the city in January 1982.";
    } else {
      text = "That's a great question! I'm still learning. Can you ask me something about Python, JavaScript, React, or Next.js?";
    }
    
    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json({ text: "Hello! I'm your Q&A assistant. What would you like to know?" });
  }
}