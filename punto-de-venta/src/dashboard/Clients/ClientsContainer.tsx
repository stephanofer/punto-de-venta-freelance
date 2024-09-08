import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  ActivityIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSignIcon,
  FilePenIcon,
  MoveVerticalIcon,
} from "lucide-react";
import { useState } from "react";

type Pago = {
  date: string;
  amount: number;
};

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  creditLimit: number;
  balance: number;
  paymentHistory: Pago[];
};

export function ClientsContainer() {
  const [customers, setCustomers] = useState<Client[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "555-1234",
      address: "123 Main St, Anytown USA",
      creditLimit: 5000,
      balance: 2500,
      paymentHistory: [
        { date: "2023-06-01", amount: 500 },
        { date: "2023-05-15", amount: 1000 },
        { date: "2023-04-30", amount: 1000 },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-5678",
      address: "456 Oak Rd, Anytown USA",
      creditLimit: 3000,
      balance: 1000,
      paymentHistory: [
        { date: "2023-06-10", amount: 500 },
        { date: "2023-05-25", amount: 500 },
      ],
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "555-9012",
      address: "789 Elm St, Anytown USA",
      creditLimit: 4000,
      balance: 3000,
      paymentHistory: [
        { date: "2023-06-05", amount: 1000 },
        { date: "2023-05-20", amount: 1000 },
        { date: "2023-04-15", amount: 1000 },
      ],
    },
  ]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  
  const handleAddProduct = () => {
    setShowAddProductModal((showAddProductModal) => !showAddProductModal);
  };

  return (
    <div
      className="flex flex-col bg-background"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <main className="flex-1 p-6">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>
                <h1>Clientes</h1>
              <div className="flex items-center justify-between ">
                <Button
                  className="h-12 rounded-md px-8"
                >
                  Agregar Producto
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FilterIcon className="w-4 h-4 mr-2" />
                      Filtrar Por Categoria
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuCheckboxItem
                    >
                      All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                    >
                      Kitchenware
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                    >
                      Electronics
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                    >
                      Apparel
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                    >
                      Office Supplies
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                    >
                      Home & Garden
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ListOrderedIcon className="w-4 h-4 mr-2" />
                      Ordenar Por
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuRadioGroup
                    >
                      <DropdownMenuRadioItem value="name">
                        Name
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price">
                        Price
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="category">
                        Category
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="inStock">
                        In Stock
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Reorder Point</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Apples</TableCell>
                  <TableCell>APL-001</TableCell>
                  <TableCell>Produce</TableCell>
                  <TableCell>
                    <Badge variant="outline">125</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">100</Badge>
                  </TableCell>
                  <TableCell>2023-06-23</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoveVerticalIcon className="w-4 h-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
                        <DropdownMenuItem>Adjust Reorder</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Eggs</TableCell>
                  <TableCell>EGG-002</TableCell>
                  <TableCell>Dairy</TableCell>
                  <TableCell>
                    <Badge variant="outline">75</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">50</Badge>
                  </TableCell>
                  <TableCell>2023-06-24</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoveVerticalIcon className="w-4 h-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
                        <DropdownMenuItem>Adjust Reorder</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Bread</TableCell>
                  <TableCell>BRD-003</TableCell>
                  <TableCell>Bakery</TableCell>
                  <TableCell>
                    <Badge variant="outline">45</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">30</Badge>
                  </TableCell>
                  <TableCell>2023-06-25</TableCell>
                  <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" >
                      <FilePenIcon className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" >
                      <TrashIcon className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Milk</TableCell>
                  <TableCell>MLK-004</TableCell>
                  <TableCell>Dairy</TableCell>
                  <TableCell>
                    <Badge variant="outline">90</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">75</Badge>
                  </TableCell>
                  <TableCell>2023-06-26</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoveVerticalIcon className="w-4 h-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
                        <DropdownMenuItem>Adjust Reorder</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chicken</TableCell>
                  <TableCell>CHK-005</TableCell>
                  <TableCell>Meat</TableCell>
                  <TableCell>
                    <Badge variant="outline">65</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">50</Badge>
                  </TableCell>
                  <TableCell>2023-06-27</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoveVerticalIcon className="w-4 h-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
                        <DropdownMenuItem>Adjust Reorder</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong>
              products
            </div>
          </CardFooter>
        </Card>
      </main>

      <Dialog open={showAddProductModal} onOpenChange={handleAddProduct}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Add New Product</h2>
            <form onSubmit={() => console.log("asd")} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"

                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"

                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kitchenware">Kitchenware</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Apparel">Apparel</SelectItem>
                      <SelectItem value="Office Supplies">
                        Office Supplies
                      </SelectItem>
                      <SelectItem value="Home & Garden">
                        Home & Garden
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <Label htmlFor="inStock">In Stock</Label>
                  <Input
                    id="inStock"
                    type="number"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/*       
        <Dialog open={showDeleteModal}>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <CircleAlertIcon className="w-12 h-12 text-red-500" />
              <p className="text-lg font-medium">
                Are you sure you want to delete ""?
              </p>
              <p className="text-muted-foreground">
                This action cannot be undone.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
    </div>
  );
}

function CircleAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListOrderedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
