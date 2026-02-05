import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Zap,
  Eye,
  BarChart3,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Image,
  FileWarning,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Text Analysis",
    description:
      "Advanced NLP models detect toxicity, hate speech, harassment, and spam in real-time.",
  },
  {
    icon: Image,
    title: "Image Safety",
    description:
      "Computer vision identifies explicit content, violence, and policy violations automatically.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Process thousands of content pieces per second with sub-100ms latency.",
  },
  {
    icon: BarChart3,
    title: "Rich Analytics",
    description:
      "Comprehensive dashboards with real-time metrics and moderation insights.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption and data privacy controls.",
  },
  {
    icon: Eye,
    title: "Human-in-the-Loop",
    description:
      "Seamless escalation workflows for edge cases requiring human review.",
  },
];

const stats = [
  { value: "99.7%", label: "Accuracy Rate" },
  { value: "50ms", label: "Avg. Response Time" },
  { value: "10M+", label: "Daily Scans" },
  { value: "500+", label: "Enterprise Clients" },
];

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary-foreground">
              <Shield className="h-4 w-4" />
              <span>Powered by AWS AI/ML Services</span>
            </div>
            <h1 className="animate-fade-up mb-6 text-4xl font-extrabold tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
              AI-Powered{" "}
              <span className="text-gradient bg-gradient-to-r from-secondary to-primary-foreground">
                Content Moderation
              </span>{" "}
              at Scale
            </h1>
            <p className="animate-fade-up mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/70 md:text-xl" style={{ animationDelay: "0.1s" }}>
              Protect your platform and users with enterprise-grade Trust & Safety
              solutions. Detect harmful content in milliseconds with state-of-the-art
              machine learning.
            </p>
            <div className="animate-fade-up flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "0.2s" }}>
              <Link to="/upload">
                <Button size="lg" className="group bg-gradient-primary text-lg hover:opacity-90">
                  Start Moderating
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gradient md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Enterprise-Grade Moderation
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to keep your platform safe and compliant.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-gradient-primary p-3">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Simple integration, powerful protection.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Submit Content",
                description:
                  "Send text, images, or videos through our API or web interface for instant analysis.",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our models analyze content for toxicity, spam, explicit material, and policy violations.",
              },
              {
                step: "03",
                title: "Get Results",
                description:
                  "Receive detailed scores and automated decisions in milliseconds, with optional human review.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <FileWarning className="mx-auto mb-6 h-16 w-16 text-secondary" />
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Protect Your Platform?
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/70">
              Start moderating content in minutes. No credit card required.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/upload">
                <Button size="lg" className="bg-gradient-primary text-lg hover:opacity-90">
                  Try It Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
