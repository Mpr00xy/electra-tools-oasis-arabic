import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeftRight, 
  AlertTriangle, 
  RotateCcw 
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Sample inventory data
const inventoryTransactions = [
  { 
    id: 1, 
    type: 'in', 
    date: '2023-05-01', 
    reference: 'PO-001', 
    product: 'LED Bulb 10W', 
    quantity: 50, 
    location: 'Warehouse', 
    notes: 'Regular restocking' 
  },
  { 
    id: 2, 
    type: 'out', 
    date: '2023-05-01', 
    reference: 'INV-001', 
    product: 'LED Bulb 10W', 
    quantity: 5, 
    location: 'Store', 
    notes: 'Customer sale' 
  },
  { 
    id: 3, 
    type: 'transfer', 
    date: '2023-05-02', 
    reference: 'TR-001', 
    product: 'Circuit Breaker 32A', 
    quantity: 10, 
    location: 'Warehouse -> Store', 
    notes: 'Regular transfer' 
  },
  { 
    id: 4, 
    type: 'in', 
    date: '2023-05-03', 
    reference: 'PO-002', 
    product: 'Wire 2.5mm (100m)', 
    quantity: 20, 
    location: 'Warehouse', 
    notes: 'New stock arrival' 
  },
  { 
    id: 5, 
    type: 'out', 
    date: '2023-05-03', 
    reference: 'INV-002', 
    product: 'Power Outlet', 
    quantity: 15, 
    location: 'Store', 
    notes: 'Customer sale' 
  },
  { 
    id: 6, 
    type: 'damage', 
    date: '2023-05-04', 
    reference: 'DMG-001', 
    product: 'Junction Box', 
    quantity: 3, 
    location: 'Store', 
    notes: 'Damaged during handling' 
  },
  { 
    id: 7, 
    type: 'return', 
    date: '2023-05-04', 
    reference: 'RTN-001', 
    product: 'Multi-Meter Digital', 
    quantity: 1, 
    location: 'Store', 
    notes: 'Customer return - faulty item' 
  },
];

// Sample low stock products
const lowStockProducts = [
  { id: 1, name: 'LED Bulb 10W', sku: 'LB001', currentStock: 5, minStock: 10, location: 'Store' },
  { id: 2, name: 'Circuit Breaker 32A', sku: 'CB032', currentStock: 3, minStock: 15, location: 'Warehouse' },
  { id: 3, name: 'Electrical Tape', sku: 'ET100', currentStock: 8, minStock: 20, location: 'Store' },
  { id: 4, name: 'Wire Connector', sku: 'WC050', currentStock: 12, minStock: 30, location: 'Warehouse' },
];

const Inventory = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter inventory based on search query
  const filteredTransactions = searchQuery 
    ? inventoryTransactions.filter(transaction => 
        transaction.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : inventoryTransactions;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{t('inventory.title')}</h1>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-green-600">
            <ArrowUp className="mr-2 h-4 w-4" />
            {t('inventory.stock_in')}
          </Button>
          <Button className="bg-red-600">
            <ArrowDown className="mr-2 h-4 w-4" />
            {t('inventory.stock_out')}
          </Button>
          <Button className="bg-primary-blue">
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            {t('inventory.transfer')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>{t('inventory.title')}</CardTitle>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-8 w-full sm:w-[250px]"
                  placeholder={t('common.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">{t('common.all')}</TabsTrigger>
                <TabsTrigger value="in">{t('inventory.stock_in')}</TabsTrigger>
                <TabsTrigger value="out">{t('inventory.stock_out')}</TabsTrigger>
                <TabsTrigger value="transfer">{t('inventory.transfer')}</TabsTrigger>
                <TabsTrigger value="other">{t('common.other')}</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('common.date')}</TableHead>
                        <TableHead>{t('common.reference')}</TableHead>
                        <TableHead>{t('inventory.product')}</TableHead>
                        <TableHead className="text-center">{t('inventory.quantity')}</TableHead>
                        <TableHead>{t('inventory.location')}</TableHead>
                        <TableHead>{t('common.type')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.reference}</TableCell>
                          <TableCell className="font-medium">{transaction.product}</TableCell>
                          <TableCell className="text-center">{transaction.quantity}</TableCell>
                          <TableCell>{transaction.location}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                                transaction.type === 'in'
                                  ? 'bg-green-100 text-green-700'
                                  : transaction.type === 'out'
                                  ? 'bg-red-100 text-red-700'
                                  : transaction.type === 'transfer'
                                  ? 'bg-blue-100 text-blue-700'
                                  : transaction.type === 'damage'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {transaction.type === 'in'
                                ? t('inventory.stock_in')
                                : transaction.type === 'out'
                                ? t('inventory.stock_out')
                                : transaction.type === 'transfer'
                                ? t('inventory.transfer')
                                : transaction.type === 'damage'
                                ? t('inventory.damages')
                                : t('inventory.returns')}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Other tab contents would follow the same pattern */}
              <TabsContent value="out" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('common.date')}</TableHead>
                        <TableHead>{t('common.reference')}</TableHead>
                        <TableHead>{t('inventory.product')}</TableHead>
                        <TableHead className="text-center">{t('inventory.quantity')}</TableHead>
                        <TableHead>{t('inventory.location')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions
                        .filter(t => t.type === 'out')
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.reference}</TableCell>
                            <TableCell className="font-medium">{transaction.product}</TableCell>
                            <TableCell className="text-center">{transaction.quantity}</TableCell>
                            <TableCell>{transaction.location}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="transfer" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('common.date')}</TableHead>
                        <TableHead>{t('common.reference')}</TableHead>
                        <TableHead>{t('inventory.product')}</TableHead>
                        <TableHead className="text-center">{t('inventory.quantity')}</TableHead>
                        <TableHead>{t('inventory.location')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions
                        .filter(t => t.type === 'transfer')
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.reference}</TableCell>
                            <TableCell className="font-medium">{transaction.product}</TableCell>
                            <TableCell className="text-center">{transaction.quantity}</TableCell>
                            <TableCell>{transaction.location}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="other" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('common.date')}</TableHead>
                        <TableHead>{t('common.reference')}</TableHead>
                        <TableHead>{t('inventory.product')}</TableHead>
                        <TableHead className="text-center">{t('inventory.quantity')}</TableHead>
                        <TableHead>{t('inventory.location')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions
                        .filter(t => t.type === 'damage' || t.type === 'return')
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.reference}</TableCell>
                            <TableCell className="font-medium">{transaction.product}</TableCell>
                            <TableCell className="text-center">{transaction.quantity}</TableCell>
                            <TableCell>{transaction.location}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-primary-amber" />
              {t('dashboard.low_stock')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.sku} • {item.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-500">
                      {item.currentStock} / {item.minStock}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('products.low_stock')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-4 w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('inventory.audit')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
