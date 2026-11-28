import { create } from 'zustand';
export type DemoExam = { id: string; title: string; technology: string; duration: number; task: string; rubric: string; candidate: string; status: 'Taslak' | 'Davet edildi' };
type CareerDemo = {
  applications: string[]; shortlist: string[]; invited: string[]; responses: Record<string, string>; exams: DemoExam[];
  apply: (id:string) => void; toggleShortlist: (id:string) => void; invite: (id:string) => void; respond: (id:string, value:string) => void;
  addExam: (exam: DemoExam) => void; inviteExam: (id:string) => void; removeExam: (id:string) => void;
};
// Explicit session-only examples: never persisted or submitted to a company.
export const useCareerDemo = create<CareerDemo>((set) => ({
  applications: [], shortlist: [], invited: [], responses: {}, exams: [],
  apply: (id) => set((s) => ({ applications: [...new Set([...s.applications, id])] })),
  toggleShortlist: (id) => set((s) => ({shortlist: s.shortlist.includes(id) ? s.shortlist.filter((x) => x !== id) : [...s.shortlist, id]})),
  invite: (id) => set((s) => ({invited: [...new Set([...s.invited,id])]})),
  respond: (id,value) => set((s) => ({responses: {...s.responses,[id]:value}})),
  addExam: (exam) => set((s) => ({exams: [...s.exams, exam]})),
  inviteExam: (id) => set((s) => ({exams:s.exams.map((e) => e.id === id ? {...e,status:'Davet edildi'} : e)})),
  removeExam: (id) => set((s) => ({exams:s.exams.filter((e) => e.id !== id)})),
}));
