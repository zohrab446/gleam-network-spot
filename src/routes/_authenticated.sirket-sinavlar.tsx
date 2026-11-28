import { createFileRoute } from '@tanstack/react-router';
import { CompanyExamsPage } from '@/components/career/CompanyPages';
export const Route = createFileRoute('/_authenticated/sirket-sinavlar')({
  head: () => ({meta:[{title:'Şirket Sınav Yönetimi — CodeQuest'},{name:'description',content:'Uygulamalı sınav taslakları, görevler, rubrikler ve teslimler.'},{property:'og:title',content:'Şirket Sınav Yönetimi — CodeQuest'},{property:'og:description',content:'Uygulamalı sınav taslakları, görevler, rubrikler ve teslimler.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),
  component: CompanyExamsPage,
});
