import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";

export const Contact = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([]);
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const { toast } = useToast();

  // Load existing messages on mount
  useEffect(() => {
    const loadMessages = async () => {
      // Create a Supabase client with session header
      const supabaseWithSession = createClient(
        'https://nwjhgteqoohsniugodyn.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53amhndGVxb29oc25pdWdvZHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMDM1MzksImV4cCI6MjA3Mzc3OTUzOX0._8EqEHSX6H-9-n5idx7VqsRtN2uWvwqDlbBEpW9ioTE',
        {
          global: {
            headers: {
              'x-session-id': sessionId
            }
          }
        }
      );

      const { data, error } = await supabaseWithSession
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      if (data) {
        setChatMessages(data.map(msg => ({
          text: msg.text,
          sender: msg.sender as 'user' | 'bot'
        })));
      }
    };

    loadMessages();

    // Subscribe to new messages with session header
    const supabaseWithSession = createClient(
      'https://nwjhgteqoohsniugodyn.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53amhndGVxb29oc25pdWdvZHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMDM1MzksImV4cCI6MjA3Mzc3OTUzOX0._8EqEHSX6H-9-n5idx7VqsRtN2uWvwqDlbBEpW9ioTE',
      {
        global: {
          headers: {
            'x-session-id': sessionId
          }
        }
      }
    );

    const channel = supabaseWithSession
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          console.log('New message received:', payload);
          setChatMessages(prev => [...prev, {
            text: payload.new.text,
            sender: payload.new.sender as 'user' | 'bot'
          }]);
        }
      )
      .subscribe();

    return () => {
      supabaseWithSession.removeChannel(channel);
    };
  }, [sessionId]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite uma mensagem.",
        variant: "destructive"
      });
      return;
    }

    if (chatMessage.trim().length > 1000) {
      toast({
        title: "Erro",
        description: "A mensagem não pode ter mais de 1000 caracteres.",
        variant: "destructive"
      });
      return;
    }

    const userMessage = chatMessage.trim();
    setChatMessage("");

    try {
      console.log("Sending message to Telegram:", userMessage);
      
      const response = await fetch('https://nwjhgteqoohsniugodyn.supabase.co/functions/v1/send-telegram-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: userMessage,
          session_id: sessionId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error sending to Telegram:", errorData);
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      console.log("Message sent successfully:", data);
      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi enviada. Responderemos em breve.",
      });
    } catch (error) {
      console.error("Error in handleChatSubmit:", error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar a mensagem. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide">
              <span className="gradient-text">Contato</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Conversas confidenciais para discussão de mandatos e soluções jurídicas customizadas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-light text-foreground">Email</h3>
                    <p className="text-muted-foreground text-sm">contato@advogado.advs.br</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-light text-foreground">Telefone</h3>
                    <p className="text-muted-foreground text-sm">+55 (11) 3000-0000</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-light text-foreground">Localização</h3>
                    <p className="text-muted-foreground text-sm">São Paulo, Brasil</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Form */}
              <Card className="card-gradient shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Discutir seu caso confidencialmente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Seu nome" />
                  <Input placeholder="Seu email" type="email" />
                  <Textarea placeholder="Sua mensagem" rows={4} />
                  <Button className="w-full bg-primary hover:bg-primary/90 transition-smooth">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <Card className="card-gradient shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Fale agora
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Resposta no mesmo dia útil neste Telegram
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Chat Messages */}
                  <div className="h-64 bg-muted/30 rounded-lg p-4 overflow-y-auto">
                    {chatMessages.length === 0 ? (
                      <p className="text-muted-foreground text-center mt-20">
                        Inicie uma conversa...
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {chatMessages.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs px-4 py-2 rounded-lg ${
                                msg.sender === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-card text-card-foreground shadow-card'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center">
                    O atendimento completo ocorre por meio do sistema interno de mensagens.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
