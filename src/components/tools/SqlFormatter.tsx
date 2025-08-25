import { useState } from "react";
import { Copy, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatSql = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some SQL to format",
        variant: "destructive",
      });
      return;
    }

    try {
      // Basic SQL formatting - split by keywords and add proper indentation
      const keywords = [
        'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
        'ORDER BY', 'GROUP BY', 'HAVING', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 
        'DROP', 'ALTER', 'AND', 'OR', 'NOT', 'UNION', 'CASE', 'WHEN', 'THEN', 
        'ELSE', 'END', 'AS', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN'
      ];

      let formatted = input
        .replace(/\s+/g, ' ') // normalize whitespace
        .trim();

      // Add line breaks before major keywords
      const majorKeywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'ORDER BY', 'GROUP BY', 'HAVING'];
      majorKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        formatted = formatted.replace(regex, `\n${keyword}`);
      });

      // Add proper indentation
      const lines = formatted.split('\n');
      const formattedLines = lines.map((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return '';
        
        // Main clauses start at column 0
        if (trimmedLine.match(/^(SELECT|FROM|WHERE|ORDER BY|GROUP BY|HAVING|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)/i)) {
          return trimmedLine;
        }
        // JOIN clauses get slight indentation
        else if (trimmedLine.match(/^(INNER JOIN|LEFT JOIN|RIGHT JOIN|JOIN)/i)) {
          return `  ${trimmedLine}`;
        }
        // AND/OR conditions get more indentation
        else if (trimmedLine.match(/^(AND|OR)/i)) {
          return `    ${trimmedLine}`;
        }
        // Everything else gets standard indentation
        else {
          return `  ${trimmedLine}`;
        }
      });

      // Clean up empty lines and format final result
      const result = formattedLines
        .filter(line => line.trim() !== '')
        .join('\n')
        .replace(/,\s*\n/g, ',\n  '); // proper comma placement

      setOutput(result);
      toast({
        title: "Success",
        description: "SQL formatted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to format SQL. Please check your syntax.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Formatted SQL copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">SQL Formatter</h1>
        </div>
        <p className="text-muted-foreground">
          Format and beautify your SQL queries with proper indentation and structure
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Input SQL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your SQL query here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono text-sm min-h-[300px] resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={formatSql} className="flex-1">
                Format SQL
              </Button>
              <Button variant="outline" onClick={clearAll}>
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Formatted SQL
              {output && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="ml-2"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Textarea
                value={output}
                readOnly
                className="font-mono text-sm min-h-[300px] resize-none bg-muted/30"
                placeholder="Formatted SQL will appear here..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Example */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Example</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">Try formatting this example SQL:</p>
          <div className="bg-muted/30 p-3 rounded-lg font-mono text-sm">
            SELECT u.id, u.name, u.email, p.title FROM users u JOIN posts p ON u.id = p.user_id WHERE u.active = true AND p.published = true ORDER BY p.created_at DESC
          </div>
        </CardContent>
      </Card>
    </div>
  );
}