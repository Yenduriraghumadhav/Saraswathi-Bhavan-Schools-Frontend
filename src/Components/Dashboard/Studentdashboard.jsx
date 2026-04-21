import React, { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./studentdashboard.css";
import axios from 'axios';

const Studentdashboard = () => {
    const [marksData, setMarksData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [studentInfo, setStudentInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                setError('No student data found in local storage.');
                setLoading(false);
                return;
            }

            const parsedUser = JSON.parse(userStr);
            setStudentInfo(parsedUser);

            const rollnumber = parsedUser.rollnumber || parsedUser.stdrollNumber;
            const studentClass = parsedUser.class || parsedUser.stdclass;

            if (!rollnumber || !studentClass) {
                setError('Incomplete student data in local storage.');
                setLoading(false);
                return;
            }

            const response = await axios.get('http://localhost:2001/api/totalstudentmarks/filteredstudentmarks', {
                params: { rollNumber: rollnumber, stdclass: studentClass },
                withCredentials: true
            });

            console.log("Dashboard API Response:", response.data);

            const resultData = response.data?.result || response.data?.data?.result || response.data;
            setMarksData(resultData);

        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
            setError('Failed to load marks for dashboard.');
        } finally {
            setLoading(false);
        }
    };

    const formatChartData = (examData) => {
        if (!examData) return [];
        const subjects = ['telugu', 'hindi', 'english', 'maths', 'science', 'social'];
        return subjects.map(subject => ({
            subject: subject.charAt(0).toUpperCase() + subject.slice(1),
            marks: examData[subject] || 0
        }));
    };

    if (loading) return <div className="student-dashboard-state-msg">Loading Dashboard...</div>;
    if (error) return <div className="student-dashboard-state-msg error-msg">{error}</div>;


    const exams = ["mid", "prefinal", "final"];

    return (
        <div className="student-dashboard-wrapper">
            <h1 className="dashboard-main-title">Student Performance Dashboard</h1>

            {studentInfo && (
                <div className="student-header-card">
                    <div className="student-header-info">
                        <h2>{studentInfo.stdname || studentInfo.name} - Class {studentInfo.class || studentInfo.stdclass}</h2>
                        <p>Roll Number: {studentInfo.rollnumber || studentInfo.stdrollNumber}</p>
                    </div>
                </div>
            )}

            <div className="charts-grid-container">
                {exams.map(exam => {
                    const examData = marksData?.[exam] || marksData?.result?.[exam];
                    const chartData = formatChartData(examData);

                    return (
                        <div className="exam-chart-card" key={exam}>
                            <h3 className="exam-chart-title">{exam.charAt(0).toUpperCase() + exam.slice(1)} Term Exams</h3>
                            <div className="exam-chart-wrapper">
                                {chartData.length === 0 ? (
                                    <div className="student-dashboard-state-msg">After completing Exams, your marks will be displayed here.</div>
                                ) : (
                                    <ResponsiveContainer width="100%" height={180}>
                                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="subject" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                            <YAxis domain={[0, 100]} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            />
                                            <Bar
                                                dataKey="marks"
                                                fill="url(#colorMarks)"
                                                radius={[6, 6, 0, 0]}
                                                name="Marks"
                                                animationDuration={1500}
                                            />
                                            <defs>
                                                <linearGradient id="colorMarks" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.9} />
                                                </linearGradient>
                                            </defs>
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Studentdashboard;    