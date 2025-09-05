import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  Image, 
  FileText, 
  Video, 
  Music, 
  Archive, 
  Download, 
  Trash2, 
  Eye,
  Search,
  Filter,
  Plus,
  FolderPlus,
  ExternalLink,
  Copy
} from 'lucide-react';
import { useDemo } from '@/contexts/DemoContext';
import { toast } from 'sonner';

interface Asset {
  id: string;
  filename: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  category: string;
  folder_path?: string;
  s3_key: string;
  is_public: boolean;
  metadata?: any;
  created_at: string;
}

const ASSET_CATEGORIES = [
  { value: 'images', label: 'Images', icon: Image },
  { value: 'documents', label: 'Documents', icon: FileText },
  { value: 'videos', label: 'Videos', icon: Video },
  { value: 'audio', label: 'Audio', icon: Music },
  { value: 'archives', label: 'Archives', icon: Archive },
  { value: 'other', label: 'Other', icon: FileText }
];

export function AssetsLibrary() {
  const { user } = useDemo();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [newFolder, setNewFolder] = useState('');

  useEffect(() => {
    if (user) {
      fetchAssets();
    }
  }, [user]);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast.error('Failed to load assets');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || !user) return;

    setUploading(true);
    
    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', getCategoryFromMimeType(file.type));
        formData.append('folder_path', newFolder || 'uploads');

        const { data, error } = await supabase.functions.invoke('upload-asset', {
          body: formData
        });

        if (error) throw error;
        
        toast.success(`${file.name} uploaded successfully!`);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    await fetchAssets();
  };

  const getCategoryFromMimeType = (mimeType: string): string => {
    if (mimeType.startsWith('image/')) return 'images';
    if (mimeType.startsWith('video/')) return 'videos';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar')) return 'archives';
    if (mimeType.includes('pdf') || mimeType.includes('doc') || mimeType.includes('text')) return 'documents';
    return 'other';
  };

  const deleteAsset = async (assetId: string) => {
    try {
      const { error } = await supabase.functions.invoke('delete-asset', {
        body: { assetId }
      });

      if (error) throw error;

      toast.success('Asset deleted successfully!');
      await fetchAssets();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete asset');
    }
  };

  const copyAssetUrl = (asset: Asset) => {
    const url = `https://vqgflhkrcjgbmedeecog.supabase.co/storage/v1/object/public/assets/${asset.s3_key}`;
    navigator.clipboard.writeText(url);
    toast.success('Asset URL copied to clipboard!');
  };

  const downloadAsset = (asset: Asset) => {
    const url = `https://vqgflhkrcjgbmedeecog.supabase.co/storage/v1/object/public/assets/${asset.s3_key}`;
    window.open(url, '_blank');
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getAssetIcon = (category: string) => {
    const categoryConfig = ASSET_CATEGORIES.find(cat => cat.value === category);
    const IconComponent = categoryConfig?.icon || FileText;
    return <IconComponent className="h-4 w-4" />;
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.original_filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const assetsByCategory = ASSET_CATEGORIES.reduce((acc, category) => {
    acc[category.value] = filteredAssets.filter(asset => asset.category === category.value);
    return acc;
  }, {} as Record<string, Asset[]>);

  if (!user) {
    return (
      <Card className="glass">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
          <p className="text-muted-foreground text-center">
            Please sign in to access your assets library.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Assets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="folder-path">Folder Path (Optional)</Label>
              <Input
                id="folder-path"
                placeholder="e.g., images/profile, documents/legal"
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Upload Files</Label>
              <Input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                disabled={uploading}
                className="cursor-pointer"
              />
            </div>
          </div>
          
          {uploading && (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span className="text-sm text-muted-foreground">Uploading files...</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assets Management */}
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Assets Library
            <Badge variant="secondary">{filteredAssets.length} files</Badge>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {ASSET_CATEGORIES.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading assets...</p>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Assets Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || categoryFilter !== 'all' 
                  ? 'No assets match your current filters.'
                  : 'Upload your first asset to get started.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {ASSET_CATEGORIES.map(category => {
                const categoryAssets = assetsByCategory[category.value];
                if (categoryAssets.length === 0) return null;

                return (
                  <div key={category.value} className="space-y-3">
                    <div className="flex items-center gap-2">
                      {getAssetIcon(category.value)}
                      <h3 className="text-lg font-semibold">{category.label}</h3>
                      <Badge variant="outline">{categoryAssets.length}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryAssets.map((asset) => (
                        <Card key={asset.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium truncate" title={asset.original_filename}>
                                    {asset.original_filename}
                                  </h4>
                                  <p className="text-xs text-muted-foreground">
                                    {formatFileSize(asset.file_size)}
                                  </p>
                                  {asset.folder_path && (
                                    <p className="text-xs text-muted-foreground">
                                      📁 {asset.folder_path}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  {asset.is_public && (
                                    <Badge variant="secondary" className="text-xs">Public</Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="flex-1">
                                      <Eye className="h-3 w-3 mr-1" />
                                      View
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>{asset.original_filename}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      {asset.mime_type.startsWith('image/') && (
                                        <img 
                                          src={`https://vqgflhkrcjgbmedeecog.supabase.co/storage/v1/object/public/assets/${asset.s3_key}`}
                                          alt={asset.original_filename}
                                          className="max-w-full h-auto rounded"
                                        />
                                      )}
                                      
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <strong>Size:</strong> {formatFileSize(asset.file_size)}
                                        </div>
                                        <div>
                                          <strong>Type:</strong> {asset.mime_type}
                                        </div>
                                        <div>
                                          <strong>Category:</strong> {asset.category}
                                        </div>
                                        <div>
                                          <strong>Uploaded:</strong> {new Date(asset.created_at).toLocaleDateString()}
                                        </div>
                                      </div>
                                      
                                      <div className="flex gap-2">
                                        <Button onClick={() => downloadAsset(asset)}>
                                          <Download className="h-4 w-4 mr-2" />
                                          Download
                                        </Button>
                                        <Button variant="outline" onClick={() => copyAssetUrl(asset)}>
                                          <Copy className="h-4 w-4 mr-2" />
                                          Copy URL
                                        </Button>
                                        <Button variant="outline" onClick={() => window.open(`https://vqgflhkrcjgbmedeecog.supabase.co/storage/v1/object/public/assets/${asset.s3_key}`, '_blank')}>
                                          <ExternalLink className="h-4 w-4 mr-2" />
                                          Open
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => copyAssetUrl(asset)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => deleteAsset(asset.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}