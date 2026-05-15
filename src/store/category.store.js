import { create } from 'zustand';
import { categoryService } from '../services/category.service.js';

const CACHE_TTL_MS = 5 * 60 * 1000;

const getCacheKey = ({ includeInactive = false } = {}) => JSON.stringify({ includeInactive: Boolean(includeInactive) });

const getRequestParams = ({ includeInactive = false } = {}) => (
  includeInactive ? { includeInactive: true } : {}
);

export const useCategoryStore = create((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,
  lastFetchedAt: 0,
  currentRequest: null,
  currentKey: getCacheKey(),
  cache: {},

  async fetchCategories(options = {}) {
    const { force = false, includeInactive = false } = options;
    const key = getCacheKey({ includeInactive });
    const now = Date.now();
    const cached = get().cache[key];

    if (!force && Array.isArray(cached?.categories) && now - cached.lastFetchedAt < CACHE_TTL_MS) {
      set({
        categories: cached.categories,
        error: null,
        isLoading: false,
        lastFetchedAt: cached.lastFetchedAt,
        currentKey: key,
      });
      return cached.categories;
    }

    const activeRequest = get().currentRequest;
    if (activeRequest?.key === key) {
      return activeRequest.promise;
    }

    const request = categoryService
      .getCategories(getRequestParams({ includeInactive }))
      .then((categories) => {
        const lastFetchedAt = Date.now();
        set((state) => ({
          categories,
          error: null,
          lastFetchedAt,
          currentKey: key,
          cache: {
            ...state.cache,
            [key]: { categories, lastFetchedAt },
          },
        }));
        return categories;
      })
      .catch((error) => {
        const message = error.userMessage || error.response?.data?.message || 'No se pudieron cargar las categorias.';
        set({ error: message });
        throw error;
      })
      .finally(() => {
        if (get().currentRequest?.key === key) {
          set({ currentRequest: null, isLoading: false });
        }
      });

    set({
      categories: cached?.categories || [],
      isLoading: true,
      error: null,
      currentKey: key,
      currentRequest: { key, promise: request },
    });

    return request;
  },

  clearCategories() {
    set({
      categories: [],
      isLoading: false,
      error: null,
      lastFetchedAt: 0,
      currentRequest: null,
      currentKey: getCacheKey(),
      cache: {},
    });
  },

  invalidateCategoriesCache() {
    set({
      lastFetchedAt: 0,
      cache: {},
    });
  },
}));
