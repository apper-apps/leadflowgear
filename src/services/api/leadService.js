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
      ...leadData,
      dateAdded: Date.now(),
      lastModified: Date.now()
    };
    
    this.leads.push(newLead);
    return { ...newLead };
  }

  async createFromLinkedIn(linkedInUrl) {
    // Simulate LinkedIn profile fetching
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Extract profile info from LinkedIn URL (simulated)
    const profileData = this.extractLinkedInProfile(linkedInUrl);
    
    const leadData = {
      ...profileData,
      linkedInUrl,
      stage: "cold" // Always start as Cold Lead
    };
    
    return this.create(leadData);
  }

  extractLinkedInProfile(linkedInUrl) {
    // Simulate LinkedIn profile extraction
    // In real implementation, this would call LinkedIn API or scraping service
    const profileNames = [
      { name: "John Anderson", jobTitle: "VP of Sales", company: "TechStart Inc." },
      { name: "Sarah Williams", jobTitle: "Director of Marketing", company: "GrowthCorp" },
      { name: "Michael Davis", jobTitle: "Head of Operations", company: "ScaleUp Solutions" },
      { name: "Emily Chen", jobTitle: "Product Manager", company: "InnovateNow" },
      { name: "Robert Johnson", jobTitle: "Business Development", company: "NextGen Ventures" },
      { name: "Lisa Rodriguez", jobTitle: "Chief Marketing Officer", company: "BrandBoost" },
      { name: "Daniel Kim", jobTitle: "VP of Engineering", company: "CodeCraft Labs" },
      { name: "Jennifer Taylor", jobTitle: "Sales Director", company: "Revenue Dynamics" }
    ];
    
    const stockPhotos = [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    ];
    
    // Random selection for demo purposes
    const randomProfile = profileNames[Math.floor(Math.random() * profileNames.length)];
    const randomPhoto = stockPhotos[Math.floor(Math.random() * stockPhotos.length)];
    
    return {
      ...randomProfile,
      photoUrl: randomPhoto
    };
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