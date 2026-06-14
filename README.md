# FitAI — AI Workout Coach SaaS

FitAI is a full-stack AI-powered personal trainer that generates customized workout plans based on your fitness goals, level, and available equipment.

## Features
- **AI-Powered Plans**: Uses Groq API (Llama 3.3 70B) to generate detailed workout routines.
- **User Authentication**: Secure login and signup powered by Supabase.
- **Plan Management**: Save and view your generated workout plans in a personalized dashboard.
- **Modern UI**: Clean, dark-themed responsive design built with React and Tailwind CSS.

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, React Router, Lucide React
- **Backend**: Express.js (v4), Axios, CORS, Dotenv
- **Database/Auth**: Supabase
- **AI Model**: Groq API (llama-3.3-70b-versatile)

## Project Structure
```text
fitai/
  client/    (React + Vite frontend)
  server/    (Express.js backend)
  README.md
```

## Setup Instructions

### Prerequisites
- Node.js installed
- A Supabase project
- A Groq API key

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your credentials:
   ```env
   GROQ_API_KEY=your_groq_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PORT=3001
   ```
4. Start the server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_URL=http://localhost:3001
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

### Database Schema
Run the following SQL in your Supabase SQL Editor:
```sql
create table plans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  plan_name text,
  plan_content text,
  created_at timestamp default now()
);
```
