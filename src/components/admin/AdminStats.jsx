
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ComposedChart, Area, AreaChart } from 'recharts';
import { Users, Wheat, ShoppingCart, DollarSign, TrendingUp, Activity } from 'lucide-react';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalFarmers: 150,
    totalDealers: 85,
    totalTransactions: 1250,
    totalRevenue: 125000,
    activeBookings: 45,
    platformGrowth: 25
  });

  const [chartData, setChartData] = useState({
    userGrowth: [
      { month: 'Jan', farmers: 120, dealers: 65 },
      { month: 'Feb', farmers: 130, dealers: 70 },
      { month: 'Mar', farmers: 135, dealers: 75 },
      { month: 'Apr', farmers: 140, dealers: 78 },
      { month: 'May', farmers: 145, dealers: 82 },
      { month: 'Jun', farmers: 150, dealers: 85 }
    ],
    revenueDistribution: [
      { name: 'Transaction Fees', value: 75000, color: '#22c55e' },
      { name: 'Subscription Fees', value: 30000, color: '#3b82f6' },
      { name: 'Advertisement', value: 15000, color: '#f59e0b' },
      { name: 'Others', value: 5000, color: '#ef4444' }
    ],
    platformActivity: [
      { month: 'Jan', transactions: 180, revenue: 18000 },
      { month: 'Feb', transactions: 220, revenue: 22000 },
      { month: 'Mar', transactions: 195, revenue: 19500 },
      { month: 'Apr', transactions: 240, revenue: 24000 },
      { month: 'May', transactions: 210, revenue: 21000 },
      { month: 'Jun', transactions: 185, revenue: 18500 }
    ]
  });

  const chartConfig = {
    farmers: { label: "Farmers", color: "#22c55e" },
    dealers: { label: "Dealers", color: "#3b82f6" },
    transactions: { label: "Transactions", color: "#f59e0b" },
    revenue: { label: "Revenue", color: "#ef4444" }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Row>
        <Col lg={2} md={4} className="mb-4">
          <Card className="stats-card border-success animate-fade-in">
            <Card.Body className="text-center">
              <Users size={32} className="text-success mb-2" />
              <div className="stats-number text-success">{stats.totalFarmers}</div>
              <small className="text-muted">Total Farmers</small>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={2} md={4} className="mb-4">
          <Card className="stats-card border-primary animate-fade-in">
            <Card.Body className="text-center">
              <ShoppingCart size={32} className="text-primary mb-2" />
              <div className="stats-number text-primary">{stats.totalDealers}</div>
              <small className="text-muted">Total Dealers</small>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={2} md={4} className="mb-4">
          <Card className="stats-card border-warning animate-fade-in">
            <Card.Body className="text-center">
              <Activity size={32} className="text-warning mb-2" />
              <div className="stats-number text-warning">{stats.totalTransactions}</div>
              <small className="text-muted">Transactions</small>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={2} md={4} className="mb-4">
          <Card className="stats-card border-info animate-fade-in">
            <Card.Body className="text-center">
              <DollarSign size={32} className="text-info mb-2" />
              <div className="stats-number text-info">₹{(stats.totalRevenue/1000).toFixed(0)}K</div>
              <small className="text-muted">Total Revenue</small>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={2} md={4} className="mb-4">
          <Card className="stats-card border-danger animate-fade-in">
            <Card.Body className="text-center">
              <Wheat size={32} className="text-danger mb-2" />
              <div className="stats-number text-danger">{stats.activeBookings}</div>
              <small className="text-muted">Active Bookings</small>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={2} md={4} className="mb-4">
          <Card className="stats-card border-success animate-fade-in">
            <Card.Body className="text-center">
              <TrendingUp size={32} className="text-success mb-2" />
              <div className="stats-number text-success">{stats.platformGrowth}%</div>
              <small className="text-muted">Growth Rate</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row>
        <Col lg={8} className="mb-4">
          <Card className="h-100 animate-fade-in">
            <Card.Header>
              <h5 className="mb-0">📈 User Growth Trend</h5>
            </Card.Header>
            <Card.Body>
              <ChartContainer config={chartConfig} className="h-80">
                <ComposedChart data={chartData.userGrowth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="farmers" fill="#22c55e" name="Farmers" />
                  <Bar dataKey="dealers" fill="#3b82f6" name="Dealers" />
                </ComposedChart>
              </ChartContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-4">
          <Card className="h-100 animate-fade-in">
            <Card.Header>
              <h5 className="mb-0">💰 Revenue Sources</h5>
            </Card.Header>
            <Card.Body>
              <ChartContainer config={chartConfig} className="h-80">
                <PieChart>
                  <Pie
                    data={chartData.revenueDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.revenueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`₹${value}`, name]}
                  />
                </PieChart>
              </ChartContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12} className="mb-4">
          <Card className="animate-fade-in">
            <Card.Header>
              <h5 className="mb-0">📊 Platform Activity Overview</h5>
            </Card.Header>
            <Card.Body>
              <ChartContainer config={chartConfig} className="h-64">
                <ComposedChart data={chartData.platformActivity}>
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar yAxisId="left" dataKey="transactions" fill="#f59e0b" name="Transactions" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={3} name="Revenue" />
                </ComposedChart>
              </ChartContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminStats;
