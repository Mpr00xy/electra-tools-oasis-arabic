
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Edit, Trash } from 'lucide-react';
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

// Sample categories data
const categoriesData = [
  { id: 1, name: 'أدوات الإضاءة', description: 'مصابيح، لمبات، ثريات وإكسسوارات الإضاءة', productsCount: 45 },
  { id: 2, name: 'أدوات كهربائية', description: 'مفاتيح، مقابس، قواطع ولوحات كهربائية', productsCount: 32 },
  { id: 3, name: 'كابلات وأسلاك', description: 'كابلات كهربائية، أسلاك توصيل بمختلف المقاسات', productsCount: 18 },
  { id: 4, name: 'أدوات قياس', description: 'أجهزة قياس الكهرباء، كاشفات الجهد', productsCount: 12 },
  { id: 5, name: 'معدات حماية', description: 'معدات الحماية الشخصية للكهربائيين', productsCount: 8 },
  { id: 6, name: 'أدوات يدوية', description: 'مفكات، زراديات، مفاتيح ربط', productsCount: 27 },
];

const Categories = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter categories based on search query
  const filteredCategories = searchQuery 
    ? categoriesData.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoriesData;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{t('categories.title')}</h1>
        <Button className="bg-primary-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('categories.add')}
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>{t('categories.list')}</CardTitle>
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
                  <TableHead>{t('categories.name')}</TableHead>
                  <TableHead>{t('categories.description')}</TableHead>
                  <TableHead className="text-center">{t('products.title')}</TableHead>
                  <TableHead className="text-left">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell className="text-center">{category.productsCount}</TableCell>
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

export default Categories;
