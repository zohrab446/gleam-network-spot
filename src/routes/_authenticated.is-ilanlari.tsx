import { createFileRoute } from '@tanstack/react-router';
import { JobsPage } from '@/components/career/JobPages';
export const Route = createFileRoute('/_authenticated/is-ilanlari')({
  head: () => ({meta:[{title:'İş İlanları — CodeQuest'},{name:'description',content:'İş ilanlarını ve açıklanabilir teknik gereksinim karşılama analizini incele.'},{property:'og:title',content:'İş İlanları — CodeQuest'},{property:'og:description',content:'İş ilanlarını ve açıklanabilir teknik gereksinim karşılama analizini incele.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),
  component: JobsPage,
});
