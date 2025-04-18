
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  MoreHorizontal, 
  FileText, 
  User,
  CreditCard
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

// Sample customers data
const sampleCustomers = [
  {
    id: 1,
    name: 'Ahmed Mohamed',
    phone: '0101234567',
    email: 'ahmed@example.com',
    address: 'Cairo, Egypt',
    balance: 1250,
    status: 'active',
  },
  {
    id: 2,
    name: 'Sara Ali',
    phone: '0111234567',
    email: 'sara@example.com',
    address: 'Alexandria, Egypt',
    balance: 0,
    status: 'active',
  },
  {
    id: 3,
    name: 'Omar Hassan',
    phone: '0121234567',
    email: 'omar@example.com',
    address: 'Giza, Egypt',
    balance: 3450,
    status: 'active',
  },
  {
    id: 4,
    name: 'Laila Mahmoud',
    phone: '0131234567',
    email: 'laila@example.com',
    address: 'Luxor, Egypt',
    balance: 780,
    status: 'inactive',
  },
  {
    id: 5,
    name: 'Mostafa Ibrahim',
    phone: '0141234567',
    email: 'mostafa@example.com',
    address: 'Aswan, Egypt',
    balance: 0,
    status: 'active',
  },
  {
    id: 6,
    name: 'Nour Khalid',
    phone: '0151234567',
    email: 'nour@example.com',
    address: 'Port Said, Egypt',
    balance: 2100,
    status: 'active',
  },
];

const Customers = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter customers based on search query
  const filteredCustomers = searchQuery 
    ? sampleCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleCustomers;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{t('customers.title')}</h1>
        <Button className="bg-primary-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('customers.add')}
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>{t('customers.list')}</CardTitle>
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
                  <TableHead>{t('customers.name')}</TableHead>
                  <TableHead>{t('customers.phone')}</TableHead>
                  <TableHead>{t('customers.email')}</TableHead>
                  <TableHead>{t('customers.address')}</TableHead>
                  <TableHead className="text-right">{t('customers.balance')}</TableHead>
                  <TableHead className="text-right">{t('common.status')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                          <User className="h-4 w-4" />
                        </div>
                        <span>{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <CreditCard className="h-4 w-4 mr-1 text-muted-foreground" />
                        ${customer.balance.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          customer.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {customer.status === 'active'
                          ? t('common.active')
                          : t('common.inactive')}
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
                            <FileText className="h-4 w-4 mr-2" />
                            {t('customers.transactions')}
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

export default Customers;
