import { createFileRoute } from '@tanstack/react-router';
import { StudentCareer } from '@/components/career/StudentCareer';
export const Route = createFileRoute('/_authenticated/kariyer')({
  head: () => ({meta:[{title:'Kariyer Uyum Merkezi — CodeQuest'},{name:'description',content:'Beceri kanıtların, hedef pozisyonların ve kariyer gelişim planın.'},{property:'og:title',content:'Kariyer Uyum Merkezi — CodeQuest'},{property:'og:description',content:'Beceri kanıtların, hedef pozisyonların ve kariyer gelişim planın.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),
  component: StudentCareer,
});
