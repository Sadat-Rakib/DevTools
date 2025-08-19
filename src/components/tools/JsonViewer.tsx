import { useState } from "react";
import { Copy, Download, RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function JsonViewer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Invalid JSON'}`);
      setIsValid(false);
    }
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "JSON has been copied to clipboard",
      });
    }
  };

  const downloadJson = () => {
    if (output && isValid) {
      const blob = new Blob([output], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "formatted.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setIsValid(null);
  };

  const loadSample = () => {
    const sample = {
      "name": "DevTools",
      "version": "1.0.0",
      "features": ["JSON Viewer", "Base64 Converter", "Hash Generator"],
      "config": {
        "theme": "dark",
        "autoFormat": true,
        "metadata": {
          "created": "2024-01-15",
          "author": "Developer"
        }
      }
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">JSON Viewer & Formatter</h1>
          <p className="text-muted-foreground mt-2">
            Format, validate, and beautify JSON data with syntax highlighting
          </p>
        </div>
        <div className="flex gap-2">
          {isValid !== null && (
            <Badge variant={isValid ? "default" : "destructive"}>
              {isValid ? "Valid JSON" : "Invalid JSON"}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card className="tool-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Input JSON
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="tool-input h-64 resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={formatJson} className="flex-1">
                Format JSON
              </Button>
              <Button variant="outline" onClick={loadSample}>
                Sample
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="tool-card">
          <CardHeader>
            <CardTitle>Formatted Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={output}
              readOnly
              className="tool-output h-64"
              placeholder="Formatted JSON will appear here..."
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                disabled={!output}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button
                variant="outline"
                onClick={downloadJson}
                disabled={!output || !isValid}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={clear}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}