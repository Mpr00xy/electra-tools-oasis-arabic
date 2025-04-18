
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Edit, Trash, Phone, Mail, MapPin } from 'lucide-react';
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

// Sample suppliers data
const suppliersData = [
  { 
    id: 1, 
    name: 'شركة النور للأدوات الكهربائية', 
    phone: '0512345678', 
    email: 'alnoor@example.com', 
    address: 'الرياض، حي العليا، شارع الملك فهد', 
    balance: 12500 
  },
  { 
    id: 2, 
    name: 'مؤسسة الأمان للتجهيزات الكهربائية', 
    phone: '0523456789', 
    email: 'alamaan@example.com', 
    address: 'جدة، حي الصفا، طريق الملك عبدالله', 
    balance: 8750 
  },
  { 
    id: 3, 
    name: 'شركة المستقبل للإضاءة', 
    phone: '0534567890', 
    email: 'future@example.com', 
    address: 'الدمام، حي الفيصلية، شارع الأمير محمد', 
    balance: -3200 
  },
  { 
    id: 4, 
    name: 'مصنع الخليج للكابلات', 
    phone: '0545678901', 
    email: 'gulf@example.com', 
    address: 'الخبر، المنطقة الصناعية الثانية', 
    balance: 21000 
  },
  { 
    id: 5, 
    name: 'شركة التقنية للأدوات الكهربائية', 
    phone: '0556789012', 
    email: 'tech@example.com', 
    address: 'الرياض، حي السليمانية، شارع الملك عبدالعزيز', 
    balance: 0 
  },
];

const Suppliers = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter suppliers based on search query
  const filteredSuppliers = searchQuery 
    ? suppliersData.filter(supplier => 
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.phone.includes(searchQuery) ||
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suppliersData;

  // Format balance to display with currency
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(balance);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{t('suppliers.title')}</h1>
        <Button className="bg-primary-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('suppliers.add')}
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>{t('suppliers.list')}</CardTitle>
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('suppliers.name')}</TableHead>
                  <TableHead>{t('common.contact')}</TableHead>
                  <TableHead>{t('common.address')}</TableHead>
                  <TableHead>{t('suppliers.balance')}</TableHead>
                  <TableHead className="text-left">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{supplier.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{supplier.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span>{supplier.address}</span>
                      </div>
                    </TableCell>
                    <TableCell className={supplier.balance < 0 ? 'text-red-500' : supplier.balance > 0 ? 'text-green-600' : ''}>
                      {formatBalance(supplier.balance)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
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

export default Suppliers;
