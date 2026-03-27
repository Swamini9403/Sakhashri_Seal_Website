-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  inquiry_type TEXT NOT NULL,
  requirement TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_messages;

-- Create policy to allow inserts from ANYONE (including anonymous)
CREATE POLICY "Allow public inserts" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Allow authenticated reads" ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);
