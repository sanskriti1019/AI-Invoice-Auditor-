export interface LineItem {
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  hsnCode: string;
  gstRate: number;
}

export interface ExtractedInvoice {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  invoiceDate: string;
  lineItems: LineItem[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  status: "pending" | "extracting" | "validating" | "complete";
}

export interface Discrepancy {
  id: string;
  type: string;
  severity: "high" | "medium" | "low";
  message: string;
  detail?: string;
}

export interface AnalysisResult {
  extracted: ExtractedInvoice;
  discrepancies: Discrepancy[];
  summary: {
    totalBilled: number;
    estimatedCorrect: number;
    potentialOvercharge: number;
  };
}

const vendorList = [
  "Tech Supplies India Pvt Ltd",
  "Cloud Compute Solutions",
  "Office Necessities LLC",
  "Global Logistics Partners",
  "Marketing & Beyond Agency",
  "Cyber Security Experts"
];

// Helper to generate a random delay and realistic mock analysis for batching
export function generateMockAnalysis(fileName: string): AnalysisResult {
  const randomVendor = vendorList[Math.floor(Math.random() * vendorList.length)];
  const invoiceIdStr = Math.floor(1000 + Math.random() * 9000).toString();
  const isHighRisk = Math.random() > 0.6; // 40% chance of high risk issues

  const items: LineItem[] = [
    {
      description: "Consulting Services",
      quantity: 40,
      unit: "hrs",
      rate: isHighRisk ? 3500.0 : 2500.0,
      amount: isHighRisk ? 140000.0 : 100000.0,
      hsnCode: "9983",
      gstRate: 18,
    },
    {
      description: "Software License",
      quantity: 1,
      unit: "year",
      rate: 15000.0,
      amount: 15000.0,
      hsnCode: "9973",
      gstRate: isHighRisk ? 28 : 18, // GST mismatch if high risk
    }
  ];

  const subtotal = items.reduce((acc, obj) => acc + obj.amount, 0);
  const gstAmount = items.reduce((acc, obj) => acc + (obj.amount * (obj.gstRate / 100)), 0);

  const extracted: ExtractedInvoice = {
    id: Math.random().toString(36).substring(7),
    vendorName: randomVendor,
    invoiceNumber: `INV-${new Date().getFullYear()}-${invoiceIdStr}`,
    invoiceDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    lineItems: items,
    subtotal: subtotal,
    gstAmount: gstAmount,
    totalAmount: subtotal + gstAmount,
    status: "complete"
  };

  const discrepancies: Discrepancy[] = [];
  let potentialOvercharge = 0;

  if (isHighRisk) {
    discrepancies.push({
      id: Math.random().toString(36).substring(7),
      type: "Rate Exceeds Contract",
      severity: "high",
      message: "Consulting rate exceeds agreement",
      detail: `Billed at ₹3500/hr. Contract maximum: ₹2500/hr.`,
    });
    potentialOvercharge += 40000; // 40 hrs * 1000 diff

    discrepancies.push({
      id: Math.random().toString(36).substring(7),
      type: "GST Rate Mismatch",
      severity: "medium",
      message: "Verify GST on Software License",
      detail: `Billed at 28%. Standard rate is 18%.`,
    });
    potentialOvercharge += 1500; // 10% diff on 15k
  } else if (Math.random() > 0.8) {
    // 20% chance of small discrepancy even if not high risk
    discrepancies.push({
      id: Math.random().toString(36).substring(7),
      type: "Calculation Error",
      severity: "low",
      message: "Rounding inconsistency on total",
      detail: "Line items sum differs from final total by ₹15.",
    });
    potentialOvercharge += 15;
  }

  const summary = {
    totalBilled: extracted.totalAmount,
    estimatedCorrect: extracted.totalAmount - potentialOvercharge,
    potentialOvercharge,
  };

  return { extracted, discrepancies, summary };
}
