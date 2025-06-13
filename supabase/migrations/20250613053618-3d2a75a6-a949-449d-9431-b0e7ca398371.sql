
-- Drop existing policies that require authentication
DROP POLICY IF EXISTS "Authenticated users can view all hardware items" ON public.hardware_items;
DROP POLICY IF EXISTS "Authenticated users can create hardware items" ON public.hardware_items;
DROP POLICY IF EXISTS "Authenticated users can update hardware items" ON public.hardware_items;
DROP POLICY IF EXISTS "Authenticated users can delete hardware items" ON public.hardware_items;

-- Create new policies that allow public access
CREATE POLICY "Public can view all hardware items" 
  ON public.hardware_items 
  FOR SELECT 
  TO public
  USING (true);

CREATE POLICY "Public can create hardware items" 
  ON public.hardware_items 
  FOR INSERT 
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update hardware items" 
  ON public.hardware_items 
  FOR UPDATE 
  TO public
  USING (true);

CREATE POLICY "Public can delete hardware items" 
  ON public.hardware_items 
  FOR DELETE 
  TO public
  USING (true);
