
-- Create a table for hardware inventory items
CREATE TABLE public.hardware_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  serial_number TEXT NOT NULL UNIQUE,
  assigned_to TEXT,
  status TEXT NOT NULL DEFAULT 'Available',
  purchase_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to the table
ALTER TABLE public.hardware_items ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users to manage inventory
-- Allow authenticated users to view all hardware items
CREATE POLICY "Authenticated users can view all hardware items" 
  ON public.hardware_items 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Allow authenticated users to create hardware items
CREATE POLICY "Authenticated users can create hardware items" 
  ON public.hardware_items 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Allow authenticated users to update hardware items
CREATE POLICY "Authenticated users can update hardware items" 
  ON public.hardware_items 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Allow authenticated users to delete hardware items
CREATE POLICY "Authenticated users can delete hardware items" 
  ON public.hardware_items 
  FOR DELETE 
  TO authenticated 
  USING (true);

-- Create an index on serial_number for faster lookups
CREATE INDEX idx_hardware_items_serial_number ON public.hardware_items(serial_number);

-- Create an index on status for filtering
CREATE INDEX idx_hardware_items_status ON public.hardware_items(status);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_hardware_items_updated_at 
    BEFORE UPDATE ON public.hardware_items 
    FOR EACH ROW 
    EXECUTE FUNCTION public.update_updated_at_column();
