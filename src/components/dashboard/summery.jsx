// // components/dashboard/Summery.jsx
// import React from 'react';

// const Summery = () => {
//   return (
//     <div className="row g-4">
//       {/* 1. Metric Cards */}
//       <div className="col-md-3">
//         <div className="card border-0 shadow-sm p-3 bg-white rounded-4">
//           <p className="text-muted mb-1 small">Total Students</p>
//           <h3 className="fw-bold">1,250</h3>
//           <span className="badge bg-success-subtle text-success">+4% from last month</span>
//         </div>
//       </div>

//       {/* 2. Main Content Area */}
//       <div className="col-lg-8">
//         <div className="card border-0 shadow-sm p-4 bg-white rounded-4">
//           <h5 className="fw-bold mb-4">Registration Trends</h5>
//           <div style={{ height: '300px', background: '#f8f9fa' }}>
//              {/* Insert Chart Component Here */}
//              <p className="text-center pt-5 text-muted">Chart Placeholder</p>
//           </div>
//         </div>
//       </div>

//       {/* 3. Recent Activity Sidebar */}
//       <div className="col-lg-4">
//         <div className="card border-0 shadow-sm p-4 bg-white rounded-4">
//           <h5 className="fw-bold mb-3">Recent Activity</h5>
//           <ul className="list-unstyled small">
//              <li className="mb-3 border-bottom pb-2">Admin added new Category: "Science Lab"</li>
//              <li className="mb-3 border-bottom pb-2">Student #102 paid Fee via Online</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Summery;



import React from 'react';
// 1. Notice 'defs' and 'linearGradient' are REMOVED from the import list
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { FaUserPlus, FaMoneyBillTrendUp, FaUserCheck, FaGraduationCap } from "react-icons/fa6";

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const Summery = () => {
  return (
    <div className="p-1">
      {/* STATS CARDS */}
      <div className="row g-4 mb-4">
        <StatCard label="Total Revenue" value="$54,230" icon={<FaMoneyBillTrendUp />} trend="+12.5%" color="var(--accent-blue)" />
        <StatCard label="New Admissions" value="156" icon={<FaUserPlus />} trend="+8%" color="#10b981" />
        <StatCard label="Attendance" value="94.2%" icon={<FaUserCheck />} trend="-0.4%" color="#f59e0b" />
        <StatCard label="Active Courses" value="42" icon={<FaGraduationCap />} trend="+2" color="#8b5cf6" />
      </div>

      {/* CHART SECTION */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
        <div className="card-body p-4">
          <div className="mb-4">
            <h5 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Revenue Analytics</h5>
            <p className="text-muted small">Monthly financial performance overview</p>
          </div>
          
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                {/* 2. Standard SVG tags (lowercase) work perfectly here */}
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4C6EF5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4C6EF5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                />
                <Tooltip 
                    contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        fontSize: '12px'
                    }}
                />
                <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4C6EF5" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Clean Sub-component
const StatCard = ({ label, value, icon, trend, color }) => (
  <div className="col-md-3">
    <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white hover-lift">
      <div className="d-flex align-items-center gap-3">
        <div className="rounded-circle p-3 d-flex align-items-center justify-content-center text-white shadow-sm" style={{ backgroundColor: color, width: '50px', height: '50px' }}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <div>
          <p className="text-muted small mb-0 fw-medium">{label}</p>
          <h4 className="fw-bold mb-0">{value}</h4>
          <small className={trend.startsWith('+') ? 'text-success fw-bold' : 'text-danger fw-bold'}>
            {trend}
          </small>
        </div>
      </div>
    </div>
  </div>
);

export default Summery;