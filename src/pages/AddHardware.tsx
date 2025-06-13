
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useCreateHardware } from "@/hooks/useHardware";

const hardwareTypes = ["Laptop", "Monitor", "Mouse", "Keyboard", "Headset", "Webcam", "Tablet", "Dock", "Cable"];
const employees = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Brown"];

const AddHardware = () => {
  const navigate = useNavigate();
  const createHardware = useCreateHardware();
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    serial_number: "",
    assigned_to: "",
    status: "Available"
  });
  const [purchaseDate, setPurchaseDate] = useState<Date>();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.type || !formData.serial_number) {
      return;
    }

    const hardwareData = {
      ...formData,
      assigned_to: formData.assigned_to || null,
      purchase_date: purchaseDate ? format(purchaseDate, "yyyy-MM-dd") : null
    };

    createHardware.mutate(hardwareData, {
      onSuccess: () => {
        navigate("/inventory");
      }
    });
  };

  // Update status based on assignment
  const handleAssignmentChange = (value: string) => {
    const assignedTo = value === "unassigned" ? "" : value;
    handleInputChange("assigned_to", assignedTo);
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
          <Link to="/inventory" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Inventory
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Hardware</h2>
          <p className="text-gray-600">Register a new hardware item in your inventory</p>
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
                    value={formData.serial_number}
                    onChange={(e) => handleInputChange("serial_number", e.target.value)}
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
                  <Select value={formData.assigned_to || "unassigned"} onValueChange={handleAssignmentChange}>
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
                  disabled={createHardware.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {createHardware.isPending ? "Adding..." : "Add Hardware"}
                </Button>
                <Link to="/inventory" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Tips for adding hardware:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use descriptive names that include brand and model</li>
            <li>• Serial numbers should be unique and easily identifiable</li>
            <li>• If assigning to an employee, status will automatically change to "Assigned"</li>
            <li>• Purchase date helps track warranty and depreciation</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AddHardware;
