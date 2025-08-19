import { useState } from "react";
import {
  Search,
  Download,
  Copy,
  Play,
  Star,
  GitBranch,
  Clock,
  Settings,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Workflow {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "GitHub Actions" | "Docker Compose" | "n8n" | "CI/CD" | "Automation";
  language: string;
  complexity: "Simple" | "Moderate" | "Complex";
  estimatedTime: string;
  rating: number;
  downloads: number;
  lastUpdated: string;
  tags: string[];
  config: string;
}

const workflows: Workflow[] = [
  {
    id: "1",
    title: "React CI/CD Pipeline",
    description:
      "Complete CI/CD pipeline for React applications with testing, building, and deployment",
    category: "Frontend",
    type: "GitHub Actions",
    language: "YAML",
    complexity: "Moderate",
    estimatedTime: "15 min",
    rating: 4.8,
    downloads: 1250,
    lastUpdated: "2024-01-15",
    tags: ["React", "CI/CD", "Testing", "Deployment"],
    config: `name: React CI/CD
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run test
    - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to production
      run: |
        echo "Deploying to production"
        # Add your deployment commands here`,
  },
  {
    id: "2",
    title: "Full Stack Development Environment",
    description:
      "Docker Compose setup for full-stack development with React, Node.js, PostgreSQL, and Redis",
    category: "Full Stack",
    type: "Docker Compose",
    language: "YAML",
    complexity: "Complex",
    estimatedTime: "30 min",
    rating: 4.9,
    downloads: 890,
    lastUpdated: "2024-01-12",
    tags: ["Docker", "PostgreSQL", "Redis", "Node.js", "React"],
    config: `version: '3.8'
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/myapp
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./backend:/app
      - /app/node_modules
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:`,
  },
  {
    id: "3",
    title: "API Monitoring & Alerting",
    description:
      "Automated monitoring setup for REST APIs with health checks and Slack notifications",
    category: "DevOps",
    type: "n8n",
    language: "JSON",
    complexity: "Moderate",
    estimatedTime: "20 min",
    rating: 4.6,
    downloads: 654,
    lastUpdated: "2024-01-10",
    tags: ["Monitoring", "API", "Alerts", "Slack"],
    config: `{
  "name": "API Health Monitor",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "minutes",
              "minutesInterval": 5
            }
          ]
        }
      },
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "url": "https://api.example.com/health",
        "options": {
          "timeout": 10000
        }
      },
      "name": "Health Check",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [450, 300]
    },
    {
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{$node[\\"Health Check\\"].json.status}}",
              "value2": "ok"
            }
          ]
        }
      },
      "name": "Check Status",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "channel": "#alerts",
        "text": "🚨 API Health Check Failed!",
        "attachments": [
          {
            "color": "danger",
            "title": "API Status Alert",
            "text": "The API health check has failed. Please investigate immediately."
          }
        ]
      },
      "name": "Slack Alert",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 1,
      "position": [850, 400]
    }
  ],
  "connections": {
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Health Check",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Health Check": {
      "main": [
        [
          {
            "node": "Check Status",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Check Status": {
      "main": [
        [],
        [
          {
            "node": "Slack Alert",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}`,
  },
  {
    id: "4",
    title: "Database Backup Automation",
    description:
      "Automated PostgreSQL backup script with S3 upload and retention policy",
    category: "Database",
    type: "Automation",
    language: "Bash",
    complexity: "Simple",
    estimatedTime: "10 min",
    rating: 4.7,
    downloads: 432,
    lastUpdated: "2024-01-08",
    tags: ["PostgreSQL", "Backup", "S3", "Automation"],
    config: `#!/bin/bash

# Database backup script with S3 upload
# Configure these variables
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="myapp"
DB_USER="postgres"
S3_BUCKET="my-backups"
RETENTION_DAYS=7

# Generate timestamp
TIMESTAMP=\\$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="backup_\${DB_NAME}_\${TIMESTAMP}.sql"

echo "Starting database backup..."

# Create backup
pg_dump -h \\$DB_HOST -p \\$DB_PORT -U \\$DB_USER -d \\$DB_NAME > \\$BACKUP_FILE

# Compress backup
gzip \\$BACKUP_FILE
BACKUP_FILE="\${BACKUP_FILE}.gz"

# Upload to S3
aws s3 cp \\$BACKUP_FILE s3://\\$S3_BUCKET/database-backups/

# Clean up local file
rm \\$BACKUP_FILE

# Remove old backups from S3
aws s3 ls s3://\\$S3_BUCKET/database-backups/ | while read -r line; do
  createDate=\\$(echo \\$line | awk '{print \\$1" "\\$2}')
  createDate=\\$(date -d "\\$createDate" +%s)
  olderThan=\\$(date -d "\\$RETENTION_DAYS days ago" +%s)
  if [[ \\$createDate -lt \\$olderThan ]]; then
    fileName=\\$(echo \\$line | awk '{print \\$4}')
    if [[ \\$fileName != "" ]]; then
      aws s3 rm s3://\\$S3_BUCKET/database-backups/\\$fileName
    fi
  fi
done

echo "Backup completed successfully!"`,
  },
  {
    id: "5",
    title: "Kubernetes Deployment Pipeline",
    description:
      "Complete Kubernetes deployment pipeline with staging and production environments",
    category: "DevOps",
    type: "CI/CD",
    language: "YAML",
    complexity: "Complex",
    estimatedTime: "45 min",
    rating: 4.8,
    downloads: 567,
    lastUpdated: "2024-01-05",
    tags: ["Kubernetes", "Deployment", "Production", "Staging"],
    config: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          limits:
            cpu: 500m
            memory: 512Mi
          requests:
            cpu: 250m
            memory: 256Mi
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: myapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer`,
  },
];

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "DevOps",
  "Database",
  "Mobile",
];

export default function Workflows() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const types = [
    "All",
    "GitHub Actions",
    "Docker Compose",
    "n8n",
    "CI/CD",
    "Automation",
  ];

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || workflow.category === selectedCategory;
    const matchesType =
      selectedType === "All" || workflow.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const copyToClipboard = (config: string) => {
    navigator.clipboard.writeText(config);
  };

  const downloadWorkflow = (workflow: Workflow) => {
    const blob = new Blob([workflow.config], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${workflow.title
      .replace(/\s+/g, "-")
      .toLowerCase()}.${workflow.language.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Simple":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Moderate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Complex":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "GitHub Actions":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Docker Compose":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "n8n":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      case "CI/CD":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Automation":
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workflow Templates</h1>
          <p className="text-muted-foreground">
            Ready-to-use templates for CI/CD, automation, and development
            workflows
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workflows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {workflows.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Templates</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {categories.length - 1}
            </div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {workflows.reduce((sum, w) => sum + w.downloads, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Downloads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {(
                workflows.reduce((sum, w) => sum + w.rating, 0) /
                workflows.length
              ).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWorkflows.map((workflow) => (
          <Card
            key={workflow.id}
            className="group hover:shadow-lg transition-all duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {workflow.title}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {workflow.description}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Badge className={getTypeColor(workflow.type)}>
                    {workflow.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Metadata */}
              <div className="flex flex-wrap gap-2">
                <Badge className={getComplexityColor(workflow.complexity)}>
                  {workflow.complexity}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {workflow.estimatedTime}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <GitBranch className="h-3 w-3 mr-1" />
                  {workflow.language}
                </Badge>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {workflow.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Config Preview */}
              <div className="p-3 bg-muted/30 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Configuration Preview
                  </span>
                </div>
                <pre className="text-xs text-muted-foreground font-mono overflow-hidden line-clamp-4">
                  {workflow.config.substring(0, 200)}...
                </pre>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{workflow.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {workflow.downloads} downloads
                  </span>
                </div>
                <span className="text-muted-foreground">
                  Updated {new Date(workflow.lastUpdated).toLocaleDateString()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(workflow.config)}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadWorkflow(workflow)}
                  className="flex-1"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="default" size="sm">
                  <Play className="h-4 w-4" />
                  Deploy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            No workflows found matching your criteria.
          </div>
        </div>
      )}
    </div>
  );
}
