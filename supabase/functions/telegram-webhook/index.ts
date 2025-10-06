import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const update = await req.json();
    console.log("Received Telegram update:", JSON.stringify(update));

    // Check if message exists and has text
    if (!update.message?.text) {
      console.log("No text message found in update");
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const messageText = update.message.text;
    const chatId = update.message.chat.id.toString();

    console.log(`Processing message from chat ${chatId}: ${messageText}`);

    // Insert message into database as bot message
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        text: messageText,
        sender: 'bot',
        session_id: chatId
      });

    if (error) {
      console.error("Error inserting message:", error);
      throw error;
    }

    console.log("Message inserted successfully:", data);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in telegram-webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
