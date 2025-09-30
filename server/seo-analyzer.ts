import * as cheerio from 'cheerio';
import { lookup } from 'dns/promises';
import type { SeoAnalysis, SeoScore, SeoIssue } from '@shared/schema';

async function isPrivateIP(ip: string): Promise<boolean> {
  // Check for private IP ranges
  const privatePatterns = [
    /^127\./,                           // Loopback
    /^10\./,                            // Private Class A
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,  // Private Class B
    /^192\.168\./,                      // Private Class C
    /^169\.254\./,                      // Link-local
    /^::1$/,                            // IPv6 loopback
    /^fc00:/,                           // IPv6 unique local
    /^fe80:/,                           // IPv6 link-local
    /^fd[0-9a-f]{2}:/i,                // IPv6 unique local
  ];
  
  return privatePatterns.some(pattern => pattern.test(ip));
}

export async function fetchAndAnalyze(url: string): Promise<{
  analysis: SeoAnalysis;
  score: SeoScore;
  issues: SeoIssue[];
}> {
  try {
    // Validate URL scheme
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Only HTTP and HTTPS URLs are supported');
    }

    const hostname = parsedUrl.hostname.toLowerCase();
    
    // Block obvious private hostnames
    const blockedHostnames = ['localhost', '0.0.0.0', '[::]'];
    if (blockedHostnames.includes(hostname)) {
      throw new Error('Private and local addresses are not allowed');
    }

    // Resolve DNS and check if any resolved IP is private
    try {
      const { address } = await lookup(hostname);
      if (await isPrivateIP(address)) {
        throw new Error('Private and local IP addresses are not allowed');
      }
    } catch (dnsError) {
      // If DNS resolution fails, let it continue - fetch will handle network errors
      if (dnsError instanceof Error && dnsError.message.includes('not allowed')) {
        throw dnsError;
      }
    }

    // Fetch the HTML with timeout and size limit
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Analyzer/1.0)',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    // Verify content type
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      throw new Error('URL does not return HTML content');
    }

    // Limit response size to 5MB
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 5 * 1024 * 1024) {
      throw new Error('Response size exceeds 5MB limit');
    }

    const html = await response.text();
    
    // Additional size check after reading
    if (html.length > 5 * 1024 * 1024) {
      throw new Error('Response size exceeds 5MB limit');
    }

    const $ = cheerio.load(html);
    
    // Get the final URL after redirects for absolute URL resolution
    const finalUrl = response.url || url;
    const baseUrl = new URL(finalUrl);

    // Helper function to resolve relative URLs
    const resolveUrl = (relativeUrl: string | undefined): string | undefined => {
      if (!relativeUrl) return undefined;
      try {
        return new URL(relativeUrl, baseUrl).href;
      } catch {
        return relativeUrl; // Return as-is if URL resolution fails
      }
    };

    // Extract all meta tags
    const analysis: SeoAnalysis = {
      url: finalUrl,
      title: $('title').first().text() || undefined,
      description: $('meta[name="description"]').attr('content') || undefined,
      ogTitle: $('meta[property="og:title"]').attr('content') || undefined,
      ogDescription: $('meta[property="og:description"]').attr('content') || undefined,
      ogImage: resolveUrl($('meta[property="og:image"]').attr('content')),
      ogType: $('meta[property="og:type"]').attr('content') || undefined,
      twitterCard: $('meta[name="twitter:card"]').attr('content') || undefined,
      twitterTitle: $('meta[name="twitter:title"]').attr('content') || undefined,
      twitterDescription: $('meta[name="twitter:description"]').attr('content') || undefined,
      twitterImage: resolveUrl($('meta[name="twitter:image"]').attr('content')),
      canonical: resolveUrl($('link[rel="canonical"]').attr('href')),
      robots: $('meta[name="robots"]').attr('content') || undefined,
      viewport: $('meta[name="viewport"]').attr('content') || undefined,
    };

    // Generate issues and score
    const { issues, score } = analyzeMetaTags(analysis);

    return { analysis, score, issues };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout: URL took too long to respond');
      }
      if (error.message.includes('fetch failed') || error.message.includes('ENOTFOUND')) {
        throw new Error('Unable to reach URL: Please check the URL and try again');
      }
      throw error;
    }
    throw new Error('Unknown error occurred while analyzing URL');
  }
}

