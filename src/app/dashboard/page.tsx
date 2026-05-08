"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, FileText, Scale, IndianRupee, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const mockChartData = [
  { name: 'Jan', revenue: 140000, cases: 24 },
  { name: 'Feb', revenue: 230000, cases: 13 },
  { name: 'Mar', revenue: 320000, cases: 58 },
  { name: 'Apr', revenue: 278000, cases: 39 },
  { name: 'May', revenue: 489000, cases: 68 },
  { name: 'Jun', revenue: 539000, cases: 88 },
  { name: 'Jul', revenue: 649000, cases: 103 },
];

const recentCases = [
  { id: "C-9021", title: "Atal Setu Bridge Structural Audit PIL", client: "Mumbai Commuters Forum", status: "Active Hearing", date: "Today, 10:30 AM", type: "PIL" },
  { id: "C-8834", title: "Cyber Fraud Recovery: State Bank", client: "Ramesh Sharma", status: "Filing Stage", date: "Yesterday", type: "Cyber Law" },
  { id: "C-8712", title: "Aravalli Mining Stay Order", client: "Eco Warriors NGO", status: "Judgment Reserved", date: "3 Days Ago", type: "Environmental" },
];

export default function DashboardPage() {
  const stats = [
    { title: "Active Clients", value: "142", icon: Users, change: "+12%" },
    { title: "Pending Petitions", value: "28", icon: FileText, change: "-2%" },
    { title: "Success Rate", value: "94%", icon: Scale, change: "+4%" },
    { title: "Monthly Revenue", value: "₹6.49L", icon: IndianRupee, change: "+18%" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Lawyer Portal</h1>
          <p className="text-muted-foreground">Welcome back, Adv. Ananya Desai</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <Card className="glass-card border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs mt-1 font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card border-white/10 h-[400px]">
            <CardHeader>
              <CardTitle>Revenue Overview (INR)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockChartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 15, 28, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
          <Card className="glass-card border-white/10 h-[400px]">
            <CardHeader>
              <CardTitle>Case Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 15, 28, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="cases" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Cases Row */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle>Recent Case Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((c) => (
                <div key={c.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-full shrink-0">
                      <Scale className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{c.title}</h4>
                      <p className="text-sm text-muted-foreground">Client: {c.client} &bull; {c.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-medium text-foreground">{c.status}</p>
                      <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" /> {c.date}
                      </p>
                    </div>
                    <Badge variant={c.status === "Active Hearing" ? "default" : "secondary"} className="glass">
                      {c.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}
