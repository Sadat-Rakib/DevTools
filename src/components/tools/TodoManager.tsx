import { useState, useEffect } from 'react';
import { Plus, CheckSquare, Square, Trash2, Edit, Calendar, Flag, Tag, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDemo } from '@/contexts/DemoContext';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Todo {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  tags?: string[];
  project_id?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface TodoProject {
  id: string;
  name: string;
  description?: string;
  color: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
};

const statusColors = {
  todo: 'bg-gray-500',
  in_progress: 'bg-blue-500',
  done: 'bg-green-500'
};

export function TodoManager() {
  const { user } = useDemo();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [projects, setProjects] = useState<TodoProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    due_date: '',
    tags: [] as string[],
    project_id: ''
  });

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    color: '#3b82f6'
  });

  useEffect(() => {
    if (user) {
      loadTodos();
      loadProjects();
    }
  }, [user]);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos((data || []) as Todo[]);
    } catch (error) {
      console.error('Error loading todos:', error);
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('todo_projects')
        .select('*')
        .eq('is_archived', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    }
  };

  const createTodo = async () => {
    if (!newTodo.title.trim()) return;

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert({
          title: newTodo.title,
          description: newTodo.description || null,
          priority: newTodo.priority,
          due_date: newTodo.due_date || null,
          tags: newTodo.tags.length > 0 ? newTodo.tags : null,
          project_id: newTodo.project_id || null,
          user_id: user!.id,
          order_index: todos.length
        })
        .select()
        .single();

      if (error) throw error;

      setTodos([...todos, data as Todo]);
      setNewTodo({
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
        tags: [],
        project_id: ''
      });
      setIsAddingTodo(false);
      toast.success('Todo created successfully');
    } catch (error) {
      console.error('Error creating todo:', error);
      toast.error('Failed to create todo');
    }
  };

  const createProject = async () => {
    if (!newProject.name.trim()) return;

    try {
      const { data, error } = await supabase
        .from('todo_projects')
        .insert({
          name: newProject.name,
          description: newProject.description || null,
          color: newProject.color,
          user_id: user!.id
        })
        .select()
        .single();

      if (error) throw error;

      setProjects([...projects, data]);
      setNewProject({
        name: '',
        description: '',
        color: '#3b82f6'
      });
      setIsAddingProject(false);
      toast.success('Project created successfully');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, ...updates } : todo
      ));
      
      if (updates.status === 'done') {
        toast.success('Todo completed!');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTodos(todos.filter(todo => todo.id !== id));
      toast.success('Todo deleted');
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo');
    }
  };

  const toggleTodoStatus = (todo: Todo) => {
    const newStatus = todo.status === 'done' ? 'todo' : 
                     todo.status === 'todo' ? 'in_progress' : 'done';
    updateTodo(todo.id, { status: newStatus });
  };

  const filteredTodos = todos.filter(todo => {
    if (selectedProject === 'all') return true;
    if (selectedProject === 'no-project') return !todo.project_id;
    return todo.project_id === selectedProject;
  });

  const todosByStatus = {
    todo: filteredTodos.filter(t => t.status === 'todo'),
    in_progress: filteredTodos.filter(t => t.status === 'in_progress'),
    done: filteredTodos.filter(t => t.status === 'done')
  };

  if (!user) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">Please sign in to use the Todo Manager.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">Todo Manager</h2>
          <p className="text-muted-foreground">Organize your tasks and boost productivity</p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Project description (optional)"
                  />
                </div>
                <div>
                  <Label htmlFor="project-color">Color</Label>
                  <Input
                    id="project-color"
                    type="color"
                    value={newProject.color}
                    onChange={(e) => setNewProject({ ...newProject, color: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingProject(false)}>
                  Cancel
                </Button>
                <Button onClick={createProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddingTodo} onOpenChange={setIsAddingTodo}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Todo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Todo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="todo-title">Title</Label>
                  <Input
                    id="todo-title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    placeholder="What needs to be done?"
                  />
                </div>
                <div>
                  <Label htmlFor="todo-description">Description</Label>
                  <Textarea
                    id="todo-description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    placeholder="Add more details (optional)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="todo-priority">Priority</Label>
                    <Select value={newTodo.priority} onValueChange={(value: any) => setNewTodo({ ...newTodo, priority: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="todo-project">Project</Label>
                    <Select value={newTodo.project_id} onValueChange={(value) => setNewTodo({ ...newTodo, project_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="No project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No project</SelectItem>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="todo-due-date">Due Date</Label>
                  <Input
                    id="todo-due-date"
                    type="datetime-local"
                    value={newTodo.due_date}
                    onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingTodo(false)}>
                  Cancel
                </Button>
                <Button onClick={createTodo}>Create Todo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Project Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedProject === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedProject('all')}
        >
          All Tasks
        </Button>
        <Button
          variant={selectedProject === 'no-project' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedProject('no-project')}
        >
          No Project
        </Button>
        {projects.map((project) => (
          <Button
            key={project.id}
            variant={selectedProject === project.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedProject(project.id)}
            className="whitespace-nowrap"
          >
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: project.color }}
            />
            {project.name}
          </Button>
        ))}
      </div>

      {/* Todo List - Kanban Style */}
      <Tabs defaultValue="kanban" className="w-full">
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban">
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(todosByStatus).map(([status, statusTodos]) => (
              <Card key={status}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <div className={`w-3 h-3 rounded-full ${statusColors[status as keyof typeof statusColors]}`} />
                    {status.replace('_', ' ').toUpperCase()}
                    <Badge variant="secondary" className="ml-auto">
                      {statusTodos.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {statusTodos.map((todo) => {
                    const project = projects.find(p => p.id === todo.project_id);
                    return (
                      <Card key={todo.id} className="p-3 cursor-pointer hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => toggleTodoStatus(todo)}
                          >
                            {todo.status === 'done' ? (
                              <CheckSquare className="h-4 w-4 text-green-600" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                            <span className={todo.status === 'done' ? 'line-through text-muted-foreground' : ''}>
                              {todo.title}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <div className={`w-2 h-2 rounded-full ${priorityColors[todo.priority]}`} />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => deleteTodo(todo.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {todo.description && (
                          <p className="text-sm text-muted-foreground mb-2">{todo.description}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-2 text-xs">
                          {project && (
                            <Badge variant="outline" style={{ color: project.color }}>
                              {project.name}
                            </Badge>
                          )}
                          {todo.due_date && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(todo.due_date), 'MMM d')}
                            </Badge>
                          )}
                          {todo.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="space-y-2">
            {filteredTodos.map((todo) => {
              const project = projects.find(p => p.id === todo.project_id);
              return (
                <Card key={todo.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="cursor-pointer"
                        onClick={() => toggleTodoStatus(todo)}
                      >
                        {todo.status === 'done' ? (
                          <CheckSquare className="h-5 w-5 text-green-600" />
                        ) : (
                          <Square className="h-5 w-5" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={todo.status === 'done' ? 'line-through text-muted-foreground' : 'font-medium'}>
                            {todo.title}
                          </span>
                          <div className={`w-2 h-2 rounded-full ${priorityColors[todo.priority]}`} />
                          <Badge variant="outline" className={statusColors[todo.status]}>
                            {todo.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        {todo.description && (
                          <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project && (
                            <Badge variant="outline" style={{ color: project.color }}>
                              {project.name}
                            </Badge>
                          )}
                          {todo.due_date && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(todo.due_date), 'MMM d, yyyy')}
                            </Badge>
                          )}
                          {todo.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingTodo(todo)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {filteredTodos.length === 0 && !loading && (
        <Card className="p-8 text-center">
          <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No todos yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first todo to get organized and boost your productivity.
          </p>
          <Button onClick={() => setIsAddingTodo(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Todo
          </Button>
        </Card>
      )}
    </div>
  );
}