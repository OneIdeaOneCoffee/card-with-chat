-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can insert chat messages" ON public.chat_messages;

-- Create secure policies that restrict access by session_id
-- Users can only read messages from their own session
CREATE POLICY "Users can read their own session messages"
ON public.chat_messages
FOR SELECT
USING (
  session_id = current_setting('request.headers', true)::json->>'x-session-id'
  OR session_id = current_setting('request.headers', true)::json->>'session-id'
);

-- Users can only insert messages into their own session
CREATE POLICY "Users can insert into their own session"
ON public.chat_messages
FOR INSERT
WITH CHECK (
  session_id = current_setting('request.headers', true)::json->>'x-session-id'
  OR session_id = current_setting('request.headers', true)::json->>'session-id'
);