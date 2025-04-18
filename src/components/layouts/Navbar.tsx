
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, Menu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { t } = useTranslation();
  const { language, toggleLanguage, isRTL } = useLanguage();

  return (
    <header className="h-16 border-b bg-card flex items-center px-4 md:px-6">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-muted"
          >
            <Menu size={20} />
          </button>
          <div className="relative md:w-64">
            <Search 
              className={`absolute ${isRTL ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 text-muted-foreground`} 
              size={16} 
            />
            <Input
              className={`h-9 ${isRTL ? 'pr-8' : 'pl-8'}`}
              placeholder={t('common.search')}
              type="search"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="px-3"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </Button>

          <button className="relative p-2 rounded-full hover:bg-muted">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-amber rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-blue flex items-center justify-center text-white">
              A
            </div>
            <span className="font-medium hidden md:inline">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
