
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Plus, 
  Trash, 
  Calculator, 
  Printer, 
  Save,
  Receipt,
  CreditCard,
  DollarSign,
  Clock,
  Percent,
  X,
  Package, // Added missing icon
  ShoppingCart // Added missing icon
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample product data
const products = [
  { id: 1, name: 'LED Bulb 10W', sku: 'LB001', price: 25.99, stock: 45 },
  { id: 2, name: 'Circuit Breaker 32A', sku: 'CB032', price: 75.50, stock: 18 },
  { id: 3, name: 'Wire 2.5mm (100m)', sku: 'WR025', price: 120.00, stock: 23 },
  { id: 4, name: 'Power Outlet', sku: 'PO001', price: 12.99, stock: 67 },
  { id: 5, name: 'Electrical Tape', sku: 'ET100', price: 3.50, stock: 8 },
  { id: 6, name: 'Junction Box', sku: 'JB010', price: 8.75, stock: 34 },
  { id: 7, name: 'Multi-Meter Digital', sku: 'MM001', price: 149.99, stock: 12 },
  { id: 8, name: 'Light Switch', sku: 'LS001', price: 9.99, stock: 56 },
  { id: 9, name: 'Cable Tie (Pack of 100)', sku: 'CT100', price: 5.25, stock: 42 },
  { id: 10, name: 'Soldering Iron', sku: 'SI001', price: 35.50, stock: 15 },
  { id: 11, name: 'Extension Cord 5m', sku: 'EC005', price: 18.75, stock: 29 },
  { id: 12, name: 'Power Strip', sku: 'PS001', price: 22.99, stock: 37 },
];

// Sample customers data
const customers = [
  { id: 1, name: 'Ahmed Mohamed', phone: '0101234567' },
  { id: 2, name: 'Sara Ali', phone: '0111234567' },
  { id: 3, name: 'Omar Hassan', phone: '0121234567' },
  { id: 4, name: 'Laila Mahmoud', phone: '0131234567' },
];

// Cart item interface
interface CartItem {
  id: number;
  product: typeof products[0];
  quantity: number;
  price: number;
  total: number;
}

const Sales = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<typeof customers[0] | null>(null);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(15); // 15% default tax rate
  
  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  const grandTotal = subtotal - discountAmount + taxAmount;

  // Filter products based on search query
  const filteredProducts = searchQuery 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  // Add product to cart
  const addToCart = (product: typeof products[0]) => {
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      newCart[existingItemIndex].total = newCart[existingItemIndex].quantity * newCart[existingItemIndex].price;
      setCart(newCart);
    } else {
      // Add new item to cart
      setCart([
        ...cart,
        {
          id: Date.now(),
          product,
          quantity: 1,
          price: product.price,
          total: product.price,
        },
      ]);
    }
  };

  // Update cart item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return;
    
    const newCart = cart.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity,
          total: quantity * item.price,
        };
      }
      return item;
    });
    
    setCart(newCart);
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    setCustomer(null);
    setDiscount(0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('sales.title')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selection (Left Panel) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>{t('sales.new')}</CardTitle>
                <div className="flex w-full sm:w-auto">
                  <Select value={customer?.id.toString() || ''} onValueChange={(val) => {
                    const selectedCustomer = customers.find(c => c.id.toString() === val);
                    setCustomer(selectedCustomer || null);
                  }}>
                    <SelectTrigger className={`w-full sm:w-[200px] ${!customer ? 'text-muted-foreground' : ''}`}>
                      <SelectValue placeholder={t('sales.customer')} />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.name} ({c.phone})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Tabs defaultValue="products">
                <div className="px-4">
                  <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="products">{t('nav.products')}</TabsTrigger>
                    <TabsTrigger value="categories">{t('nav.categories')}</TabsTrigger>
                  </TabsList>
                </div>

                <div className="px-4 py-3 border-b">
                  <div className="relative">
                    <Search className={`absolute ${isRTL ? 'right-2' : 'left-2'} top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground`} />
                    <Input
                      className={`${isRTL ? 'pr-8' : 'pl-8'}`}
                      placeholder={t('common.search')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <TabsContent value="products" className="m-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4">
                    {filteredProducts.map((product) => (
                      <Card 
                        key={product.id} 
                        className="cursor-pointer hover:border-primary-blue transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        <CardContent className="p-3">
                          <div className="text-center space-y-2">
                            <div className="h-20 bg-muted rounded-md flex items-center justify-center">
                              <Package className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium truncate">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.sku}</p>
                              <p className="text-sm font-bold mt-1">${product.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="categories" className="m-0">
                  <div className="flex items-center justify-center h-40 text-muted-foreground">
                    {t('categories.list')}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Cart (Right Panel) */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <Receipt className="mr-2 h-5 w-5" />
                  {t('sales.items')}
                </CardTitle>
                {cart.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearCart} className="h-8 text-red-500 hover:text-red-600">
                    <Trash className="h-4 w-4 mr-1" />
                    {t('common.clear')}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <ShoppingCart className="h-8 w-8 mb-2" />
                  <p>{t('sales.cart_empty')}</p>
                </div>
              ) : (
                <div className="max-h-[300px] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('sales.product')}</TableHead>
                        <TableHead className="text-right">{t('sales.price')}</TableHead>
                        <TableHead className="text-center">{t('sales.quantity')}</TableHead>
                        <TableHead className="text-right">{t('sales.total')}</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            <div>
                              <p className="text-sm font-medium">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground">{item.product.sku}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <span>-</span>
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="h-8 w-12 mx-1 text-center"
                              />
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <span>+</span>
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${item.total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-red-500 hover:text-red-600"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {cart.length > 0 && (
                <div className="border-t p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('sales.subtotal')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{t('sales.discount')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        className="h-8 w-16 text-right"
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calculator className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{t('sales.tax')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={tax}
                        onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                        className="h-8 w-16 text-right"
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>{t('sales.total')}</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </CardContent>

            {cart.length > 0 && (
              <CardFooter className="flex-col space-y-2 border-t p-4">
                <div className="grid grid-cols-3 gap-2 w-full">
                  <Button className="flex-col py-3 h-auto bg-primary-blue">
                    <DollarSign className="h-5 w-5 mb-1" />
                    <span>{t('sales.cash')}</span>
                  </Button>
                  <Button className="flex-col py-3 h-auto bg-primary-teal">
                    <CreditCard className="h-5 w-5 mb-1" />
                    <span>{t('sales.card')}</span>
                  </Button>
                  <Button className="flex-col py-3 h-auto" variant="outline">
                    <Clock className="h-5 w-5 mb-1" />
                    <span>{t('sales.credit')}</span>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button variant="outline" className="mt-2">
                    <Save className="mr-2 h-4 w-4" />
                    {t('common.save')}
                  </Button>
                  <Button variant="outline" className="mt-2">
                    <Printer className="mr-2 h-4 w-4" />
                    {t('sales.print_invoice')}
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sales;
