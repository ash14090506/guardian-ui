import { useLocation, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatusBadge } from "@/components/StatusBadge";
import { ScoreGauge } from "@/components/ScoreGauge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  RefreshCw,
  Download,
  Clock,
  FileText,
  Image,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

// Mock moderation results - in production this would come from Lambda
type Decision = "approved" | "flagged" | "rejected";

const mockResults = {
  decision: "flagged" as Decision,
  confidence: 0.87,
  processingTime: 45,
  textAnalysis: {
    toxicity: 0.72,
    harassment: 0.45,
    hate: 0.15,
    spam: 0.08,
    sentiment: "Negative",
    language: "English",
  },
  imageAnalysis: {
    safety: 0.92,
    violence: 0.05,
    adult: 0.03,
    suggestive: 0.12,
    labels: [
      { label: "Person", confidence: 0.98 },
      { label: "Outdoors", confidence: 0.89 },
      { label: "Text", confidence: 0.76 },
    ],
  },
  flags: [
    "High toxicity score detected",
    "Potentially harassing language identified",
  ],
};

export default function Results() {
  const location = useLocation();
  const state = location.state as {
    text?: string;
    hasImage?: boolean;
    imagePreview?: string;
    submittedAt?: string;
  } | null;

  // Redirect if no state
  if (!state) {
    return <Navigate to="/upload" replace />;
  }

  const { text, hasImage, imagePreview, submittedAt } = state;
  const results = mockResults;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Back Button */}
            <Link
              to="/upload"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Submit another
            </Link>

            {/* Decision Header */}
            <div className="mb-8 rounded-2xl border bg-card p-6 shadow-card md:p-8">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-2xl p-4 ${
                      results.decision === "approved"
                        ? "bg-success/10"
                        : results.decision === "flagged"
                        ? "bg-warning/10"
                        : "bg-destructive/10"
                    }`}
                  >
                    {results.decision === "approved" ? (
                      <ShieldCheck className="h-8 w-8 text-success" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-warning" />
                    )}
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-3">
                      <h1 className="text-2xl font-bold">Moderation Result</h1>
                      <StatusBadge status={results.decision} size="lg" />
                    </div>
                    <p className="text-muted-foreground">
                      Confidence: {Math.round(results.confidence * 100)}% •
                      Processed in {results.processingTime}ms
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Link to="/upload">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      New Scan
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Flags */}
              {results.flags.length > 0 && (
                <div className="mt-6 rounded-xl bg-warning/10 p-4">
                  <p className="mb-2 text-sm font-medium text-warning">
                    Issues Detected:
                  </p>
                  <ul className="space-y-1">
                    {results.flags.map((flag, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Content Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Original Content */}
              <div className="rounded-2xl border bg-card p-6 shadow-card">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <FileText className="h-5 w-5 text-primary" />
                  Submitted Content
                </h2>

                {text && (
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                      Text
                    </p>
                    <div className="rounded-lg bg-muted p-4 text-sm">
                      {text || "No text submitted"}
                    </div>
                  </div>
                )}

                {hasImage && imagePreview && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                      Image
                    </p>
                    <img
                      src={imagePreview}
                      alt="Submitted content"
                      className="w-full rounded-lg object-cover"
                    />
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Submitted at{" "}
                  {submittedAt
                    ? new Date(submittedAt).toLocaleString()
                    : "Unknown"}
                </div>
              </div>

              {/* Text Analysis */}
              <div className="rounded-2xl border bg-card p-6 shadow-card">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <FileText className="h-5 w-5 text-primary" />
                  Text Analysis
                </h2>

                <div className="space-y-4">
                  <ScoreGauge
                    label="Toxicity"
                    score={results.textAnalysis.toxicity}
                    description="Likelihood of offensive language"
                  />
                  <ScoreGauge
                    label="Harassment"
                    score={results.textAnalysis.harassment}
                    description="Personal attacks or bullying"
                  />
                  <ScoreGauge
                    label="Hate Speech"
                    score={results.textAnalysis.hate}
                    description="Discriminatory language"
                  />
                  <ScoreGauge
                    label="Spam"
                    score={results.textAnalysis.spam}
                    description="Promotional or repetitive content"
                  />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">Sentiment</p>
                    <p className="font-medium">{results.textAnalysis.sentiment}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">Language</p>
                    <p className="font-medium">{results.textAnalysis.language}</p>
                  </div>
                </div>
              </div>

              {/* Image Analysis */}
              {hasImage && (
                <div className="rounded-2xl border bg-card p-6 shadow-card md:col-span-2">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Image className="h-5 w-5 text-primary" />
                    Image Analysis
                  </h2>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <ScoreGauge
                        label="Overall Safety"
                        score={1 - results.imageAnalysis.safety}
                        description="General safety assessment"
                      />
                      <ScoreGauge
                        label="Violence"
                        score={results.imageAnalysis.violence}
                        description="Violent or graphic content"
                      />
                      <ScoreGauge
                        label="Adult Content"
                        score={results.imageAnalysis.adult}
                        description="Explicit material"
                      />
                      <ScoreGauge
                        label="Suggestive"
                        score={results.imageAnalysis.suggestive}
                        description="Potentially inappropriate"
                      />
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-medium">Detected Labels</p>
                      <div className="space-y-2">
                        {results.imageAnalysis.labels.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between rounded-lg bg-muted p-3"
                          >
                            <span className="font-medium">{item.label}</span>
                            <span className="text-sm text-muted-foreground">
                              {Math.round(item.confidence * 100)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/upload">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                  Moderate More Content
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
