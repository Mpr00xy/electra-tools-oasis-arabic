
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Users, 
  Truck, 
  Warehouse, 
  ShoppingCart, 
  ShoppingBag, 
  PieChart, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

const NavItem = ({ to, icon, label, isOpen }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )
    }
  >
    <span className="text-xl">{icon}</span>
    {isOpen && <span className="transition-opacity">{label}</span>}
  </NavLink>
);

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <aside
      className={cn(
        "bg-sidebar fixed inset-y-0 z-50 flex flex-col border-r transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16",
        isRTL ? "right-0 border-l border-r-0" : "left-0"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isOpen && <span className="text-xl font-bold text-white">{t('app.name')}</span>}
        </div>
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {isRTL 
            ? (isOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />)
            : (isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />)
          }
        </button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          <NavItem to="/" icon={<LayoutDashboard size={20} />} label={t('nav.dashboard')} isOpen={isOpen} />
          <NavItem to="/products" icon={<Package size={20} />} label={t('nav.products')} isOpen={isOpen} />
          <NavItem to="/categories" icon={<Tags size={20} />} label={t('nav.categories')} isOpen={isOpen} />
          <NavItem to="/customers" icon={<Users size={20} />} label={t('nav.customers')} isOpen={isOpen} />
          <NavItem to="/suppliers" icon={<Truck size={20} />} label={t('nav.suppliers')} isOpen={isOpen} />
          <NavItem to="/inventory" icon={<Warehouse size={20} />} label={t('nav.inventory')} isOpen={isOpen} />
          <NavItem to="/sales" icon={<ShoppingCart size={20} />} label={t('nav.sales')} isOpen={isOpen} />
          <NavItem to="/purchases" icon={<ShoppingBag size={20} />} label={t('nav.purchases')} isOpen={isOpen} />
          <NavItem to="/reports" icon={<PieChart size={20} />} label={t('nav.reports')} isOpen={isOpen} />
          <NavItem to="/settings" icon={<Settings size={20} />} label={t('nav.settings')} isOpen={isOpen} />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
