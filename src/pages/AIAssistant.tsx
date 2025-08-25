import { AIAssistant } from '@/components/ai/AIAssistant';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            AI Development Assistant
          </h1>
          <p className="text-muted-foreground mt-1">
            Get help with coding, debugging, and development questions
          </p>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
}