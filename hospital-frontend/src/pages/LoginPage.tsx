import { LoginPageFeature } from '../features/auth/LoginPage'; // Ensure this matches your filename
import type { User } from '../types';

interface LoginPageProps {
 onLoginSuccess: (u: User) => void;
}

/**
 * LoginPage: The primary route entry point.
 * This component wraps the Feature logic to keep the 'pages' directory clean.
 */
export const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
 return (
 <div className="animate-in fade-in duration-1000">
 <LoginPageFeature onLoginSuccess={onLoginSuccess} />
 </div>
 );
};