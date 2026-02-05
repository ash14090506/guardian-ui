import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageUploader } from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Send, Loader2, Info } from "lucide-react";

export default function Upload() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = (file: File | null) => {
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    setIsLoading(true);

    // Simulate API call - in production this would hit AWS API Gateway
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Navigate to results with mock data
    navigate("/results", {
      state: {
        text,
        hasImage: !!image,
        imagePreview,
        submittedAt: new Date().toISOString(),
      },
    });
  };

  const isFormValid = text.trim().length > 0 || image !== null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-primary p-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="mb-2 text-3xl font-bold">Content Moderation</h1>
              <p className="text-muted-foreground">
                Submit text or images for AI-powered safety analysis
              </p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit}>
              <div className="rounded-2xl border bg-card p-6 shadow-card md:p-8">
                {/* Text Input */}
                <div className="mb-6 space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Text Content
                  </label>
                  <Textarea
                    placeholder="Enter caption, comment, or any text content to analyze..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[150px] resize-none border-border bg-background focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="text-xs text-muted-foreground">
                    {text.length} characters
                  </p>
                </div>

                {/* Divider */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">AND / OR</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Image Upload */}
                <div className="mb-8">
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    preview={imagePreview}
                  />
                </div>

                {/* Info Box */}
                <div className="mb-6 flex items-start gap-3 rounded-xl bg-accent p-4">
                  <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-foreground" />
                  <div className="text-sm text-accent-foreground">
                    <p className="font-medium">What we analyze:</p>
                    <ul className="mt-1 list-inside list-disc text-muted-foreground">
                      <li>Toxicity and hate speech</li>
                      <li>Spam and promotional content</li>
                      <li>Explicit or unsafe imagery</li>
                      <li>Policy violations</li>
                    </ul>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isFormValid || isLoading}
                  className="w-full bg-gradient-primary text-lg hover:opacity-90 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Content...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit for Moderation
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* API Note */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              This demo simulates responses from AWS Lambda via API Gateway.
              <br />
              In production, results are stored in DynamoDB.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
