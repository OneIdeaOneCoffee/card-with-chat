import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TelegramMessage {
  text: string;
  session_id: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, session_id } = await req.json() as TelegramMessage;

    // Validate inputs
    if (!text || text.trim().length === 0) {
      console.error('Empty message received');
      return new Response(
        JSON.stringify({ error: 'Message text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!session_id || typeof session_id !== 'string' || session_id.trim().length === 0) {
      console.error('Invalid session_id');
      return new Response(
        JSON.stringify({ error: 'Valid session_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate session_id format to prevent injection
    if (session_id.length > 100 || !/^[a-zA-Z0-9-_]+$/.test(session_id)) {
      console.error('Invalid session_id format');
      return new Response(
        JSON.stringify({ error: 'Invalid session_id format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate text length
    if (text.length > 1000) {
      console.error('Message too long');
      return new Response(
        JSON.stringify({ error: 'Message must be less than 1000 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!botToken || !chatId || !supabaseUrl || !supabaseServiceKey) {
      console.error('Missing configuration');
      return new Response(
        JSON.stringify({ error: 'Service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Sending message to Telegram chat:', chatId);

    // Store user message in database
    const { error: dbError } = await supabase
      .from('chat_messages')
      .insert({
        text,
        sender: 'user',
        session_id
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // Send message to Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Nova mensagem do site:\n\n${text}`,
        parse_mode: 'HTML',
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', responseData);
      return new Response(
        JSON.stringify({ error: 'Failed to send message to Telegram', details: responseData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Message sent successfully to Telegram');

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent to Telegram' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in send-telegram-message function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
