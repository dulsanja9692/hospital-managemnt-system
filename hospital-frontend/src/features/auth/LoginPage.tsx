/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail, Loader2, ArrowRight, AlertCircle } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Always call the real backend — no mocks or fallbacks
      const response = await api.post('/auth/login', { email, password });

      // Backend returns: { data: { accessToken, user } }
      const { accessToken, user } = response.data.data || response.data;

      if (!accessToken) {
        throw new Error('No access token received from server.');
      }

      // Persist token
      localStorage.setItem('token', accessToken);

      // Update global auth state
      onLoginSuccess(user);

      setError(null);
      navigate('/dashboard');
    } catch (err: any) {
      let message = 'Login failed. Please check your credentials.';
      if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden transition-colors duration-500 font-sans text-left">

      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400/10 blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md z-10 border-border bg-card overflow-hidden transition-all duration-500 border">
        <CardHeader className="text-center pt-10 pb-6">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-2xl group-hover:bg-primary/40 transition-all" />
              <div className="relative p-5 bg-primary transition-transform group-hover:scale-105">
                <Activity size={36} className="text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl text-foreground uppercase leading-none">
            Staff Portal
          </CardTitle>
          <CardDescription className="text-[10px] uppercase text-muted-foreground mt-4">
            Authorized Personnel Only
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10 pb-10">
          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/20 text-red-500 animate-in fade-in zoom-in duration-300">
              <AlertCircle size={16} />
              <AlertDescription className="text-[10px] uppercase ml-2">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase text-muted-foreground ml-1">
                Email Address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors z-10" size={18} />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@hospital.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 bg-card border-border focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] uppercase text-muted-foreground ml-1">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors z-10" size={18} />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pl-12 bg-card border-border focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 text-md uppercase transition-all group"
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <Loader2 className="animate-spin" size={20} /> Authorizing...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  Authorize Login
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="absolute bottom-6 text-center opacity-20">
        <p className="text-[9px] uppercase">MediFlow • ITBIN-2211-0249</p>
      </div>
    </div>
  );
};