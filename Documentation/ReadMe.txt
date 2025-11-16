        public Task<IEnumerable<Report>> GetCreatedByUserAsync(User user);
        public Task<IEnumerable<Template>> GetByTypeAsync(TemplateType type);
        public Task<IEnumerable<Template>> GetUsedByUserAsync(User user);
        public Task<IEnumerable<Template>> GetCreatedByUserAsync(User user);