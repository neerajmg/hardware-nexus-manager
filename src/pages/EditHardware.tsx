
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Package, CalendarIcon, ArrowLeft, Save } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const hardwareTypes = ["Laptop", "Monitor", "Mouse", "Keyboard", "Headset", "Webcam", "Tablet", "Dock", "Cable"];
const employees = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Brown"];

// Mock data - same as in HardwareDetail
const mockHardware: Record<string, any> = {
  "1": {
    id: 1,
    name: "MacBook Pro 14\"",
    type: "Laptop",
    serialNumber: "MBP2023001",
    assignedTo: "John Doe",
    status: "Assigned",
    purchaseDate: "2023-10-15"
  },
  "2": {
    id: 2,
    name: "Dell UltraSharp 27\"",
    type: "Monitor",
    serialNumber: "DU27001",
    assignedTo: "",
    status: "Available",
    purchaseDate: "2023-09-20"
  }
};

const EditHardware = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    serialNumber: "",
    assignedTo: "",
    status: "Available"
  });
  const [purchaseDate, setPurchaseDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id && mockHardware[id]) {
      const hardware = mockHardware[id];
      setFormData({
        name: hardware.name,
        type: hardware.type,
        serialNumber: hardware.serialNumber,
        assignedTo: hardware.assignedTo,
        status: hardware.status
      });
      if (hardware.purchaseDate) {
        setPurchaseDate(new Date(hardware.purchaseDate));
      }
    } else {
      navigate("/inventory");
    }
  }, [id, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.serialNumber) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "Hardware item has been updated.",
      });
      
      navigate(`/hardware/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update hardware item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssignmentChange = (value: string) => {
    const assignedTo = value === "unassigned" ? "" : value;
    handleInputChange("assignedTo", assignedTo);
    handleInputChange("status", assignedTo ? "Assigned" : "Available");
  };

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
          <Link to={`/hardware/${id}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Hardware Detail
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit Hardware</h2>
          <p className="text-gray-600">Update hardware information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Hardware Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hardware Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Hardware Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., MacBook Pro 14-inch"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hardware type" />
                    </SelectTrigger>
                    <SelectContent>
                      {hardwareTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Serial Number */}
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number *</Label>
                  <Input
                    id="serialNumber"
                    placeholder="e.g., MBP2023001"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                    className="font-mono"
                    required
                  />
                </div>

                {/* Purchase Date */}
                <div className="space-y-2">
                  <Label>Purchase Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !purchaseDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {purchaseDate ? format(purchaseDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={purchaseDate}
                        onSelect={setPurchaseDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Assigned To */}
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assign To Employee (Optional)</Label>
                  <Select value={formData.assignedTo || "unassigned"} onValueChange={handleAssignmentChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee or leave unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {employees.map((employee) => (
                        <SelectItem key={employee} value={employee}>
                          {employee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Assigned">Assigned</SelectItem>
                      <SelectItem value="Retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  type="submit" 
                  className="flex-1" 
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Updating..." : "Update Hardware"}
                </Button>
                <Link to={`/hardware/${id}`} className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditHardware;
