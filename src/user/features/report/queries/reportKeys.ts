export const reportKeys = {
  all: ['reports'] as const,
  lists: () => [...reportKeys.all, 'list'] as const,
  list: (filters: string) => [...reportKeys.lists(), { filters }] as const,
};
