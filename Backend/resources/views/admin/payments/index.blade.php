@extends('admin.layouts.app')

@section('title', 'Payments')
@section('page-title', 'Payments')

@section('content')
<div class="stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
    <div class="stat-card">
        <div class="stat-card__label">Filtered Total</div>
        <div class="stat-card__value">{{ number_format($total, 0) }} MAD</div>
    </div>
</div>

<div class="card">
    <div class="card__header">
        <h2 class="card__title">Payment Ledger</h2>
    </div>
    <div class="table-wrap">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Reference</th>
                    <th>Guest</th>
                    <th>Reservation</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Paid at</th>
                </tr>
            </thead>
            <tbody>
                @forelse($payments as $payment)
                    <tr>
                        <td>{{ $payment->transaction_reference }}</td>
                        <td>{{ $payment->reservation?->customer?->first_name }} {{ $payment->reservation?->customer?->last_name }}</td>
                        <td>{{ $payment->reservation?->reference }}</td>
                        <td><strong>{{ number_format($payment->amount, 0) }} MAD</strong></td>
                        <td>{{ ucfirst($payment->payment_method ?? '—') }}</td>
                        <td>{{ $payment->payment_status?->label() ?? '—' }}</td>
                        <td>{{ $payment->paid_at?->format('d M Y H:i') ?? '—' }}</td>
                    </tr>
                @empty
                    <tr><td colspan="7">No payments recorded.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <div class="pagination">{{ $payments->links() }}</div>
</div>
@endsection
