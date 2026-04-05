import * as React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail, User, Loader2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

// API Utility
import api from '../../lib/api'; 

// UI Components
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";

import type { User as UserType } from '../../types';

interface LoginPageProps {
  onLoginSuccess: (u: UserType) => void;
}

export const LoginPageFeature = ({ onLoginSuccess }: LoginPageProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Determine Endpoint based on toggle
      const endpoint = isRegistering ? '/auth/register' : '/auth/login';
      const payload = isRegistering ? { name, email, password, role: 'Hospital Admin' } : { email, password };

      // 2. Real Backend Request
      const response = await api.post(endpoint, payload);
      
      // 3. Extract Token and User from Node.js Response
      const { token, user } = response.data;

      // 4. Secure Handshake - Store Token
      localStorage.setItem('token', token);
      
      // 5. Update Global App State
      onLoginSuccess(user);
      navigate('/dashboard');
      
    } catch (err: unknown) {
      // Handle "Unauthorized" or "Server Down" errors
      let message = "Uplink Failed: Check Credentials";

      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        if (typeof response?.data?.message === "string") {
          message = response.data.message;
        }
      }

      setError(message);
      console.error("❌ Auth Error:", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden transition-colors duration-500 font-sans text-left">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />

      <Card className="w-full max-w-md z-10 rounded-[3rem] border-white/20 bg-card/40 backdrop-blur-3xl shadow-2xl shadow-blue-900/10 overflow-hidden transition-all duration-500">
        <CardHeader className="text-center pt-10 pb-6">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/40 transition-all" />
              <div className="relative p-5 bg-primary rounded-2xl shadow-xl shadow-primary/30 transition-transform group-hover:scale-105">
                {isRegistering ? <ShieldCheck size={36} className="text-white" /> : <Activity size={36} className="text-white" />}
              </div>
            </div>
          </div>
          <CardTitle className="text-4xl font-black text-foreground tracking-tighter uppercase leading-none italic">
            {isRegistering ? 'Admin Setup' : 'Staff Portal'}
          </CardTitle>
          <CardDescription className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mt-4">
            Authorized Personnel Only
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10 pb-10">
          {/* Error Alert Display */}
          {error && (
            <Alert variant="destructive" className="mb-6 rounded-2xl bg-red-500/10 border-red-500/20 text-red-500 animate-in fade-in zoom-in duration-300">
              <AlertCircle size={16} />
              <AlertDescription className="text-[10px] font-black uppercase tracking-widest ml-2">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleAuth} className="space-y-6">
            {isRegistering && (
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Admin Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors z-10" size={18} />
                  <Input 
                    required 
                    placeholder="Full Name" 
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 pl-12 rounded-2xl bg-white/50 dark:bg-slate-800/50 border-border/40 focus-visible:ring-primary/20"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors z-10" size={18} />
                <Input 
                  type="email" 
                  required 
                  placeholder="admin@hospital.lk" 
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 rounded-2xl bg-white/50 dark:bg-slate-800/50 border-border/40 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Access Key</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors z-10" size={18} />
                <Input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pl-12 rounded-2xl bg-white/50 dark:bg-slate-800/50 border-border/40 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-16 rounded-2xl text-md font-black uppercase tracking-widest transition-all group shadow-xl shadow-primary/20"
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <Loader2 className="animate-spin" size={20} /> Authorizing...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  {isRegistering ? 'Register Admin' : 'Authorize Login'}
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-6 border-t border-border/30 text-center">
             <button 
               type="button"
               onClick={() => {
                 setIsRegistering(!isRegistering);
                 setError(null);
               }}
               className="text-primary/60 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors"
             >
               {isRegistering ? 'Back to Login' : 'System Setup? Request Access'}
             </button>
          </div>
        </CardContent>
      </Card>

      <div className="absolute bottom-6 text-center opacity-20 italic">
          <p className="text-[9px] font-black tracking-[0.4em] uppercase">MediFlow Intelligence • ITBIN-2211-0249</p>
      </div>
    </div>
  );
};