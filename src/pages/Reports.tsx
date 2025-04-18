
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  FileDown, 
  Printer,
  Calendar,
  ShoppingCart,
  ShoppingBag,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  Bar, 
  ResponsiveContainer 
} from 'recharts';

// Sample sales data for charts
const salesData = [
  { month: 'يناير', sales: 45000, purchases: 32000, profit: 13000 },
  { month: 'فبراير', sales: 52000, purchases: 35000, profit: 17000 },
  { month: 'مارس', sales: 48000, purchases: 31000, profit: 17000 },
  { month: 'أبريل', sales: 61000, purchases: 42000, profit: 19000 },
  { month: 'مايو', sales: 55000, purchases: 36000, profit: 19000 },
  { month: 'يونيو', sales: 67000, purchases: 45000, profit: 22000 },
];

// Sample top products data
const topProductsData = [
  { id: 1, name: 'لمبة LED 10W', sales: 245, revenue: 12250 },
  { id: 2, name: 'قاطع دائرة كهربائية 32A', sales: 132, revenue: 15840 },
  { id: 3, name: 'كابل كهربائي 2.5مم (100م)', sales: 87, revenue: 17400 },
  { id: 4, name: 'مفتاح إضاءة مزدوج', sales: 195, revenue: 5850 },
  { id: 5, name: 'برايز كهربائية ثلاثية', sales: 176, revenue: 7040 },
];

const Reports = () => {
  const { t } = useTranslation();
  const [reportPeriod, setReportPeriod] = useState('monthly');
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount);
  };

  // Calculate totals
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalPurchases = salesData.reduce((sum, item) => sum + item.purchases, 0);
  const totalProfit = salesData.reduce((sum, item) => sum + item.profit, 0);
  const profitMargin = (totalProfit / totalSales) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{t('reports.title')}</h1>
        <div className="flex flex-wrap gap-2">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('reports.date_range')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">{t('common.daily')}</SelectItem>
              <SelectItem value="weekly">{t('common.weekly')}</SelectItem>
              <SelectItem value="monthly">{t('common.monthly')}</SelectItem>
              <SelectItem value="quarterly">{t('common.quarterly')}</SelectItem>
              <SelectItem value="yearly">{t('common.yearly')}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            {t('reports.date_range')}
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            {t('reports.print')}
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            {t('reports.export')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('sales.title')}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" /> +12.5%
              </span> 
              مقارنة بالفترة السابقة
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('purchases.title')}
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPurchases)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowDown className="mr-1 h-3 w-3" /> -3.2%
              </span> 
              مقارنة بالفترة السابقة
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('reports.profit_loss')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalProfit)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" /> 
                {profitMargin.toFixed(1)}%
              </span> 
              هامش الربح
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">
            <BarChart3 className="mr-2 h-4 w-4" />
            {t('reports.sales')}
          </TabsTrigger>
          <TabsTrigger value="purchases">
            <LineChart className="mr-2 h-4 w-4" />
            {t('reports.purchases')}
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <PieChart className="mr-2 h-4 w-4" />
            {t('reports.inventory')}
          </TabsTrigger>
          <TabsTrigger value="profit">
            <CreditCard className="mr-2 h-4 w-4" />
            {t('reports.profit_loss')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('reports.sales')}</CardTitle>
              <CardDescription>
                {t('sales.overview')} - {reportPeriod === 'monthly' ? 'شهري' : 
                 reportPeriod === 'weekly' ? 'أسبوعي' : 
                 reportPeriod === 'daily' ? 'يومي' : 
                 reportPeriod === 'quarterly' ? 'ربع سنوي' : 'سنوي'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="sales" name={t('sales.title')} fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.top_selling')}</CardTitle>
              <CardDescription>
                المنتجات الأكثر مبيعًا للفترة الحالية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('inventory.product')}</TableHead>
                      <TableHead className="text-center">{t('reports.quantity_sold')}</TableHead>
                      <TableHead>{t('reports.revenue')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProductsData.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-center">{product.sales}</TableCell>
                        <TableCell>{formatCurrency(product.revenue)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                {t('reports.export')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>{t('reports.purchases')}</CardTitle>
              <CardDescription>
                {t('purchases.overview')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="purchases" name={t('purchases.title')} fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
