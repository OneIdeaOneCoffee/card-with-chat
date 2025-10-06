-- Drop the insecure header-based policies
DROP POLICY IF EXISTS "Users can read their own session messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can insert into their own session" ON public.chat_messages;

-- Block all direct client access to chat_messages
-- Only edge functions with service role key can access the table
CREATE POLICY "Block all direct client access"
ON public.chat_messages
FOR ALL
USING (false)
WITH CHECK (false);