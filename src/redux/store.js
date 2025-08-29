import { configureStore, createSlice } from '@reduxjs/toolkit'

// Leads slice
const leadsSlice = createSlice({
  name: 'leads',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    setLeads: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addLead: (state, action) => {
      state.items.push(action.payload)
    },
    updateLead: (state, action) => {
      const index = state.items.findIndex(lead => lead.Id === action.payload.Id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload }
      }
    },
    removeLead: (state, action) => {
      state.items = state.items.filter(lead => lead.Id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

// Follow-ups slice
const followUpsSlice = createSlice({
  name: 'followUps',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    setFollowUps: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addFollowUp: (state, action) => {
      state.items.push(action.payload)
    },
    updateFollowUp: (state, action) => {
      const index = state.items.findIndex(followUp => followUp.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload }
      }
    },
    removeFollowUp: (state, action) => {
      state.items = state.items.filter(followUp => followUp.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

// UI slice for managing global UI state
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    followUpModal: {
      isOpen: false,
      selectedLead: null
    },
    sidebarOpen: false,
    theme: 'light'
  },
  reducers: {
    openFollowUpModal: (state, action) => {
      state.followUpModal.isOpen = true
      state.followUpModal.selectedLead = action.payload
    },
    closeFollowUpModal: (state) => {
      state.followUpModal.isOpen = false
      state.followUpModal.selectedLead = null
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    }
  }
})

// Export actions
export const { setLeads, addLead, updateLead, removeLead, setLoading: setLeadsLoading, setError: setLeadsError } = leadsSlice.actions
export const { setFollowUps, addFollowUp, updateFollowUp, removeFollowUp, setLoading: setFollowUpsLoading, setError: setFollowUpsError } = followUpsSlice.actions
export const { openFollowUpModal, closeFollowUpModal, toggleSidebar, setSidebarOpen, setTheme } = uiSlice.actions

// Configure store with reducers
export const store = configureStore({
  reducer: {
    leads: leadsSlice.reducer,
    followUps: followUpsSlice.reducer,
    ui: uiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

// Export selectors
export const selectLeads = (state) => state.leads.items
export const selectLeadsLoading = (state) => state.leads.loading
export const selectLeadsError = (state) => state.leads.error

export const selectFollowUps = (state) => state.followUps.items
export const selectFollowUpsLoading = (state) => state.followUps.loading
export const selectFollowUpsError = (state) => state.followUps.error

export const selectFollowUpModal = (state) => state.ui.followUpModal
export const selectSidebarOpen = (state) => state.ui.sidebarOpen
export const selectTheme = (state) => state.ui.theme

// Export types for TypeScript support (if needed later)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export default store;