export default base => (process.env.NODE_ENV === 'production' ? `dist/${base}` : base);
