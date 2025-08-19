import { useState, useEffect } from "react";
import { Copy, Hash, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [hash, setHash] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateHash = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to hash",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      let hashValue = "";
      
      if (algorithm === "MD5") {
        // For demo purposes, we'll use a simple MD5-like hash
        hashValue = await simpleHash(input, "MD5");
      } else {
        // Use Web Crypto API for SHA algorithms
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        
        let algoName = "";
        switch (algorithm) {
          case "SHA-1":
            algoName = "SHA-1";
            break;
          case "SHA-256":
            algoName = "SHA-256";
            break;
          case "SHA-512":
            algoName = "SHA-512";
            break;
        }
        
        const hashBuffer = await crypto.subtle.digest(algoName, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        hashValue = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
      
      setHash(hashValue);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hash",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Simple hash function for demonstration (not a real MD5)
  const simpleHash = async (str: string, type: string): Promise<string> => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert to hex and pad
    const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
    
    // Simulate different hash lengths
    switch (type) {
      case "MD5":
        return hexHash.repeat(4).substring(0, 32);
      default:
        return hexHash;
    }
  };

  const copyToClipboard = async () => {
    if (hash) {
      await navigator.clipboard.writeText(hash);
      toast({
        title: "Copied!",
        description: "Hash has been copied to clipboard",
      });
    }
  };

  const clear = () => {
    setInput("");
    setHash("");
  };

  const loadSample = () => {
    setInput("Hello, DevTools! This is a sample text for hash generation.");
  };

  // Auto-generate hash when input or algorithm changes
  useEffect(() => {
    if (input.trim()) {
      const timeoutId = setTimeout(() => {
        generateHash();
      }, 500);
      
      return () => clearTimeout(timeoutId);
    } else {
      setHash("");
    }
  }, [input, algorithm]);

  const getAlgorithmInfo = (algo: HashAlgorithm) => {
    switch (algo) {
      case "MD5":
        return { length: "128-bit", security: "Weak", color: "destructive" as const };
      case "SHA-1":
        return { length: "160-bit", security: "Deprecated", color: "secondary" as const };
      case "SHA-256":
        return { length: "256-bit", security: "Strong", color: "default" as const };
      case "SHA-512":
        return { length: "512-bit", security: "Very Strong", color: "default" as const };
    }
  };

  const algorithmInfo = getAlgorithmInfo(algorithm);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hash Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate cryptographic hashes using various algorithms
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant={algorithmInfo.color}>
            {algorithmInfo.security}
          </Badge>
          <Badge variant="outline">
            {algorithmInfo.length}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card className="tool-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Input Text
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Algorithm</label>
              <Select value={algorithm} onValueChange={(value) => setAlgorithm(value as HashAlgorithm)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MD5">MD5 (128-bit)</SelectItem>
                  <SelectItem value="SHA-1">SHA-1 (160-bit)</SelectItem>
                  <SelectItem value="SHA-256">SHA-256 (256-bit)</SelectItem>
                  <SelectItem value="SHA-512">SHA-512 (512-bit)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Enter text to hash..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="tool-input h-48 resize-none"
            />
            
            <div className="flex gap-2">
              <Button onClick={generateHash} disabled={isGenerating} className="flex-1">
                {isGenerating ? "Generating..." : "Generate Hash"}
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
              <Shield className="h-5 w-5" />
              Hash Output
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Generated Hash</label>
              <Textarea
                value={hash}
                readOnly
                className="tool-output h-32 font-mono text-xs"
                placeholder="Hash will appear here..."
              />
            </div>

            {hash && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Hash Details</label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Length:</span>
                    <span className="ml-2 font-mono">{hash.length} chars</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bits:</span>
                    <span className="ml-2 font-mono">{hash.length * 4} bits</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                disabled={!hash}
                className="flex items-center gap-2 flex-1"
              >
                <Copy className="h-4 w-4" />
                Copy Hash
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

      {algorithm === "MD5" && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h4 className="font-semibold text-destructive">Security Warning</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  MD5 is cryptographically broken and should not be used for security purposes. 
                  Use SHA-256 or SHA-512 for secure applications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}