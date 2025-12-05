import { useState } from 'react';
import { Plus, Search, Edit, MoreVertical, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { AISuggestionBanner } from '../AISuggestionBanner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const products = [
  { id: 1, name: 'Handwoven Basket Set', price: 25000, stock: 45, status: 'active', category: 'Home Decor', date: 'Nov 10, 2024', image: 'basket handwoven' },
  { id: 2, name: 'Traditional Ankara Bags', price: 18500, stock: 32, status: 'active', category: 'Fashion', date: 'Nov 8, 2024', image: 'ankara bag african' },
  { id: 3, name: 'Beaded Jewelry Collection', price: 12000, stock: 3, status: 'active', category: 'Jewelry', date: 'Nov 5, 2024', image: 'beaded jewelry african' },
  { id: 4, name: 'Leather Sandals', price: 22000, stock: 28, status: 'active', category: 'Footwear', date: 'Nov 3, 2024', image: 'leather sandals handmade' },
  { id: 5, name: 'Clay Pottery Set', price: 35000, stock: 0, status: 'draft', category: 'Home Decor', date: 'Oct 28, 2024', image: 'clay pottery african' },
  { id: 6, name: 'Tie-Dye Fabric Bundle', price: 15000, stock: 67, status: 'active', category: 'Fabrics', date: 'Oct 25, 2024', image: 'tie dye fabric' },
];

export function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const productSuggestions = [
    {
      id: 'optimize-images',
      type: 'tip' as const,
      title: 'Optimize your product images for better conversions',
      description: 'Products with high-quality images see 40% more sales. Consider adding multiple angles and lifestyle shots to your top products.',
    },
    {
      id: 'pricing-strategy',
      type: 'insight' as const,
      title: 'Your Beaded Jewelry is priced 15% below market average',
      description: 'Market analysis shows similar items selling for ₦14,000-₦16,000. Consider a price adjustment to maximize revenue.',
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* AI Suggestions */}
      <AISuggestionBanner suggestions={productSuggestions} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>My Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product inventory</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the details to add a new product to your store</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input id="productName" placeholder="e.g., Handwoven Basket" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home-decor">Home Decor</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="footwear">Footwear</SelectItem>
                      <SelectItem value="fabrics">Fabrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₦)</Label>
                  <Input id="price" type="number" placeholder="25000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your product..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Product Images</Label>
                <Input id="images" type="file" multiple accept="image/*" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" defaultChecked />
                <Label htmlFor="active">Set as Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]" onClick={() => setIsAddModalOpen(false)}>
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>87</p>
              </div>
              <Package className="w-8 h-8 text-[#4A90E2]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>82</p>
              </div>
              <Badge className="bg-[#56A45E]">Active</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>5</p>
              </div>
              <Badge className="bg-[#F2994A]">Warning</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Poppins' }}>5</p>
              </div>
              <Badge variant="outline">Draft</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Home Decor">Home Decor</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Jewelry">Jewelry</SelectItem>
                <SelectItem value="Footwear">Footwear</SelectItem>
                <SelectItem value="Fabrics">Fabrics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback 
                        src={`https://source.unsplash.com/80x80/?${product.image}`}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell style={{ fontFamily: 'Poppins' }}>₦{product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={product.stock < 10 ? 'text-[#F2994A]' : ''}>
                      {product.stock} units
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={product.status === 'active' ? 'bg-[#56A45E]' : 'bg-gray-400'}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(product)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the details of {selectedProduct?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editProductName">Product Name</Label>
                <Input id="editProductName" defaultValue={selectedProduct?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editCategory">Category</Label>
                <Select defaultValue={selectedProduct?.category.toLowerCase().replace(' ', '-')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home-decor">Home Decor</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="fabrics">Fabrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editPrice">Price (₦)</Label>
                <Input id="editPrice" type="number" defaultValue={selectedProduct?.price} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStock">Stock Quantity</Label>
                <Input id="editStock" type="number" defaultValue={selectedProduct?.stock} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="editActive" defaultChecked={selectedProduct?.status === 'active'} />
              <Label htmlFor="editActive">Set as Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]" onClick={() => setIsEditModalOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}