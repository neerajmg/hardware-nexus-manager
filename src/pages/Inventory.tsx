
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, Edit, Eye, Archive, Package } from "lucide-react";

// Mock data
const mockInventory = [
  {
    id: 1,
    name: "MacBook Pro 14\"",
    type: "Laptop",
    serialNumber: "MBP2023001",
    assignedTo: "John Doe",
    status: "Assigned",
    purchaseDate: "2023-10-15"
  },
  {
    id: 2,
    name: "Dell UltraSharp 27\"",
    type: "Monitor",
    serialNumber: "DU27001",
    assignedTo: "",
    status: "Available",
    purchaseDate: "2023-09-20"
  },
  {
    id: 3,
    name: "Logitech MX Master 3",
    type: "Mouse",
    serialNumber: "LMX3001",
    assignedTo: "Jane Smith",
    status: "Assigned",
    purchaseDate: "2023-08-10"
  },
  {
    id: 4,
    name: "HP EliteBook 840",
    type: "Laptop",
    serialNumber: "HPE840002",
    assignedTo: "",
    status: "Retired",
    purchaseDate: "2021-05-15"
  },
  {
    id: 5,
    name: "Samsung 32\" Curved",
    type: "Monitor",
    serialNumber: "SAM32C001",
    assignedTo: "Mike Johnson",
    status: "Assigned",
    purchaseDate: "2023-11-01"
  }
];

const hardwareTypes = ["All Types", "Laptop", "Monitor", "Mouse", "Keyboard", "Headset", "Webcam"];
const statusTypes = ["All Status", "Available", "Assigned", "Retired"];

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

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [inventory, setInventory] = useState(mockInventory);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "All Types" || item.type === typeFilter;
    const matchesStatus = statusFilter === "All Status" || item.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

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
              <Link to="/add-hardware">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Hardware
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Hardware Inventory</h2>
          <p className="text-gray-600">Manage and track all your organization's hardware assets</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, type, serial, or employee..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Hardware Type" />
                </SelectTrigger>
                <SelectContent>
                  {hardwareTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusTypes.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredInventory.length} of {inventory.length} items
          </p>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className="font-mono text-sm">{item.serialNumber}</TableCell>
                    <TableCell>{item.assignedTo || <span className="text-gray-400">Unassigned</span>}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/hardware/${item.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/hardware/${item.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        {item.status !== "Retired" && (
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Archive className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <Link to="/add-hardware">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Hardware Item
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventory;
