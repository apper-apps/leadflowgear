import leadsData from "@/services/mockData/leads.json";

class LeadService {
  constructor() {
    this.leads = [...leadsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.leads];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const lead = this.leads.find(lead => lead.Id === parseInt(id));
    if (!lead) {
      throw new Error("Lead not found");
    }
    return { ...lead };
  }

async create(leadData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const maxId = Math.max(...this.leads.map(lead => lead.Id), 0);
    const newLead = {
      Id: maxId + 1,
      name: leadData.name || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      company: leadData.company || '',
      jobTitle: leadData.jobTitle || '',
      linkedInUrl: leadData.linkedInUrl || '',
      notes: leadData.notes || '',
      stage: leadData.stage || 'cold',
      dateAdded: Date.now(),
      lastModified: Date.now()
    };
    
    this.leads.push(newLead);
    return { ...newLead };
  }



  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.leads.findIndex(lead => lead.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Lead not found");
    }
    
    this.leads[index] = {
      ...this.leads[index],
      ...updates,
      lastModified: Date.now()
    };
    
    return { ...this.leads[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.leads.findIndex(lead => lead.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Lead not found");
    }
    
    const deletedLead = this.leads.splice(index, 1)[0];
    return { ...deletedLead };
  }

  async getByStage(stage) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.leads.filter(lead => lead.stage === stage).map(lead => ({ ...lead }));
  }
}

export const leadService = new LeadService();