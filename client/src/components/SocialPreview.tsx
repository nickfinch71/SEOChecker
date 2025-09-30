import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SiFacebook, SiLinkedin } from "react-icons/si";
import { Twitter, ImageIcon } from "lucide-react";

interface SocialPreviewProps {
  url: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export default function SocialPreview({
  url,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
}: SocialPreviewProps) {
  const displayUrl = url.replace(/^https?:\/\//, '').split('/')[0];

  return (
    <Card className="p-6" data-testid="card-social-preview">
      <h3 className="text-lg font-semibold mb-4">Social Media Previews</h3>

      <Tabs defaultValue="facebook" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="facebook" data-testid="tab-facebook">
            <SiFacebook className="h-4 w-4 mr-2" />
            Facebook
          </TabsTrigger>
          <TabsTrigger value="twitter" data-testid="tab-twitter">
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </TabsTrigger>
          <TabsTrigger value="linkedin" data-testid="tab-linkedin">
            <SiLinkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="facebook" className="mt-6">
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            {ogImage ? (
              <div className="aspect-[1.91/1] bg-muted flex items-center justify-center">
                <img src={ogImage} alt="OG" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-[1.91/1] bg-muted flex flex-col items-center justify-center gap-2">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                <Badge variant="destructive">No og:image</Badge>
              </div>
            )}
            <div className="p-4 border-t border-border">
              <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                {displayUrl}
              </div>
              <h4 className="font-semibold mb-1 line-clamp-2" data-testid="text-facebook-title">
                {ogTitle || "No og:title found"}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {ogDescription || "No og:description found"}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="twitter" className="mt-6">
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            {twitterImage || ogImage ? (
              <div className="aspect-[2/1] bg-muted flex items-center justify-center">
                <img src={twitterImage || ogImage} alt="Twitter" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-[2/1] bg-muted flex flex-col items-center justify-center gap-2">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                <Badge variant="destructive">No twitter:image</Badge>
              </div>
            )}
            <div className="p-4 border-t border-border">
              <h4 className="font-semibold mb-1 line-clamp-2" data-testid="text-twitter-title">
                {twitterTitle || ogTitle || "No twitter:title found"}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {twitterDescription || ogDescription || "No twitter:description found"}
              </p>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-4 h-4 bg-muted rounded-full" />
                {displayUrl}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="linkedin" className="mt-6">
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            {ogImage ? (
              <div className="aspect-[1.91/1] bg-muted flex items-center justify-center">
                <img src={ogImage} alt="LinkedIn" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-[1.91/1] bg-muted flex flex-col items-center justify-center gap-2">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                <Badge variant="destructive">No og:image</Badge>
              </div>
            )}
            <div className="p-4 border-t border-border">
              <h4 className="font-semibold mb-1 line-clamp-2" data-testid="text-linkedin-title">
                {ogTitle || "No og:title found"}
              </h4>
              <div className="text-xs text-muted-foreground">
                {displayUrl}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
