import { AssetsLibrary } from '@/components/assets/AssetsLibrary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AssetsLibraryPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Archive className="h-8 w-8 text-primary" />
            Assets Library
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload, manage, and organize your project assets with cloud storage
          </p>
        </div>
      </div>

      <AssetsLibrary />
    </div>
  );
}