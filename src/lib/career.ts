export type Requirement = { technology: string; required: number; proven: number | null; confidence: 'Düşük' | 'Orta' | 'Yüksek'; source: string };
export type Job = { id: string; company: string; title: string; location: string; type: string; description: string; requirements: Requirement[] };
export function requirementCoverage(requirements: Requirement[]) {
  const total = requirements.reduce((sum, r) => sum + r.required, 0);
  const supported = requirements.reduce((sum, r) => sum + Math.min(r.required, Math.max(0, r.proven ?? 0)), 0);
  return total > 0 ? Math.round(supported / total * 100) : null;
}
export function canAccessCompany(roles: readonly string[]) { return roles.includes('sirket') || roles.includes('admin'); }
export function shareableFields(consent: Record<string, boolean>, evidence: Record<string, string>) {
  return Object.fromEntries(Object.entries(evidence).filter(([key]) => consent[key] === true));
}
export const JOBS: Job[] = [
  { id: 'frontend', company: 'Nova Teknoloji · Örnek şirket', title: 'Junior Frontend Developer', location: 'İstanbul · Hibrit', type: 'Tam zamanlı', description: 'Erişilebilir web arayüzleri geliştir, ürün ekibiyle birlikte çalış ve test edilebilir bileşenler üret.', requirements: [
    { technology: 'JavaScript', required: 3, proven: 3, confidence: 'Orta', source: 'Örnek uygulamalı sınav' },
    { technology: 'React', required: 3, proven: 2, confidence: 'Orta', source: 'Örnek GitHub projesi' },
    { technology: 'CSS', required: 2, proven: 3, confidence: 'Yüksek', source: 'Örnek proje rubriği' },
    { technology: 'TypeScript', required: 2, proven: null, confidence: 'Düşük', source: 'Henüz kanıt yok' },
  ] },
  { id: 'python', company: 'VeriAtölyesi · Örnek şirket', title: 'Python Geliştirici Stajyeri', location: 'Ankara · Uzaktan', type: 'Staj', description: 'Veri işleme görevleri ve API projeleri üzerinde mentorluk desteğiyle çalış.', requirements: [
    { technology: 'Python', required: 2, proven: 2, confidence: 'Orta', source: 'Örnek uygulamalı sınav' },
    { technology: 'SQL', required: 2, proven: null, confidence: 'Düşük', source: 'Henüz kanıt yok' },
    { technology: 'Git', required: 1, proven: 1, confidence: 'Düşük', source: 'Örnek GitHub teslimi' },
  ] },
];
export const CANDIDATES = [
  { id: 'ada', name: 'Ada Yılmaz', skills: ['React', 'CSS', 'JavaScript'], project: 'Erişilebilir görev panosu', competition: 'Örnek finalist', exam: 'Örnek rubrik: 82/100', missing: 'TypeScript sınav kanıtı yok', status: 'Yeni başvuru', consent: { name: true, skills: true, project: true, competition: false, exam: true } },
  { id: 'deniz', name: 'Deniz Kaya', skills: ['Python', 'SQL'], project: 'Veri temizleme aracı', competition: 'Kanıt yok', exam: 'Örnek rubrik: 76/100', missing: 'Frontend proje kanıtı yok', status: 'İncelemede', consent: { name: true, skills: true, project: true, competition: true, exam: false } },
];
export const INVITATIONS = [
  { id: 'interview', company: 'Nova Teknoloji', title: 'Frontend teknik mülakatı', kind: 'Mülakat', date: 'Tarih birlikte belirlenecek' },
  { id: 'exam', company: 'VeriAtölyesi', title: 'Python uygulamalı sınav daveti', kind: 'Uygulamalı Sınav', date: 'Davet kabulünden sonra 7 gün' },
  { id: 'internship', company: 'Nova Teknoloji', title: 'Yazılım stajı için tanışma', kind: 'Staj / İş', date: 'Uzaktan görüşme' },
];
