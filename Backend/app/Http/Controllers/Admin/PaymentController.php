<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with(['reservation.customer', 'reservation.rooms'])->latest('paid_at');

        if ($method = $request->get('method')) {
            $query->where('payment_method', $method);
        }

        $total = (clone $query)->sum('amount');
        $payments = $query->paginate(20)->withQueryString();

        return view('admin.payments.index', compact('payments', 'total'));
    }
}
