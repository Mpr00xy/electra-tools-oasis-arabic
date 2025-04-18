
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Eye, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Sample purchases data
const purchasesData = [
  { 
    id: 'PO-001', 
    date: '2023-05-01', 
    supplier: 'شركة النور للأدوات الكهربائية', 
    items: 15, 
    total: 8750, 
    status: 'completed', 
    paymentStatus: 'paid' 
  },
  { 
    id: 'PO-002', 
    date: '2023-05-03', 
    supplier: 'مؤسسة الأمان للتجهيزات الكهربائية', 
    items: 8, 
    total: 4250, 
    status: 'completed', 
    paymentStatus: 'partial' 
  },
  { 
    id: 'PO-003', 
    date: '2023-05-05', 
    supplier: 'شركة المستقبل للإضاءة', 
    items: 12, 
    total: 6300, 
    status: 'completed', 
    paymentStatus: 'unpaid' 
  },
  { 
    id: 'PO-004', 
    date: '2023-05-10', 
    supplier: 'مصنع الخليج للكابلات', 
    items: 5, 
    total: 12500, 
    status: 'pending', 
    paymentStatus: 'unpaid' 
  },
  { 
    id: 'PO-005', 
    date: '2023-05-15', 
    supplier: 'شركة التقنية للأدوات الكهربائية', 
    items: 20, 
    total: 9850, 
    status: 'cancelled', 
    paymentStatus: 'refunded' 
  },
];

const Purchases = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  // Filter purchases based on search query and filters
  const filteredPurchases = purchasesData.filter(purchase => {
    // Apply search filter
    const matchesSearch = 
      !searchQuery || 
      purchase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      purchase.status === statusFilter;
    
    // Apply payment filter
    const matchesPayment = 
      paymentFilter === 'all' || 
      purchase.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount);
  };

  // Format date to Arabic format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{t('purchases.title')}</h1>
        <Button className="bg-primary-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('purchases.new')}
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>{t('purchases.list')}</CardTitle>
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
            
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder={t('common.status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('common.all')}</SelectItem>
                    <SelectItem value="completed">{t('common.completed')}</SelectItem>
                    <SelectItem value="pending">{t('common.pending')}</SelectItem>
                    <SelectItem value="cancelled">{t('common.cancelled')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-auto">
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder={t('purchases.payment')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('common.all')}</SelectItem>
                    <SelectItem value="paid">{t('common.paid')}</SelectItem>
                    <SelectItem value="partial">{t('common.partial')}</SelectItem>
                    <SelectItem value="unpaid">{t('common.unpaid')}</SelectItem>
                    <SelectItem value="refunded">{t('common.refunded')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('common.reference')}</TableHead>
                  <TableHead>{t('common.date')}</TableHead>
                  <TableHead>{t('purchases.supplier')}</TableHead>
                  <TableHead className="text-center">{t('purchases.items')}</TableHead>
                  <TableHead>{t('purchases.total')}</TableHead>
                  <TableHead>{t('common.status')}</TableHead>
                  <TableHead className="text-left">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell className="font-medium">{purchase.id}</TableCell>
                    <TableCell>{formatDate(purchase.date)}</TableCell>
                    <TableCell>{purchase.supplier}</TableCell>
                    <TableCell className="text-center">{purchase.items}</TableCell>
                    <TableCell>{formatCurrency(purchase.total)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            purchase.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : purchase.status === 'pending'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {purchase.status === 'completed' ? (
                            <><CheckCircle className="mr-1 h-3 w-3" /> {t('common.completed')}</>
                          ) : purchase.status === 'pending' ? (
                            <><Clock className="mr-1 h-3 w-3" /> {t('common.pending')}</>
                          ) : (
                            <><AlertCircle className="mr-1 h-3 w-3" /> {t('common.cancelled')}</>
                          )}
                        </span>
                        
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            purchase.paymentStatus === 'paid'
                              ? 'bg-blue-100 text-blue-700'
                              : purchase.paymentStatus === 'partial'
                              ? 'bg-purple-100 text-purple-700'
                              : purchase.paymentStatus === 'unpaid'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {purchase.paymentStatus === 'paid' 
                            ? t('common.paid') 
                            : purchase.paymentStatus === 'partial'
                            ? t('common.partial')
                            : purchase.paymentStatus === 'unpaid'
                            ? t('common.unpaid')
                            : t('common.refunded')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
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

export default Purchases;
