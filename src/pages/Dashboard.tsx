
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Truck, 
  Package, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  Package2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { t } = useTranslation();

  // Sample data for dashboard
  const stats = [
    {
      title: t('dashboard.total_sales'),
      value: '15,023',
      icon: <ShoppingCart className="h-6 w-6 text-primary-blue" />,
      change: '+12.5%',
      trend: 'up',
    },
    {
      title: t('dashboard.total_purchases'),
      value: '8,492',
      icon: <Package2 className="h-6 w-6 text-primary-teal" />,
      change: '+5.2%',
      trend: 'up',
    },
    {
      title: t('dashboard.total_customers'),
      value: '425',
      icon: <Users className="h-6 w-6 text-primary-blue" />,
      change: '+18.3%',
      trend: 'up',
    },
    {
      title: t('dashboard.total_products'),
      value: '859',
      icon: <Package className="h-6 w-6 text-primary-teal" />,
      change: '-3.1%',
      trend: 'down',
    },
  ];

  // Sample low stock items
  const lowStockItems = [
    { id: 1, name: 'LED Bulb 10W', sku: 'LB001', currentStock: 5, minStock: 10 },
    { id: 2, name: 'Circuit Breaker 32A', sku: 'CB032', currentStock: 3, minStock: 15 },
    { id: 3, name: 'Electrical Tape', sku: 'ET100', currentStock: 8, minStock: 20 },
    { id: 4, name: 'Wire Connector', sku: 'WC050', currentStock: 12, minStock: 30 },
  ];

  // Sample recent sales
  const recentSales = [
    { id: 'INV-001', date: '2023-05-01', customer: 'Ahmed Mohamed', total: '4,280' },
    { id: 'INV-002', date: '2023-05-02', customer: 'Sara Ali', total: '1,750' },
    { id: 'INV-003', date: '2023-05-03', customer: 'Omar Hassan', total: '3,420' },
    { id: 'INV-004', date: '2023-05-04', customer: 'Laila Mahmoud', total: '890' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>{' '}
                {t('common.from_last_month')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="shadow-sm col-span-4">
          <CardHeader>
            <CardTitle>{t('dashboard.sales_overview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
              <span className="ml-4 text-muted-foreground">Sales chart visualization</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary-amber" />
              {t('dashboard.low_stock')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
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
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>{t('dashboard.recent_sales')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{sale.customer}</p>
                    <p className="text-sm text-muted-foreground">{sale.date}</p>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="font-medium">{sale.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>{t('dashboard.top_selling')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <TrendingUp className="h-16 w-16 text-muted-foreground/50" />
              <span className="ml-4 text-muted-foreground">Top products chart</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
