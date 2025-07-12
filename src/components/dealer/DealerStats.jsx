
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { ShoppingCart, DollarSign, Bell, CreditCard } from 'lucide-react';
import axios from 'axios';

const DealerStats = () => {
  const [stats, setStats] = useState({
    totalBookings: 18,
    totalSpent: 45000,
    activeSubscriptions: 5,
    pendingPayments: 2
  });

  const [chartData, setChartData] = useState({
    spendingByCategory: [
      { name: 'Grains', value: 25000, color: '#22c55e' },
      { name: 'Vegetables', value: 12000, color: '#3b82f6' },
      { name: 'Fruits', value: 6000, color: '#f59e0b' },
      { name: 'Others', value: 2000, color: '#ef4444' }
    ],
    monthlySpending: [
      { month: 'Jan', amount: 6500 },
      { month: 'Feb', amount: 8200 },
      { month: 'Mar', amount: 7800 },
      { month: 'Apr', amount: 9500 },
      { month: 'May', amount: 8000 },
      { month: 'Jun', amount: 5000 }
    ],
    bookingTrend: [
      { month: 'Jan', bookings: 3 },
      { month: 'Feb', bookings: 4 },
      { month: 'Mar', bookings: 2 },
      { month: 'Apr', bookings: 5 },
      { month: 'May', bookings: 3 },
      { month: 'Jun', bookings: 1 }
    ]
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Mock data for demonstration
      setStats({
        totalBookings: 18,
        totalSpent: 45000,
        activeSubscriptions: 5,
        pendingPayments: 2
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "#22c55e",
    },
    bookings: {
      label: "Bookings",
      color: "#3b82f6",
    },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Row>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stats-card border-primary animate-fade-in">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                <ShoppingCart size={32} className="text-primary" />
              </div>
              <div>
                <div className="stats-number text-primary">
                  {stats.totalBookings}
                </div>
                <h6 className="text-muted mb-0">Total Bookings</h6>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <Card className="stats-card border-success animate-fade-in">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                <DollarSign size={32} className="text-success" />
              </div>
              <div>
                <div className="stats-number text-success">
                  ₹{stats.totalSpent.toLocaleString()}
                </div>
                <h6 className="text-muted mb-0">Total Spent</h6>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <Card className="stats-card border-info animate-fade-in">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                <Bell size={32} className="text-info" />
              </div>
              <div>
                <div className="stats-number text-info">
                  {stats.activeSubscriptions}
                </div>
                <h6 className="text-muted mb-0">Active Subscriptions</h6>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <Card className="stats-card border-warning animate-fade-in">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                <CreditCard size={32} className="text-warning" />
              </div>
              <div>
                <div className="stats-number text-warning">
                  {stats.pendingPayments}
                </div>
                <h6 className="text-muted mb-0">Pending Payments</h6>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="h-100 animate-fade-in">
            <Card.Header>
              <h5 className="mb-0">💰 Spending by Category</h5>
            </Card.Header>
            <Card.Body>
              <ChartContainer config={chartConfig} className="h-64">
                <PieChart>
                  <Pie
                    data={chartData.spendingByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.spendingByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`₹${value}`, name]}
                  />
                </PieChart>
              </ChartContainer>
              <div className="mt-3">
                <div className="d-flex flex-wrap gap-3">
                  {chartData.spendingByCategory.map((item, index) => (
                    <div key={index} className="d-flex align-items-center">
                      <div 
                        className="me-2"
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: item.color,
                          borderRadius: '2px'
                        }}
                      ></div>
                      <small className="text-muted">{item.name} (₹{item.value.toLocaleString()})</small>
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="h-100 animate-fade-in">
            <Card.Header>
              <h5 className="mb-0">📊 Monthly Spending Trend</h5>
            </Card.Header>
            <Card.Body>
              <ChartContainer config={chartConfig} className="h-64">
                <AreaChart data={chartData.monthlySpending}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`₹${value}`, 'Spending']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#22c55e" 
                    fill="#22c55e"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ChartContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="animate-fade-in">
            <Card.Header>
              <h5 className="mb-0">📈 Booking Trend</h5>
            </Card.Header>
            <Card.Body>
              <ChartContainer config={chartConfig} className="h-48">
                <BarChart data={chartData.bookingTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`${value} bookings`, 'Monthly Bookings']}
                  />
                  <Bar dataKey="bookings" radius={[8, 8, 0, 0]} fill="#3b82f6" />
                </BarChart>
              </ChartContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="animate-fade-in">
            <Card.Header>
              <h5 className="mb-0">📋 Purchase Insights</h5>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Avg. Order Value</span>
                  <span className="fw-bold text-success">₹2,500</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Favorite Category</span>
                  <span className="fw-bold text-primary">Grains</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Savings This Month</span>
                  <span className="fw-bold text-warning">₹1,200</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Payment Success Rate</span>
                  <span className="fw-bold text-success">98%</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DealerStats;
