
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Monitor, Users, TrendingUp } from "lucide-react";

// Mock data for demonstration
const mockStats = {
  totalItems: 247,
  assignedItems: 189,
  availableItems: 45,
  retiredItems: 13,
  recentlyAdded: 8
};

const Index = () => {
  const [stats, setStats] = useState(mockStats);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Hardware Hub</h1>
            </div>
            <nav className="flex space-x-4">
              <Link to="/inventory">
                <Button variant="ghost">Inventory</Button>
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Track, manage, and monitor your organization's hardware
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            All in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/inventory">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Monitor className="h-5 w-5 mr-2" />
                View Inventory
              </Button>
            </Link>
            <Link to="/add-hardware">
              <Button size="lg" variant="outline">
                <Plus className="h-5 w-5 mr-2" />
                Add Hardware
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Items
              </CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalItems}</div>
              <p className="text-xs text-gray-500 mt-1">Hardware assets</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Assigned
              </CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.assignedItems}</div>
              <p className="text-xs text-gray-500 mt-1">Currently in use</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Available
              </CardTitle>
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.availableItems}</div>
              <p className="text-xs text-gray-500 mt-1">Ready to assign</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Recently Added
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.recentlyAdded}</div>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/inventory" className="group">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all">
                  <div className="flex items-center space-x-3">
                    <Monitor className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Browse Inventory</h3>
                      <p className="text-sm text-gray-500">Search and filter all hardware</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/add-hardware" className="group">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all">
                  <div className="flex items-center space-x-3">
                    <Plus className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Add New Hardware</h3>
                      <p className="text-sm text-gray-500">Register new equipment</p>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Assignments</h3>
                    <p className="text-sm text-gray-500">Manage hardware assignments</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Available: {stats.availableItems}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                  Assigned: {stats.assignedItems}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                  Retired: {stats.retiredItems}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
