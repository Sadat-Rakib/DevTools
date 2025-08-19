import { useState } from "react";
import { Copy, ArrowUpDown, RotateCcw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export function Base64Converter() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { toast } = useToast();

  const encodeToBase64 = () => {
    try {
      const encoded = btoa(text);
      setBase64(encoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text to Base64",
        variant: "destructive",
      });
    }
  };

  const decodeFromBase64 = () => {
    try {
      const decoded = atob(base64);
      setText(decoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 string",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (content: string) => {
    if (content) {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Content has been copied to clipboard",
      });
    }
  };

  const clear = () => {
    setText("");
    setBase64("");
  };

  const loadSample = () => {
    if (mode === "encode") {
      setText("Hello, DevTools! This is a sample text for Base64 encoding.");
    } else {
      setBase64("SGVsbG8sIERldlRvb2xzISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4=");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Base64 Converter</h1>
          <p className="text-muted-foreground mt-2">
            Encode text to Base64 or decode Base64 to text
          </p>
        </div>
      </div>

      <Tabs value={mode} onValueChange={(value) => setMode(value as "encode" | "decode")} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode to Base64</TabsTrigger>
          <TabsTrigger value="decode">Decode from Base64</TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input */}
            <Card className="tool-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Plain Text
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text to encode..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="tool-input h-48 resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={encodeToBase64} className="flex-1">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Encode
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
                <CardTitle>Base64 Output</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={base64}
                  readOnly
                  className="tool-output h-48"
                  placeholder="Base64 encoded text will appear here..."
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(base64)}
                    disabled={!base64}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
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
        </TabsContent>

        <TabsContent value="decode" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input */}
            <Card className="tool-card">
              <CardHeader>
                <CardTitle>Base64 Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter Base64 to decode..."
                  value={base64}
                  onChange={(e) => setBase64(e.target.value)}
                  className="tool-input h-48 resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={decodeFromBase64} className="flex-1">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Decode
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
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Decoded Text
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={text}
                  readOnly
                  className="tool-output h-48"
                  placeholder="Decoded text will appear here..."
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(text)}
                    disabled={!text}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
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
        </TabsContent>
      </Tabs>
    </div>
  );
}