function analyzeMetaTags(analysis: SeoAnalysis): { issues: SeoIssue[]; score: SeoScore } {
  const issues: SeoIssue[] = [];
  let basicScore = 0;
  let ogScore = 0;
  let twitterScore = 0;
  let technicalScore = 0;

  // Basic Meta Tags Analysis
  if (analysis.title) {
    const titleLength = analysis.title.length;
    if (titleLength >= 30 && titleLength <= 60) {
      basicScore += 50;
      issues.push({
        type: 'success',
        category: 'Basic Meta Tags',
        message: 'Title tag is present and optimal length',
        tag: `<title>${analysis.title}</title>`,
      });
    } else if (titleLength < 30) {
      basicScore += 25;
      issues.push({
        type: 'warning',
        category: 'Basic Meta Tags',
        message: 'Title tag is too short',
        tag: `<title>${analysis.title}</title>`,
        recommendation: 'Aim for 30-60 characters for optimal display in search results.',
      });
    } else {
      basicScore += 25;
      issues.push({
        type: 'warning',
        category: 'Basic Meta Tags',
        message: 'Title tag is too long',
        tag: `<title>${analysis.title}</title>`,
        recommendation: 'Keep title tags between 30-60 characters to avoid truncation in search results.',
      });
    }
  } else {
    issues.push({
      type: 'error',
      category: 'Basic Meta Tags',
      message: 'Title tag is missing',
      tag: '<title>Your Page Title Here</title>',
      recommendation: 'Add a unique, descriptive title tag to every page. This is crucial for SEO.',
    });
  }

  if (analysis.description) {
    const descLength = analysis.description.length;
    if (descLength >= 120 && descLength <= 160) {
      basicScore += 50;
      issues.push({
        type: 'success',
        category: 'Basic Meta Tags',
        message: 'Meta description is present and optimal length',
        tag: `<meta name="description" content="${analysis.description.substring(0, 50)}...">`,
      });
    } else if (descLength < 120) {
      basicScore += 30;
      issues.push({
        type: 'warning',
        category: 'Basic Meta Tags',
        message: 'Meta description is too short',
        tag: `<meta name="description" content="${analysis.description}">`,
        recommendation: 'Aim for 120-160 characters to maximize visibility in search results.',
      });
    } else {
      basicScore += 30;
      issues.push({
        type: 'warning',
        category: 'Basic Meta Tags',
        message: 'Meta description is too long',
        tag: `<meta name="description" content="${analysis.description.substring(0, 50)}...">`,
        recommendation: 'Keep meta descriptions between 120-160 characters to avoid truncation.',
      });
    }
  } else {
    issues.push({
      type: 'error',
      category: 'Basic Meta Tags',
      message: 'Meta description is missing',
      tag: '<meta name="description" content="Your page description here">',
      recommendation: 'Add a unique meta description to every page. Search engines often display this in results.',
    });
  }

  // Open Graph Tags Analysis
  if (analysis.ogTitle) {
    ogScore += 33;
    issues.push({
      type: 'success',
      category: 'Open Graph Tags',
      message: 'og:title is present',
      tag: `<meta property="og:title" content="${analysis.ogTitle}">`,
    });
  } else {
    issues.push({
      type: 'warning',
      category: 'Open Graph Tags',
      message: 'og:title is missing',
      tag: '<meta property="og:title" content="Your Title">',
      recommendation: 'Add Open Graph title for better social media sharing on Facebook and LinkedIn.',
    });
  }

  if (analysis.ogDescription) {
    ogScore += 33;
    issues.push({
      type: 'success',
      category: 'Open Graph Tags',
      message: 'og:description is present',
      tag: `<meta property="og:description" content="${analysis.ogDescription.substring(0, 50)}...">`,
    });
  } else {
    issues.push({
      type: 'warning',
      category: 'Open Graph Tags',
      message: 'og:description is missing',
      tag: '<meta property="og:description" content="Your description">',
      recommendation: 'Add Open Graph description for better context when shared on social media.',
    });
  }

  if (analysis.ogImage) {
    ogScore += 34;
    issues.push({
      type: 'success',
      category: 'Open Graph Tags',
      message: 'og:image is present',
      tag: `<meta property="og:image" content="${analysis.ogImage}">`,
    });
  } else {
    issues.push({
      type: 'error',
      category: 'Open Graph Tags',
      message: 'og:image is missing',
      tag: '<meta property="og:image" content="https://example.com/image.jpg">',
      recommendation: 'Add an Open Graph image (1200x630px recommended) for visual appeal when shared on social media.',
    });
  }

  // Twitter Card Tags Analysis
  if (analysis.twitterCard) {
    twitterScore += 40;
    issues.push({
      type: 'success',
      category: 'Twitter Cards',
      message: 'twitter:card is specified',
      tag: `<meta name="twitter:card" content="${analysis.twitterCard}">`,
    });
  } else if (analysis.ogImage) {
    twitterScore += 20;
    issues.push({
      type: 'info',
      category: 'Twitter Cards',
      message: 'twitter:card not specified, but Open Graph tags will be used as fallback',
      recommendation: 'While Twitter will use og: tags as fallback, adding dedicated twitter:card provides better control.',
    });
  } else {
    issues.push({
      type: 'warning',
      category: 'Twitter Cards',
      message: 'twitter:card is not specified',
      tag: '<meta name="twitter:card" content="summary_large_image">',
      recommendation: 'Specify a Twitter card type. Use "summary_large_image" for rich media content.',
    });
  }

  if (analysis.twitterTitle || analysis.ogTitle) {
    twitterScore += 30;
    if (analysis.twitterTitle) {
      issues.push({
        type: 'success',
        category: 'Twitter Cards',
        message: 'twitter:title is present',
        tag: `<meta name="twitter:title" content="${analysis.twitterTitle}">`,
      });
    }
  }

  if (analysis.twitterDescription || analysis.ogDescription) {
    twitterScore += 30;
    if (analysis.twitterDescription) {
      issues.push({
        type: 'success',
        category: 'Twitter Cards',
        message: 'twitter:description is present',
        tag: `<meta name="twitter:description" content="${analysis.twitterDescription}">`,
      });
    }
  }

  // Technical Tags Analysis
  if (analysis.viewport) {
    technicalScore += 40;
    issues.push({
      type: 'success',
      category: 'Technical Tags',
      message: 'Viewport meta tag is properly configured',
      tag: `<meta name="viewport" content="${analysis.viewport}">`,
    });
  } else {
    issues.push({
      type: 'error',
      category: 'Technical Tags',
      message: 'Viewport meta tag is missing',
      tag: '<meta name="viewport" content="width=device-width, initial-scale=1">',
      recommendation: 'Add viewport meta tag for proper mobile rendering. This is essential for mobile SEO.',
    });
  }

  if (analysis.canonical) {
    technicalScore += 30;
    issues.push({
      type: 'success',
      category: 'Technical Tags',
      message: 'Canonical URL is specified',
      tag: `<link rel="canonical" href="${analysis.canonical}">`,
    });
  } else {
    issues.push({
      type: 'info',
      category: 'Technical Tags',
      message: 'Canonical URL is not specified',
      tag: '<link rel="canonical" href="https://example.com/page">',
      recommendation: 'Add canonical URL to avoid duplicate content issues, especially if you have URL parameters.',
    });
  }

  if (analysis.robots) {
    technicalScore += 30;
    issues.push({
      type: 'success',
      category: 'Technical Tags',
      message: 'Robots meta tag is specified',
      tag: `<meta name="robots" content="${analysis.robots}">`,
    });
  } else {
    issues.push({
      type: 'info',
      category: 'Technical Tags',
      message: 'Robots meta tag is not specified (default: index, follow)',
      recommendation: 'If default behavior is desired, no action needed. Otherwise, specify crawling directives.',
    });
  }

  const overall = Math.round((basicScore + ogScore + twitterScore + technicalScore) / 4);

  return {
    issues,
    score: {
      overall,
      categories: {
        basic: basicScore,
        openGraph: ogScore,
        twitter: twitterScore,
        technical: technicalScore,
      },
    },
  };
}
