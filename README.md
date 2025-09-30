# SEO Meta Tag Analyzer

An interactive web application that analyzes website SEO meta tags and provides visual previews of how pages appear in Google search results and social media platforms.

![SEO Analyzer](https://img.shields.io/badge/SEO-Analyzer-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### 🔍 Comprehensive SEO Analysis
- **Meta Tag Extraction**: Automatically fetches and parses HTML from any URL
- **Best Practices Validation**: Evaluates tags against SEO optimization standards
- **Detailed Scoring**: Provides overall and category-specific scores (0-100)
- **Actionable Recommendations**: Clear guidance on how to improve SEO

### 📊 Visual Previews
- **Google Search Results**: See exactly how your page appears in Google
- **Facebook Preview**: View Open Graph card rendering
- **Twitter Cards**: Preview Twitter card display
- **LinkedIn Preview**: See how content appears on LinkedIn

### 🛡️ Security Features
- **SSRF Protection**: DNS resolution and private IP blocking
- **Content Validation**: HTML content type verification
- **Rate Limiting**: Size and timeout constraints
- **Secure Fetching**: Safe URL handling with comprehensive validation

### 📈 Analysis Categories

1. **Basic Meta Tags**
   - Title tag (length and presence)
   - Meta description (length and presence)

2. **Open Graph Tags**
   - og:title, og:description, og:image
   - Social media optimization

3. **Twitter Cards**
   - twitter:card, twitter:title, twitter:description
   - Platform-specific metadata

4. **Technical Tags**
   - Viewport configuration
   - Canonical URLs
   - Robots directives

## Installation

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/nickfinch71/SEOChecker
cd SEOChecker
```

2. Install dependencies:
```bash
npm install
```

**Note for Windows users**: The project uses `cross-env` to ensure npm scripts work correctly across all platforms (Windows, Mac, and Linux).

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

## Usage

1. **Enter a URL**: Type any website URL in the search bar
2. **Analyze**: Click "Analyze SEO" to fetch and process the meta tags
3. **Review Results**: 
   - Check the overall SEO score
   - View category breakdowns
   - See visual previews for Google and social media
   - Review detailed issues and recommendations

## Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Wouter** - Routing
- **TanStack Query** - Data fetching

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Cheerio** - HTML parsing
- **TypeScript** - Type safety
- **Zod** - Schema validation

## API Documentation

### POST `/api/analyze`

Analyzes SEO meta tags for a given URL.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "analysis": {
    "url": "https://example.com",
    "title": "Example Domain",
    "description": "...",
    "ogTitle": "...",
    "ogImage": "...",
    ...
  },
  "score": {
    "overall": 75,
    "categories": {
      "basic": 80,
      "openGraph": 70,
      "twitter": 65,
      "technical": 85
    }
  },
  "issues": [
    {
      "type": "warning",
      "category": "Basic Meta Tags",
      "message": "Title tag is too short",
      "tag": "<title>Example</title>",
      "recommendation": "Aim for 30-60 characters..."
    }
  ]
}
```

**Error Codes:**
- `400` - Invalid URL or validation error
- `422` - Malformed request
- `502` - Unable to reach URL or timeout
- `500` - Server error

## Security

This application implements several security measures:

- **SSRF Protection**: DNS resolution checks prevent access to private networks
- **Private IP Blocking**: Localhost and internal IPs are blocked
- **Content Type Validation**: Only HTML content is processed
- **Size Limits**: Responses limited to 5MB
- **Timeout Protection**: 10-second request timeout
- **Scheme Validation**: Only HTTP/HTTPS protocols allowed

## Development

### Project Structure
```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utilities and helpers
├── server/              # Backend Express server
│   ├── routes.ts        # API routes
│   ├── seo-analyzer.ts  # SEO analysis logic
│   └── storage.ts       # Storage interface
├── shared/              # Shared types and schemas
│   └── schema.ts        # TypeScript types
└── README.md
```

### Running Tests

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Shadcn UI](https://ui.shadcn.com/)
- Powered by [Cheerio](https://cheerio.js.org/) for HTML parsing
- Icons from [Lucide React](https://lucide.dev/)

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/seo-analyzer/issues).

---

Made with ❤️ for better SEO
