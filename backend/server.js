const path = require('path');
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Sakhashri Seals Backend API is running!' });
});

// Serve frontend static assets
app.use('/Website', express.static(path.join(__dirname, '../Website')));
app.use('/Style', express.static(path.join(__dirname, '../Style')));
app.use('/Script', express.static(path.join(__dirname, '../Script')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Default route (Homepage)
app.get('/', (req, res) => {
  res.redirect('/Website/Homeindex.html');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { full_name, email, phone_number, inquiry_type, requirement } = req.body;

    // Validate required fields
    if (!full_name || !email || !phone_number || !inquiry_type) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    console.log('Received contact form:', { full_name, email, phone_number, inquiry_type });

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        full_name,
        email,
        phone_number,
        inquiry_type,
        requirement: requirement || ''
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to save message',
        error: error.message
      });
    }

    console.log('Data inserted successfully:', data);

    res.status(201).json({
      success: true,
      message: 'Your query has been successfully received! We will contact you shortly.',
      data: data
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get all contact messages (for admin)
app.get('/api/contacts', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch messages',
        error: error.message
      });
    }

    res.json({
      success: true,
      count: data.length,
      data: data
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/contact`);
  console.log('='.repeat(60));
});
