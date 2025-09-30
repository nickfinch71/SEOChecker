import TagAnalysis from '../TagAnalysis';

export default function TagAnalysisExample() {
  const mockIssues = [
    {
      type: 'success' as const,
      category: 'Basic Meta Tags',
      message: 'Title tag is present and optimal length',
      tag: '<title>Example Page Title</title>',
    },
    {
      type: 'error' as const,
      category: 'Basic Meta Tags',
      message: 'Meta description is missing',
      tag: '<meta name="description" content="...">',
      recommendation: 'Add a unique meta description between 120-160 characters that accurately describes the page content.',
    },
    {
      type: 'warning' as const,
      category: 'Open Graph Tags',
      message: 'og:image is missing',
      tag: '<meta property="og:image" content="...">',
      recommendation: 'Add an Open Graph image (1200x630px recommended) for better social media sharing.',
    },
    {
      type: 'success' as const,
      category: 'Open Graph Tags',
      message: 'og:title is present',
      tag: '<meta property="og:title" content="Example Page">',
    },
    {
      type: 'warning' as const,
      category: 'Twitter Cards',
      message: 'twitter:card is not specified',
      tag: '<meta name="twitter:card" content="summary_large_image">',
      recommendation: 'Specify the Twitter card type for optimal display on Twitter.',
    },
    {
      type: 'success' as const,
      category: 'Technical Tags',
      message: 'Viewport meta tag is properly configured',
      tag: '<meta name="viewport" content="width=device-width, initial-scale=1">',
    },
  ];

  return <TagAnalysis issues={mockIssues} />;
}
