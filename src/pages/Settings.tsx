
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Globe, 
  Building, 
  Percent, 
  Receipt, 
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

const Settings = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
      </div>

      <Tabs defaultValue="language" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-3/4 lg:w-1/2">
          <TabsTrigger value="company">
            <Building className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('settings.company')}</span>
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('settings.language')}</span>
          </TabsTrigger>
          <TabsTrigger value="tax">
            <Percent className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('settings.tax')}</span>
          </TabsTrigger>
          <TabsTrigger value="invoice">
            <Receipt className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('settings.invoice')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>{t('settings.company')}</CardTitle>
              <CardDescription>
                {t('settings.company_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="company_name">{t('settings.company_name')}</Label>
                  <Input id="company_name" placeholder="Electra Tools" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company_address">{t('settings.company_address')}</Label>
                  <Input id="company_address" placeholder="123 Main St, Cairo, Egypt" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company_phone">{t('settings.company_phone')}</Label>
                    <Input id="company_phone" placeholder="+201234567890" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company_email">{t('settings.company_email')}</Label>
                    <Input id="company_email" type="email" placeholder="info@electratools.com" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary-blue">
                <Save className="mr-2 h-4 w-4" />
                {t('common.save')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>{t('settings.language')}</CardTitle>
              <CardDescription>
                {t('settings.language_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                defaultValue={language} 
                onValueChange={(value) => setLanguage(value as 'en' | 'ar')}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="english" />
                  <Label htmlFor="english" className="cursor-pointer">
                    English
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ar" id="arabic" />
                  <Label htmlFor="arabic" className="cursor-pointer">
                    العربية
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary-blue">
                <Save className="mr-2 h-4 w-4" />
                {t('common.save')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>{t('settings.tax')}</CardTitle>
              <CardDescription>
                {t('settings.tax_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="tax_rate">{t('settings.tax_rate')}</Label>
                <div className="flex">
                  <Input id="tax_rate" placeholder="15" className="max-w-[100px]" />
                  <span className="ml-2 flex items-center">%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary-blue">
                <Save className="mr-2 h-4 w-4" />
                {t('common.save')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="invoice" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>{t('settings.invoice')}</CardTitle>
              <CardDescription>
                {t('settings.invoice_description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="invoice_prefix">{t('settings.invoice_prefix')}</Label>
                <Input id="invoice_prefix" placeholder="INV-" className="max-w-[200px]" />
              </div>
              <div className="grid gap-2">
                <Label>{t('settings.invoice_format')}</Label>
                <RadioGroup defaultValue="a4" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a4" id="a4" />
                    <Label htmlFor="a4" className="cursor-pointer">A4</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="thermal" id="thermal" />
                    <Label htmlFor="thermal" className="cursor-pointer">{t('settings.thermal')}</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary-blue">
                <Save className="mr-2 h-4 w-4" />
                {t('common.save')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
