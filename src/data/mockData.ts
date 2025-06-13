
export interface HardwareItem {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  assignedTo: string;
  status: string;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
}

export const mockInventory: HardwareItem[] = [
  {
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
  {
    id: 2,
    name: "Dell UltraSharp 27\"",
    type: "Monitor",
    serialNumber: "DU27001",
    assignedTo: "",
    status: "Available",
    purchaseDate: "2023-09-20",
    createdAt: "2023-09-20T09:15:00Z",
    updatedAt: "2023-09-20T09:15:00Z"
  },
  {
    id: 3,
    name: "Logitech MX Master 3",
    type: "Mouse",
    serialNumber: "LMX3001",
    assignedTo: "Jane Smith",
    status: "Assigned",
    purchaseDate: "2023-08-10",
    createdAt: "2023-08-10T14:45:00Z",
    updatedAt: "2023-08-10T14:45:00Z"
  },
  {
    id: 4,
    name: "HP EliteBook 840",
    type: "Laptop",
    serialNumber: "HPE840002",
    assignedTo: "",
    status: "Retired",
    purchaseDate: "2021-05-15",
    createdAt: "2021-05-15T08:30:00Z",
    updatedAt: "2023-12-01T16:20:00Z"
  },
  {
    id: 5,
    name: "Samsung 32\" Curved",
    type: "Monitor",
    serialNumber: "SAM32C001",
    assignedTo: "Mike Johnson",
    status: "Assigned",
    purchaseDate: "2023-11-01",
    createdAt: "2023-11-01T11:15:00Z",
    updatedAt: "2023-11-01T11:15:00Z"
  }
];

export const employees = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Brown"];
export const hardwareTypes = ["Laptop", "Monitor", "Mouse", "Keyboard", "Headset", "Webcam", "Tablet", "Dock", "Cable"];

export const getHardwareById = (id: string): HardwareItem | null => {
  return mockInventory.find(item => item.id.toString() === id) || null;
};
