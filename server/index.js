const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Groq AI Setup
const groqApiKey = process.env.GROQ_API_KEY;

app.post('/api/generate-plan', async (req, res) => {
  const { goal, fitnessLevel, daysPerWeek, equipment, userId } = req.body;

  const prompt = `Create a detailed, structured weekly workout plan for a user with the following profile:
  - Goal: ${goal}
  - Fitness Level: ${fitnessLevel}
  - Days per Week: ${daysPerWeek}
  - Available Equipment: ${equipment}

  The plan should be professional, encouraging, and include specific exercises, sets, reps, and rest periods. 
  Format the response as a clear, readable text-based workout plan.`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const planContent = response.data.choices[0].message.content;
    res.json({ planContent });
  } catch (error) {
    console.error('Groq API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate workout plan' });
  }
});

app.post('/api/save-plan', async (req, res) => {
  const { userId, planContent, planName } = req.body;

  try {
    const { data, error } = await supabase
      .from('plans')
      .insert([{ user_id: userId, plan_name: planName, plan_content: planContent }])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    console.error('Supabase Save Error:', error.message);
    res.status(500).json({ error: 'Failed to save workout plan' });
  }
});

app.get('/api/plans', async (req, res) => {
  const { userId } = req.query;

  try {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Supabase Fetch Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch workout plans' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
