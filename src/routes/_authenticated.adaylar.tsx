import { createFileRoute } from '@tanstack/react-router';
import { CandidatesPage } from '@/components/career/CompanyPages';
export const Route = createFileRoute('/_authenticated/adaylar')({
  head: () => ({meta:[{title:'Aday Eşleştirme Merkezi — CodeQuest'},{name:'description',content:'İzinli aday bilgileri ve kanıt temelli teknik gereksinim karşılama.'},{property:'og:title',content:'Aday Eşleştirme Merkezi — CodeQuest'},{property:'og:description',content:'İzinli aday bilgileri ve kanıt temelli teknik gereksinim karşılama.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),
  component: CandidatesPage,
});
