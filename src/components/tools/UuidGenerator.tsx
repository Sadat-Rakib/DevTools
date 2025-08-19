import { useState } from "react";
import { Copy, RefreshCw, List, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function UuidGenerator() {
  const [uuid, setUuid] = useState("");
  const [uuidHistory, setUuidHistory] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const { toast } = useToast();

  const generateUuid = () => {
    // Simple UUID v4 generator
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    
    setUuid(uuid);
    setUuidHistory(prev => [uuid, ...prev.slice(0, 9)]); // Keep last 10
  };

  const generateMultiple = () => {
    const uuids: string[] = [];
    for (let i = 0; i < count; i++) {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      uuids.push(uuid);
    }
    
    const result = uuids.join('\n');
    setUuid(result);
    setUuidHistory(prev => [...uuids, ...prev].slice(0, 10));
  };

  const copyToClipboard = async (content: string) => {
    if (content) {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "UUID has been copied to clipboard",
      });
    }
  };

  const copyHistory = async () => {
    if (uuidHistory.length > 0) {
      await navigator.clipboard.writeText(uuidHistory.join('\n'));
      toast({
        title: "Copied!",
        description: "UUID history has been copied to clipboard",
      });
    }
  };

  const clearHistory = () => {
    setUuidHistory([]);
    setUuid("");
  };

  // Generate initial UUID on mount
  useState(() => {
    generateUuid();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">UUID Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate universally unique identifiers (UUIDs) version 4
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Lock className="h-3 w-3" />
          UUID v4
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Generator */}
        <Card className="tool-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              UUID Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Generated UUID</label>
              <div className="flex gap-2">
                <Input
                  value={uuid}
                  readOnly
                  className="font-mono text-sm"
                  placeholder="Click generate to create UUID..."
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(uuid)}
                  disabled={!uuid}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateUuid} className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate UUID
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bulk Generation</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  min="1"
                  max="100"
                  className="w-20"
                />
                <Button onClick={generateMultiple} variant="outline" className="flex-1">
                  Generate {count} UUIDs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="tool-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5" />
                History
              </div>
              <Badge variant="secondary">{uuidHistory.length}/10</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {uuidHistory.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No UUIDs generated yet
                </p>
              ) : (
                uuidHistory.map((id, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <code className="font-mono text-xs flex-1 truncate">{id}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(id)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={copyHistory}
                disabled={uuidHistory.length === 0}
                className="flex items-center gap-2 flex-1"
              >
                <Copy className="h-4 w-4" />
                Copy All
              </Button>
              <Button
                variant="outline"
                onClick={clearHistory}
                disabled={uuidHistory.length === 0}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}