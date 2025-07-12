
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, Wheat, FileText, DollarSign } from 'lucide-react';
import axios from 'axios';

const FarmerStats = () => {
  const [stats, setStats] = useState({
    totalCrops: 12,
    totalBookings: 25,
    totalRevenue: 15000,
    pendingBookings: 3
  });

  const [chartData, setChartData] = useState({
    cropTypes: [
      { name: 'Wheat', value: 5, color: '#22c55e' },
      { name: 'Rice', value: 3, color: '#3b82f6' },
      { name: 'Corn', value: 2, color: '#f59e0b' },
      { name: 'Others', value: 2, color: '#ef4444' }
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 2500 },
      { month: 'Feb', revenue: 3200 },
      { month: 'Mar', revenue: 2800 },
      { month: 'Apr', revenue: 3500 },
      { month: 'May', revenue: 3000 },
      { month: 'Jun', revenue: 4200 }
    ],
    bookingStatus: [
      { name: 'Completed', value: 22, color: '#22c55e' },
      { name: 'Pending', value: 3, color: '#f59e0b' }
    ]
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Mock data for demonstration
      setStats({
        totalCrops: 12,
        totalBookings: 25,
        totalRevenue: 15000,
        pendingBookings: 3
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const chartConfig = {
    revenue: {
      label: "Revenue",
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
          <Card className="stats-card border-success animate-fade-in">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                <Wheat size={32} className="text-success" />
              </div>
              <div>
                <div className="stats-number text-success">
                  {stats.totalCrops}
                </div>
                <h6 className="text-muted mb-0">Total Crops</h6>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <Card className="stats-card border-primary animate-fade-in">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                <FileText size={32} className="text-primary" />
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
          <Card className="stats-card border-warning animate-fade-in">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                <DollarSign size={32} className="text-warning" />
              </div>
              <div>
                <div className="stats-number text-warning">
                  ₹{stats.totalRevenue.toLocaleString()}
                </div>
                <h6 className="text-muted mb-0">Total Revenue</h6>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <Card className="stats-card border-danger animate-fade-in">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                <TrendingUp size={32} className="text-danger" />
              </div>
              <div>
                <div className="stats-number text-danger">
                  {stats.pendingBookings}
                </div>
                <h6 className="text-muted mb-0">Pending Bookings</h6>
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
              <h5 className="mb-0">📊 Crop Distribution</h5>
            </Card.Header>
            <Card.Body>
              <ChartContainer config={chartConfig} className="h-64">
                <PieChart>
                  <Pie
                    data={chartData.cropTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.cropTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`${value} crops`, name]}
                  />
                </PieChart>
              </ChartContainer>
              <div className="mt-3">
                <div className="d-flex flex-wrap gap-3">
                  {chartData.cropTypes.map((item, index) => (
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
                      <small className="text-muted">{item.name} ({item.value})</small>
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
              <h5 className="mb-0">📈 Monthly Revenue Trend</h5>
            </Card.Header>
            <Card.Body>
              <ChartContainer config={chartConfig} className="h-64">
                <LineChart data={chartData.monthlyRevenue}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="animate-fade-in">
            <Card.Header>
              <h5 className="mb-0">📋 Booking Status</h5>
            </Card.Header>
            <Card.Body>
              <ChartContainer config={chartConfig} className="h-48">
                <BarChart data={chartData.bookingStatus}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`${value} bookings`, name]}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#3b82f6" />
                </BarChart>
              </ChartContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="animate-fade-in">
            <Card.Header>
              <h5 className="mb-0">🎯 Performance Metrics</h5>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Avg. Crop Price</span>
                  <span className="fw-bold text-success">₹45/kg</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Customer Rating</span>
                  <span className="fw-bold text-warning">4.8/5 ⭐</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Repeat Customers</span>
                  <span className="fw-bold text-info">78%</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Delivery Success</span>
                  <span className="fw-bold text-success">96%</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FarmerStats;
