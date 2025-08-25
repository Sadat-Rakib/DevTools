import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Clock, CalendarDays, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [humanDate, setHumanDate] = useState('');
  
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const currentDate = new Date();

  const convertToHuman = () => {
    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        toast.error('Please enter a valid timestamp');
        return;
      }
      
      // Handle both seconds and milliseconds
      const date = ts.toString().length === 10 ? new Date(ts * 1000) : new Date(ts);
      setHumanDate(date.toISOString());
    } catch (error) {
      toast.error('Invalid timestamp format');
    }
  };

  const convertToTimestamp = () => {
    try {
      const date = new Date(humanDate);
      if (isNaN(date.getTime())) {
        toast.error('Please enter a valid date');
        return;
      }
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    } catch (error) {
      toast.error('Invalid date format');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const useCurrentTime = () => {
    setTimestamp(currentTimestamp.toString());
    setHumanDate(currentDate.toISOString());
  };

  const clearAll = () => {
    setTimestamp('');
    setHumanDate('');
  };

  return (
    <div className="space-y-6">
      {/* Current Time Display */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Current Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Unix Timestamp</Label>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-lg font-mono px-3 py-2 flex-1">
                  {currentTimestamp}
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(currentTimestamp.toString(), 'Current timestamp')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>ISO 8601</Label>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm font-mono px-3 py-2 flex-1">
                  {currentDate.toISOString()}
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(currentDate.toISOString(), 'Current date')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Tools */}
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Timestamp Converter
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={useCurrentTime}>
              <Clock className="h-4 w-4 mr-2" />
              Use Current
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timestamp to Human */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timestamp">Unix Timestamp</Label>
              <div className="flex gap-2">
                <Input
                  id="timestamp"
                  placeholder="1640995200 or 1640995200000"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  className="font-mono"
                />
                <Button onClick={convertToHuman}>
                  Convert
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Supports both seconds (10 digits) and milliseconds (13 digits)
              </p>
            </div>
          </div>

          <Separator />

          {/* Human to Timestamp */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="human-date">Human Readable Date</Label>
              <div className="flex gap-2">
                <Input
                  id="human-date"
                  type="datetime-local"
                  value={humanDate.slice(0, 19)}
                  onChange={(e) => setHumanDate(e.target.value + '.000Z')}
                />
                <Button onClick={convertToTimestamp}>
                  Convert
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Select date and time to convert to timestamp
              </p>
            </div>
          </div>

          {/* Results */}
          {(timestamp || humanDate) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium">Conversion Results</h3>
                
                {timestamp && (
                  <div className="space-y-2">
                    <Label>Formatted Dates</Label>
                    <div className="space-y-2">
                      {(() => {
                        try {
                          const ts = parseInt(timestamp);
                          const date = ts.toString().length === 10 ? new Date(ts * 1000) : new Date(ts);
                          
                          if (isNaN(date.getTime())) return <p className="text-destructive">Invalid timestamp</p>;
                          
                          const formats = [
                            { label: 'ISO 8601', value: date.toISOString() },
                            { label: 'UTC String', value: date.toUTCString() },
                            { label: 'Local String', value: date.toString() },
                            { label: 'Date Only', value: date.toDateString() },
                            { label: 'Time Only', value: date.toTimeString() }
                          ];
                          
                          return formats.map((format) => (
                            <div key={format.label} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <span className="text-sm font-medium">{format.label}:</span>
                              <div className="flex items-center gap-2">
                                <code className="text-sm">{format.value}</code>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => copyToClipboard(format.value, format.label)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ));
                        } catch {
                          return <p className="text-destructive">Invalid timestamp</p>;
                        }
                      })()}
                    </div>
                  </div>
                )}
                
                {humanDate && (
                  <div className="space-y-2">
                    <Label>Timestamp Formats</Label>
                    <div className="space-y-2">
                      {(() => {
                        try {
                          const date = new Date(humanDate);
                          if (isNaN(date.getTime())) return <p className="text-destructive">Invalid date</p>;
                          
                          const timestamps = [
                            { label: 'Seconds', value: Math.floor(date.getTime() / 1000).toString() },
                            { label: 'Milliseconds', value: date.getTime().toString() },
                            { label: 'Microseconds', value: (date.getTime() * 1000).toString() },
                            { label: 'Nanoseconds', value: (date.getTime() * 1000000).toString() }
                          ];
                          
                          return timestamps.map((ts) => (
                            <div key={ts.label} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <span className="text-sm font-medium">{ts.label}:</span>
                              <div className="flex items-center gap-2">
                                <code className="text-sm font-mono">{ts.value}</code>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => copyToClipboard(ts.value, `${ts.label} timestamp`)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ));
                        } catch {
                          return <p className="text-destructive">Invalid date</p>;
                        }
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}