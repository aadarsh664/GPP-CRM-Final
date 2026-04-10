import { create } from 'zustand';

export type LeadStatus = 'New' | 'Old Client' | 'Call Done' | 'Call Later' | 'Not Interested';
export type VisitStatus = 'New Visit' | 'Rescheduled' | 'Visit Done';
export type ClientStatus = 'New' | 'Old';

export interface Lead {
  id: string;
  name: string;
  industry: string;
  distance: number;
  status: LeadStatus;
  date: string;
  phone: string;
  website: string;
  email: string;
  addressLink: string;
  address: string;
  callClicked?: boolean;
}

export interface Visit {
  id: string;
  leadId: string;
  date: string;
  time: string;
  status: VisitStatus;
  subdivision: string;
}

export interface Client {
  id: string;
  leadId: string;
  status: ClientStatus;
  confirmationDate: string;
}

interface AppState {
  leads: Lead[];
  visits: Visit[];
  clients: Client[];
  theme: 'light' | 'dark' | 'system';
  language: 'English' | 'Hindi' | 'Hinglish';
  selectedSubdivisions: string[];
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (lang: 'English' | 'Hindi' | 'Hinglish') => void;
  updateLead: (id: string, data: Partial<Lead>) => void;
  addVisit: (visit: Visit) => void;
  updateVisit: (id: string, data: Partial<Visit>) => void;
  addClient: (client: Client) => void;
  toggleSubdivision: (sub: string) => void;
}

const mockLeads: Lead[] = [
  {
    id: 'L003',
    name: 'Company Name',
    industry: 'Business Industry',
    distance: 14.2,
    status: 'New',
    date: '05-02-2026',
    phone: '9856325465, 9878546595',
    website: 'www.company.com',
    email: 'company@gmail.com',
    addressLink: 'www.gmap./58655',
    address: 'Kazipur, Near Arvind Mahila College, Patna - 800004.',
  },
  {
    id: 'L004',
    name: 'Company Name',
    industry: 'Business Industry',
    distance: 18,
    status: 'Call Done',
    date: '05-02-2026',
    phone: '9856325465, 9878546595',
    website: 'www.company.com',
    email: 'company@gmail.com',
    addressLink: 'www.gmap./58655',
    address: 'Kazipur, Near Arvind Mahila College, Patna - 800004.',
  },
  {
    id: 'L005',
    name: 'Company Name',
    industry: 'Business Industry',
    distance: 6.01,
    status: 'Old Client',
    date: '01-02-2026',
    phone: '9856325465, 9878546595',
    website: 'www.company.com',
    email: 'company@gmail.com',
    addressLink: 'www.gmap./58655',
    address: 'Kazipur, Near Arvind Mahila College, Patna - 800004.',
  },
  {
    id: 'L006',
    name: 'Company Name',
    industry: 'Business Industry',
    distance: 12.5,
    status: 'Call Later',
    date: '04-02-2026',
    phone: '9856325465, 9878546595',
    website: 'www.company.com',
    email: 'company@gmail.com',
    addressLink: 'www.gmap./58655',
    address: 'Kazipur, Near Arvind Mahila College, Patna - 800004.',
  }
];

const mockVisits: Visit[] = [
  {
    id: 'V001',
    leadId: 'L003',
    date: '05-02-2026',
    time: '11:00 to 12:30 pm',
    status: 'New Visit',
    subdivision: 'Danapur'
  },
  {
    id: 'V002',
    leadId: 'L005',
    date: '06-02-2026',
    time: '12:30 to 14:00 pm',
    status: 'New Visit',
    subdivision: 'Boring Road'
  }
];

const mockClients: Client[] = [
  {
    id: 'C001',
    leadId: 'L003',
    status: 'New',
    confirmationDate: '05-02-2026'
  }
];

export const useAppStore = create<AppState>((set) => ({
  leads: mockLeads,
  visits: mockVisits,
  clients: mockClients,
  theme: 'light',
  language: 'English',
  selectedSubdivisions: [],
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  updateLead: (id, data) => set((state) => ({
    leads: state.leads.map(l => l.id === id ? { ...l, ...data } : l)
  })),
  addVisit: (visit) => set((state) => ({ visits: [...state.visits, visit] })),
  updateVisit: (id, data) => set((state) => ({
    visits: state.visits.map(v => v.id === id ? { ...v, ...data } : v)
  })),
  addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
  toggleSubdivision: (sub) => set((state) => ({
    selectedSubdivisions: state.selectedSubdivisions.includes(sub)
      ? state.selectedSubdivisions.filter(s => s !== sub)
      : [...state.selectedSubdivisions, sub]
  }))
}));
