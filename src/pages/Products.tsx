
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  Edit, 
  Trash, 
  MoreHorizontal, 
  FileBarChart, 
  AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: 'LED Bulb 10W',
    sku: 'LB001',
    category: 'Lighting',
    price: '25.99',
    stock: 45,
    status: 'active',
  },
  {
    id: 2,
    name: 'Circuit Breaker 32A',
    sku: 'CB032',
    category: 'Electrical Components',
    price: '75.50',
    stock: 18,
    status: 'active',
  },
  {
    id: 3,
    name: 'Wire 2.5mm (100m)',
    sku: 'WR025',
    category: 'Cables & Wires',
    price: '120.00',
    stock: 23,
    status: 'active',
  },
  {
    id: 4,
    name: 'Power Outlet',
    sku: 'PO001',
    category: 'Outlets & Switches',
    price: '12.99',
    stock: 67,
    status: 'active',
  },
  {
    id: 5,
    name: 'Electrical Tape',
    sku: 'ET100',
    category: 'Tools & Accessories',
    price: '3.50',
    stock: 8,
    status: 'low-stock',
  },
  {
    id: 6,
    name: 'Junction Box',
    sku: 'JB010',
    category: 'Electrical Components',
    price: '8.75',
    stock: 34,
    status: 'active',
  },
  {
    id: 7,
    name: 'Multi-Meter Digital',
    sku: 'MM001',
    category: 'Tools & Accessories',
    price: '149.99',
    stock: 12,
    status: 'active',
  },
];

const Products = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = searchQuery 
    ? sampleProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleProducts;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{t('products.title')}</h1>
        <Button className="bg-primary-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('products.add')}
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>{t('products.list')}</CardTitle>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-8 w-full sm:w-[250px]"
                  placeholder={t('common.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                {t('common.filter')}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('products.name')}</TableHead>
                  <TableHead>{t('products.sku')}</TableHead>
                  <TableHead>{t('products.category')}</TableHead>
                  <TableHead className="text-right">{t('products.sell_price')}</TableHead>
                  <TableHead className="text-right">{t('products.stock')}</TableHead>
                  <TableHead className="text-right">{t('common.status')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price}</TableCell>
                    <TableCell className="text-right">
                      {product.status === 'low-stock' ? (
                        <div className="flex items-center justify-end">
                          <AlertTriangle className="h-4 w-4 text-primary-amber mr-1" />
                          {product.stock}
                        </div>
                      ) : (
                        product.stock
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          product.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {product.status === 'active'
                          ? t('common.active')
                          : t('products.low_stock')}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            {t('common.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileBarChart className="h-4 w-4 mr-2" />
                            {t('common.view')}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="h-4 w-4 mr-2" />
                            {t('common.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
