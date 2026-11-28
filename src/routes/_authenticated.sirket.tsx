import { createFileRoute } from '@tanstack/react-router';
import { CompanyDashboard } from '@/components/career/CompanyPages';
export const Route = createFileRoute('/_authenticated/sirket')({
  head: () => ({meta:[{title:'Şirket Yetenek Paneli — CodeQuest'},{name:'description',content:'İlanlar, aday havuzu, kısa liste ve değerlendirme süreçlerini incele.'},{property:'og:title',content:'Şirket Yetenek Paneli — CodeQuest'},{property:'og:description',content:'İlanlar, aday havuzu, kısa liste ve değerlendirme süreçlerini incele.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),
  component: CompanyDashboard,
});
