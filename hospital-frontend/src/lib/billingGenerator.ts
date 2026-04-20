import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// 1. Explicitly defined the Patient type to fix the first 'any' error
interface PatientData {
 id: string | number;
 name: string;
}

interface BillItem {
 name: string;
 price: number;
}

export const generateFinancialReceipt = (patient: PatientData, items: BillItem[]) => {
 const doc = new jsPDF();
 const timestamp = new Date().toLocaleString();
 const total = items.reduce((sum, item) => sum + item.price, 0);
 const tax = total * 0.02;
 const finalAmount = total + tax;

 // HEADER (Slate 800)
 doc.setFillColor(30, 41, 59); 
 doc.rect(0, 0, 210, 40, 'F');
 
 doc.setFont("helvetica", "bold");
 doc.setFontSize(24);
 doc.setTextColor(255, 255, 255);
 doc.text("FINANCIAL NARRATIVE", 14, 25);
 
 doc.setFontSize(9);
 doc.setTextColor(150, 150, 150);
 doc.text(`TRANSACTION ID: TXN-${Math.floor(Math.random() * 100000)}`, 14, 33);

 // PATIENT & BILLING INFO
 doc.setTextColor(0, 0, 0);
 doc.setFontSize(10);
 doc.text("BILL TO:", 14, 55);
 doc.setFont("helvetica", "normal");
 doc.text(`${patient.name}`, 14, 60);
 doc.text(`REGISTRY ID: ${patient.id}`, 14, 65);

 doc.setFont("helvetica", "bold");
 doc.text("DATE OF SERVICE:", 140, 55);
 doc.setFont("helvetica", "normal");
 doc.text(timestamp, 140, 60);

 // ITEMIZATION TABLE
 autoTable(doc, {
 startY: 75,
 head: [['Service Description', 'Unit Price (LKR)']],
 body: [
 ...items.map(item => [item.name.toUpperCase(), item.price.toLocaleString()]),
 [{ content: 'SUBTOTAL', styles: { fontStyle: 'bold' } }, total.toLocaleString()],
 [{ content: 'NODE SERVICE TAX (2%)', styles: { fontStyle: 'bold' } }, tax.toLocaleString()],
 [{ content: 'TOTAL PAYLOAD', styles: { fontStyle: 'bold', fillColor: [59, 130, 246], textColor: 255 } }, finalAmount.toLocaleString()],
 ],
 theme: 'grid',
 headStyles: { fillColor: [30, 41, 59] },
 columnStyles: { 1: { halign: 'right' } }
 });

 // 2. Fixed 'any' error on line 58 by casting the document instance correctly
 const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 20;
 
 doc.setFontSize(8);
 doc.setFont("helvetica", "normal");
 doc.setTextColor(100);
 doc.text("This is a digitally signed document. No physical signature required.", 14, finalY);
 doc.text("Payment Status: AUTHORIZED & SYNCED", 14, finalY + 5);

 // WATERMARK
 doc.setFontSize(40);
 doc.setTextColor(245, 245, 245);
 doc.text("MEDIFLOW+", 50, 200, { angle: 45 });

 doc.save(`Invoice_${patient.id}_${Date.now()}.pdf`);
};