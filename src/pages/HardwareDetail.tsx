
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, ArrowLeft, Edit, Archive, UserPlus, Calendar, Monitor } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real app, this would come from an API
const mockHardware = {
  1: {
    id: 1,
    name: "MacBook Pro 14\"",
    type: "Laptop",
    serialNumber: "MBP2023001",
    assignedTo: "John Doe",
    status: "Assigned",
    purchaseDate: "2023-10-15",
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2023-11-01T14:20:00Z"
  },
  2: {
    id: 2,
    name: "Dell UltraSharp 27\"",
    type: "Monitor",
    serialNumber: "DU27001",
    assignedTo: "",
    status: "Available",
    purchaseDate: "2023-09-20",
    createdAt: "2023-09-20T09:15:00Z",
    updatedAt: "2023-09-20T09:15:00Z"
  }
};

const employees = ["", "John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Brown"];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Available":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
    case "Assigned":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Assigned</Badge>;
    case "Retired":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Retired</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const HardwareDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [hardware, setHardware] = useState<any>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isRetireDialogOpen, setIsRetireDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    // In a real app, fetch hardware details from API
    const hardwareData = mockHardware[id as keyof typeof mockHardware];
    setHardware(hardwareData);
    
    if (!hardwareData) {
      navigate("/inventory");
    }
  }, [id, navigate]);

  const handleAssignment = () => {
    if (!selectedEmployee) return;
    
    setHardware(prev => ({
      ...prev,
      assignedTo: selectedEmployee,
      status: "Assigned",
      updatedAt: new Date().toISOString()
    }));
    
    setIsAssignDialogOpen(false);
    setSelectedEmployee("");
    
    toast({
      title: "Hardware Assigned",
      description: `${hardware.name} has been assigned to ${selectedEmployee}.`,
    });
  };

  const handleUnassignment = () => {
    setHardware(prev => ({
      ...prev,
      assignedTo: "",
      status: "Available",
      updatedAt: new Date().toISOString()
    }));
    
    toast({
      title: "Hardware Unassigned",
      description: `${hardware.name} is now available.`,
    });
  };

  const handleRetire = () => {
    setHardware(prev => ({
      ...prev,
      status: "Retired",
      assignedTo: "",
      updatedAt: new Date().toISOString()
    }));
    
    setIsRetireDialogOpen(false);
    
    toast({
      title: "Hardware Retired",
      description: `${hardware.name} has been retired from active use.`,
    });
  };

  if (!hardware) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Hardware not found</h2>
          <Link to="/inventory">
            <Button>Return to Inventory</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Hardware Hub</h1>
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/inventory">
                <Button variant="ghost">Inventory</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/inventory" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Inventory
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{hardware.name}</h2>
              <p className="text-gray-600">{hardware.type} • Serial: {hardware.serialNumber}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              {getStatusBadge(hardware.status)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Hardware Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{hardware.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Type</label>
                    <p className="text-gray-900">{hardware.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Serial Number</label>
                    <p className="text-gray-900 font-mono">{hardware.serialNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">{getStatusBadge(hardware.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Assigned To</label>
                    <p className="text-gray-900">
                      {hardware.assignedTo || <span className="text-gray-400">Unassigned</span>}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Purchase Date</label>
                    <p className="text-gray-900">
                      {hardware.purchaseDate ? format(new Date(hardware.purchaseDate), "PPP") : "Not specified"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timestamps */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="text-gray-900">{format(new Date(hardware.createdAt), "PPP 'at' p")}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="text-gray-900">{format(new Date(hardware.updatedAt), "PPP 'at' p")}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={`/hardware/${hardware.id}/edit`} className="block">
                  <Button className="w-full" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Hardware
                  </Button>
                </Link>

                {hardware.status !== "Retired" && (
                  <>
                    {hardware.assignedTo ? (
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={handleUnassignment}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Unassign Hardware
                      </Button>
                    ) : (
                      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full" variant="outline">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign to Employee
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Hardware</DialogTitle>
                            <DialogDescription>
                              Select an employee to assign {hardware.name} to.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employee" />
                              </SelectTrigger>
                              <SelectContent>
                                {employees.filter(emp => emp).map((employee) => (
                                  <SelectItem key={employee} value={employee}>
                                    {employee}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAssignment} disabled={!selectedEmployee}>
                              Assign Hardware
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    <Dialog open={isRetireDialogOpen} onOpenChange={setIsRetireDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="destructive">
                          <Archive className="h-4 w-4 mr-2" />
                          Retire Hardware
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Retire Hardware</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to retire {hardware.name}? This will mark it as no longer in active use.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsRetireDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleRetire}>
                            Retire Hardware
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HardwareDetail;
