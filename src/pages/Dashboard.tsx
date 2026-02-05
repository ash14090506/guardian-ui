import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart3,
  Clock,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data - in production this comes from DynamoDB
const stats = {
  totalScanned: 12847,
  approved: 11203,
  flagged: 1456,
  rejected: 188,
  avgProcessingTime: 42,
  accuracy: 99.7,
};

const recentLogs = [
  {
    id: "MOD-2024-001",
    type: "Text + Image",
    status: "approved" as const,
    toxicity: 0.08,
    timestamp: "2 mins ago",
  },
  {
    id: "MOD-2024-002",
    type: "Text",
    status: "flagged" as const,
    toxicity: 0.72,
    timestamp: "5 mins ago",
  },
  {
    id: "MOD-2024-003",
    type: "Image",
    status: "approved" as const,
    toxicity: 0.03,
    timestamp: "8 mins ago",
  },
  {
    id: "MOD-2024-004",
    type: "Text",
    status: "rejected" as const,
    toxicity: 0.91,
    timestamp: "12 mins ago",
  },
  {
    id: "MOD-2024-005",
    type: "Text + Image",
    status: "flagged" as const,
    toxicity: 0.65,
    timestamp: "15 mins ago",
  },
  {
    id: "MOD-2024-006",
    type: "Text",
    status: "approved" as const,
    toxicity: 0.12,
    timestamp: "18 mins ago",
  },
  {
    id: "MOD-2024-007",
    type: "Image",
    status: "approved" as const,
    toxicity: 0.05,
    timestamp: "22 mins ago",
  },
  {
    id: "MOD-2024-008",
    type: "Text",
    status: "flagged" as const,
    toxicity: 0.58,
    timestamp: "25 mins ago",
  },
];

export default function Dashboard() {
  const approvalRate = Math.round((stats.approved / stats.totalScanned) * 100);
  const flagRate = Math.round((stats.flagged / stats.totalScanned) * 100);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-background py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Moderation Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time analytics and moderation logs
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Last 24 Hours
              </Button>
              <Link to="/upload">
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Shield className="mr-2 h-4 w-4" />
                  New Scan
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Scanned"
              value={stats.totalScanned.toLocaleString()}
              subtitle="Content items analyzed"
              icon={BarChart3}
              trend={{ value: 12.5, isPositive: true }}
              variant="primary"
            />
            <StatCard
              title="Approved"
              value={stats.approved.toLocaleString()}
              subtitle={`${approvalRate}% approval rate`}
              icon={CheckCircle}
              trend={{ value: 3.2, isPositive: true }}
              variant="success"
            />
            <StatCard
              title="Flagged"
              value={stats.flagged.toLocaleString()}
              subtitle={`${flagRate}% of total content`}
              icon={AlertTriangle}
              trend={{ value: 5.8, isPositive: false }}
              variant="warning"
            />
            <StatCard
              title="Rejected"
              value={stats.rejected.toLocaleString()}
              subtitle="Requires review"
              icon={XCircle}
              variant="destructive"
            />
          </div>

          {/* Secondary Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Avg. Processing Time
                  </p>
                  <p className="text-2xl font-bold">{stats.avgProcessingTime}ms</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-success/10 p-3">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model Accuracy</p>
                  <p className="text-2xl font-bold">{stats.accuracy}%</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-secondary/10 p-3">
                  <Activity className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">System Status</p>
                  <p className="flex items-center gap-2 text-2xl font-bold">
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    Healthy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Chart Placeholder */}
          <div className="mb-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 shadow-card lg:col-span-1">
              <h2 className="mb-6 text-lg font-semibold">Decision Distribution</h2>
              <div className="space-y-4">
                {[
                  {
                    label: "Approved",
                    value: stats.approved,
                    color: "bg-success",
                    percentage: approvalRate,
                  },
                  {
                    label: "Flagged",
                    value: stats.flagged,
                    color: "bg-warning",
                    percentage: flagRate,
                  },
                  {
                    label: "Rejected",
                    value: stats.rejected,
                    color: "bg-destructive",
                    percentage: Math.round(
                      (stats.rejected / stats.totalScanned) * 100
                    ),
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground">
                        {item.value.toLocaleString()} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Logs */}
            <div className="rounded-xl border bg-card p-6 shadow-card lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Moderation Logs</h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Toxicity</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentLogs.map((log) => (
                      <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-mono text-sm">
                          {log.id}
                        </TableCell>
                        <TableCell>{log.type}</TableCell>
                        <TableCell>
                          <StatusBadge status={log.status} size="sm" />
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${
                              log.toxicity < 0.3
                                ? "text-success"
                                : log.toxicity < 0.7
                                ? "text-warning"
                                : "text-destructive"
                            }`}
                          >
                            {Math.round(log.toxicity * 100)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {log.timestamp}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* API Info */}
          <div className="rounded-xl border border-dashed bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Dashboard data is fetched from AWS DynamoDB via API Gateway.
              <br />
              Real-time updates powered by AWS Lambda event streams.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
