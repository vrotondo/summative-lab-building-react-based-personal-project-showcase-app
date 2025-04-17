import '@testing-library/jest-dom'

// Mock fetch globally for all tests
global.fetch = vi.fn()

// Mock timer for async operations
beforeEach(() => {
    vi.resetAllMocks()
})

// Reset fetch mocks after each test
afterEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
})