"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { mockFees } from '../../lib/mockData';
import { DollarSign, CheckCircle, Clock, AlertCircle, Download, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export function StudentFees() {
  const totalAmount = mockFees.reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = mockFees.reduce((sum, f) => sum + f.paid, 0);
  const totalPending = totalAmount - totalPaid;
  const paymentProgress = Math.round((totalPaid / totalAmount) * 100);

  const handlePayment = () => {
    toast.success('Payment gateway will be integrated here');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Fee Management</h2>
        <p className="text-gray-600">View and manage your fee payments</p>
      </div>

      {/* Payment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Fee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <div className="text-3xl font-bold">₹{totalAmount.toLocaleString()}</div>
            </div>
            <p className="text-xs text-gray-600 mt-2">Annual fee structure</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="text-3xl font-bold text-green-700">₹{totalPaid.toLocaleString()}</div>
            </div>
            <p className="text-xs text-green-700 mt-2">Payment received</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <div className="text-3xl font-bold text-orange-700">₹{totalPending.toLocaleString()}</div>
            </div>
            <p className="text-xs text-orange-700 mt-2">Payment due</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Progress</CardTitle>
          <CardDescription>Track your annual fee payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-semibold text-blue-600">{paymentProgress}%</span>
            </div>
            <Progress value={paymentProgress} className="h-3" />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>₹{totalPaid.toLocaleString()} paid</span>
              <span>₹{totalPending.toLocaleString()} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fee Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Payment Details</CardTitle>
          <CardDescription>Quarterly fee breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Term</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Pending Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.term}</TableCell>
                  <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    ₹{fee.paid.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-orange-600 font-semibold">
                    ₹{(fee.amount - fee.paid).toLocaleString()}
                  </TableCell>
                  <TableCell>{fee.dueDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        fee.status === 'paid' 
                          ? 'default' 
                          : fee.status === 'overdue' 
                          ? 'destructive' 
                          : 'secondary'
                      }
                      className="capitalize"
                    >
                      {getStatusIcon(fee.status)}
                      <span className="ml-1">{fee.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {fee.status === 'paid' ? (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Receipt
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handlePayment}
                      >
                        <CreditCard className="w-4 h-4 mr-1" />
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockFees.map((fee) => (
          <Card key={fee.id} className={fee.status === 'pending' ? 'border-orange-300' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{fee.term}</CardTitle>
                <Badge 
                  variant={
                    fee.status === 'paid' 
                      ? 'default' 
                      : fee.status === 'overdue' 
                      ? 'destructive' 
                      : 'secondary'
                  }
                  className="capitalize"
                >
                  {fee.status}
                </Badge>
              </div>
              <CardDescription>Due: {fee.dueDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Amount</span>
                  <span className="font-semibold">₹{fee.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Paid</span>
                  <span className="font-semibold text-green-600">₹{fee.paid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Balance</span>
                  <span className="font-semibold text-orange-600">
                    ₹{(fee.amount - fee.paid).toLocaleString()}
                  </span>
                </div>
                <Progress value={(fee.paid / fee.amount) * 100} className="mt-2" />
                {fee.status === 'paid' ? (
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                ) : (
                  <Button 
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700" 
                    size="sm"
                    onClick={handlePayment}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay ₹{(fee.amount - fee.paid).toLocaleString()}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Available payment options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Credit/Debit Card</p>
              <p className="text-xs text-gray-600 mt-1">Visa, Mastercard, Rupay</p>
            </div>
            <div className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold">Net Banking</p>
              <p className="text-xs text-gray-600 mt-1">All major banks</p>
            </div>
            <div className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer">
              <svg className="w-8 h-8 mx-auto mb-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="font-semibold">UPI</p>
              <p className="text-xs text-gray-600 mt-1">GPay, PhonePe, Paytm</p>
            </div>
            <div className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer">
              <svg className="w-8 h-8 mx-auto mb-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="font-semibold">Cash/Cheque</p>
              <p className="text-xs text-gray-600 mt-1">At school office</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
