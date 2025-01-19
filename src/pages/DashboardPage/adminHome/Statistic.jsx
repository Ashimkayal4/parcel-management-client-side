import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactApexChart from 'react-apexcharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Statistic = () => {
    const axiosSecure = useAxiosSecure()
   
    const { data: parcels = [], isLoading, isError, error } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels');
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    // Data preparation for the bar chart: Booking by Date
    const bookingData = parcels.reduce((acc, parcel) => {
        const date = parcel.date; 
        if (acc[date]) {
            acc[date] += 1;
        } else {
            acc[date] = 1;
        }
        return acc;
    }, {});

    // Prepare data for the chart
    const chartData = {
        series: [
            {
                name: 'Bookings',
                data: Object.values(bookingData),
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: Object.keys(bookingData),
                title: {
                    text: 'Date',
                },
            },
            yaxis: {
                title: {
                    text: 'Number of Bookings',
                },
            },
            fill: {
                opacity: 1,
            },
            title: {
                text: 'Bookings by Date',
                align: 'center',
            },
        },
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">App Usage Statistics</h1>

            <div className="mb-8">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                />
            </div>

            <div className="mt-6">
                <p className='font-semibold text-xl'>Total Parcels: {parcels.length}</p>
            </div>
        </div>
    );
};

export default Statistic;
